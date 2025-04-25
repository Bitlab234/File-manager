import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/files';
import { pool } from './db';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import setupSwagger from './swagger';

const app = express();
const PORT = 4001;
const fs = require('fs');
const SECRET = 'kjasdhf98n4c8h2f09hajsdhf9834hf028fhq0938';

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.text());
app.use(cookieParser());
setupSwagger(app);

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    console.log('Полученные куки:', req.cookies);
    if (!token) return res.status(401).send('Unauthorized');

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

/**
 * @swagger
 * /files/{id}:
 *   put:
 *     summary: Обновление содержимого файла
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID файла
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *             description: Новое содержимое файла
 *     responses:
 *       200:
 *         description: Файл успешно обновлен
 *       404:
 *         description: Файл не найден
 *       500:
 *         description: Ошибка при сохранении файла
 */
app.put('/files/:id', async (req, res) => {
    console.log(`Запрос поступил!!!`);
    const fileId = req.params.id;
    const updatedContent = req.body;

    try {
        console.log(`Обновление файла с ID: ${fileId}`);

        const result = await pool.query('SELECT url FROM files WHERE id = $1', [fileId]);
        if (result.rows.length === 0) {
            return res.status(404).send('Файл не найден');
        }

        let filePath = result.rows[0].url.replace(/^\/?backend[\\/]/, '');
        console.log(`Путь к файлу: ${filePath}`);
        fs.chmodSync(filePath, 0o666);
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Файл с ID ${fileId} успешно обновлен.`);

        res.status(200).send('Файл успешно обновлен.');
    } catch (err) {
        console.error('Ошибка при сохранении файла:', err);
        res.status(500).send('Ошибка при сохранении файла.');
    }
});

app.use('/files', fileRoutes);

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: Получение списка всех файлов
 *     tags: [Files]
 *     responses:
 *       200:
 *         description: Список файлов
 */
app.get('/api/files', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM files');
    res.json(result.rows);
});

/**
 * @swagger
 * /api/actions:
 *   get:
 *     summary: Получение списка всех действий с файлами
 *     tags: [Actions]
 *     responses:
 *       200:
 *         description: Список действий с файлами
 */
app.get('/api/actions', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM file_actions');
    res.json(result.rows);
});

/**
 * @swagger
 * /api/actions/log:
 *   post:
 *     summary: Добавление нового действия с файлом
 *     tags: [Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - file_id
 *               - action_type
 *             properties:
 *               file_id:
 *                 type: integer
 *               action_type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Действие успешно добавлено
 *       400:
 *         description: Ошибка валидации данных
 *       500:
 *         description: Ошибка при добавлении действия
 */
app.post('/api/actions/log', authenticateToken, async (req, res) => {
    const { file_id, action_type } = req.body;

    if (!file_id || !action_type) {
        return res.status(400).json({ error: 'file_id и action_type обязательны' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO file_actions (file_id, action_type) 
             VALUES ($1, $2) 
             RETURNING *`,
            [file_id, action_type]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Ошибка при добавлении действия:', err);
        res.status(500).json({ error: 'Ошибка сервера при добавлении действия' });
    }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Авторизация администратора
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверный логин или пароль
 */
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Неверный логин или пароль' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Неверный логин или пароль' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000,
            path: '/',
        });

        res.status(200).json({ token, message: 'Успешный вход' });

    } catch (err) {
        console.error('Ошибка входа:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Swagger доступен на http://localhost:4001/api-docs');
});

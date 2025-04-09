import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/files';
import { pool } from './db';

const app = express();
const PORT = 4001;
const fs = require('fs');

// Настройки CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Разрешаем запросы только с фронта на порту 5173
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Используем CORS с настройками
app.use(cors(corsOptions));

app.use(express.json()); // Для парсинга JSON в запросах
app.use(express.text());

app.put('/files/:id', async (req, res) => {
    console.log(`Запрос поступил!!!`);
    const fileId = req.params.id;
    const updatedContent = req.body; // Получаем обновленный контент из тела запроса
  
    try {
        // Логируем запрос на обновление
        console.log(`Обновление файла с ID: ${fileId}`);

        // Путь к файлу из базы данных
        const result = await pool.query('SELECT url FROM files WHERE id = $1', [fileId]);
        if (result.rows.length === 0) {
            return res.status(404).send('Файл не найден');
        }

        // Извлекаем путь к файлу и исправляем его
        let filePath = result.rows[0].url.replace(/^\/?backend[\\/]/, '');
        // Логируем путь к файлу
        console.log(`Путь к файлу: ${filePath}`);

        // Сохраняем содержимое в файл
        console.log('Попытка записи в файл...');
        fs.chmodSync(filePath, 0o666);
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Файл с ID ${fileId} успешно обновлен.`);

        res.status(200).send('Файл успешно обновлен.');
    } catch (err) {
        console.error('Ошибка при сохранении файла:', err);
        res.status(500).send('Ошибка при сохранении файла.');
    }
});

// Подключаем маршруты
app.use('/files', fileRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

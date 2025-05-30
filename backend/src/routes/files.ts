import { Router } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/all', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM files');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при получении всех файлов' });
    }
});

router.get('/', async (req, res) => {
  const parentIdParam = req.query.parentId as string | undefined;
  try {
    if (parentIdParam === undefined) {
      const result = await pool.query('SELECT * FROM files WHERE parentId IS NULL');
      res.json(result.rows);
    } else {
      const parentId = parseInt(parentIdParam);
      const result = await pool.query('SELECT * FROM files WHERE parentId = $1', [parentId]);
      res.json(result.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении файлов' });
  }
});

router.get('/search', async (req, res) => {
    console.log('Запрос поступил');
    const { q } = req.query;

    try {
        const result = await pool.query(
            `SELECT id, name FROM files WHERE LOWER(name) LIKE LOWER($1) LIMIT 10`,
            [`%${q}%`]
        );

        res.json(result.rows);
    } catch (err) {
        console.error('Ошибка при поиске файлов:', err);
        res.status(500).json({ error: 'Ошибка при поиске файлов' });
    }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM files WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Файл не найден' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении файла' });
  }
});

router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;
  try {
    await pool.query('UPDATE files SET content = $1 WHERE id = $2', [content, id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при обновлении файла' });
  }
});

export default router;
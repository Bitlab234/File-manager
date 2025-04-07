import { Router } from 'express';
import { pool } from '../db';

const router = Router();

// Получить все файлы без фильтрации
router.get('/all', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM files');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при получении всех файлов' });
    }
});

// Получить все файлы или только по parentId (если указан)
router.get('/', async (req, res) => {
  const parentIdParam = req.query.parentId as string | undefined;
  try {
    if (parentIdParam === undefined) {
      // Корневые файлы (где parentId IS NULL)
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

// Получить файл по ID
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

// Обновить содержимое файла (если бы был контент)
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
import { Router } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (req, res) => {
  const name = req.query.name as string | undefined;
  try {
    const query = name
      ? 'SELECT * FROM files WHERE name = $1'
      : 'SELECT * FROM files';
    const result = await pool.query(query, name ? [name] : []);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении файлов' });
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
    res.status(500).json({ error: 'Ошибка при обновлении файла' });
  }
});

export default router;
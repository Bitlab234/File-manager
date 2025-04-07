import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/files';

const app = express();
const PORT = 4001;

// Настройки CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Разрешаем запросы только с фронта на порту 5173
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Используем CORS с настройками
app.use(cors(corsOptions));

app.use(express.json()); // Для парсинга JSON в запросах

// Подключаем маршруты
app.use('/files', fileRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

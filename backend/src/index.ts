import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/files';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/files', fileRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
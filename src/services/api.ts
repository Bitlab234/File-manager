import axios from 'axios'
import type { FileItem } from '@/types/file'

const API_BASE = 'http://localhost:4001/files'

axios.interceptors.request.use(config => {
  // Получаем токен из cookies
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  // Если токен существует, добавляем его в заголовки
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Если токена нет, запрос будет отправляться без Authorization заголовка
  return config;
});


// Функция для получения всех файлов
export async function fetchAllFiles(): Promise<FileItem[]> {
  try {
    const response = await axios.get(`${API_BASE}/all`);  // Запрос на сервер
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке всех файлов:', error);
    return [];
  }
}

export async function fetchFiles(parentId: number | null): Promise<FileItem[]> {
  const url = parentId === null ? `${API_BASE}` : `${API_BASE}?parentId=${parentId}`;
  const response = await axios.get(url);  // Запрос с токеном, если он есть
  return response.data;
}

export async function fetchFileById(id: number): Promise<FileItem> {
  const response = await axios.get(`${API_BASE}/${id}`)
  return response.data
}

export async function updateFileContent(id: number, content: string): Promise<void> {
  console.log("updateFileContent");
  const response = await axios.patch(`${API_BASE}/${id}`, { content })
  if (response.status !== 204) {
    throw new Error('Ошибка при обновлении файла')
  }
}

export const logAction = async (fileId, actionType) => {
  try {
    const response = await fetch('http://localhost:4001/api/actions/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file_id: fileId,
        action_type: actionType,
      }),
    });

    if (!response.ok) {
      console.error('Ошибка при записи действия:', response.statusText);
    } else {
      console.log('Действие записано');
    }
  } catch (err) {
    console.error('Ошибка при отправке действия:', err);
  }
};
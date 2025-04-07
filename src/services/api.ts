import axios from 'axios'
import type { FileItem } from '@/types/file'

const API_BASE = 'http://localhost:4001/files'

export async function fetchFiles(parentId: number | null): Promise<FileItem[]> {
  const url = parentId === null ? `${API_BASE}` : `${API_BASE}?parentId=${parentId}`
  const response = await axios.get(url)
  return response.data
}

export async function fetchFileById(id: number): Promise<FileItem> {
  const response = await axios.get(`${API_BASE}/${id}`)
  return response.data
}

export async function updateFileContent(id: number, content: string): Promise<void> {
  const response = await axios.patch(`${API_BASE}/${id}`, { content })
  if (response.status !== 204) {
    throw new Error('Ошибка при обновлении файла')
  }
}
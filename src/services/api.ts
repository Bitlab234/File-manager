import axios from 'axios'
import { FileItem } from '@/types/file'

const API_URL = 'http://localhost:4000'

export async function fetchFiles(folderName: string | null) {
  const response = await fetch(`${API_URL}/files${folderName ? `?name=${folderName}` : ''}`)
  const files = await response.json()
  return files;
}

export async function fetchFileById(id: number): Promise<FileItem> {
  const response = await axios.get(`${API_URL}/files/${id}`)
  return response.data
}

export async function updateFileContent(id: number, content: string): Promise<void> {
  await axios.patch(`${API_URL}/files/${id}`, { content })
}
import axios from 'axios'
import { FileItem } from '@/types/file'

const API_URL = 'http://localhost:4000'

export async function fetchFiles(folderId: number | null = null): Promise<FileItem[]> {
  const parentFilter = folderId === null ? 'parentId=null' : `parentId=${folderId}`
  const response = await axios.get(`${API_URL}/files?${parentFilter}`)
  return response.data
}

export async function fetchFileById(id: number): Promise<FileItem> {
  const response = await axios.get(`${API_URL}/files/${id}`)
  return response.data
}

export async function updateFileContent(id: number, content: string): Promise<void> {
  await axios.patch(`${API_URL}/files/${id}`, { content })
}
export type FileType = 'text' | 'image' | 'pdf' | 'video' | 'audio' | 'other' | 'folder'

export interface FileItem {
  id: number
  name: string
  type: FileType
  content?: string
  url?: string
  parentId: number | null
}
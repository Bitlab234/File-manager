<template>
  <div>
    <h1>Папка: {{ decodedPath }}</h1>
    <div v-if="files.length">
      <ul style="list-style: none; padding-left: 20px;">
        <li
          v-for="file in files"
          :key="file.id"
          @click="open(file)"
          style="margin-bottom: 6px; cursor: pointer;"
        >
          <img
            v-if="file.type === 'folder'"
            src="/src/assets/images/ico_folder.jpg"
            alt="Folder"
            width="18"
            height="18"
            style="vertical-align: middle; margin-right: 8px;"
          />
          {{ file.name }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Папка пуста или не найдена.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchFiles } from '@/services/api';
import type { FileItem } from '@/types/file';

const route = useRoute();
const router = useRouter();

const files = ref<FileItem[]>([]);
const currentFolder = ref<FileItem | null>(null);
const decodedPath = ref<string>('');

// Открытие папки или файла
function open(item: FileItem) {
  if (item.type === 'folder') {
    const segment = encodeURIComponent(item.name.toLowerCase());
    const folderPath = route.params.folderPath as string || '';
    const newPath = folderPath ? `${folderPath}/${segment}` : segment;
    router.push(`/${newPath}`);
  } else {
    router.push(`/file/${item.id}`);
  }
}

// Загрузка файлов по пути
async function loadFiles() {
  const folderPath = route.params.folderPath as string || '';
  decodedPath.value = decodeURIComponent(folderPath);

  try {
    const allFiles = await fetchFiles(null);
    const segments = decodedPath.value.split('/').filter(Boolean);
    let parentId: number | null = null;
    let folder: FileItem | undefined;

    for (const segment of segments) {
      folder = allFiles.find(file =>
        file.name.toLowerCase() === segment.toLowerCase() &&
        file.type === 'folder' &&
        file.parentId === parentId
      );

      if (!folder) {
        console.error('Папка не найдена:', segment);
        files.value = [];
        return;
      }

      parentId = folder.id;
    }

    currentFolder.value = folder || null;
    files.value = allFiles.filter(file => file.parentId === parentId);
  } catch (error) {
    console.error('Ошибка при загрузке файлов:', error);
    files.value = [];
  }
}

onMounted(loadFiles);

// Следим за изменением маршрута
watch(() => route.fullPath, loadFiles);
</script>

<script setup lang="ts">
import Header from './templates/header.vue';
import Footer from './templates/footer.vue';
import BannerWidget from './templates/bannerWidget.vue';
import buttonBar from './templates/buttonBar.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { logAction, fetchFiles, fetchAllFiles } from '@/services/api';
import type { FileItem } from '@/types/file';

const route = useRoute();
const router = useRouter();

const files = ref<FileItem[]>([]);
const currentFolder = ref<FileItem | null>(null);
const decodedPath = ref<string>('');

async function open(item: FileItem) {
  console.log('Открытие:', item);
  if (item.type === 'folder') {
    const segment = encodeURIComponent(item.name.toLowerCase());
    const folderPath = route.params.folderPath as string || '';
    const newPath = folderPath ? `${folderPath}/${segment}` : segment;
    console.log(`Открываем папку: ${newPath}`);
    router.push(`/${newPath}`);
  } else {
    console.log(`Открываем файл с id ${item.id}`);
    router.push(`/file/${item.id}`);
  }
  await logAction(item.id, 'open');
}

async function loadFiles() {
  const folderPath = route.params.folderPath as string || '';
  decodedPath.value = decodeURIComponent(folderPath);

  console.log('Декодированный путь папки:', decodedPath.value);

  try {
    const allFiles = await fetchAllFiles();
    console.log('Все файлы:', allFiles);

    const segments = decodedPath.value.split('/').filter(Boolean);
    let parentId: number | null = null;
    let folder: FileItem | undefined;

    console.log('Ищем файлы для пути:', decodedPath.value);

    for (const segment of segments) {
      console.log(`Ищем папку по сегменту: ${segment}`);

      folder = allFiles.find(file =>
        file.name.toLowerCase() === segment.toLowerCase() &&
        file.type === 'folder'
      );

      if (!folder) {
        console.error(`Папка не найдена: ${segment}`);
        files.value = [];
        return;
      }

      console.log(`Папка найдена: ${folder.name}, parentId: ${folder.parentId}`);
      parentId = folder.id;
    }

    console.log(parentId);
    currentFolder.value = folder || null;
    console.log('Текущая папка:', currentFolder.value);

    console.log('Все parentId файлов:');
    allFiles.forEach(file => {
      console.log(`Файл: ${file.name}, parentId: ${file.parentid}`);
    });

    files.value = allFiles.filter(file => file.parentid === parentId);
    console.log('Файлы в текущей папке:', files.value);

  } catch (error) {
    console.error('Ошибка при загрузке файлов:', error);
    files.value = [];
  }
}

onMounted(loadFiles);

watch(() => route.fullPath, loadFiles);
</script>

<template>
  <Header />
  <BannerWidget />
  <buttonBar />

  <div>
    <h1>Папка: {{ decodedPath }}</h1>
    <div v-if="files.length">
      <ul style="list-style: none; padding-left: 20px;">
        <li v-for="file in files" :key="file.id" @click="open(file)" style="margin-bottom: 6px; cursor: pointer;">
          <img v-if="file.type === 'folder'" src="/src/assets/images/ico_folder.jpg" alt="Folder" width="18" height="18"
            style="vertical-align: middle; margin-right: 8px;" />
          <img v-else-if="file.type === 'text'" src="/src/assets/images/ico_txt.png" alt="Text" width="18" height="18"
            style="vertical-align: middle; margin-right: 8px;" />
          <img v-else-if="file.type === 'pdf'" src="/src/assets/images/ico_pdf.png" alt="Pdf" width="18" height="18"
            style="vertical-align: middle; margin-right: 8px;" />
          <img v-else-if="file.type === 'image'" src="/src/assets/images/ico_image.png" alt="Image" width="18"
            height="18" style="vertical-align: middle; margin-right: 8px;" />
          <img v-else-if="file.type === 'video'" src="/src/assets/images/ico_video.png" alt="Video" width="18"
            height="18" style="vertical-align: middle; margin-right: 8px;" />
          <img v-else-if="file.type === 'audio'" src="/src/assets/images/ico_audio.png" alt="Audio" width="18"
            height="18" style="vertical-align: middle; margin-right: 8px;" />
          {{ file.name }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Папка пуста или не найдена.</p>
    </div>
  </div>

  <Footer />
</template>

<style></style>

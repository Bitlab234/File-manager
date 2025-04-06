<template>
  <div>
    <h1>Папка: {{ folderName }}</h1>
    <div v-if="files.length">
      <div v-for="file in files" :key="file.id">
        <router-link :to="`/file/${file.id}`">{{ file.name }}</router-link>
      </div>
    </div>
    <div v-else>
      <p>Папка пуста или не найдена.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchFiles } from '@/services/api';
import { FileItem } from '@/types/file';

const route = useRoute();
const folderName = route.params.folderName as string; // Получаем имя папки из маршрута
const files = ref<FileItem[]>([]);

onMounted(async () => {
  try {
    // Получаем все файлы
    const allFiles = await fetchFiles(null); 
    
    console.log('Все файлы:', allFiles); // Отладочный вывод

    // Ищем папку с нужным именем и parentId === null
    const parentFolder = allFiles.find(
      (file) => file.name.toLowerCase() === folderName.toLowerCase() && file.parentId === null
    );

    console.log('Найденная папка:', parentFolder); // Отладочный вывод

    if (parentFolder) {
      // Фильтруем файлы по parentId найденной папки
      files.value = allFiles.filter((file) => file.parentId === parentFolder.id);
      console.log('Файлы в папке:', files.value); // Отладочный вывод
    } else {
      console.error('Папка не найдена');
      files.value = []; // Папка не найдена
    }
  } catch (error) {
    console.error('Ошибка при загрузке файлов:', error);
  }
});
</script>
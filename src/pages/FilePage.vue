<template>
  <header class="header">
    <div class="logo">
      <h1>BalaCloud</h1>
    </div>
    <nav class="navigation">
      <ul>
        <li><router-link to="/">Войти</router-link></li>
        <li><router-link to="/">Облачное хранилище</router-link></li>
      </ul>
    </nav>
  </header>
  <div class="file-viewer">
    <div v-if="loading">Загрузка файла...</div>
    <div v-else-if="!file">Файл не найден.</div>
    <template v-else>
      <h2>{{ file.name }}</h2>
      <!-- Изображение -->
      <img v-if="file.type === 'image'" :src="file.url" :alt="file.name" class="preview-image" />

      <!-- PDF -->
      <iframe v-else-if="file.type === 'pdf'" :src="file.url" class="preview-pdf" frameborder="0"></iframe>

      <!-- Видео -->
      <video v-else-if="file.type === 'video'" :src="file.url" controls class="preview-media"></video>

      <!-- Аудио -->
      <audio v-else-if="file.type === 'audio'" :src="file.url" controls class="preview-media"></audio>

      <!-- Текст -->
      <textarea v-else-if="file.type === 'text'" v-model="file.content" class="text-editor"></textarea>

      <!-- Остальные -->
      <div v-else>
        Невозможно отобразить файл.
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchFileById } from '@/services/api'; // Твоя функция запроса по ID
import type { FileItem } from '@/types/file';

const route = useRoute();
const file = ref<FileItem | null>(null);
const loading = ref(true);

onMounted(async () => {
  const fileId = Number(route.params.id);
  try {
    const result = await fetchFileById(fileId);
    file.value = result;
    console.log("value", file.value);
    console.log("url", file.value.url); // Логируем после получения данных
  } catch (err) {
    console.error('Ошибка при загрузке файла:', err);
  } finally {
    loading.value = false;
  }
});
console.log("file", file.value);
</script>

<style scoped>
.file-viewer {
  padding: 20px;
}

.preview-image {
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.preview-pdf {
  width: 100%;
  height: 600px;
}

.preview-media {
  width: 100%;
  max-height: 400px;
}

.text-editor {
  width: 100%;
  height: 300px;
  padding: 10px;
  font-family: monospace;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
}

.navigation ul {
  list-style: none;
  display: flex;
  gap: 15px;
}

.navigation a {
  color: white;
  text-decoration: none;
}

.navigation a:hover {
  text-decoration: underline;
}
</style>

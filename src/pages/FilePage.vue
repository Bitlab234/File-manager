<template>
  <div v-if="loading">Загрузка файла...</div>
  <div v-else-if="!file">Файл не найден.</div>

  <!-- Если PDF — отображаем только iframe -->
  <iframe
    v-else-if="file.type === 'pdf'"
    :src="file.url"
    class="preview-pdf fullscreen-pdf"
    frameborder="0"
  ></iframe>

  <!-- Всё остальное -->
  <template v-else>
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
      <h2>{{ file.name }}</h2>

      <!-- Изображение -->
      <img v-if="file.type === 'image'" :src="file.url" :alt="file.name" class="preview-image" />

      <!-- Видео -->
      <video v-else-if="file.type === 'video'" :src="file.url" controls class="preview-media"></video>

      <!-- Аудио -->
      <audio v-else-if="file.type === 'audio'" :src="file.url" controls class="preview-media"></audio>

      <!-- Текст (загрузка содержимого для txt файлов) -->
      <textarea v-else-if="file.type === 'text'" v-model="textContent" class="text-editor"></textarea>

      <!-- Остальное -->
      <div v-else>Невозможно отобразить файл.</div>
      <button @click="saveTextFile">Сохранить изменения</button>
    </div>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchFileById } from '@/services/api';
import type { FileItem } from '@/types/file';

const route = useRoute();
const file = ref<FileItem | null>(null);
const loading = ref(true);
const textContent = ref(''); // Для хранения содержимого текстового файла

onMounted(async () => {
  const fileId = Number(route.params.id);
  try {
    const result = await fetchFileById(fileId);
    file.value = result;
    console.log('value', file.value);
    console.log('url', file.value.url);

    // Если это текстовый файл, загрузим его содержимое
    if (result.type === 'text') {
      const response = await fetch(result.url);
      textContent.value = await response.text();
    }
  } catch (err) {
    console.error('Ошибка при загрузке файла:', err);
  } finally {
    loading.value = false;
  }
});

const saveTextFile = async () => {
  if (file.value && file.value.url) {
    try {
      // Логируем id файла
      console.log('id файла:', file.value.id);

      // Логируем содержимое перед отправкой
      console.log('Содержимое файла, которое отправляется:', textContent.value);
      
      console.log(`http://localhost:4001/files/${file.value.id}`);
      const response = await fetch(`http://localhost:4001/files/${file.value.id}`, {
        method: 'PUT', // или 'POST', в зависимости от вашей логики на сервере
        headers: {
          'Content-Type': 'text/plain',
        },
        body: textContent.value // передаем контент в виде JSON
      });

      // Логируем статус ответа
      console.log('Ответ от сервера:', response);

      if (response.ok) {
        alert('Файл успешно сохранен!');
      } else {
        alert('Произошла ошибка при сохранении файла.');
      }
    } catch (err) {
      console.error('Ошибка при сохранении файла:', err);
      alert('Произошла ошибка при сохранении файла.');
    }
  } else {
    console.log('Файл не найден или URL отсутствует');
  }
};

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

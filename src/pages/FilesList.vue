<template>
    <div>
        <h2>Список файлов</h2>
        <ul>
            <li v-for="file in files" :key="file.id">
                <router-link :to="`/file/${file.id}`">{{ file.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchFiles } from '@/services/api'; // Импортируем функцию для запроса файлов

const files = ref([]); // Массив для хранения файлов

// Запросим файлы с бэкенда при монтировании компонента
onMounted(async () => {
    try {
        files.value = await fetchFiles(null); // Замените null на нужный parentId, если необходимо
    } catch (error) {
        console.error('Ошибка при загрузке файлов:', error);
    }
});
</script>
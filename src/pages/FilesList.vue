<template>
    <div>
        <h2>Список файлов</h2>
        <ul>
            <!-- Выводим все файлы -->
            <li v-for="file in files" :key="file.id" @click="open(file)" style="margin-bottom: 6px; cursor: pointer;">
                <!-- Иконка для папок -->
                <img v-if="file.type === 'folder'" src="/src/assets/images/ico_folder.jpg" alt="Folder" width="18"
                    height="18" style="vertical-align: middle; margin-right: 8px;" />
                {{ file.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchFiles } from '@/services/api'; // Импортируем функцию для запроса файлов
import { useRouter } from 'vue-router'; // Для перехода по маршруту

const files = ref([]); // Массив для хранения файлов
const router = useRouter(); // Используем router для переходов

// Запрашиваем файлы с бэкенда при монтировании компонента
onMounted(async () => {
    try {
        files.value = await fetchFiles(null); // Замените null на parentId, если нужно
    } catch (error) {
        console.error('Ошибка при загрузке файлов:', error);
    }
});

// Обработка клика по файлу или папке
function open(item) {
    if (item.type === 'folder') {
        // Если папка, формируем маршрут по имени папки
        const folderName = encodeURIComponent(item.name.toLowerCase()); // Преобразуем в нижний регистр и кодируем для URL
        router.push(`/${folderName}`); // Переходим по маршруту папки
    } else {
        // Если файл, переходим по маршруту файла
        router.push(`/file/${item.id}`); // Переходим по маршруту файла
    }
}
</script>
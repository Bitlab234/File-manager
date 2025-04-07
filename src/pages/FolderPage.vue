<script setup lang="ts">
 import Header from './templates/header.vue';
 import Footer from './templates/footer.vue';
 import BannerWidget from './templates/bannerWidget.vue';
 import { ref, onMounted, watch } from 'vue';
 import { useRoute, useRouter } from 'vue-router';
 import { fetchFiles, fetchAllFiles } from '@/services/api'; // Теперь используем fetchAllFiles
 import type { FileItem } from '@/types/file';
 
 const route = useRoute();
 const router = useRouter();
 
 const files = ref<FileItem[]>([]);
 const currentFolder = ref<FileItem | null>(null);
 const decodedPath = ref<string>('');
 
 // Открытие папки или файла
 function open(item: FileItem) {
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
 }
 
 // Загрузка файлов по пути
 async function loadFiles() {
   const folderPath = route.params.folderPath as string || '';
   decodedPath.value = decodeURIComponent(folderPath);

   console.log('Декодированный путь папки:', decodedPath.value);

   try {
     // Получаем все файлы из БД
     const allFiles = await fetchAllFiles(); // Теперь получаем все файлы
     console.log('Все файлы:', allFiles);

     // Находим нужную папку по имени (например, "Документы")
     const segments = decodedPath.value.split('/').filter(Boolean);
     let parentId: number | null = null;
     let folder: FileItem | undefined;

     console.log('Ищем файлы для пути:', decodedPath.value);

     for (const segment of segments) {
       console.log(`Ищем папку по сегменту: ${segment}`);
       
       // Ищем папку по имени и parentId
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
       parentId = folder.id;  // Обновляем parentId для следующего сегмента
     }

     console.log(parentId);
     // После того как нашли папку, используем её parentId для поиска файлов
     currentFolder.value = folder || null;
     console.log('Текущая папка:', currentFolder.value);

     console.log('Все parentId файлов:');
     allFiles.forEach(file => {
     console.log(`Файл: ${file.name}, parentId: ${file.parentid}`);
      });

     // Теперь загружаем только файлы, у которых parentId совпадает с найденным
     files.value = allFiles.filter(file => file.parentid === parentId);
     console.log('Файлы в текущей папке:', files.value);

   } catch (error) {
     console.error('Ошибка при загрузке файлов:', error);
     files.value = [];
   }
 }
 
 onMounted(loadFiles);
 
 // Следим за изменением маршрута
 watch(() => route.fullPath, loadFiles);
</script>
 
<template>
   <Header />
   <BannerWidget />
 
   <div class="action-buttons">
     <img src="/src/assets/images/ico_upload.gif" alt="Upload" />
     <button>
       Загрузить файл
     </button>
     <img src="/src/assets/images/ico_plus.gif" alt="New Folder" />
     <button>
       Создать папку
     </button>
     <img src="/src/assets/images/ico_access.gif" alt="Access" />
     <button>
       Настроить доступ
     </button>
   </div>
 
   <div>
     <h1>Папка: {{ decodedPath }}</h1>
     <div v-if="files.length">
       <ul style="list-style: none; padding-left: 20px;">
         <li v-for="file in files" :key="file.id" @click="open(file)" style="margin-bottom: 6px; cursor: pointer;">
           <img v-if="file.type === 'folder'" src="/src/assets/images/ico_folder.jpg" alt="Folder" width="18" height="18"
             style="vertical-align: middle; margin-right: 8px;" />
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
 
<style>
 .action-buttons {
   position: fixed;
   top: 110px !important;
   right: 0px;
   align-items: center;
   display: flex;
   flex-direction: row;
   gap: 10px;
   padding: 10px;
   border-radius: 6px;
   z-index: 1000;
 }
 
 .action-buttons button {
   display: flex;
   align-items: center;
   gap: 8px;
   padding: 5px 10px;
   background-color: #333;
   border: none;
   border-radius: 4px;
   color: white;
   cursor: pointer;
   white-space: nowrap;
 }
 
 .action-buttons button:hover {
   background-color: #555;
   color: white;
 }
 
 .action-buttons img {
   width: 16px;
   height: 16px;
   vertical-align: middle;
 }
</style>

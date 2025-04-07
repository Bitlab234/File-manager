<script setup lang="ts">
import Header from './templates/header.vue';
import Footer from './templates/footer.vue';
import BannerWidget from './templates/bannerWidget.vue';
import { onMounted, ref } from 'vue'
import { fetchFiles } from '@/services/api'
import type { FileItem } from '@/types/file'
import { useRouter } from 'vue-router'
import FilesList from '@/pages/FilesList.vue';
/*const files = ref<FileItem[]>([])
const router = useRouter()

onMounted(async () => {
  const allFiles = await fetchFiles(null)
  files.value = allFiles.filter(file => file.parentId === null)
})

function open(item: FileItem) {
  if (item.type === 'folder') {
    const folderName = encodeURIComponent(item.name.toLowerCase()) // Преобразуем в нижний регистр и кодируем для URL
    router.push(`/${folderName}`)
  } else {
    router.push(`/file/${item.id}`)
  }
}*/
</script>

<template>
  <Header />
  
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
  
  <BannerWidget />

  <FilesList />
  <!--<div>
    <h1>Главная</h1>
    <ul style="list-style: none; padding-left: 20;">
      <li v-for="file in files" :key="file.id" @click="open(file)" style="margin-bottom: 4px; cursor: pointer;">
        <img v-if="file.type === 'folder'" src="/src/assets/images/ico_folder.jpg" alt="Folder" width="18" height="18"
          style="vertical-align: middle; margin-right: 8px;" />
        {{ file.name }} ({{ file.type }})
      </li>
    </ul>
  </div>-->

  <Footer />
</template>

<style>
.action-buttons {
  position: fixed;
  top: 110px !important;
  right: 0px;
  align-items: center;
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
  background-color: #333;
  color: white;
}

.action-buttons img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
</style>
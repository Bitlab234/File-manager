<script setup lang="ts">
import Header from './templates/Header.vue';
import Footer from './templates/Footer.vue';
import BannerWidget from './templates/BannerWidget.vue';
import { onMounted, ref } from 'vue'
import { fetchFiles } from '@/services/api'
import type { FileItem } from '@/types/file'
import { useRouter } from 'vue-router'

const files = ref<FileItem[]>([])
const router = useRouter()

onMounted(async () => {
  files.value = await fetchFiles(null)
})

function open(item: FileItem) {
  if (item.type === 'folder') {
    router.push(`/folder/${item.id}`)
  } else {
    router.push(`/file/${item.id}`)
  }
}
</script>

<template>
  <Header />
  <BannerWidget />
  <div>
    <h1>Главная</h1>
    <ul style="list-style: none; padding-left: 20;">
      <li v-for="file in files" :key="file.id" @click="open(file)" style="margin-bottom: 4px; cursor: pointer;">
        <img v-if="file.type === 'folder'" src="/src/assets/images/ico_folder.jpg" alt="Folder" width="18" height="18"
          style="vertical-align: middle; margin-right: 8px;" />
        {{ file.name }} ({{ file.type }})
      </li>
    </ul>
  </div>
  <Footer />
</template>
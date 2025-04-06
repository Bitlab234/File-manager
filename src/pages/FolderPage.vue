<template>
  <div>
    <h1>Папка {{ folderId }}</h1>
    <div v-for="file in files" :key="file.id">
      <router-link :to="`/file/${file.id}`">{{ file.name }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchFiles } from '@/services/api'
import { FileItem } from '@/types/file'

const route = useRoute()
const folderId = parseInt(route.params.id as string)
const files = ref<FileItem[]>([])

onMounted(async () => {
  files.value = await fetchFiles(folderId)
})
</script>
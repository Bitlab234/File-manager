<template>
  <div>
    <h1>Просмотр файла: {{ file?.name }}</h1>
    <div v-if="file?.type === 'text'">
      <textarea v-model="file.content"></textarea>
      <button @click="saveFile">Сохранить</button>
    </div>
    <div v-if="file?.type === 'pdf'">
      <iframe :src="file.content" width="100%" height="600px"></iframe>
    </div>
    <div v-if="file?.type === 'image'">
      <img :src="file.content" alt="Изображение" width="100%" />
    </div>
    <div v-if="file?.type === 'audio'">
      <audio :src="file.content" controls></audio>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchFileById, updateFileContent } from '@/services/api'
import { FileItem } from '@/types/file'

const route = useRoute()
const fileId = parseInt(route.params.id as string)
const file = ref<FileItem | null>(null)

onMounted(async () => {
  file.value = await fetchFileById(fileId)
})

const saveFile = async () => {
  if (file.value) {
    await updateFileContent(file.value.id, file.value.content)
  }
}
</script>
<template>
  <div class="row">
    <div class="col-md-4 mb-3" v-for="file in files" :key="file.id">
      <div class="card h-100 cursor-pointer" @click="openFile(file)">
        <div class="card-body">
          <h5 class="card-title">{{ file.name }}</h5>
          <p class="card-text">Тип: {{ file.type }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { FileItem } from "@/types/file";

const props = defineProps<{ files: FileItem[] }>();
const router = useRouter();

function openFile(file: FileItem) {
  if (file.type === "folder") {
    router.push(`/folder/${file.id}`);
  } else {
    router.push(`/file/${file.id}`); // предполагаем, что будет страница просмотра файла
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
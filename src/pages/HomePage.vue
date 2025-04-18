<script setup lang="ts">
import Header from './templates/header.vue';
import Footer from './templates/footer.vue';
import BannerWidget from './templates/bannerWidget.vue';
import buttonBar from './templates/buttonBar.vue';
import { onMounted, ref } from 'vue'
import { logAction, fetchFiles } from '@/services/api'
import type { FileItem } from '@/types/file'
import { useRouter } from 'vue-router'
import FilesList from '@/pages/FilesList.vue';
</script>

<template>
  <Header />
  <BannerWidget />
  <buttonBar />
  <FilesList />
  <Footer />
</template>

<style>
</style>
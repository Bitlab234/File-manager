<template>
    <div>
        <h2>Список файлов</h2>
        <ul style="list-style-type: none;">
            <li v-for="file in files" :key="file.id" @click="open(file)" style="margin-bottom: 6px; cursor: pointer;">
                <img v-if="file.type === 'folder'" src="/src/assets/images/ico_folder.jpg" alt="Folder" width="18"
                    height="18" style="vertical-align: middle; margin-right: 8px;" />
                <img v-else-if="file.type === 'text'" src="/src/assets/images/ico_txt.png" alt="Text" width="18"
                    height="18" style="vertical-align: middle; margin-right: 8px;" />
                <img v-else-if="file.type === 'pdf'" src="/src/assets/images/ico_pdf.png" alt="Pdf" width="18"
                    height="18" style="vertical-align: middle; margin-right: 8px;" />
                <img v-else-if="file.type === 'image'" src="/src/assets/images/ico_image.png" alt="Image" width="18"
                    height="18" style="vertical-align: middle; margin-right: 8px;" />
                <img v-else-if="file.type === 'video'" src="/src/assets/images/ico_video.png" alt="Video" width="18"
                    height="18" style="vertical-align: middle; margin-right: 8px;" />
                <img v-else-if="file.type === 'audio'" src="/src/assets/images/ico_audio.png" alt="Audio" width="18"
                    height="18" style="vertical-align: middle; margin-right: 8px;" />
                {{ file.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { logAction, fetchFiles } from '@/services/api';
import { useRouter } from 'vue-router';

const files = ref([]);
const router = useRouter();

onMounted(async () => {
    try {
        files.value = await fetchFiles(null);
    } catch (error) {
        console.error('Ошибка при загрузке файлов:', error);
    }
});

async function open(item) {
    if (item.type === 'folder') {
        const folderName = encodeURIComponent(item.name.toLowerCase());
        router.push(`/${folderName}`);
    } else {
        router.push(`/file/${item.id}`);
    }
    await logAction(item.id, 'open');
}
</script>
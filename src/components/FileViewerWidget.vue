<template>
    <div>
        <div v-if="file.type === 'text'">
            <textarea v-model="editableContent" class="form-control mb-2" rows="10"></textarea>
            <button class="btn btn-primary" @click="save">Сохранить</button>
        </div>

        <div v-else-if="file.type === 'pdf'">
            <iframe :src="file.url" width="100%" height="600px"></iframe>
        </div>

        <div v-else-if="file.type === 'image'">
            <img :src="file.url" class="img-fluid" alt="Изображение" />
        </div>

        <div v-else-if="file.type === 'video'">
            <video :src="file.url" controls class="w-100"></video>
        </div>

        <div v-else-if="file.type === 'audio'">
            <audio :src="file.url" controls></audio>
        </div>

        <div v-else>
            <p>Невозможно отобразить этот тип файла.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { FileItem } from '@/types/file'

const props = defineProps<{ file: FileItem }>()
const emit = defineEmits<{
    (e: 'update-content', content: string): void
}>()

const editableContent = ref('')

watch(
    () => props.file,
    (newFile) => {
        if (newFile.type === 'text') {
            editableContent.value = newFile.content || ''
        }
    },
    { immediate: true }
)

function save() {
    emit('update-content', editableContent.value)
}
</script>
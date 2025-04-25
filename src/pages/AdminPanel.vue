<template>
    <div class="admin-panel">
        <h1>Админ-панель</h1>

        <!-- Таблица файлов -->
        <h2>Файлы</h2>
        <table>
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>URL</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="file in files" :key="file.id">
                    <td>{{ file.name }}</td>
                    <td>{{ file.type }}</td>
                    <td>{{ file.url }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Таблица действий -->
        <h2>Действия</h2>
        <table>
            <thead>
                <tr>
                    <th>ID действия</th>
                    <th>Файл ID</th>
                    <th>Тип действия</th>
                    <th>Время действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="action in actions" :key="action.id">
                    <td>{{ action.id }}</td>
                    <td>{{ action.file_id }}</td>
                    <td>{{ action.action_type }}</td>
                    <td>{{ action.action_time }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const files = ref([])
const actions = ref([])

onMounted(async () => {
  try {
    const filesRes = await axios.get('http://localhost:4001/api/files', { withCredentials: true })
    files.value = filesRes.data

    const actionsRes = await axios.get('http://localhost:4001/api/actions', { withCredentials: true })
    actions.value = actionsRes.data
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
  }
})
</script>


<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

button {
    padding: 6px 12px;
    margin: 5px;
    cursor: pointer;
}
</style>
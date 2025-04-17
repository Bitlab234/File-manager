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
            <!--<tbody>
                <tr v-for="file in files" :key="file.id">
                    <td>{{ file.name }}</td>
                    <td>{{ file.type }}</td>
                    <td>{{ file.url }}</td>
                </tr>
            </tbody>-->
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
            <!--<tbody>
                <tr v-for="action in actions" :key="action.id">
                    <td>{{ action.id }}</td>
                    <td>{{ action.file_id }}</td>
                    <td>{{ action.action_type }}</td>
                    <td>{{ action.action_time }}</td>
                </tr>
            </tbody>-->
        </table>
    </div>
</template>

<!--<script>
import axios from 'axios';

export default {
    data() {
        return {
            files: [],
            actions: [],
        };
    },
    created() {
        this.fetchFiles();
        this.fetchActions();
    },
    methods: {
        async fetchFiles() {
            try {
                const response = await axios.get('http://localhost:4000/api/files');
                this.files = response.data;
            } catch (error) {
                console.error('Ошибка при загрузке файлов:', error);
            }
        },
        async fetchActions() {
            try {
                const response = await axios.get('http://localhost:4000/api/file-actions');
                this.actions = response.data;
            } catch (error) {
                console.error('Ошибка при загрузке действий:', error);
            }
        },
        async logAction(fileId, actionType) {
            try {
                await axios.post('http://localhost:4000/api/file-actions', {
                    file_id: fileId,
                    action_type: actionType,
                });
                this.fetchActions(); // Обновить таблицу действий
            } catch (error) {
                console.error('Ошибка при записи действия:', error);
            }
        },
    },
};
</script>-->

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
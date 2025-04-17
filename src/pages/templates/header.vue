<template>
    <header class="header">
        <div class="logo">
            <h1>BalaCloud</h1>
        </div>

        <div class="search-container">
            <input type="text" v-model="query" placeholder="Поиск файлов..." @input="searchFiles"
                class="search-input" />

            <div v-if="searchResults.length" class="results">
                <ul>
                    <li v-for="file in searchResults" :key="file.id">
                        <router-link :to="`/file/${file.id}`">
                            <strong>{{ file.name }}</strong> (ID: {{ file.id }})
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

        <nav class="navigation">
            <ul>
                <li><router-link to="/login">Войти</router-link></li>
                <li><router-link to="/">Облачное хранилище</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const query = ref('');
const searchResults = ref([]);

// Автоматический поиск при изменении
const searchFiles = async () => {
    if (!query.value.trim()) {
        searchResults.value = [];
        return;
    }

    try {
        const response = await axios.get('http://localhost:4001/files/search', {
            params: { q: query.value }
        });

        // Обрезаем до первых 10 результатов
        searchResults.value = response.data.slice(0, 10);
    } catch (error) {
        console.error('Ошибка при поиске:', error);
    }
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: white;
    position: relative;
}

.logo h1 {
    margin: 0;
    font-size: 24px;
}

.search-container {
    position: relative;
    width: 300px;
}

.search-input {
    width: 100%;
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
}

.results {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: white;
    color: black;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
}

.results ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.results li {
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background-color 0.2s;
}

.results li:hover {
    background-color: #f0f0f0;
}

.navigation ul {
    list-style: none;
    display: flex;
    gap: 15px;
    margin: 0;
    padding: 0;
}

.navigation a {
    color: white;
    text-decoration: none;
}

.navigation a:hover {
    text-decoration: underline;
}
</style>
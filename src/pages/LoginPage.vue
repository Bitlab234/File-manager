<template>
    <div class="auth-container">
        <h2>Вход</h2>
        <form @submit.prevent="handleLogin">
            <input v-model="email" type="email" placeholder="Login" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Войти</button>
        </form>
        <p>Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link></p>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const email = ref('')
const password = ref('')

function handleLogin() {
    console.log('Логин:', email.value, password.value)
    // Подключить свой API для логина
    // Если логин успешен, перенаправляем пользователя, позже проверку добавить
    router.push('/adminPanel')
}
</script>

<style scoped>
.auth-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 24px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
}

input {
    display: block;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 16px;
}

button {
    padding: 10px 20px;
    width: 100%;
}

body {
    background-color: #333; /* Тёмный фон для всей страницы */
    color: white; /* Белый цвет текста для контраста */
}
</style>
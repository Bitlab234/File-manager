<template>
    <div class="auth-container">
        <h2>Вход</h2>
        <form @submit.prevent="handleLogin">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Пароль" required />
            <button type="submit">Войти</button>
        </form>
        <p>Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link></p>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleLogin() {
    console.log('Логин:', email.value, password.value)
    // Тут можешь подключить свой API для логина
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
    margin-bottom: 16px;
}

button {
    padding: 10px 20px;
    width: 100%;
}
</style>
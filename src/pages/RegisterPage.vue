<template>
    <div class="auth-container">
        <h2>Регистрация</h2>
        <form @submit.prevent="handleRegister">
            <input v-model="name" type="text" placeholder="Имя" required />
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Пароль" required />
            <button type="submit">Зарегистрироваться</button>
        </form>
        <p>Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

function handleRegister() {
    console.log('Регистрация:', name.value, email.value, password.value)
    // тут надо API
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
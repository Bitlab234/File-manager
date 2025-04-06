<template>
    <header class="header">
        <div class="logo">
            <h1>BalaCloud</h1>
        </div>
        <nav class="navigation">
            <ul>
                <li><router-link to="/">Войти</router-link></li>
                <li><router-link to="/">Облачное хранилище</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: white;
}

.navigation ul {
    list-style: none;
    display: flex;
    gap: 15px;
}

.navigation a {
    color: white;
    text-decoration: none;
}

.navigation a:hover {
    text-decoration: underline;
}
</style>
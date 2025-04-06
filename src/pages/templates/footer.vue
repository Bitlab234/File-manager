<template>
    <footer class="footer">
        <div class="logo">
            <h1>BalaCloud</h1>
        </div>
        <nav class="navigation">
            <ul>
                <li><router-link to="/">Облачное хранилище</router-link></li>
            </ul>
        </nav>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<style scoped>
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: white;
    position: fixed;
    bottom: 0;
    left: 10px;
    right: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
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
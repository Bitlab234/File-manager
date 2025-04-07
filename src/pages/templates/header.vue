<template>
    <header class="header">
        <div class="logo">
            <h1>BalaCloud</h1>
        </div>
        <div class="search">
        <input
          type="text"
          v-model="query"
          placeholder="Поиск файлов..."
          @keyup.enter="searchFiles"
        />
        <button @click="searchFiles">Искать</button>
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

.left-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search {
  display: flex;
  align-items: center;
  gap: 5px;
}

.search input {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
}

.search button {
  padding: 5px 10px;
  background-color: #555;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.search button:hover {
  background-color: #777;
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
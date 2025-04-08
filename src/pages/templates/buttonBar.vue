<template>
    <div class="action-buttons">
        <img src="/src/assets/images/ico_upload.gif" alt="Upload" />
        <button>
            Загрузить файл
        </button>
        <img src="/src/assets/images/ico_plus.gif" alt="New Folder" />
        <button>
            Создать папку
        </button>
        <img src="/src/assets/images/ico_access.gif" alt="Access" />
        <button>
            Настроить доступ
        </button>
    </div>
</template>

<script>
export default {
    name: 'buttonBar',
}
</script>

<style>
.action-buttons {
    position: fixed;
    top: 110px !important;
    right: 0px;
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 10px;
    border-radius: 6px;
    z-index: 1000;
}

.action-buttons button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 10px;
    background-color: #333;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    white-space: nowrap;
}

.action-buttons button:hover {
    background-color: #555;
    color: white;
}

.action-buttons img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
}
</style>
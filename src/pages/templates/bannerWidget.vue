<template>
    <div class="banner-widget">
        <img src="/src/assets/images/Banner.jpg" alt="Баннер" />
    </div>
</template>

<script>
export default {
    name: 'BannerWidget',
}
</script>

<style scoped>
.banner-widget {
    position: fixed;
    top: 160px;
    right: 10px;
    width: 125px;
    z-index: 1000;
}

.banner-widget img {
    width: 100%;
    display: block;
}
</style>
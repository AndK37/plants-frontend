<script setup>
import IconFavorite from './icons/IconFavorite.vue';
</script>

<template>
    <div class="card">
        <div class="card-top">
            <img class="card-img" src="../assets/bg.jpg" alt="">
            <IconFavorite class="card-favorite" />
        </div>
        <div class="card-bot">
            <span class="card-title">Фикус</span>
            <span class="card-desc">Популярное комнатное растение с красивыми зелеными листьями.</span>
            <div class="card-rating-price">
                <span class="card-rating">⭐4.5</span>
                <span class="card-price">1200₽</span>
            </div>
            <span class="card-seller">Green Shop</span>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 255px;
    height: 376px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-img {
    width: 255px;
    height: 220px;
    border-radius: 10px;
    opacity: 0.9;
}

.card-img:hover {
    opacity: 1;
    transition: 0.1s;
}

.card-top {
    position: relative;
}

.card-favorite {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.card-bot {
    background: rgba(252, 250, 249, 0.25);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    width: 235px;
    height: 125px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 10px;
}

.card-title {
    color: var(--font-primary);
    font-size: 20px;
}

.card-desc {
    color: var(--font-secondary);
    font-size: 12px;
}

.card-rating {
    color: var(--rating);
    font-size: 24px;
}

.card-price {
    color: var(--font-primary);
    font-size: 24px;
}

.card-rating-price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.card-seller {
    color: var(--font-tetriary);
    font-size: 10px;
}
</style>
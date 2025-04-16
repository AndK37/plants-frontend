<script setup>
import CardItem from './CardItem.vue';
</script>

<template>
    <div class="hero-list">
        <span class="title">Рекомедуем</span>
        <div class="card-list">
            <CardItem id="a" />
            <CardItem id="b" />
            <CardItem id="c" />
            <CardItem id="d" />
        </div>

    </div>
</template>

<style scoped>
.hero-list {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    padding-right: 10px;
    gap: 20px;
}

.title {
    font-size: 48px;
    color: var(--font-primary);
}

.card-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

@media (max-width: 450px) {

}

@media (min-width: 768px) {
    .hero-list {
        width: 750px;
    }
}

@media (min-width: 992px) {
    .hero-list {
        width: 970px;
    }

}

@media (min-width: 1200px) {
    .hero-list {
        width: 1170px;
    }
}

@media (max-width: 520px) {
    #b {
        display: none;
    }
    .card-list {
        justify-content: center;
    }
}

@media (max-width: 992px) {
    #c {
        display: none;
    }
    .card-list {
        justify-content: space-evenly;
    }
}

@media (max-width: 1200px) {
    #d {
        display: none;
    }
}
</style>
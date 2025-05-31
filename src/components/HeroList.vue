<script setup>
import CardItem from './CardItem.vue';
import { onMounted, ref } from 'vue';

const plants = ref([])

onMounted(() => {
    fetch('http://127.0.0.1:8000/plants/')
        .then(res => res.json())
        .then(data => {
            plants.value = data;
        })
})

</script>

<template>
    <div class="hero-list">
        <span class="title">Рекомедуем</span>
        <div class="card-list" v-if="plants != 0">
            <CardItem class="a" :id="plants[0].id" :title="plants[0].name" :desc="plants[0].desc" :price="plants[0].price" :rating="plants[0].rating" :seller="plants[0].seller.login" image-url="http://127.0.0.1:8000/plants/1/image"/>
            <CardItem class="b" :id="plants[1].id" :title="plants[1].name" :desc="plants[1].desc" :price="plants[1].price" :rating="plants[1].rating" :seller="plants[1].seller.login" image-url="http://127.0.0.1:8000/plants/2/image"/>
            <CardItem class="c" :id="plants[2].id" :title="plants[2].name" :desc="plants[2].desc" :price="plants[2].price" :rating="plants[2].rating" :seller="plants[2].seller.login" image-url="http://127.0.0.1:8000/plants/3/image"/>
            <CardItem class="d" :id="plants[3].id" :title="plants[3].name" :desc="plants[3].desc" :price="plants[3].price" :rating="plants[3].rating" :seller="plants[3].seller.login" image-url="http://127.0.0.1:8000/plants/4/image"/>
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

@media (max-width: 450px) {}

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
    .b {
        display: none;
    }

    .card-list {
        justify-content: center;
    }
}

@media (max-width: 992px) {
    .c {
        display: none;
    }

    .card-list {
        justify-content: space-evenly;
    }
}

@media (max-width: 1200px) {
    .d {
        display: none;
    }
}
</style>
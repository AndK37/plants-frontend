<script setup>
import { useRouter } from 'vue-router';
import IconFavorite from './icons/IconFavorite.vue';
import { defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const isLogged = JSON.parse(localStorage.getItem('logged'))
const props = defineProps({
    id: Number,
    title: String,
    desc: String,
    price: Number,
    rating: Number,
    seller: String,
    imageUrl: String
})

const router = useRouter()

const onClickRedirect = () => {
    router.push(`/plant/${props.id}`)
}

const addFavorite = () => {
    fetch(`http://127.0.0.1:8000/favorites/?plant_id=${props.id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}
</script>

<template>
    <div class="card">
        <div class="card-top">
            <img @click="onClickRedirect" class="card-img" :src="imageUrl" alt="no img">
            <IconFavorite v-if="isLogged" @click="addFavorite" class="card-favorite" />
        </div>
        <div @click="onClickRedirect" class="card-bot">
            <span class="card-title">{{ title }}</span>
            <span class="card-desc">{{ desc }}</span>
            <div class="card-rating-price">
                <span v-if="rating" class="card-rating">⭐{{ rating }}</span>
                <span v-else class="card-rating">⭐-</span>
                <span class="card-price">{{ price }}₽</span>
            </div>
            <span class="card-seller">{{ seller }}</span>
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
    cursor: pointer;
}

.card-img {
    width: 255px;
    height: 220px;
    border-radius: 10px;
    opacity: 0.9;
    color: white;

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
    z-index: 100;
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
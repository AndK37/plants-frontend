<script setup>
import MyHeader from '@/components/MyHeader.vue';
import MyFooter from '@/components/MyFooter.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const isLogged = JSON.parse(localStorage.getItem('logged'))
const items = ref({})
const router = useRouter()

onMounted(() => {
    fetch(`http://127.0.0.1:8000/plants/seller/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(res => res.json())
        .then(data => {
            items.value = data;
        })
})
</script>

<template>
    <MyHeader />
    <img class="bg" src="../assets/bg.jpg" alt="">
    <div v-if="isLogged">
        <div class="pl" v-if="items != 0">
            <div style="display: flex; flex-direction: column;">
                <a v-for="item in items" :key="item.id" :id="item.id" @click="router.push(`/seller/${item.id}`)">{{
                    item.name }}</a>
            </div>
            <button @click="router.push('/seller/0')">Создать</button>
        </div>
    </div>
    <div v-else style="color: red;">
        Не авторизован
    </div>
    <MyFooter />
</template>

<style scoped>
a {
    color: var(--font-primary);
    cursor: pointer;
    font-size: 24px;
}

button {
    color: var(--font-primary);
    background-color: var(--primary);
    border: none;
    border-radius: 50px;
    width: fit-content;
    padding: 10px;

    font-size: 14px;
    cursor: pointer;
}

.pl {
    display: flex;
    flex-direction: column;
    height: 1000px;
    max-width: 1170px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 28px;
}

.bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1080px;
    object-fit: cover;
    z-index: -1;
}
</style>
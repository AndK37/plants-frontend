<script setup>
import IconSearch from './icons/IconSearch.vue';
import IconCart from './icons/IconCart.vue';
import IconFavorite from './icons/IconFavorite.vue';
import IconAccount from './icons/IconAccount.vue';
import { useRouter } from 'vue-router';
import ModalLogReg from './ModalLogReg.vue';
import { reactive, watch, ref } from 'vue';

const router = useRouter()
const isLogged = JSON.parse(localStorage.getItem('logged'))
const onClickRedirect = () => {
    router.push(`/all`)
}
const plants = ref({})
const search = ref('')
const open = ref(false)
watch(search, (newSearch, oldSearch) => {
    fetch(`http://127.0.0.1:8000/plants/search/?q=${newSearch}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            plants.value = data
            open.value = true
        })
})
</script>

<template>
    <div class="header">
        <span @click="onClickRedirect" class="title">Листопад</span>
        <div class="search">
            <input type="search" name="" id="" placeholder="Поиск" v-model="search">
            <IconSearch class="icon-search" />
            <Teleport to="body">
                <div v-if="open" @click="open = false" class="modal-bg"></div>
                <div v-if="open" class="modal">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <a style="color: var(--font-primary);" @click="router.push(`/plant/${plant.id}`)" v-for="plant in plants" :key="plant.id"
                            :id="plant.id">{{ plant.name }}</a>
                    </div>
                </div>
            </Teleport>
        </div>
        <div class="menu">
            <IconCart class="icon-cart" @click="router.push('/cart')" />
            <IconFavorite class="icon-favorite" @click="router.push('/favorite')" />
            <div v-if="isLogged">
                <IconAccount @click="router.push('/account')" />
            </div>
            <div v-else>
                <ModalLogReg />
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 52px;
    width: 100%;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    z-index: 900;
    gap: 10px;
}

.title {
    font-size: 24px;
    color: var(--font-primary);
    cursor: pointer;
}

.search {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 380px;
    width: 100%;
    height: 26px;
    position: relative;
}

.search input {
    max-width: 350px;
    width: 100%;
    height: 26px;
    border-radius: 50px;
    border: 0;
    background-color: var(--font-primary);

}

.menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 220px;
    width: 100%;
}

.icon-cart,
.icon-favorite,
.icon-account,
.icon-search {
    cursor: pointer;
}

.modal-bg {
    width: 100%;
    height: 100%;
    /* backdrop-filter: blur(10px); */
    z-index: 800;
    position: fixed;
    top: 0;
    left: 0;
}

.modal {
    background: rgba(252, 250, 249, 0.25);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    position: absolute;
    z-index: 999;
    top: 60px;
    left: 50%;
    width: 300px;
    margin-left: -150px;
    padding: 10px;
}

@media (max-width: 450px) {
    .header {
        display: grid;
        grid-template-rows: 39px 39px;
        grid-template-columns: 1fr 1fr;
        height: 65px;
    }

    .title {
        grid-row: 1 / 2;
        grid-column: 1 / 2;
    }

    .search {
        grid-row: 2 / 3;
        grid-column: 1 / 3;
        min-width: 100%;
    }

    .search input {
        max-width: 420px;
    }

    .menu {
        grid-row: 1 / 2;
        grid-column: 2 / 3;
    }

    .modal {
        top: 100px;
    }
}

@media (min-width: 768px) {
    .header {
        width: 750px;
    }

}

@media (min-width: 992px) {
    .header {
        width: 970px;
    }
}

@media (min-width: 1200px) {
    .header {
        width: 1170px;
    }
}
</style>
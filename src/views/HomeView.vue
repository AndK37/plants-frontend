<script setup>
import MyHeader from '@/components/MyHeader.vue';
import MyFooter from '@/components/MyFooter.vue';
import MyHero from '@/components/MyHero.vue';
import HeroList from '@/components/HeroList.vue';
import CardList from '@/components/CardList.vue';
import MyPromo from '@/components/MyPromo.vue';
import MyPagination from '@/components/MyPagination.vue';
import MyNav from '@/components/MyNav.vue';

import { ref, watch, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const plants = ref([])
onMounted(() => {
    store.state.page = 1
    store.state.category = useRoute().params.category
    fetch('http://127.0.0.1:8000/plants/')
        .then(res => res.json())
        .then(data => {
            plants.value = data;
            store.state.contentLength = plants.value.length
        })
})

const ctg = computed(() => {
    return store.state.category
})

watch(ctg, () => {
    store.state.page = 1
    let url = ''
    switch (store.state.category) {
        case 'all':
            url = 'http://127.0.0.1:8000/plants/'
            break;
        case 'vegetables':
            url = 'http://127.0.0.1:8000/plants/?category=1'
            break;
        case 'fruits':
            url = 'http://127.0.0.1:8000/plants/?category=2'
            break;
        case 'flowers':
            url = 'http://127.0.0.1:8000/plants/?category=3'
            break;
        default:
            console.log('cardlist err')
            break;
    }
    fetch(url)
        .then(res => res.json())
        .then(data => {
            plants.value = data;
            store.state.contentLength = plants.value.length
        })
})
</script>

<template>
  <MyHeader />
  <img class="bg" src="../assets/bg.jpg" alt="">
  <MyHero />
  <HeroList />
  <MyNav class="nav" />
  <CardList class="card-list" :plants="plants" :page-items="6" />
  <MyPagination class="pagination" :page-items="6"/>
  <MyPromo class="promo" />
  <MyFooter />
</template>

<style scoped>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1080px;
  object-fit: cover;
  z-index: -1;
}
.card-list {
  margin-top: 25px;
}
.promo {
  margin-top: 20px;
}
.pagination {
  margin-top: 20px;
}
.nav {
  margin-top: 100px;
}
</style>
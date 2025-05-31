<script setup>
import MyHeader from '@/components/MyHeader.vue';
import MyFooter from '@/components/MyFooter.vue';
import { useStore } from 'vuex';
import { onMounted, ref } from 'vue';
import CardList from '@/components/CardList.vue';
import MyPagination from '@/components/MyPagination.vue';

const store = useStore()
const plants = ref([])
const isLogged = JSON.parse(localStorage.getItem('logged'))

onMounted(() => {
  store.state.page = 1
  fetch(`http://127.0.0.1:8000/favorites/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      plants.value = data;
      store.state.contentLength = plants.value.length;
    })
})
</script>

<template>
  <MyHeader />
  <div v-if="isLogged && plants[0] != 0">
    <CardList :plants="plants" :page-items="9" />
    <MyPagination v-if="plants != 0" :page-items="9"/>
  </div>
  <div v-else style="color: red;">
    Не авторизован
  </div>
  <MyFooter />
</template>

<style scoped></style>
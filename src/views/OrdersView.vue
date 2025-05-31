<script setup>
import MyHeader from '@/components/MyHeader.vue';
import MyFooter from '@/components/MyFooter.vue';
import { onMounted, ref } from 'vue';

const isLogged = JSON.parse(localStorage.getItem('logged'))
const items = ref({})

onMounted(() => {
  fetch(`http://127.0.0.1:8000/orders/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      items.value = data;
    })
})
</script>

<template>
  <MyHeader />
  <div v-if="isLogged">
    <div class="order-wrapper">
      <div class="order-item" v-for="item in items" :key="item.id" :id="item.id">
        <div>
          <span class="item-title">{{ item.plant.name }}</span>
          <span>{{ item.amount }} шт.</span>
        </div>
        <div style="display: flex; flex-direction: row; gap: 5px;">
          <div style="display: flex; flex-direction: column;">
            <span>Итоговая цена: {{ item.plant.price * item.amount }} ₽</span>
            <span class="item-price">Цена за единицу: {{ item.plant.price }} ₽</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else style="color: red;">
    Не авторизован
  </div>
  <MyFooter />
</template>

<style scoped>
.order-wrapper {
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
}

.order-item {
  background: rgba(252, 250, 249, 0.25);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  padding: 10px;

  margin-top: 15px;

  color: var(--font-primary);
  display: flex;
  justify-content: space-between;
}

.item-title {
  font-size: 24px;
  margin-right: 10px;
}

.item-price {
  color: var(--font-secondary);
  font-size: 12px;
}

.button {
  color: var(--font-primary);
  background-color: var(--primary);
  border: none;
  border-radius: 50px;
  width: fit-content;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
}

.final-price {
  color: var(--font-primary);
  font-size: 36px;
  display: flex;
  justify-content: flex-end;
  align-items: end;
  flex-direction: column;
  border-top: var(--primary) solid 3px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
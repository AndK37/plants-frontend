<script setup>
import MyHeader from '@/components/MyHeader.vue';
import MyFooter from '@/components/MyFooter.vue';
import { useStore } from 'vuex';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore()
const items = ref([])
const isLogged = JSON.parse(localStorage.getItem('logged'))
const router = useRouter()

onMounted(() => {
  store.state.page = 1
  fetch(`http://127.0.0.1:8000/carts/`, {
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
const finalPrice = computed(() => {
  let fp = 0
  if (items == 0) {
    return 0
  }
  items.value.forEach(item => {
    fp += item.plant.price * item.amount
  });
  return fp
})

const removeFromCart = (plant_id) => {
  fetch(`http://127.0.0.1:8000/carts/?plant_id=${plant_id}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }

  ).then(res => res.json())
    .then(() => {
      items.value.forEach(item => {
        if (item.plant.id == plant_id) {
          items.value.splice(items.value.indexOf(item), 1)
        }
      });
    })
}
const order = () => {
  fetch(`http://127.0.0.1:8000/orders/cart`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      router.push('/orders')
    })
}
</script>

<template>
  <MyHeader />
  <div class="cart-wrapper" v-if="isLogged && item != 0">
    <a href="/orders" style="color: var(--primary); ">Перейти к заказам</a>
    <div class="cart-item" v-for="item in items" :key="item.id" :id="item.id">
      <div>
        <span class="item-title">{{ item.plant.name }}</span>
        <span>{{ item.amount }} шт.</span>
      </div>
      <div style="display: flex; flex-direction: row; gap: 5px;">
        <div style="display: flex; flex-direction: column;">
          <span>Итоговая цена: {{ item.plant.price * item.amount }} ₽</span>
          <span class="item-price">Цена за единицу: {{ item.plant.price }} ₽</span>
        </div>
        <button @click="removeFromCart(item.plant.id)" class="button">Убрать</button>
      </div>
    </div>
    <div v-if="items != 0" class="final-price">
      <span>Итоговая цена: {{ finalPrice }}</span>
      <button @click="order" class="button" style="font-size: 24px;">Заказать</button>
    </div>
  </div>
  <div v-else style="color: red;">
    Не авторизован
  </div>
  <MyFooter />
</template>

<style scoped>
.cart-wrapper {
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
}

.cart-item {
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
<script setup>
import { onMounted, reactive, ref, defineProps } from 'vue';

const props = defineProps({
    plant_id: Number,
})
const plant = ref({});
const quantity = ref(1);
const cart = ref([])
const inCart = ref(false)
const isLogged = JSON.parse(localStorage.getItem('logged'))

onMounted(() => {
    fetch(`http://127.0.0.1:8000/plants/${props.plant_id}`)
        .then(res => res.json())
        .then(data => {
            plant.value = data;
        })
    if (isLogged) {
        fetch(`http://127.0.0.1:8000/carts/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                cart.value = data;
                cart.value.forEach(cartItem => {
                    if (cartItem.plant.id == props.plant_id) {
                        inCart.value = true
                        quantity.value = cartItem.amount
                    }
                })
            })
    }
})
const incQuantity = () => {
    quantity.value += 1
}
const decQuantity = () => {
    if (quantity.value != 1) {
        quantity.value -= 1
    }
}
const addToCart = () => {
    inCart.value = true
    fetch(`http://127.0.0.1:8000/carts/?plant_id=${props.plant_id}&amount=${quantity.value}`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        }
    ).then(res => res.json())
        .then(data => {
            inCart.value = true
        })
}
const removeFromCart = () => {
    fetch(`http://127.0.0.1:8000/carts/?plant_id=${props.plant_id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        }
    ).then(res => res.json())
        .then(data => {
            inCart.value = false
            quantity.value = 1
        })
}
</script>
<template>
    <div class="order">
        <div class="seller">
            <span>Продавец</span>
            <span v-if="plant.seller">{{ plant.seller.login }}</span>
        </div>
        <div class="price">
            <div v-if="isLogged" class="quantity-container">
                <button v-if="!inCart" @click="decQuantity" class="minus">-</button>
                <div class="quantity">
                    <span>{{ quantity }}</span>
                </div>
                <button v-if="!inCart" @click="incQuantity" class="plus">+</button>
            </div>
            <div class="final-price">
                <span>{{ plant.price * quantity }} ₽</span>
            </div>
        </div>
        <div v-if="isLogged">
            <button v-if="!inCart" @click="addToCart" class="button" style="align-self: center;">В корзину</button>
            <button v-else @click="removeFromCart" class="button" style="align-self: center;">Убрать из корзины</button>
        </div>
    </div>
</template>
<style scoped>
.order {
    grid-area: order;
    background: rgba(252, 250, 249, 0.25);
    backdrop-filter: blur(10px);
    max-width: 300px;
    max-height: 150px;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.seller {
    display: flex;
    justify-content: space-between;
    color: var(--font-primary);
    font-size: 12px;
}

.price {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.quantity-container {
    display: flex;
}

.minus {
    border: none;
    border-right: var(--primary) solid 2px;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    padding: 5px;
    width: 25px;
    background-color: var(--font-primary);
    cursor: pointer;
}

.plus {
    border: none;
    border-left: var(--primary) solid 2px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    padding: 5px;
    width: 25px;
    background-color: var(--font-primary);
    cursor: pointer;
}

.quantity {
    display: flex;
    width: 50px;
    background-color: var(--font-primary);
    align-items: center;
    justify-content: center;
}

.final-price {
    color: var(--font-primary);
    font-size: 24px;
}

.button {
    color: var(--font-primary);
    background-color: var(--primary);
    border: none;
    border-radius: 50px;
    width: fit-content;
    padding: 10px;
    align-self: flex-end;
    font-size: 14px;
    cursor: pointer;
}
</style>
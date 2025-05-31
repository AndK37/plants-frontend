<script setup>
import MyHeader from '@/components/MyHeader.vue';
import MyFooter from '@/components/MyFooter.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const isLogged = JSON.parse(localStorage.getItem('logged'))
const plant = ref({})
const router = useRouter()
const plant_id = Number(useRoute().params.plant_id);
var plant_data = reactive({
    name: '',
    desc: '',
    price: 0,
    packing: 0,
    category: 0,
    seller: 0
})

onMounted(() => {
    if (plant_id != 0) {
        fetch(`http://127.0.0.1:8000/plants/seller/${plant_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                plant.value = data;
                plant_data = {
                    name: plant.value.name,
                    desc: plant.value.desc,
                    price: plant.value.price,
                    packing: plant.value.packing,
                    category: plant.value.category.id,
                    seller: plant.value.seller.id
                }
            })
    }
})

const update_plant = () => {
    fetch(`http://127.0.0.1:8000/plants/seller/${plant_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(plant_data)
    })
        .then(res => res.json())
        .then(data => {

        })
}

const create_plant = () => {
    fetch(`http://127.0.0.1:8000/plants/seller/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(plant_data)
    })
        .then(res => res.json())
        .then(data => {

        })
}
const delete_plant = () => {
    fetch(`http://127.0.0.1:8000/plants/seller/${plant_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
    })
        .then(res => res.json())
        .then(data => {

        })
}

const fileInput = ref(null)
const upload_image = () => {
    const formData = new FormData()
    formData.append('file', fileInput.value.files[0], 'wawa')
    fetch(`http://127.0.0.1:8000/plants/${plant_id}/image`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        method: 'PUT',
        body: formData
    })
}
</script>

<template>
    <MyHeader />
    <img class="bg" src="../assets/bg.jpg" alt="">
    <div class="sp" v-if="isLogged">
        <div v-if="plant_id == 0">
            <div style="display: flex; flex-direction: column;">
                <div>
                    <label for="plant_name">Название: </label>
                    <input id="plant_name" type="text" v-model="plant_data.name">
                </div>
                <div>
                    <label for="plant_desc">Описание: </label>
                    <input id="plant_desc" type="text" v-model="plant_data.desc">
                </div>
                <div>
                    <label for="plant_price">Цена: </label>
                    <input id="plant_price" type="number" v-model="plant_data.price">
                </div>
                <div>
                    <label for="plant_packing">В упаковке: </label>
                    <input id="plant_packing" type="number" v-model="plant_data.packing">
                </div>
                <div>
                    <label for="plant_category">Категория: </label>
                    <input id="plant_category" type="number" v-model="plant_data.category">
                </div>
                <button @click="create_plant">Создать</button>
            </div>
        </div>
        <div v-else-if="plant.category != undefined">
            <div style="display: flex; flex-direction: column;">
                <div>
                    <label for="plant_name">Название: </label>
                    <input id="plant_name" type="text" v-model="plant_data.name" value={{plant.name}}>
                </div>
                <div>
                    <label for="plant_desc">Описание: </label>
                    <input id="plant_desc" type="text" v-model="plant_data.desc" value={{plant.desc}}>
                </div>
                <div>
                    <label for="plant_price">Цена: </label>
                    <input id="plant_price" type="number" v-model="plant_data.price" value={{plant.price}}>
                </div>
                <div>
                    <label for="plant_packing">В упаковке: </label>
                    <input id="plant_packing" type="number" v-model="plant_data.packing" value={{plant.packing}}>
                </div>
                <div>
                    <label for="plant_category">Категория: </label>
                    <input id="plant_category" type="number" v-model="plant_data.category" value={{plant.category.id}}>
                </div>
                <div>
                    <label for="plant_image">Изображение: </label>
                    <input ref="fileInput" id="plant_image" type="file" accept=".jpeg, .png" v-on:change="upload_image">
                </div>
                <button @click="update_plant">Изменить</button>
                <button @click="delete_plant">Удалить</button>
            </div>
        </div>
    </div>
    <div v-else style="color: red;">
        Не авторизован
    </div>
    <MyFooter />
</template>

<style scoped>
label {
    color: var(--font-primary);
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

input {
    font-size: 24px;
    border-radius: 50px;
}
.sp {
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
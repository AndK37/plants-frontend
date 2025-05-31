<script setup>
import MyHeader from '@/components/MyHeader.vue';
import MyFooter from '@/components/MyFooter.vue';
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';


const isLogged = JSON.parse(localStorage.getItem('logged'))
const roleId = JSON.parse(localStorage.getItem('roleId'))
const router = useRouter()
const user_data = ref({})
const redact_data = reactive({
    surname: user_data.surname,
    name: user_data.name,
    password: undefined
})

const redact_toggle = ref(false)

onMounted(() => {
    fetch(`http://127.0.0.1:8000/users/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(res => res.json())
        .then(data => {
            user_data.value = data;
        })
})
const redact = () => {
    fetch(`http://127.0.0.1:8000/users/`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(redact_data)
    })
        .then(res => res.json())
        .then(data => {
            user_data.value = data;
        })
}
const logout = () => {
    localStorage.setItem('logged', false)
    localStorage.setItem('jwt', '')
    router.go('/all')
}
const delete_account = () => {
    fetch(`http://127.0.0.1:8000/users/`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
    })
        .then(res => res.json())
        .then(data => {
            router.push('/')
        })
}
</script>

<template>
    <MyHeader />
    <img class="bg" src="../assets/bg.jpg" alt="">
    <div class="acc" v-if="isLogged && user_data">
        <div v-if="redact_toggle">
            <button @click="redact_toggle = !redact_toggle">Не редактировать</button>
        </div>
        <div v-else>
            <button @click="redact_toggle = !redact_toggle">Редактировать</button>
        </div>
        <div class="account-c" v-if="redact_toggle == false && user_data != 0">
            <span>Фамилия: {{ user_data.surname }}</span>
            <span>Имя: {{ user_data.name }}</span>
            <span>Логин: {{ user_data.login }}</span>
            <button @click="logout">Выйти из аккаунта</button>
            <button v-if="roleId == 4" @click="router.push('/seller')">Перейти к растениям</button>
        </div>
        <div v-else>
            <div style="display: flex; flex-direction: column;">
                <label for="rsurname">Фамилия: </label>
                <input v-model="redact_data.surname" id="rsurname" type="text">
                <label for="rname">Имя: </label>
                <input v-model="redact_data.name" id="rname" type="text">
                <label for="rpassword">Пароль: </label>
                <input v-model="redact_data.password" id="rpassword" type="password">
                <div> <button @click="redact">Изменить</button>
                    <button @click="delete_account">Удалить аккаунт</button>
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
span,
label {
    color: var(--font-primary);
    font-size: 24px;
}

.account-c {
    display: flex;
    flex-direction: column;
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

.acc {
    display: flex;
    flex-direction: column;
    height: 1000px;
    max-width: 1170px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 28px;
}
</style>
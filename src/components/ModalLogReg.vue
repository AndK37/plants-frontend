<script setup>
import { ref, reactive } from 'vue'
import IconAccount from './icons/IconAccount.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const open = ref(false)
const is_login = ref(true)
const login_data = reactive({
    surname: '',
    name: '',
    email: '',
    login: '',
    password: '',
    role_id: 4
})
const reg_data = reactive({
    login: '',
    password: ''
})

const login = () => {
    fetch('http://127.0.0.1:8000/users/login/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(login_data)
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('logged', true)
            localStorage.setItem('jwt', data.token)
            fetchId()
            
        })
}
const fetchId = () => {
    fetch('http://127.0.0.1:8000/users/', {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('loginId', data.id)
            localStorage.setItem('roleId', data.role.id)
            router.go(0)
        })
}
const reg = () => {
    fetch('http://127.0.0.1:8000/users/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(reg_data)
    })
        .then(res => res.json())
        .then(data => {
            router.go(0)
        })

}


</script>

<template>
    <IconAccount @click="open = true" style="cursor: pointer;" />
    <Teleport to="body">
        <div v-if="open" @click="open = false" class="modal-bg"></div>
        <div v-if="open" class="modal">

            <div v-if="is_login" class="login">
                <form class="login-form" method="post" action="">
                    <label style="grid-area: login_l;" for="login">Логин:</label>
                    <input v-model="login_data.login" style="grid-area: login_i;" type="text" name="" id="login">
                    <label style="grid-area: pass_l;" for="pass">Пароль:</label>
                    <input v-model="login_data.password" style="grid-area: pass_i;" type="password" name="" id="pass">
                    <button class="submit" style="grid-area: button;" @click="() => {
                        login()
                        open = false
                    }">Войти</button>
                </form>
                <button class="close" @click="open = false">X</button>
            </div>
            <div v-else class="reg">
                <form class="reg-form" action="">
                    <label style="grid-area: surname_l;" for="surname">Фамилия:</label>
                    <input style="grid-area: surname_i;" type="text" name="" id="surname" v-model="reg_data.surname">
                    <label style="grid-area: name_l;" for="name">Имя:</label>
                    <input style="grid-area: name_i;" type="text" name="" id="name" v-model="reg_data.name">
                    <label style="grid-area: email_l;" for="email">Почта:</label>
                    <input style="grid-area: email_i;" type="email" name="" id="email" v-model="reg_data.email">
                    <label style="grid-area: login_l;" for="login">Логин:</label>
                    <input style="grid-area: login_i;" type="text" name="" id="login" v-model="reg_data.login">
                    <label style="grid-area: pass_l;" for="pass">Пароль:</label>
                    <input style="grid-area: pass_i;" type="password" name="" id="pass" v-model="reg_data.password">
                    <fieldset style="grid-area: role;">
                        <div>
                            <label for="customer">Покупатель</label>
                            <input type="radio" name="role" id="customer" checked value=4 v-model="reg_data.role_id">
                        </div>
                        <div>
                            <label for="seller">Продавец</label>
                            <input type="radio" name="role" id="seller" value=3 v-model="reg_data.role_id">
                        </div>
                    </fieldset>
                    <button class="submit" style="grid-area: button;"
                        @click="() => { reg(); open = false }">Регистрация</button>
                </form>
                <button class="close" @click="open = false">X</button>
            </div>
            <div v-if="is_login">
                <button style="position: fixed; top: -30px; left: 100px;" class="submit" @click="is_login = !is_login">Регистрация</button>
            </div>
            <div v-else>
                <button style="position: fixed; top: -30px; left: 120px;" class="submit" @click="is_login = !is_login">Вход</button>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal {
    background: rgba(252, 250, 249, 0.25);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    position: fixed;
    z-index: 999;
    top: 10%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
}

.modal-bg {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    z-index: 800;
    position: fixed;
    top: 0;
    left: 0;
}

.login-form {
    position: relative;
    padding: 30px;
    display: grid;
    gap: 10px;
    grid-template-areas:
        'login_l login_i'
        'pass_l pass_i'
        'button button';
}

.reg-form {
    position: relative;
    padding: 30px;
    display: grid;
    gap: 10px;
    grid-template-areas:
        'surname_l surname_i'
        'name_l name_i'
        'email_l email_i'
        'login_l login_i'
        'pass_l pass_i'
        'role role'
        'button button';
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    color: var(--font-primary);
    font-weight: bold;
    cursor: pointer;
}

.submit {
    background-color: var(--primary);
    border: none;
    color: var(--font-primary);
    border-radius: 50px;
    padding: 5px;
    font-weight: bold;
}

input {
    border-radius: 10px;
}

input[type="radio"] {
    accent-color: var(--primary);
}

label {
    color: var(--font-primary);
    font-size: 20px;
}
</style>
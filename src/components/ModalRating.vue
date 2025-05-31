<script setup>
import { ref, reactive } from 'vue'
import IconAccount from './icons/IconAccount.vue';
import { useRouter } from 'vue-router';

const open = ref(false)
const props = defineProps({
    plant_id: Number
})
const rate_data = reactive({
    plant_id: props.plant_id,
    rating: 0
})
const rate = () => {
    fetch(`http://127.0.0.1:8000/plants/ratings/?plant_id=${rate_data.plant_id}&rating=${rate_data.rating}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(res => res.json())
        .then(data => {

        })

}
</script>

<template>
    <span @click="open = true" style="cursor: pointer;">⭐</span>
    <Teleport to="body">
        <div v-if="open" @click="open = false" class="modal-bg"></div>
        <div v-if="open" class="modal">
            <div class="rating">
                <div>
                    <label for="r5">5⭐</label>
                    <input type="radio" name="r" id="r5" value=5 v-model="rate_data.rating">
                </div>
                <div>
                    <label for="r4">4⭐</label>
                    <input type="radio" name="r" id="r4" value=4  v-model="rate_data.rating">
                </div>
                <div>
                    <label for="r3">3⭐</label>
                    <input type="radio" name="r" id="r3" value=3  v-model="rate_data.rating">
                </div>
                <div>
                    <label for="r2">2⭐</label>
                    <input type="radio" name="r" id="r2" value=2  v-model="rate_data.rating">
                </div>
                <div>
                    <label for="r1">1⭐</label>
                    <input type="radio" name="r" id="r1" value=1  v-model="rate_data.rating">
                </div>
                <div>
                    <label for="r">0⭐</label>
                    <input type="radio" name="r" id="r0" checked value=0  v-model="rate_data.rating">
                </div>
                <button @click="rate">Сохранить</button>
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

.rating {
    display: flex;
    flex-direction: column;
    padding: 10px;
}
</style>
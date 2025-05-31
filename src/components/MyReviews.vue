<script setup>
import { onMounted, defineProps, reactive, ref } from 'vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import { useRouter } from 'vue-router'


const props = defineProps({
    plant_id: Number,
})
const isLogged = JSON.parse(localStorage.getItem('logged'))
const router = useRouter()
const reviews = ref([])
const logId = ref(0)


const reviewRequest = reactive({
    'plant_id': props.plant_id,
    'review': ''
})

onMounted(() => {
    fetch(`http://127.0.0.1:8000/reviews/?id=${props.plant_id}`)
        .then(res => res.json())
        .then(data => {
            reviews.value = data;
        })
    if (isLogged) {
        logId.value = JSON.parse(localStorage.getItem('loginId'))
    }
})
const addReview = () => {
    if (reviewRequest.review == '') {
        return
    }
    fetch('http://127.0.0.1:8000/reviews/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(reviewRequest)
    }).then(res => res.json())
        .then(data => {
            reviews.value.push(data)
            reviewRequest.review = ''
        })
}
const like = (review_id) => {
    fetch(`http://127.0.0.1:8000/reviews/like/?id=${review_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(reviewRequest)
    })
        .then(res => res.json())
        .then(data => {

        })
}
const delete_review = (review_id) => {
    fetch(`http://127.0.0.1:8000/reviews/?id=${review_id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
    })
        .then(res => res.json())
        .then(data => {

        })
}
</script>
<template>
    <div class="review-container">
        <span style="color: var(--font-primary); font-size: 26px; margin-top: 10px;">Отзывы</span>
        <div v-if="isLogged" style="display: flex; flex-direction: column;">
            <textarea v-model="reviewRequest.review" name="" id=""></textarea>
            <button @click="addReview" class="button">Отправить</button>
        </div>
        <div class="review-list">
            <div class="review" v-for="review in reviews" :key="review.id" :id="review.id">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>{{ review.user.surname }} {{ review.user.name }}</span>
                    <span style="display: flex; align-items: center;">{{ review.upvotes }}
                        <IconFavorite @click="like(review.id)" />
                        <div v-if="review.user.id == logId">
                            <button style="border: none; background-color: transparent; color: var(--font-primary);" @click="delete_review(review.id)">X</button>
                        </div>
                    </span>
                </div>

                <p style="font-size: 24px; text-wrap: wrap; word-wrap: break-word;">{{ review.review }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.review-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    top: 1080px;
    padding-top: 10px;
    width: 100%;
    max-width: 895px;
}

.review {
    background: rgba(252, 250, 249, 0.25);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    margin-top: 10px;
    padding: 10px;
    color: var(--font-primary);
    display: flex;
    flex-direction: column;
}

textarea {
    resize: none;
    max-width: 900px;
    height: 66px;
    background-color: rgba(252, 250, 249, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 10px;

}

textarea:focus {
    background: rgba(252, 250, 249, 1);
    backdrop-filter: blur(10px);
    outline: var(--font-primary) solid 1px;
    border: var(--primary) solid 2px;
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
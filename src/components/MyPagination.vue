<script setup>
import { useStore } from 'vuex';

const store = useStore()
const props = defineProps({
    pageItems: Number,
})
const nextPage = () => {
    store.state.page += 1;
}

const prevPage = () => {
    store.state.page -= 1;
}
</script>

<template>
    <div class="pagination">
        <button @click="prevPage" v-bind:class="{disable: store.state.page == 1}"><- Назад</button>
        <span>{{ store.state.page }}</span>
        <button @click="nextPage" v-bind:class="{disable: (store.state.page >= (Math.ceil(store.state.contentLength / props.pageItems))) }">Вперед -></button>
    </div>
</template>
<style scoped>
button, span {
    color: var(--font-primary);
    background-color: rgba(196, 196,196, 0.25);
    font-size: 16px;
    border-radius: 50px;
    border: none;
    padding: 10px;
}
button {
    cursor: pointer;
}
.disable {
    pointer-events: none;
    opacity: 50%;
}
.pagination {
    display: flex;
    justify-content: space-between;
    max-width: 270px;
    margin-left: auto;
    margin-right: auto;
}
</style>
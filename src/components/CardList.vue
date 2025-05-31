<script setup>
import { useStore } from 'vuex';
import CardItem from './CardItem.vue';
import { computed } from 'vue';

const store = useStore()
const props = defineProps({
    plants: Array,
    pageItems: Number,
})

const page = computed(() => {
    return props.pageItems * (store.state.page - 1)
})

</script>

<template>
    <div class="card-list" v-if="props.plants != 0">
        <CardItem v-for="plant in props.plants.slice(0 + page, props.pageItems + page)" :key="plant.id" :id="plant.id" :title="plant.name"
            :desc="plant.desc" :price="plant.price" :rating="plant.rating" :seller="plant.seller.login"
            :image-url="`http://127.0.0.1:8000/plants/${plant.id}/image`" />
    </div>
</template>

<style scoped>
.card-list {
    display: flex;
    max-width: 920px;
    width: fit-content;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 26px;
    margin-left: auto;
    margin-right: auto;

}
</style>
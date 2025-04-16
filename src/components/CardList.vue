<script setup>
import CardItem from './CardItem.vue';
</script>

<template>
<div class="card-list">
    <CardItem />
    <CardItem />
    <CardItem />
    <CardItem />
    <CardItem />
    <CardItem />
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
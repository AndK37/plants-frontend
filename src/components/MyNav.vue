<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const route = useRoute()

watch(route, () => {
    store.state.category = route.params.category
})

</script>

<template>
    <div class="nav">
        <RouterLink to="all">Все</RouterLink>
        <RouterLink to="vegetables">Овощи</RouterLink>
        <RouterLink to="fruits">Фрукты</RouterLink>
        <RouterLink to="flowers">Цветы</RouterLink>
    </div>
</template>

<style scoped>
a {
    padding: 5px 20px;
    background: transparent;
    border-radius: 50px;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: var(--font-primary);
    text-decoration: none;
    border: 2px solid var(--primary);
}

a.router-link-exact-active {
    padding: px 20px;

    background: var(--primary);
    border-radius: 50px;

    font-weight: 500;
    font-size: 20px;
    line-height: 23px;

    color: var(--font-primary);
    text-decoration: none;
}
.nav {
    display: flex;
    gap: 10px;
    padding-left: 10px;
    padding-right: 10px;
    overflow-x: scroll;
    max-width: 920px;
    margin-left: auto;
    margin-right: auto;
}
</style>
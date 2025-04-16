<script setup>
import IconSearch from './icons/IconSearch.vue';
import IconCart from './icons/IconCart.vue';
import IconFavorite from './icons/IconFavorite.vue';
import IconAccount from './icons/IconAccount.vue';
</script>

<template>
    <div class="header">
        <span class="title">Листопад</span>
        <div class="search">
            <input type="search" name="" id="" placeholder="Поиск">
            <IconSearch class="icon-search" />
        </div>
        <div class="menu">
            <IconCart class="icon-cart" />
            <IconFavorite class="icon-favorite" />
            <IconAccount class="icon-account" />
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 52px;
    width: 100%;
    align-items: center;
    margin-left: auto;
    margin-right: auto;

    gap: 10px;
}

.title {
    font-size: 24px;
    color: var(--font-primary);
}

.search {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 380px;
    width: 100%;
    height: 26px;
}

.search input {
    max-width: 350px;
    width: 100%;
    height: 26px;
    border-radius: 50px;
    border: 0;
    background-color: var(--font-primary);
}

.menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 220px;
    width: 100%;
}

.icon-cart,
.icon-favorite,
.icon-account,
.icon-search {
    cursor: pointer;
}

@media (max-width: 450px) {
    .header {
        display: grid;
        grid-template-rows: 39px 39px;
        grid-template-columns: 1fr 1fr;
        height: 65px;
    }

    .title {
        grid-row: 1 / 2;
        grid-column: 1 / 2;
    }

    .search {
        grid-row: 2 / 3;
        grid-column: 1 / 3;
        min-width: 100%;
    }

    .search input {
        max-width: 420px;
    }

    .menu {
        grid-row: 1 / 2;
        grid-column: 2 / 3;
    }
}

@media (min-width: 768px) {
    .header {
        width: 750px;
    }

}

@media (min-width: 992px) {
    .header {
        width: 970px;
    }
}

@media (min-width: 1200px) {
    .header {
        width: 1170px;
    }
}
</style>
<script setup>
import MyHeader from '@/components/MyHeader.vue';
import MyFooter from '@/components/MyFooter.vue';
import MyHero from '@/components/MyHero.vue';
import HeroList from '@/components/HeroList.vue';
import CardList from '@/components/CardList.vue';
import MyPromo from '@/components/MyPromo.vue';
import MyPagination from '@/components/MyPagination.vue';
import MyNav from '@/components/MyNav.vue';
</script>

<template>
  <MyHeader />
  <img class="bg" src="../assets/bg.jpg" alt="">
  <MyHero />
  <HeroList />
  <MyNav class="nav" />
  <CardList class="card-list" />
  <MyPagination class="pagination"/>
  <MyPromo class="promo" />
  <MyFooter />
</template>

<style scoped>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1080px;
  object-fit: cover;
  z-index: -1;
}
.card-list {
  margin-top: 25px;
}
.promo {
  margin-top: 20px;
}
.pagination {
  margin-top: 20px;
}
.nav {
  margin-top: 100px;
}
</style>
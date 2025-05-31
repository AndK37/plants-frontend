<script setup>
import MyHeader from '@/components/MyHeader.vue';
import MyFooter from '@/components/MyFooter.vue';
import IconFavorite from '@/components/icons/IconFavorite.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import MyReviews from '@/components/MyReviews.vue';
import MyOrder from '@/components/MyOrder.vue';
import ModalRating from '@/components/ModalRating.vue';

const plant_id = Number(useRoute().params.plant_id);
const plant = ref({});

onMounted(() => {
    fetch(`http://127.0.0.1:8000/plants/${plant_id}`)
        .then(res => res.json())
        .then(data => {
            plant.value = data;
        })
})

</script>

<template>
  <MyHeader />
  <img class="bg" src="../assets/bg.jpg" alt="">
  <div class="container" v-if="plant != 0">
    <div class="top">
      <span>{{ plant.name }} <span style="color: var(--rating);"><ModalRating :plant_id="plant_id"/>{{ plant.rating }}</span> </span>
      <IconFavorite />
    </div>

    <img class="img" :src="`http://127.0.0.1:8000/plants/${plant.id}/image`" alt="no img">

    <div class="dr-c">
      <div class="desc-container">
        <span style="color: var(--font-primary); font-size: 26px; margin-top: 10px;">Описание</span>
        <span class="desc">{{ plant.desc }}</span>
      </div>
    </div>

    <MyReviews :plant_id="plant_id"/>
    <MyOrder :plant_id="plant_id"/>

  </div>
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

.container {
  max-width: 900px;
  height: 1008px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;

  display: grid;
  grid-template-rows: 52px 1fr 1fr;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    'title title'
    'image order'
    'info order';
  gap: 30px;
}

.top {
  grid-area: title;
  display: flex;
  justify-content: space-between;
}

.top span {
  font-size: 36px;
  color: var(--font-primary);
}

.dr-c {
  grid-area: info;
  display: flex;
  flex-direction: column;
}

.info {
  display: flex;
  flex-direction: column;
}

.img {
  border-radius: 10px;
  width: auto;
  max-height: 325px;
  align-self: center;
  grid-area: image;
}

.desc-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.desc {
  background: rgba(252, 250, 249, 0.25);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  padding: 15px;

  color: var(--font-primary);
  font-size: 20px;

  text-wrap: wrap;
  word-wrap: break-word;
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





@media (max-width: 1000px) {
  .container {
    grid-template-rows: 52px 1fr 1fr 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: 'title' 'image' 'order' 'info';
  }

}
</style>

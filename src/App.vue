<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style>
body{
  margin: 0;
  padding: 0;
  background-color: #050E0B;
  
}
:root {
  font-family: Arial, Helvetica, sans-serif;
  --font-primary: #FCFAF9;
  --font-secondary: #C9C7C6;
  --font-tetriary: #AFAEAD;
  --primary: #3A5743;
  --rating: #FFA500;

}
input:focus {
  outline: var(--primary) solid 2px;
}
</style>

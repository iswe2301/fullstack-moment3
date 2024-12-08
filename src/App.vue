<script>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue'; // Importera Header-komponenten
export default {
  name: "App",
  components: {
    Header, // Lägg till Header-komponenten
    RouterView, // Lägg till RouterView-komponenten
  },
};
</script>

<template>
  <Header /> <!-- Lägg till Header-komponenten -->
  <RouterView /> <!-- Rendera vyer här -->
</template>

<style scoped></style>

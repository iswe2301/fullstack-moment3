<script>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue'; // Importera Header-komponenten
import Footer from './components/Footer.vue'; // Importera Footer-komponenten

export default {
  name: "App",
  components: {
    Header, // Lägg till Header-komponenten
    RouterView, // Lägg till RouterView-komponenten
    Footer, // Lägg till Footer-komponenten
  },
};
</script>

<template>
  <Header /> <!-- Lägg till Header-komponenten -->
  <main>
    <RouterView /> <!-- Rendera vyer här -->
  </main>
  <Footer /> <!-- Lägg till Footer-komponenten -->
</template>

<style scoped>
main {
  min-height: 80vh;
  width: 100%;
  max-width: 800px;
  margin: 60px auto 2rem auto;
  padding: 1rem;
}
</style>

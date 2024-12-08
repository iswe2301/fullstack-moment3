<template>
  <div class="container">
    <!-- Kontrollera om det finns resor att visa -->
    <ul v-if="travels && travels.length" class="list-group">
      <!-- Loopa igenom travels-arrayen och skicka varje travel-objekt till Travel-komponenten, lyssna på deleteTravel- och editTravel-eventen -->
      <Travel v-for="travel in travels" :key="travel._id" :travel="travel"
        @deleteTravel="$emit('deleteTravel', travel._id)" @editTravel="$emit('editTravel', travel)" />
    </ul>
    <!-- Visa meddelande om det inte finns några resor att visa -->
    <p v-else class="text-center mt-4">Inga resor att visa.</p>
  </div>
</template>

<script>
// Importera Travel-komponenten
import Travel from './Travel.vue';

export default {
  // Ta emot travels-arrayen som en prop
  name: 'TravelList',
  props: {
    travels: {
      // Kräv att travels-arrayen finns
      type: Array,
      required: true,
    },
  },
  components: {
    Travel,
  },
  // Skicka till parent-komponenten att en resa ska tas bort eller redigeras
  emits: ['deleteTravel', 'editTravel'],
};
</script>
<template>
  <li class="list-group-item">
    <div class="content">
      <!-- Sätt travel-objektets plats och land som rubrik -->
      <h4 class="title">{{ travel.place }}, {{ travel.country }}</h4>
      <!-- Betyg, besökt och datum, sätt default-värden om de inte finns -->
      <p class="details">
        <strong>Betyg:</strong> {{ travel.rating || 'Ej betygsatt' }}<br />
        <strong>Besökt:</strong> {{ travel.visited ? 'Ja' : 'Nej' }}<br />
        <strong>Datum:</strong> {{ formattedDate }}
      </p>
      <!-- Beskrivning, visa endast om den finns -->
      <p v-if="travel.description" class="description">{{ travel.description }}</p>
    </div>
    <div class="actions">
      <!-- Knappar för att redigera och ta bort resan, skicka med travel-objektet till parent-komponenten -->
      <button class="btn btn-warning btn-sm" @click="$emit('editTravel', travel)">Redigera</button>
      <button class="btn btn-danger btn-sm" @click="$emit('deleteTravel', travel._id)">Ta bort</button>
    </div>
  </li>
</template>

<script>
export default {
  // Ta emot travel-objektet som en prop
  name: 'Travel',
  props: {
    travel: {
      type: Object,
    },
  },
  // Computed property för att formatera datumet
  computed: {
    // Metod för att formatera datumet
    formattedDate() {
      // Kontrollera om datumet finns
      if (!this.travel.visitDate) return 'Ej angivet';
      // Skapa ett datum-objekt från visitDate-strängen
      const date = new Date(this.travel.visitDate);
      // Returnera datumet i formatet ÅÅÅÅ-MM-DD
      return date.toLocaleDateString('sv-SE');
    },
  },
  // Skicka till parent-komponenten att en resa ska tas bort eller redigeras
  emits: ['deleteTravel', 'editTravel'],
};
</script>

<style scoped>
/* Custom CSS för att styla listan */
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.content {
  flex: 1;
  min-width: 250px;
}

.title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.details {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #555;
}

.description {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #777;
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.actions button {
  flex: 1;
}

/* Media query för mindre skärmar */
@media screen and (max-width: 576px) {
  .list-group-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    width: 100%;
    justify-content: flex-start;
  }

  .actions button {
    flex: unset;
    width: 100%;
  }
}
</style>
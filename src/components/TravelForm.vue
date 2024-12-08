<template>
  <!-- Formulär för att lägga till eller redigera resor, anropa metoder för att lägga till eller uppdatera resor vid submit -->
  <form @submit.prevent="handleSubmit" class="my-4">
    <!-- Visa rubrik beroende på om formuläret används för redigering eller lägg till -->
    <h3 class="mb-4">{{ isEditing ? 'Uppdatera resa' : 'Lägg till ny resa' }}</h3>
    <div class="mb-3">
      <label for="country" class="form-label">Land <span class="obligated">*</span></label>
      <!-- Använd v-model för att binda input-fältet till travel-objektet -->
      <input v-model="travel.country" id="country" type="text" class="form-control" placeholder="Ange ett land..." />
    </div>
    <div class="mb-3">
      <label for="place" class="form-label">Plats <span class="obligated">*</span></label>
      <!-- Använd v-model för att binda input-fältet till travel-objektet -->
      <input v-model="travel.place" id="place" type="text" class="form-control" placeholder="Ange en plats..." />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Beskrivning</label>
      <!-- Använd v-model för att binda textarea-fältet till travel-objektet -->
      <textarea v-model="travel.description" id="description" placeholder="Beskriv ditt resmål..." class="form-control"
        rows="5"></textarea>
    </div>
    <div class="mb-3">
      <label for="visited" class="form-label">Besökt <span class="obligated">*</span></label>
      <!-- Använd v-model för att binda select-fältet till travel-objektet -->
      <select v-model="travel.visited" id="visited" class="form-control">
        <!-- Använd :value för att binda värdet till true eller false -->
        <option disabled value="">Har du besökt platsen?</option>
        <option :value="true">Ja</option>
        <option :value="false">Nej</option>
      </select>
    </div>
    <!-- Kontrollera om resan är besökt och visa ytterligare fält -->
    <div v-if="travel.visited === true">
      <div class="mb-3">
        <label for="visitDate" class="form-label">Besöksdatum</label>
        <input v-model="travel.visitDate" id="visitDate" type="date" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="rating" class="form-label">Betyg</label>
        <input v-model="travel.rating" id="rating" type="number" placeholder="1-10" class="form-control" />
      </div>
    </div>
    <button type="submit" class="btn btn-primary submit-btn">
      <!-- Visa knapp-text beroende på om formuläret används för redigering eller lägg till -->
      {{ isEditing ? 'Uppdatera' : 'Lägg till' }}
    </button>
  </form>
  <!-- Visa eventuella felmeddelanden -->
  <div v-if="errors.length" class="alert alert-danger mt-3">
    <ul>
      <!-- Loopa igenom errors-arrayen och visa varje felmeddelande -->
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>

</template>

<script>
export default {
  name: 'TravelForm',
  props: {
    travelToEdit: Object, // Resa som ska redigeras
  },
  // Skicka till parent-komponenten att en resa har lagts till
  emits: ['travelAdded'],
  data() {
    return {
      // Objekt för resan som ska läggas till eller redigeras
      travel: {
        country: '',
        place: '',
        rating: null,
        visited: '',
        visitDate: null,
        description: '',
      },
      isEditing: false, // Om formuläret används för redigering
      errors: [], // Felmeddelanden
    };
  },
  // Lyssna på förändringar i travelToEdit-propen
  watch: {
    travelToEdit: {
      // Direktiv för att köra koden direkt
      immediate: true,
      // Metod som körs när travelToEdit ändras
      handler(newVal) {
        // Kontrollera om det finns en resa som ska redigeras
        if (newVal) {
          // Kopiera resan som ska redigeras
          this.travel = { ...newVal };
          // Sätt redigeringsläge
          this.isEditing = true;
        }
      },
    },
  },
  // Metoder för komponenten
  methods: {
    // Metod för att hantera formuläret
    async handleSubmit() {
      // Rensa tidigare felmeddelanden
      this.errors = [];
      // Kontrollera om formuläret används för redigering eller lägg till
      if (this.isEditing) {
        // Om redigering, anropa metoden för att uppdatera resan
        await this.updateTravel();
      } else {
        // Om lägg till, anropa metoden för att lägga till resan
        await this.addTravel();
      }
    },
    // Metod för att lägga till en resa
    async addTravel() {
      try {

        // Anropa metoden för att filtrera bort tomma värden
        this.travel = this.filterEmptyFields(this.travel);

        // Skicka POST-förfrågan till API:et
        const resp = await fetch('https://iswe2301-fullstack-moment2.onrender.com/travels', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Skicka med resan
          body: JSON.stringify(this.travel),
        });

        // Kontrollera om förfrågan lyckades och visa felmeddelande om något gick fel
        if (!resp.ok) {
          const errorData = await resp.json();
          this.errors = Object.values(errorData.errors || { error: 'Ett fel inträffade' });
          return;
        }

        // Informera parent-komponenten att en ny resa har lagts till och rensa formuläret
        this.$emit('travelAdded', "new");
        this.resetForm();

        // Fånga upp eventuella fel och visa dem
      } catch (error) {
        console.error('Fel vid skapande av resa:', error);
        this.errors = ['Ett oväntat fel inträffade. Försök igen senare.'];
      }
    },
    // Metod för att uppdatera en resa
    async updateTravel() {
      try {

        // Anropa metoden för att filtrera bort tomma värden
        this.travel = this.filterEmptyFields(this.travel);

        // Skicka PUT-förfrågan till API:et
        const resp = await fetch(`https://iswe2301-fullstack-moment2.onrender.com/travels/${this.travel._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          // Skicka med uppdaterad resa
          body: JSON.stringify(this.travel),
        });

        // Kontrollera om förfrågan lyckades och visa felmeddelande om något gick fel
        if (!resp.ok) {
          const errorData = await resp.json();
          this.errors = Object.values(errorData.errors || { error: 'Ett fel inträffade' });
          return;
        }

        // Informera parent-komponenten att en resa har uppdaterats och rensa formuläret
        this.$emit('travelAdded', "update");
        this.resetForm();

        // Fånga upp eventuella fel och visa dem
      } catch (error) {
        console.error('Fel vid uppdatering av resa:', error);
        this.errors = ['Ett oväntat fel inträffade. Försök igen senare.'];
      }
    },
    // Metod för filtrera bort tomma värden från objektet
    filterEmptyFields(data) {
      return Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== null && value !== '')
      );
    },
    // Metod för att rensa formuläret
    resetForm() {
      this.travel = {
        country: '',
        place: '',
        rating: null,
        visited: true,
        visitDate: '',
        description: '',
      };
      this.isEditing = false; // Återställ redigeringsläge
    },
  },
};
</script>

<style scoped>
/* Custom CSS för att styla formuläret */
label {
  font-weight: bold;
}

.obligated {
  color: red;
  font-weight: bold;
}

@media (max-width: 576px) {
  .submit-btn {
    width: 100%;
  }
}
</style>

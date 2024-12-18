<template>
  <!-- Formulär för att lägga till eller redigera resor, anropa metoder för att lägga till eller uppdatera resor vid submit -->
  <form @submit.prevent="handleSubmit" class="my-4" ref="travelForm">
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
    <!-- Visa fält för besöksdatum och betyg om resan är besökt -->
    <div v-show="travel.visited === true">
      <div class="mb-3">
        <label for="visitDate" class="form-label">Besöksdatum</label>
        <input v-model="travel.visitDate" id="visitDate" type="date" class="form-control" />
      </div>
      <div class="mb-3">
        <!-- Tooltip för att visa information om betyg -->
        <label for="rating" class="form-label">Betyg <span class="text-muted" data-bs-toggle="tooltip"
            data-bs-placement="top" data-bs-html="true" title="1 = lägsta betyg<br>10 = högsta betyg">
            <i class="bi bi-info-circle"></i>
          </span>
        </label>
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
        description: '',
        visited: null,
        visitDate: null,
        rating: null
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
    // Metod för att validera formuläret
    validateForm() {

      // Rensa tidigare felmeddelanden
      this.errors = [];

      // Hämta fälten från travel-objektet
      const { country, place, description, rating, visited, visitDate } = this.travel;

      // Validera land och plats
      if (!country) this.errors.push("Du måste ange ett land.");
      if (!place) this.errors.push("Du måste ange en plats.");

      // Validera beskrivningens längd om den finns
      if (description && description.length > 500) {
        this.errors.push("Beskrivningen får max vara 500 tecken.");
      }

      // Validera betyg (mellan 1 och 10 och ett heltal) om betyg är angivet
      if (rating !== null && rating !== "" && !isNaN(rating)) {
        if (rating < 1 || rating > 10 || !Number.isInteger(Number(rating))) {
          this.errors.push("Betyget måste vara ett heltal mellan 1 och 10.");
        }
      }

      // Validera om användaren angett om platsen är besökt eller inte
      if (visited === null) this.errors.push("Du måste ange om du har besökt platsen eller inte.");

      // Validera besöksdatum om det är angivet
      if (visitDate) {
        if (isNaN(Date.parse(visitDate)) || new Date(visitDate) > new Date()) {
          this.errors.push("Du måste ange ett giltigt datum som inte är i framtiden.");
        }
      }

      return this.errors.length === 0; // Returnera true om inga fel hittas
    },
    // Metod för att hantera formuläret
    async handleSubmit() {
      // Validera formuläret
      if (!this.validateForm()) {
        return; // Avbryt om validering misslyckas
      }
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
      // Array med valfria fält
      const optionalFields = ['rating', 'visitDate'];
      // Returnera objektet med endast fält som inte är tomma
      return Object.fromEntries(
        Object.entries(data).filter(([key, value]) =>
          // Kontrollera om fältet inte finns i optionalFields eller om värdet inte är tomt
          !optionalFields.includes(key) || (value !== null && value !== '')
        )
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
    // Metod för att scrolla till formuläret
    scrollToForm() {
      this.$refs.travelForm.scrollIntoView({ behavior: "smooth" });
    },
  },
  mounted() {
    // Aktivera Bootstrap-tooltips 
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  },
}
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

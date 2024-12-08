<template>
  <div class="container mt-4">
    <h2 class="text-center">Resor</h2>
    <!-- Formulär för att lägga till eller redigera en resa, skicka med travelToEdit-objektet till formuläret -->
    <!-- Använd travelAdded-eventet för att visa lyckat meddelande -->
    <TravelForm @travelAdded="handleAddedTravel" :travelToEdit="travelToEdit" />
    <!-- Visa eventuella fel -->
    <div v-if="errors.length" class="alert alert-danger mt-3">
      <ul>
        <!-- Loopa igenom errors-arrayen och visa varje felmeddelande -->
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>
    <!-- Visa eventuellt lyckat meddelande -->
    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>
  </div>
  <!-- Lista över resor, skicka med travels-arrayen till listan -->
  <TravelList :travels="travels" @deleteTravel="deleteTravel" @editTravel="editTravel" />
</template>

<script>
// Importera TravelForm- och TravelList-komponenterna
import TravelForm from '../components/TravelForm.vue';
import TravelList from '../components/TravelList.vue';

export default {
  name: 'DataView',
  components: {
    TravelForm, // Registrera TravelForm-komponenten
    TravelList, // Registrera TravelList-komponenten
  },
  data() {
    return {
      travels: [], // Array för resor
      travelToEdit: null, // Resa som redigeras, null om ingen redigering pågår
      errors: [], // Array för felmeddelanden
      successMessage: '', // Lyckat meddelande, tom sträng som standard
    };
  },
  // Metoder för komponenten
  methods: {
    //Metod för att hämta resor
    async getTravels() {
      try {
        // Hämta resor från API:et
        const resp = await fetch('https://iswe2301-fullstack-moment2.onrender.com/travels');
        // Kontrollera om anropet lyckades eller kasta ett fel
        if (!resp.ok) throw new Error('Kunde inte hämta resor.');

        // Spara resorna i travels-arrayen
        this.travels = await resp.json();

        // Fånga upp eventuella fel och visa dem
      } catch (error) {
        console.error('Fel vid hämtning av resor:', error);
        this.errors = ['Ett fel inträffade vid hämtning av resor.'];

      }
    },
    // Metod för att ta bort en resa
    async deleteTravel(id) {
      try {
        // Skicka DELETE-förfrågan till API:et
        const resp = await fetch(`https://iswe2301-fullstack-moment2.onrender.com/travels/${id}`, {
          method: 'DELETE',
        });

        // Kontrollera om förfrågan lyckades eller kasta ett fel
        if (!resp.ok) throw new Error('Kunde inte ta bort resan.');

        // Visa lyckat meddelande
        this.handleSuccess('Resan har tagits bort!');

        // Anropa metoden för att hämta resor
        this.getTravels();

        // Fånga upp eventuella fel och visa dem
      } catch (error) {
        console.error('Fel vid borttagning av resa:', error);
        this.errors = ['Ett fel inträffade vid borttagning av resan.'];
      }
    },
    // Metod för att redigera en resa
    editTravel(travel) {
      this.travelToEdit = {
        ...travel, // Kopiera travel-objektet
        visitDate: travel.visitDate ? new Date(travel.visitDate).toISOString().split('T')[0] : '' // Formatera datumet till ÅÅÅÅ-MM-DD eller tom sträng
      };
    },
    // Metod för att hantera tillagd eller uppdaterad resa (success-meddelanden)
    handleAddedTravel(action) {
      // Om en ny resa har lagts till
      if (action === 'new') {
        this.handleSuccess('Resan har lagts till!');
        // Om uppdatring har gjorts
      } else if (action === 'update') {
        this.handleSuccess('Resan har uppdaterats!');
      }
      this.getTravels(); // Uppdatera listan
    },
    // Metod för att visa lyckat meddelande
    handleSuccess(message) {
      // Spara meddelandet och visa det i 3 sekunder
      this.successMessage = message;
      setTimeout(() => (this.successMessage = ''), 3000);
    },
  },
  // Metoden körs när komponenten laddas
  mounted() {
    this.getTravels(); // Anropa metoden för att hämta resor
  },
};
</script>

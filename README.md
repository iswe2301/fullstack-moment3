# DT193G Fullstack-utveckling med ramverk - Moment 3

## Projektbeskrivning - Moment 3 Frontend-ramverk
Denna applikation har tagits fram som ett projekt i kursen DT193G Fullstack-utveckling med ramverk vid Mittuniversitetet. Uppgiften gick ut på att skapa en Single-Page-Application (SPA) med Vue.js. Webbplatsen ska representera det fritidsintresse som skapades i föregående moment (Moment 2.2, https://github.com/Webbutvecklings-programmet/moment-2-backend-ramverk-iswe2301.git) med en genomgående grafisk profil och lämpliga bilder.

Projektet har skapats med Vue.js som frontend ramverk. Webbapplikationen hanterar resor som fritidsintresse och ansluter till ett backend-API. Användaren kan lägga till, redigera, ta bort och visa resor. Varje resa innehåller information som land, plats, beskrivning, betyg, om platsen har besökts och ett besöksdatum. Applikationen har designats med responsivitet i åtanke och använder Bootstrap som CSS-ramverk för layout och styling.

## Funktioner
* **Visa alla resor:** Samtliga resor visas i en lista.
* **Lägga till resa:** Ett formulär för att lägga till en ny resa i listan.
* **Redigera resa:** Uppdatera information om befintlig resa i listan.
* **Ta bort resa:** Ta bort resor från listan.

## Frontend-ramverk (Vue.js)
* Används för att bygga en Single-Page-Application (SPA).
* Använder komponentbaserad arkitektur som gör det enkelt att återanvända kod och hålla projektet modulärt. Koden är skapad i egna komponenter för header, footer, resor etc samt egna vyer för de olika undersidorna.
* Dynamisk rendering och interaktivitet genom reaktiv data och two-way binding (t.ex. med v-model).

### Routing
* Vue Router används för att hantera sidnavigering i applikationen, vilket gör det möjligt att navigera mellan olika vyer utan att ladda om sidan.

### Props och Emits
* **Props:** Används för att skicka data från en föräldrakomponent till en barnkomponent (t.ex. skicka resor till en lista).
* **Emits:** Används för att kommunicera från barnkomponenter tillbaka till föräldrakomponenter (t.ex. vid uppdatering eller borttagning av resor).

### Reaktiv data och Two-Way Binding
* **Reaktiv data:** Användning av Vue's reaktiva system för att uppdatera gränssnittet i realtid när data ändras.
* **Two-Way Binding:** v-model används för att koppla användarinmatning i formulär till den underliggande datamodellen.

## CSS-ramverk (Bootstrap)
* Används för att skapa en responsiv och användarvänlig design.
* Bootstrap Icons används för ikoner i tooltips.

## API-anrop
Applikationen ansluter till ett backend-API med hjälp av fetch. Följande funktioner har implementerats:

* Hämta alla resor (GET /travels).
* Lägga till en ny resa (POST /travels).
* Uppdatera en befintlig resa (PUT /travels/{id}).
* Ta bort en resa (DELETE /travels/{id}).

## Om
* **Av:** Isa Westling
* **Kurs:** DT193G Fullstack-utveckling med ramverk
* **Program:** Webbutvecklingsprogrammet
* **År:** 2024
* **Termin:** 3 (HT)
* **Skola:** Mittuniversitetet
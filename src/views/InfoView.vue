<template>
    <!-- Container för innehållet -->
    <div class="container">
        <!-- Rubrik och text -->
        <h2 class="mb-3">Om Vue</h2>
        <p>Jag tycker det har varit kul att testa på att arbeta med Vue.js som ramverk. Nu var det ett tag sedan vi
            arbetade med Angular, men jag tycker mig minnas vissa likheter såsom tvåvägsdatabinding, routing för SPA och
            den komponentbaserade strukturen.</p>
        <p>Just den komponentbaserade strukturen är något jag verkligen uppskattar, och ännu mer i Vue jämfört med
            Angular. Jag tycker det blir mycket enklare att arbeta i projektet och hitta omkring i sitt egna projekt.
            När man delar upp koden i olika komponenter som ansvarar för sin egen del blir det enklare att hitta, förstå
            och felsöka. Med Vue tyckte jag det var extra bra att kunna skriva både HTML, CSS och JS i en och samma fil
            vilket gör det extremt tydligt kring var en viss kod hör hemma. Att man dessutom kan återanvända olika
            komponenter kan jag se som en stor fördel då man dels slipper upprepa sig, men även endast behöver uppdatera
            på ett och samma ställe.</p>
        <p>Något som jag tycker har varit lite svårare att sätta sig in i är hanteringen av data mellan föräldra- och
            barnkomponenter, det vill säga props och emits. Det var lite klurigt i början eftersom det krävs en annan
            typ av tänk för att förstå hur data flödar mellan komponenterna. Jag hade svårt att greppa hur man på ett
            effektivt sätt ska organisera kommunikationen mellan komponenterna utan att det blir rörigt eller svårt att
            hålla reda på.</p>
        <p>Jag tycker rent generellt att med ett frontend-ramverk samt ett CSS-ramverk har utvecklingen av webbplatsen
            kunnat snabbats på och blivit enklare. Jag ser fram emot att använda Vue mer och även testa på fler ramverk
            framåt!</p>
    </div>
</template>

<script>
// Exportera vy-komponenten
export default {
    name: 'InfoView'
}
</script>

<style scoped></style>
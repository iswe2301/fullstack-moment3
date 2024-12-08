<template>
    <footer class="bg-dark text-white text-center py-3 mt-4">
        <div class="container">
            <!-- Skriv ut aktuellt år -->
            <p>&copy; {{ currentYear }} Isa Westling</p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            // Hämta aktuellt år
            currentYear: new Date().getFullYear(),
        };
    },
};
</script>

<style scoped>

</style>

<template>
    <header class="header-banner">
        <nav class="navbar navbar-expand-lg fixed-top">
            <div class="container d-flex justify-content-between">
                <!-- Branding (logo) -->
                <router-link class="navbar-brand" to="/">ISA WESTLING</router-link>

                <!-- Toggler för mobil/mindre enheter -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Meny -->
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <!-- Routerlinks för att navigera mellan sidor -->
                        <li class="nav-item">
                            <!-- Händelsehanterare för att stänga menyn när en länk klickas -->
                            <router-link class="nav-link" to="/" active-class="active"
                                @click="closeMenu">Hem</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/resor" active-class="active"
                                @click="closeMenu">Resor</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/om-vue" active-class="active" @click="closeMenu">Om
                                Vue</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Overlay för att göra texten mer läsbar -->
        <div class="overlay"></div>
        <!-- Innehåll i headern med stor hero-bild -->
        <div class="content">
            <h1>ISA WESTLING</h1>
            <p>RESEÄVENTYR I EN VAN</p>
        </div>
    </header>
</template>

<script>
// Exportera komponenten
export default {
    name: 'Header',
    methods: {
        // Metod för att stänga menyn när en länk klickas
        closeMenu() {
            // Ta bort klassen show från menyn för att dölja den
            document.querySelector('.navbar-collapse').classList.remove('show');
        }
    }
};
</script>


<style scoped>
/* Custom CSS för att styla headern */
.header-banner {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('@/assets/herotravel.jpg') no-repeat center center/cover;
    color: white;
    text-align: center;
    min-height: 600px;
    padding: 5rem 1rem;
    overflow: hidden;
}

/* Overlay för att göra texten mer läsbar */
.header-banner .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
}

.header-banner .content {
    position: relative;
    z-index: 2;
    text-align: center;
}

.header-banner h1 {
    font-size: 3rem;
    font-weight: bold;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
    margin: 0;
}

.header-banner p {
    font-size: 1.2rem;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
    margin: 1rem 0 0;
}

.navbar-brand {
    font-weight: bold;
    color: white !important;
}

.navbar {
    background-color: #ff8c00;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar .nav-link {
    color: white !important;
    font-weight: bold;
    margin: 0 1.5rem;
}

.navbar .nav-link.active {
    color: rgba(33, 37, 41, 1) !important;
}

.navbar-toggler {
    border-color: white;
}

/* Byt ut till vit hamburgerikon */
.navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba%28255, 255, 255, 1%29' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    background-size: contain;
}

/* Under 992px */
@media screen and (max-width: 991px) {
    ul.navbar-nav {
        align-items: center;
    }
}
</style>
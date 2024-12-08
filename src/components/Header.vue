<template>
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container d-flex justify-content-between">
                <!-- Branding (logo) -->
                <router-link class="navbar-brand" to="/">ISAWESTLING</router-link>

                <!-- Toggler för mobil/mindre enheter -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Meny -->
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <!-- Routerlinks för att navigera mellan sidor -->
                        <li class="nav-item">
                            <router-link class="nav-link" to="/" active-class="active">Hem</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/data" active-class="active">Fritidsintresse</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/info" active-class="active">Om Vue</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
// Exportera komponenten
export default {
    name: 'Header',
};
</script>


<style scoped>
/* Custom CSS för att styla headern */
.navbar-brand {
    font-weight: bold;
    color: white !important;
}
.navbar {
    background-color: #ff8c00;
}

.navbar .nav-link {
    color: white !important;
    font-weight: bold;
}

.navbar .nav-link.active {
    color: #ffe75d !important;
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
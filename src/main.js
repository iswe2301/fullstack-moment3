import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

// Vänta tills att DOM är laddad
document.addEventListener('DOMContentLoaded', function () {
    // Aktivera Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        // Returnera tooltip
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
});

app.mount('#app')

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Isa Westling</a>
        <div>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Hem</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/data">Fritidsintresse</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/info">Om Vue</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </header>

  <RouterView />
</template>

<style scoped></style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto">
    <header>
      <div>
        <!-- The Router links below are only there for testing purposes / access to all the pages easily and will need to be removed when the header will be functionnal -->
        <!-- All pages (components inside the view folder) already contain all of their respective components -->
        <nav>
          <RouterLink to="/accueil" class="inline-block m-4 font-medium text-lg underline">Accueil</RouterLink>
          <RouterLink to="/espace-client/profil" class="inline-block m-4 font-medium text-lg underline">Profile</RouterLink>
          <RouterLink to="/espace-client/budget" class="inline-block m-4 font-medium text-lg underline">Budget</RouterLink>
          <!-- <h1>test first commit</h1> -->
          <!-- <h2>test first commit</h2> -->
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped></style>

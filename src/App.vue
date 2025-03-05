<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto">
    <header>
      <div>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <h1>test first commit</h1>
          <h2>test first commit</h2>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped></style>

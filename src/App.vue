<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto">
    <header>
      <div>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <p>test first commit</p>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped></style>

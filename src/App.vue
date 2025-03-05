<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto">
    <header>
      <div>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <h1 class="text-accent1 font-main">test first commit</h1>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped></style>

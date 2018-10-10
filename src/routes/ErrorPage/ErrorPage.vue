<template>
  <div v-if="isDev && error">
    <h1>{{error.name}}</h1>
    <pre>{{error.stack}}</pre>
  </div>
  <div v-else>
    <h1>Error</h1>
    <p>Sorry, a critical error occurred on this page.</p>
  </div>
</template>

<script lang="ts" src="./ErrorPage.ts"></script>
<style src="./ErrorPage.css"></style>

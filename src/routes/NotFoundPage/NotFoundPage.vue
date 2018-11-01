<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <h1>{{ title }}</h1>
      <p>Sorry, the page you were trying to view does not exist.</p>
    </div>
  </div>
</template>

<script lang="ts" src="./NotFoundPage.ts"></script>
<style module src="./NotFoundPage.css"></style>

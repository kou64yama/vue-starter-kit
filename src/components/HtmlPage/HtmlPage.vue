<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <h1>{{ title }}</h1>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="html" />
    </div>
  </div>
</template>

<script lang="ts" src="./HtmlPage.ts"></script>
<style module src="./HtmlPage.css"></style>

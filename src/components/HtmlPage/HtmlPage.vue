<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <h1>{{ title }}</h1>
      <div v-html="html"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./HtmlPage.ts"></script>
<style module src="./HtmlPage.css"></style>

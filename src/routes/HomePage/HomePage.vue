<template>
  <div class="root">
    <div class="container">
      <h1>Vue.js News</h1>
      <p v-if="error">{{ error.message }}</p>
      <article v-for="item in items" :key="item.link" class="newsItem">
        <h1 class="newsTitle">
          <a :href="item.link">{{ item.title }}</a>
        </h1>
        <div class="newsDesc" v-html="item.content"/>
      </article>
      <p v-if="loading">Loading...</p>
    </div>
  </div>
</template>

<script lang="ts" src="./HomePage.ts"></script>
<style scoped src="./HomePage.css"></style>

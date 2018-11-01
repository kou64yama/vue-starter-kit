<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <h1>Vue.js News</h1>
      <p v-if="error">{{ error.message }}</p>
      <article v-for="item in items" :key="item.link" :class="$style.newsItem">
        <h1 :class="$style.newsTitle">
          <a :href="item.link">{{ item.title }}</a>
        </h1>
        <div :class="$style.newsDesc" v-html="item.content"/>
      </article>
      <p v-if="loading">Loading...</p>
    </div>
  </div>
</template>

<script lang="ts" src="./HomePage.ts"></script>
<style module src="./HomePage.css"></style>

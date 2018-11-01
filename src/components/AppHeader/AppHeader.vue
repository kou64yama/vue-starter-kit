<template>
  <div class="root">
    <div class="container">
      <app-navigation/>
      <router-link class="brand" :to="{ name: 'home' }">
        <img
          src="./logo-small.png"
          :srcSet="`${logoUrl2x} 2x`"
          width="38"
          height="38"
          alt="Vue"
        >
        <span class="brandTxt">Your Company</span>
      </router-link>
      <div class="banner">
        <h1 class="bannerTitle">Vue</h1>
        <p class="bannerDesc">Complex web apps made easy</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AppHeader.ts"></script>
<style scoped src="./AppHeader.css"></style>

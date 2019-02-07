<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <app-navigation />
      <router-link :class="$style.brand" :to="{ name: 'home' }">
        <img
          src="./logo-small.png"
          :srcSet="`${require('./logo-small@2x.png')} 2x`"
          width="38"
          height="38"
          alt="Vue"
        />
        <span :class="$style.brandTxt">
          Your Company
        </span>
      </router-link>
      <div :class="$style.banner">
        <h1 :class="$style.bannerTitle">
          Vue
        </h1>
        <p :class="$style.bannerDesc">
          Complex web apps made easy
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AppHeader.ts"></script>
<style module src="./AppHeader.css"></style>

<template functional>
  <div :class="$style.root">
    <div :class="$style.container">
      <span :class="$style.text">
        © Your Company
      </span>
      <span :class="$style.spacer">
        ·
      </span>
      <router-link :class="$style.link" :to="{ name: 'home' }">
        Home
      </router-link>
      <span :class="$style.spacer">
        ·
      </span>
      <router-link :class="$style.link" :to="{ name: 'admin' }">
        Admin
      </router-link>
      <span :class="$style.spacer">
        ·
      </span>
      <router-link :class="$style.link" :to="{ name: 'privacy' }">
        Privacy
      </router-link>
      <span :class="$style.spacer">
        ·
      </span>
      <router-link :class="$style.link" to="/not-found">
        Not Found
      </router-link>
    </div>
  </div>
</template>

<style module src="./AppFooter.css"></style>

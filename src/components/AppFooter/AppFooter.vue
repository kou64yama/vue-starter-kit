<template functional>
  <div class="root">
    <div class="container">
      <span class="text">© Your Company</span>
      <span class="spacer">·</span>
      <router-link class="link" :to="{ name: 'home' }">
        Home
      </router-link>
      <span class="spacer">·</span>
      <router-link class="link" :to="{ name: 'admin' }">
        Admin
      </router-link>
      <span class="spacer">·</span>
      <router-link class="link" :to="{ name: 'privacy' }">
        Privacy
      </router-link>
      <span class="spacer">·</span>
      <router-link class="link" to="/not-found">
        Not Found
      </router-link>
    </div>
  </div>
</template>

<style scoped src="./AppFooter.css"></style>

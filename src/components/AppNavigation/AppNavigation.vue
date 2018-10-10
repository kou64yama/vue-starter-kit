<template functional>
  <div class="root" role="navigation">
    <router-link class="link" :to="{ name: 'about' }">
      About
    </router-link>
    <router-link class="link" :to="{ name: 'contact' }">
      Contact
    </router-link>
    <span class="spacer"> | </span>
    <router-link class="link" :to="{ name: 'login' }">
      Log in
    </router-link>
    <span class="spacer">or</span>
    <router-link class="link highlight" :to="{ name: 'register' }">
      Sign up
    </router-link>
  </div>
</template>

<style scoped src="./AppNavigation.css"></style>

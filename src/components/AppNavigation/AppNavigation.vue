<template functional>
  <div :class="$style.root" role="navigation">
    <router-link :class="$style.link" :to="{ name: 'about' }">
      About
    </router-link>
    <router-link :class="$style.link" :to="{ name: 'contact' }">
      Contact
    </router-link>
    <span :class="$style.spacer"> | </span>
    <router-link :class="$style.link" :to="{ name: 'login' }">
      Log in
    </router-link>
    <span :class="$style.spacer">or</span>
    <router-link
      :class="`${$style.link} ${$style.highlight}`"
      :to="{ name: 'register' }"
    >
      Sign up
    </router-link>
  </div>
</template>

<style module src="./AppNavigation.css"></style>

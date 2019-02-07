<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <app-navigation />
      <router-link :class="$style.brand" :to="{ name: 'home' }">
        <img
          src="../assets/logo-small.png"
          :srcSet="`${require('../assets/logo-small@2x.png')} 2x`"
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

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppNavigation from './AppNavigation.vue';

@Component({ components: { AppNavigation } })
export default class AppHeader extends Vue {}
</script>

<style module>
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in https://github.com/kriasoft/react-starter-kit.
 */

@import './variables.css';

:root {
  --brand-color: #61dafb;
}

.root {
  background: #373277;
  color: #fff;
}

.container {
  margin: 0 auto;
  padding: 20px 0;
  max-width: var(--max-content-width);
}

.brand {
  color: color(var(--brand-color) lightness(+10%));
  text-decoration: none;
  font-size: 1.75em; /* ~28px */
}

.brandTxt {
  margin-left: 10px;
}

.banner {
  text-align: center;
}

.bannerTitle {
  margin: 0;
  padding: 10px;
  font-weight: normal;
  font-size: 4em;
  line-height: 1em;
}

.bannerDesc {
  padding: 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.25em;
  margin: 0;
}
</style>

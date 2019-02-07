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

.root {
  background: #333;
  color: #fff;
}

.container {
  margin: 0 auto;
  padding: 20px 15px;
  max-width: var(--max-content-width);
  text-align: center;
}

.text {
  color: rgba(255, 255, 255, 0.5);
}

.spacer {
  color: rgba(255, 255, 255, 0.3);
}

.text,
.link {
  padding: 2px 5px;
  font-size: 1em;
}

.link,
.link:active,
.link:visited {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
}

.link:hover {
  color: rgba(255, 255, 255, 1);
}
</style>

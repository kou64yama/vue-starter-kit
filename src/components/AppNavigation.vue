<template functional>
  <div :class="$style.root" role="navigation">
    <router-link :class="$style.link" :to="{ name: 'about' }">
      About
    </router-link>
    <router-link :class="$style.link" :to="{ name: 'contact' }">
      Contact
    </router-link>
    <span :class="$style.spacer">
      |
    </span>
    <router-link :class="$style.link" :to="{ name: 'login' }">
      Log in
    </router-link>
    <span :class="$style.spacer">
      or
    </span>
    <router-link
      :class="`${$style.link} ${$style.highlight}`"
      :to="{ name: 'register' }"
    >
      Sign up
    </router-link>
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

.root {
  float: right;
  margin: 6px 0 0;
}

.link {
  display: inline-block;
  padding: 3px 8px;
  text-decoration: none;
  font-size: 1.125em; /* ~18px */
}

.link,
.link:active,
.link:visited {
  color: rgba(255, 255, 255, 0.6);
}

.link:hover {
  color: rgba(255, 255, 255, 1);
}

.highlight {
  margin-right: 8px;
  margin-left: 8px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.15);
  color: #fff;
}

.highlight:hover {
  background: rgba(0, 0, 0, 0.3);
}

.spacer {
  color: rgba(255, 255, 255, 0.3);
}
</style>

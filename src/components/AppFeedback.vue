<template functional>
  <div :class="$style.root">
    <div :class="$style.container">
      <a
        :class="$style.link"
        href="https://gitter.im/kou64yama/vue-starter-kit"
      >
        Ask a question
      </a>
      <span :class="$style.spacer">
        |
      </span>
      <a
        :class="$style.link"
        href="https://github.com/kou64yama/vue-starter-kit/issues/new"
      >
        Report an issue
      </a>
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
  background: #f5f5f5;
  color: #333;
}

.container {
  margin: 0 auto;
  padding: 20px 8px;
  max-width: var(--max-content-width);
  text-align: center;
  font-size: 1.5em; /* ~24px */
}

.link,
.link:active,
.link:hover,
.link:visited {
  color: #333;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.spacer {
  padding-right: 15px;
  padding-left: 15px;
}
</style>

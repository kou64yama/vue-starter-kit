<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <h1>{{ title }}</h1>
      <p>...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import TitleMixin from '@/mixins/TitleMixin';

@Component({
  title() {
    return this.$props.title;
  },
})
export default class RegisterPage extends Mixins(TitleMixin) {
  @Prop({ type: String, required: true })
  public title!: string;
}
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

@import '../components/variables.css';

.root {
  padding-left: 20px;
  padding-right: 20px;
}

.container {
  margin: 0 auto;
  padding: 0 0 40px;
  max-width: var(--max-content-width);
}
</style>

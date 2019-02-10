<template>
  <div v-if="__DEV__ && error">
    <h1>{{ error.name }}</h1>
    <pre>{{ error.stack }}</pre>
  </div>
  <div v-else>
    <h1>Error</h1>
    <p>Sorry, a critical error occurred on this page.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class ErrorPage extends Vue {
  @Prop({ type: Error, required: true })
  public error!: Error;
}
</script>

<style>
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in https://github.com/kriasoft/react-starter-kit.
 */

html {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  height: 100%;
  font-family: sans-serif;
  text-align: center;
  color: #888;
}

body {
  margin: 0;
}

h1 {
  font-weight: 400;
  color: #555;
}

pre {
  white-space: pre-wrap;
  text-align: left;
}
</style>

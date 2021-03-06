<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <h1>{{ title }}</h1>
      <p :class="$style.lead">
        Log in with your username or company email address.
      </p>
      <div :class="$style.formGroup">
        <a :class="$style.facebook" href="/login/facebook">
          <svg
            :class="$style.icon"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z"
            />
          </svg>
          <span>Log in with Facebook</span>
        </a>
      </div>
      <div :class="$style.formGroup">
        <a :class="$style.google" href="/login/google">
          <svg
            :class="$style.icon"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3
              1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0
              3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735
              0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882
              0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587
              3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11
              13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0
              2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z"
            />
          </svg>
          <span>Log in with Google</span>
        </a>
      </div>
      <div :class="$style.formGroup">
        <a :class="$style.twitter" href="/login/twitter">
          <svg
            :class="$style.icon"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56
              3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6
              2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1
              3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1
              1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5
              0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17
              0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z"
            />
          </svg>
          <span>Log in with Twitter</span>
        </a>
      </div>
      <strong :class="$style.lineThrough">
        OR
      </strong>
      <form method="post">
        <div :class="$style.formGroup">
          <label :class="$style.label" for="usernameOrEmail">
            Username or email address:
            <input
              id="usernameOrEmail"
              :class="$style.input"
              type="text"
              name="usernameOrEmail"
              autofocus
            />
          </label>
        </div>
        <div :class="$style.formGroup">
          <label :class="$style.label" for="password">
            Password:
            <input
              id="password"
              :class="$style.input"
              type="text"
              name="password"
              autofocus
            />
          </label>
        </div>
        <div :class="$style.formGroup">
          <button :class="$style.button" type="submit">
            Log in
          </button>
        </div>
      </form>
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
export default class LoginPage extends Mixins(TitleMixin) {
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
  max-width: 380px;
}

.lead {
  font-size: 1.25em;
}

.formGroup {
  margin-bottom: 15px;
}

.label {
  display: block;
  font-weight: 700;
}

.input {
  display: block;
  box-sizing: border-box;
  margin: 5px 0 0;
  padding: 10px 16px;
  width: 100%;
  height: 46px;
  outline: 0;
  border: 1px solid #ccc;
  border-radius: 0;
  background: #fff;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  color: #616161;
  font-size: 18px;
  line-height: 1.3333333;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.input:focus {
  border-color: #0074c2;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(0, 116, 194, 0.6);
}

.button {
  display: block;
  box-sizing: border-box;
  margin: 0;
  padding: 10px 16px;
  width: 100%;
  outline: 0;
  border: 1px solid #373277;
  border-radius: 0;
  background: #373277;
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  line-height: 1.3333333;
  cursor: pointer;
}

.button:hover {
  background: rgba(54, 50, 119, 0.8);
}

.button:focus {
  border-color: #0074c2;
  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);
}

.facebook {
  border-color: #3b5998;
  background: #3b5998;
  composes: button;
}

.facebook:hover {
  background: #2d4373;
}

.google {
  border-color: #dd4b39;
  background: #dd4b39;
  composes: button;
}

.google:hover {
  background: #c23321;
}

.twitter {
  border-color: #55acee;
  background: #55acee;
  composes: button;
}

.twitter:hover {
  background: #2795e9;
}

.icon {
  display: inline-block;
  margin: -2px 12px -2px 0;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  fill: currentColor;
}

.lineThrough {
  position: relative;
  z-index: 1;
  display: block;
  margin-bottom: 15px;
  width: 100%;
  color: #757575;
  text-align: center;
  font-size: 80%;
}

.lineThrough::before {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  margin-top: -5px;
  margin-left: -20px;
  width: 40px;
  height: 10px;
  background-color: #fff;
  content: '';
}

.lineThrough::after {
  position: absolute;
  top: 49%;
  z-index: -2;
  display: block;
  width: 100%;
  border-bottom: 1px solid #ddd;
  content: '';
}
</style>

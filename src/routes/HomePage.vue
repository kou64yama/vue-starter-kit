<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <h1>Vue.js News</h1>
      <p v-if="error">
        {{ error.message }}
      </p>
      <article v-for="item in items" :key="item.link" :class="$style.newsItem">
        <h1 :class="$style.newsTitle">
          <a :href="item.link">
            {{ item.title }}
          </a>
        </h1>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div :class="$style.newsDesc" v-html="item.content" />
      </article>
      <p v-if="loading">
        Loading...
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import TitleMixin from '@/mixins/TitleMixin';
import { NewsItem } from '@/store/news';

const news = namespace('news');

@Component({
  title: 'Home',
  asyncData: ({ store }) => store.dispatch('news/fetch'),
})
export default class HomePage extends Mixins(TitleMixin) {
  @news.State('items')
  public items!: NewsItem[];

  @news.State('loading')
  public loading!: boolean;

  @news.State('error')
  public error!: Error | null;
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

.newsItem {
  margin: 0 0 2rem;
}

.newsTitle {
  font-size: 1.5rem;
}

.newsDesc /deep/ {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1.125rem;
  }

  pre {
    white-space: pre-wrap;
    font-size: 0.875rem;
  }

  img {
    max-width: 100%;
  }
}
</style>

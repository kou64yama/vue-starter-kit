/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in https://github.com/kriasoft/react-starter-kit.
 */

import { GraphQLList as List } from 'graphql';
import fetch from 'node-fetch';
import NewsItemType from '../types/NewsItemType';

// React.js News Feed (RSS)
const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  'https://medium.com/feed/the-vue-point',
)}`;

interface Item {
  title: string;
  link: string;
  author?: string;
  pubDate: string;
  content?: string;
}

let items: Item[] = [];
let lastFetchTask: Promise<Item[]> | null;
let lastFetchTime = 0;

const news = {
  type: new List(NewsItemType),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if (Date.now() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
      lastFetchTime = Date.now();
      lastFetchTask = fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'ok') {
            items = data.items;
          }

          lastFetchTask = null;
          return items;
        })
        .catch(err => {
          lastFetchTask = null;
          throw err;
        });

      if (items.length) {
        return items;
      }

      return lastFetchTask;
    }

    return items;
  },
};

export default news;

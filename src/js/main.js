require('6to5/polyfill');

import Feed from './modules/feed.js';

let feed = new Feed();
feed.render();
feed.bindSearch();

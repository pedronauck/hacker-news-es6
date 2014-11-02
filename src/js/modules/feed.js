let $ = require('jquery');
import HackerNews from './hacker-news.js';

class Feed {
  constructor() {
    this.items = [];
  }
  render() {
    let $feed = $('.feed');

    this.fetchItems((items) => this.renderList(items));
  }
  bindSearch() {
    let $search = $('.search-input');

    $search.on('input', ev => {
      let value = ev.target.value;
      let regexp = new RegExp(value, 'i');
      let filteredItems = this.items.filter(item => {
        return regexp.test(item.title);
      });

      this.renderList(filteredItems);
    });
  }
  fetchItems(cb) {
    let newsService = new HackerNews();
    let news = newsService.fetchNews();

    news.success(data => {
      this.items = data.items;
      cb(data.items);
    });
  }
  renderList(items) {
    let $feed = $('.feed');
    let list = items.map(item => {
      return `<li>
        <a href=${item.url} target='_blank'>${item.title}</a>
      </li>`;
    });

    $feed.html('');
    $feed.append(list);
  }
};

export default Feed;

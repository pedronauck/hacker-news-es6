let $ = require('jquery');
import HackerNews from './hacker-news.js';

class Feed {
  render() {
    let $feed = $('.feed');
    let newsService = new HackerNews();
    let news = newsService.fetchNews();

    news.success(data => {
      data.items.forEach(item => {
        $feed.append(`<li>
          <a href=${item.url} target='_blank'>${item.title}</a>
        </li>`);
      });
    });
  }
};

export default Feed;

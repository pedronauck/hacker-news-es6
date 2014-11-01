let $ = require('jquery');

class HackerNews {
  constructor() {
    this.apiUrl = 'http://api.ihackernews.com';
  }
  fetchNews() {
    let url = `${this.apiUrl}/page`;

    return $.ajax({
      url: url,
      dataType: 'jsonp',
      data: { format: 'jsonp' },
    });
  }
};

export default HackerNews;

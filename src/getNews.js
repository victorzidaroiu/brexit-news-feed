// Using require instead of ES6 imports because ES6 imports only work using
// 'use latest', however that breaks async/await (ie: regeneratorRuntime error)

const axios = require('axios');

const MAX_ARTICLES = 5;
const NEWSAPI_BASE_URL = 'https://newsapi.org/v2';

module.exports = async (ctx, callback) => {
  const { NEWSAPI_API_KEY } = ctx.data;

  try {
    const { status, data } = await axios.get(`${NEWSAPI_BASE_URL}/everything?pageSize=${MAX_ARTICLES}&q=brexit&apiKey=${NEWSAPI_API_KEY}`);

    if (status < 200 || status > 299 || data.status !== 'ok') {
      throw new Error('NewsAPI request failed');
    }

    const headlines = data.articles.reduce((acc, { title, content, publishedAt: date }) => {
      if (!title || !content) {
        return acc;
      }

      return [
        ...acc, {
          title,
          content,
          date,
        },
      ];
    }, []);

    callback(null, headlines);
  } catch (e) {
    callback(e);
  }
};

const axios = require('axios');
const getNews = require('./getNews');
const newsAPISuccessResponse = require('../tests/fixtures/newsAPI/success');
const getNewsSuccessResponse = require('../tests/fixtures/getNews/success');

jest.mock('axios');

const callbackMock = jest.fn();

describe('The getNews function', () => {
  describe('When the API call to NewsAPI is successful', () => {
    beforeEach(() => {
      axios.get.mockReturnValueOnce(Promise.resolve(newsAPISuccessResponse));

      getNews({
        data: {
          NEWSAPI_API_KEY: 'API-KEY',
        },
      }, callbackMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('will make one call to get the news articles from NewsAPI', () => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('https://newsapi.org/v2/everything?pageSize=5&q=brexit&apiKey=API-KEY');
    });

    it('will return the news articles', () => {
      expect(callbackMock).toHaveBeenCalledTimes(1);
      expect(callbackMock).toBeCalledWith(null, getNewsSuccessResponse);
    });
  });

  describe('When the API call to NewsAPI fails', () => {
    beforeEach(() => {
      axios.get.mockReturnValueOnce(Promise.reject(new Error('Network error')));

      getNews({
        data: {
          NEWSAPI_API_KEY: 'API-KEY',
        },
      }, callbackMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('will make one call to get the news articles from NewsAPI', () => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('https://newsapi.org/v2/everything?pageSize=5&q=brexit&apiKey=API-KEY');
    });

    it('will return an error', () => {
      expect(callbackMock).toHaveBeenCalledTimes(1);
      expect(callbackMock).toHaveBeenCalledWith(new Error('Network error'));
    });
  });
});

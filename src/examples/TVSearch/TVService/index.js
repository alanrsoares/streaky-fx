type SearchTopics = "shows" | "people";

const CACHE_PREFIX = "streaky-demo";

export class TVService {
  baseUrl: string;

  constructor(baseUrl: string = "https://api.tvmaze.com") {
    this.baseUrl = baseUrl;
  }

  getCacheKey(topic, term) {
    return `${CACHE_PREFIX}/${topic}/${term}`;
  }

  cacheResult = (topic: SearchTopics, term: string) => (
    result: Array<Object>
  ) => {
    localStorage.setItem(this.getCacheKey(topic, term), JSON.stringify(result));
    return Promise.resolve(result);
  };

  search(topic: SearchTopics, term: string) {
    const path = `${this.baseUrl}/search/${topic}?q=${term}`;
    const cacheKey = this.getCacheKey(topic, term);

    return new Promise(resolve => {
      const cachedValue = JSON.parse(localStorage.getItem(cacheKey));

      if (cachedValue !== null) {
        console.log(
          `showing cached result for term: "${term}" in topic: "${topic}"`
        );
        return resolve(cachedValue);
      }

      fetch(path)
        .then(r => r.json())
        .then(this.cacheResult(topic, term))
        .then(resolve);
    });
  }

  searchShows(term: string) {
    return this.search("shows", term);
  }
}

export default new TVService();

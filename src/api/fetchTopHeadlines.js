module.exports=function fetchTopHeadlines(newsapi,categories){
  console.log(categories);
    return newsapi.v2.topHeadlines({
        // sources: 'bbc-news,the-verge',
        q: 'india',
        // category: categories,
        language: 'en',
        country: 'in',
        pageSize:8
      }).then(response => {
        // console.log(response);
        return response;
    });
}
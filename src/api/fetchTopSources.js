module.exports=function fetchTopSources(newsapi,country){
      return newsapi.v2.sources({
          // sources: 'bbc-news,the-verge',
          language: 'en',
          country: country,
          page:1,
          pageSize:5
        }).then(res => {
            const response = res.sources.slice(0,3);
        //   console.log(response);
          return response;
      });
  }
module.exports=function fetchNationalNews(newsapi){
    return newsapi.v2.topHeadlines({
        q: 'india',
        language: 'en',
        country: 'in',
        sortBy: 'popularity',
        page: 10
      }).then(response => {
      //   console.log(response);
        return response;
    });
}
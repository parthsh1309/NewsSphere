
document.addEventListener("DOMContentLoaded", function () {
  const splide = new Splide( '#topHeadline', {
    type  : 'fade',
    rewind: true,
  } );
  
  splide.mount();

  var splide2 = new Splide( '#latestNews', {
    type   : 'loop',
    perPage: 2,
    focus  : 'center',
  } );
  
  splide2.mount();
});
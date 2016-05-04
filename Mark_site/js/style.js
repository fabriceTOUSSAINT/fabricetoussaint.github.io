
 $(function(){
  $("img.lazy").lazyload({
    effect: "fadeIn"
  });
});

 $(function(){
    $.stellar({
      horizontalScrolling: false
    });
  });
 
// with jQuery
$('#container').masonry({
  isFitWidth: true,
  columnWidth: 375,
  gutter: 35,
  itemSelector: '.item'
});


$(function(){
  $('.fluid').fluidbox();

});

var header = document.querySelector("#header");
 
new Headroom(header, {
  tolerance: {
    down : 2,
    up : 5
  },
  offset : 170,
  classes: {
    initial: "slide",
    pinned: "slide--reset",
    unpinned: "slide--up"
  }
}).init();


function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

$("#link").click(function() {
   scrollToAnchor('about');
});
$("#link2").click(function() {
   scrollToAnchor('work');
});



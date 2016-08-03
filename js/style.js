
$(document).ready(function(){


var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
if ((is_chrome)&&(is_safari)) { is_safari = false; }
if ((is_chrome)&&(is_opera)) { is_chrome = false; }

  $('#logo').css('opacity', 0);

  var waypoint = new Waypoint({
 element: document.getElementById('about'),
 handler: function() {
     $('#logo').addClass('fadeInRight');
     $('#email').addClass('fadeInLeft');
   }
 }, { offset: '10%' });

$('#hfirst').addClass("animated fadeInLeft");
$('#hsecond').addClass("animated fadeInLeft");
$('#hthird').addClass("animated fadeInLeft");
$('#hfourth').addClass("animated fadeInLeft");


if (is_safari || is_explorer){
  $("#hero").removeClass("parallax").addClass("safariHero");
  $("#about").removeClass("parallax").addClass("safariAbout");
}

$(".about.parallax").parallax({
  imageSrc: 'images/fab.jpg',
  positionY: 'bottom',
  iosFix: true,
  androidFix: true
});

$(".parallax").parallax({
  imageSrc: 'images/hero-bg.jpg',
  positionY:'-150px',
  iosFix: true,
  androidFix: true
});

$("figure a").click(function(){
    $('html, body').animate({
        scrollTop: $("#content").offset().top
    });
});


});


$(document).ready(function(){

  $('#logo').css('opacity', 0);

  var waypoint = new Waypoint({
 element: document.getElementById('about'),
 handler: function() {
     $('#logo').addClass('fadeInRight');
     $('#email').addClass('fadeInLeft');
   }
 }, { offset: '10%' });







$(".about").parallax({
  imageSrc: 'images/fab.jpg',
  positionY: 'bottom'
});

$(".hero").parallax({
  imageSrc: 'images/hero-bg.jpg',
  positionY:'-150px'
});

});

var newHash     = '',
   $mainContent = $('#content');

$('.switch-button').delegate('a', 'click', function() {
    window.location.hash = $(this).attr('href');
    return false;
});

// Not all browsers support hashchange
// For older browser support: http://benalman.com/projects/jquery-hashchange-plugin/
$(window).bind('hashchange', function() {
    newHash = window.location.hash.substr(1);
    $mainContent.load(newHash + " #content > *");
});

// Create an immediately invoked functional expression to wrap our code

(function() {

  // Define our constructor 
  this.Modal = function() {

    // Create global element references
    this.closeButton = null;
    this.modal = null;
    this.overlay = null;
    this.emailButton = null;
    this.orderPrint = null;


    // Determine proper prefix
    this.transitionEnd = transitionSelect();

    // Define option defaults 
    var defaults = {
      autoOpen: false,
      className: 'fade-and-drop',
      closeButton: true,
      emailButton: true,
      orderPrint: true,
      content: "",
      maxWidth: 1900,
      minWidth: 280,
      overlay: true
    }

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }

    if(this.options.autoOpen === true) this.open();

  }

  // Public Methods

  Modal.prototype.close = function() {
    var _ = this;

    this.modal.className = this.modal.className.replace(" scotch-open", "");
    this.overlay.className = this.overlay.className.replace(" scotch-open",
      "");
    this.modal.addEventListener(this.transitionEnd, function() {
      _.modal.parentNode.removeChild(_.modal);
    });
    this.overlay.addEventListener(this.transitionEnd, function() {
      if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
    });
  }

  Modal.prototype.open = function() {
    buildOut.call(this);
    initializeEvents.call(this);
    window.getComputedStyle(this.modal).height;
    this.modal.className = this.modal.className +
      (this.modal.offsetHeight > window.innerHeight ?
        " scotch-open scotch-anchored" : " scotch-open");
    this.overlay.className = this.overlay.className + " scotch-open";
  }

  // Private Methods

  function buildOut() {

    var content, contentHolder, docFrag;

    /*
     * If content is an HTML string, append the HTML string.
     * If content is a domNode, append its content.
     */

    if (typeof this.options.content === "string") {
      content = this.options.content;
    } else {
      content = this.options.content.innerHTML;
    }

    // Create a DocumentFragment to build with
    docFrag = document.createDocumentFragment();

    // Create modal element
    this.modal = document.createElement("div");
    this.modal.className = "scotch-modal " + this.options.className;
    this.modal.style.minWidth = this.options.minWidth + "px";
    this.modal.style.maxWidth = this.options.maxWidth + "px";

    // If closeButton option is true, add a close button
    if (this.options.closeButton === true) {
      this.closeButton = document.createElement("button");
      this.closeButton.className = "scotch-close close-button";
      this.closeButton.innerHTML = "&times;";
      this.modal.appendChild(this.closeButton);
    }

    // If emailButton option is true, add button
    // if(this.options.emailButton === true){
    //     this.emailButton = document.createElement("button");
    //     this.emailButton.className = "contact-photog btn";
    //     this.emailButton.innerHTML = "Contact Photogapher";
    //     this.modal.appendChild(this.emailButton);
    // }



    // If emailButton option is true, add button
    if(this.options.orderPrint === true){
        this.orderPrint = document.createElement("button");
        this.orderPrint.className = "orderPrint btn";
        this.orderPrint.innerHTML = "Order Print";
        this.modal.appendChild(this.orderPrint);
    }

    // If overlay is true, add one
    if (this.options.overlay === true) {
      this.overlay = document.createElement("div");
      this.overlay.className = "scotch-overlay " + this.options.className;
      docFrag.appendChild(this.overlay);
    }

    // Create content area and append to modal
    contentHolder = document.createElement("div");
    contentHolder.className = "scotch-content";
    contentHolder.innerHTML = content;
    this.modal.appendChild(contentHolder);

    // Append modal to DocumentFragment
    docFrag.appendChild(this.modal);

    // Append DocumentFragment to body
     document.body.appendChild(docFrag);

    // var sp1 = document.createElement("div");
    // var block = document.getElementById('here');
    // var parentJawn = block.parentNode;
    // parentJawn.insertBefore(docFrag, block);

  }

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  function initializeEvents() {

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
      this.closeButton.addEventListener('click', playSlide.bind(this));
    }                                               

    if (this.overlay) {

      this.overlay.addEventListener('click', this.close.bind(this));
      this.overlay.addEventListener('click', playSlide.bind(this));
      
    }
    if(this.emailButton){
        this.emailButton.addEventListener('click', selectPhoto.bind(this));
    }
    if(this.orderPrint){
      this.orderPrint.addEventListener('click',orderPrint.bind(this));
    }

  }

  function transitionSelect() {
    var el = document.createElement("div");
    if (el.style.WebkitTransition) return "webkitTransitionEnd";
    if (el.style.OTransition) return "oTransitionEnd";
    return 'transitionend';
  }

}());

                      

$('.over-block').click(function(){
   $('.slider').slick('slickPause');
   console.log('here');
    var src = $(this).next().attr("src");
   // var modalContent = "<div class='modal-info'><div class='row'><h1 class='col-sm-8'>Interested In this photo?</h1><img src='" + src + "' class='col-sm-4 modal-img'><p>Contact Our photographer</p><form class='form-inline' method='post' action='mailto:fabtoussaint@gmail.com'> <div class='form-group'> <input type='text' class='form-control' id='inputName' placeholder='Name'> </div><div class='form-group'> <input type='email' class='form-control' id='inputEmail' placeholder='Email'> </div><button type='submit' class='btn btn-primary' value='Send Email'>Contact Photographer</button></form></div></div>";
  var modalContent ="<img class='big' src='" + src +"'>";
    var myModal = new Modal({
        content: modalContent
    });

    $('.contact-photog').click(function(){
        console.log("here");
    });

    myModal.open();
});


$('.your-class').click(function(){
 
  $('.your-class').slick('slickPause');
});


      $('.your-class').slick({
  dots: false,
  infinite: true,
  slidesToShow: 1,
  swipe:true,
  centerMode: true,
  pauseOnHover: true,
  variableWidth: true,
  slidesToScroll: 1,
    autoplay: true,
autoplaySpeed: 750,
arrows: false,
 speed: 4000,
  cssEase: 'ease-in-out',
asNavFor: '.slider-nav'



});
     $('.slider-nav').slick({

  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  pauseOnHover: true,
  centerMode: true,
  autoplay: true,
  asNavFor: '.your-class',
  dots: false,
  variableWidth: true,
  arrows: false,
  autoplaySpeed: 750,
 speed: 4000,
  cssEase: 'ease-in-out',
  focusOnSelect: true
});
   



$('#scroll').bind('mousewheel', function (e) {

    $(this).scrollTop($(this).scrollTop() - e.originalEvent.wheelDeltaY);

    //prevent page fom scrolling
    return false;

});

function orderPrint(){
var src = $('.big').attr("src");
  var printContent = "<div class=modal-info><div class=row><p>Contact Our photographer</p><form class=form-inline method=post action=mailto:fabtoussaint@gmail.com><div class=form-group><input class=form-control id=inputName placeholder=Name></div><div class=form-group><input type=email class=form-control id=inputEmail placeholder=Email></div><button type=submit class='btn btn-primary' value='Send Email'>Click Here</button></form></div></div>";

var printModal = new Modal({
        content: printContent
    });

printModal.open();
}



      function playSlide(){
        $('.slider').slick('slickPlay');
      }

function selectPhoto(){

    console.log("TST");
    $('.your-class').slick('slickPause', 'true');
    var currSrc = $('.modal-img').attr('src');
    var httpsAddr ="file:///Users/fabricetoussaint/Desktop/Code/projects/AU/site/";
    var mail ="mailto:mechellelavell@me.com?subject=Interested%20In%20Photo&body=";
    var fullSrc = httpsAddr.concat(currSrc);
console.log(currSrc);
    var yourMessage = "Hello, I'm interested in this photo: " + fullSrc;
    var subject = "Interested in a photo";
    document.location.href = "mailto:mechellelavell@me.com?subject="
        + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(yourMessage);

  }



  // $(".contact-photog").click(selectPhoto);



































//window.onbeforeunload = function(){ window.scrollTo(0,0); }
$( document ).ready(function() {

  var hamburger = $('.burger-wrap');
  var menuImage = $('#js-menu-image');
  var menuCover = $('.menu');
  var imageCounter = 1;
  var addAnimationHere = $('.menu .animation');
  var button = $('.c-button')
  var body = $('body')


  if($(".logo").offset().top > 50) {
      $('.menu .wow').each(function(){
          $(this).addClass('menu-fix');
      });
  }


  //open menu
  function openMenu() {
    body.addClass('lock');
    menuCover.addClass('open');
    hamburger.addClass('active');
    addAnimationHere.addClass('fadeInUp animated');
    setTimeout(function(){
       menuImage.addClass('active')
    },700);
    return false;
  };
  //close menu
  function closeMenu() {
    body.removeClass('lock');
    menuImage.removeClass('active')
    addAnimationHere.removeClass('fadeInUp animated');

    setTimeout(function(){
      menuCover.removeClass('open');
      hamburger.removeClass('active');

      imageCounter++;
      checkImageCounter();
    },500);
    return false;
  }

  function checkImageCounter() {
    if(imageCounter == 2) {
      menuImage.removeClass('one')
      menuImage.addClass('two');
    }
    else if(imageCounter == 3) {
      menuImage.addClass('three')
      menuImage.removeClass('two')
    }
    else if(imageCounter == 4) {
      menuImage.addClass('fourth')
      menuImage.removeClass('three')
    }
    else if(imageCounter == 5) {
      menuImage.removeClass('fourth')
      menuImage.addClass('one')
      imageCounter == 1;
    }
  };

  //click functions
  $(hamburger).click(function() {
    if($(this).hasClass('active')) {
      closeMenu();
    }
    else {
      openMenu();
    };
  });


  $(window).scroll(function() {
    animatedOnScroll();
    scrollWhatWeDo();
  });
  animatedOnScroll();


  function scrollWhatWeDo() {
    if($('body').hasClass('main')) {
      var scroll = $(window).scrollTop();

      if (scroll >= $('.what-we-do-2').offset().top - 100) {
        $('.what-we-do-2 .image').addClass("active");
      } else {
        $('.what-we-do-2 .image').removeClass("active");
      }
    }
  }


  function animatedOnScroll() {
    var scroll = $(window).scrollTop();
    $('.our-work').each(function() {
      var that = $(this)

      if (scroll >= $(this).offset().top - 300) {
        $(this).addClass("open");
        $('.image-wrap img', this).addClass("fadeIn animated");
      } else {
        $(this).removeClass("open");
        $('.image-wrap img', this).removeClass("fadeIn animated");
      }

      $(".image-wrap", this).bind('mouseover', function () {
         $('.circle', that).addClass('active');
         $('.link', that).addClass('active');
      }).bind('mouseout', function () {
        $('.circle', that).removeClass('active');
        $('.link', that).removeClass('active');
      });

      $(".circle", this).bind('mouseover', function () {
         $('.image-wrap', that).addClass('active');
         $('.link', that).addClass('active');
      }).bind('mouseout', function () {
        $('.image-wrap', that).removeClass('active');
        $('.link', that).removeClass('active');
      });

      $(button).bind('mouseover', function () {
         $(this).addClass('is-hovered');
      }).bind('mouseout', function () {
        $(this).removeClass('is-hovered');
      });

    });
  }



  wow = new WOW({animateClass: 'animated', live: true})
  wow.init();

  $('.fixed-logo, .burger-wrap, .fixed-button, .fixed-number').midnight();

  $('#owl1').on('initialized.owl.carousel changed.owl.carousel', function(e) {
    if (!e.namespace)  {
      return;
    }
    var carousel = e.relatedTarget;
    $('.slider-counter').text(carousel.relative(carousel.current()) + 1 + ' / ' + carousel.items().length);
  }).owlCarousel({
    loop:true,
    margin:10,
    dots: false,
    animateIn: 'fadeIn',
    items: 1,
    navText : ["<img src='dist/img/arrow-left.svg'>","<img src='dist/img/arrow-right.svg'>"],
    nav:true
  });
});

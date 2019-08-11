import $ from 'jquery';
import 'slick-carousel';

let getWindowWidth = () => {
  return $(window).width();
};
let tabAtaptive = () => {
  if(getWindowWidth() <= 767 && !$('.tabs').hasClass('tabs-adaptive')) {
    $('.tabs').addClass('tabs-adaptive');
    $('.tabs-containers__item').each(function() {
      $(this).find('.tabs-slider').slick('unslick');
      $(this).find('.catalog__item').unwrap().unwrap();
    });
    $('.tabs-slider').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      dotsClass: 'dots',
      arrows: false,
    });
  }
  if(getWindowWidth() >= 768 && $('.tabs').hasClass('tabs-adaptive')) {
    $('.tabs').removeClass('tabs-adaptive');
    $('.tabs-containers__item').each(function() {
      $(this).find('.tabs-slider').slick('unslick');
      let items = $(this).find('.catalog__item');
      let slides = Math.floor(items.length / 4);
      let start = 0;
      let end = 4;
      for(let i = 0; i < slides+1; i++) {
        if (i !=0 ) {
          start = end;
          end = end + 4;
        }
        if (i == slides) {
          end = items.length;
        }
        let itemsCol = items.slice(start, end);
        itemsCol.wrapAll("<div class=\"tabs-slider__item\"><div class=\"catalog__list flex row-p\"></div></div>");
        console.log(itemsCol);
      }
    });
    $('.tabs-slider').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      dotsClass: 'dots',
      arrows: false,
    });
  }
};

$(document).ready(function(){
  $('.tabs-titles__item').click(function(e) {
    e.preventDefault();
    if(!$(this).hasClass('.active')) {
      $('.tabs-titles__item').not($(this)).removeClass('active');
      $(this).addClass('active');
      let id = $(this).attr('href');
      $('.tabs-containers__item').not(id).removeClass('active');
      $(id).addClass('active');
    }
  });
  $('.tabs-slider').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    dotsClass: 'dots',
    arrows: false,
  });
  tabAtaptive();
});

// $(window).load(function() {
//   //tabAtaptive();
// });
$(window).resize(function() {
  tabAtaptive();
});
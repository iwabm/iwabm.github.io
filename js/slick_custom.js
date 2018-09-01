$(function() {
     $('.slider-item').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: true,
          asNavFor: '.slider-thumb' //サムネイルのクラス名
     });
     $('.slider-thumb').slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: '.slider-item', //スライダー本体のクラス名
          focusOnSelect: true,
          arrows: false,
          dots: true,
          centerMode: true,
     });
     $('.top-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3500,
            speed: 1000,
            arrows: false,
            dots: false,
            cssEase: 'ease-in',
            fade: true,
            pauseOnFocus: false,
            pauseOnHover: false         
     });
});
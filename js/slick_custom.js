// $(function() {
//      // $('.slider-item').slick({
//      //      infinite: false,
//      //      slidesToShow: 1,
//      //      slidesToScroll: 1,
//      //      arrows: true,
//      //      fade: true,
//      //      asNavFor: '.slider-thumb' //サムネイルのクラス名
//      // });
//      // $('.slider-thumb').slick({
//      //      asNavFor: '.slider-item', //スライダー本体のクラス名
//      //      infinite: false,
//      //      slidesToShow: 3,
//      //      slidesToScroll: 1,
//      //      focusOnSelect: true,
//      //      arrows: false,
//      //      dots: true,
//      //      centerMode: true,
//      //      centerPadding: '30%',
//      // });
//      $('.top-slider').slick({
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             autoplay: true,
//             autoplaySpeed: 3500,
//             speed: 1000,
//             arrows: false,
//             dots: false,
//             cssEase: 'ease-in',
//             fade: true,
//             pauseOnFocus: false,
//             pauseOnHover: false         
//      });     
// });

$( '.slider' ).each( function( i ) {
    var $_t = $( this );

    //スライダー部分
    $_t.find( '.slider-item' ).addClass( 'slider-item' + i ).slick( {
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: true,
          asNavFor: '.slider-thumb' + i
    } );
    //サムネール
    $_t.find( '.slider-thumb' ).addClass( 'slider-thumb' + i ).slick( {
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          focusOnSelect: true,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: '30%',
          asNavFor: '.slider-item' + i
    } );
} );
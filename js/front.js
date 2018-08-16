$(function () {
    highlightCurrentPage();
    highlightCurrentPage2();
});

function highlightCurrentPage() {
  $("a[href='" + location.href + "']").parent().addClass("active");
}

function highlightCurrentPage2() {
    $('.tag-link').each(function(){
	    var $href = $(this).attr('href');
	    if(location.href.match($href)) {
	        $(this).addClass('active');
	    } else {
	        $(this).removeClass('active');
	    }
	});
}
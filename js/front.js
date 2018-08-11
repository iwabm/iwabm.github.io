$(function () {
    highlightCurrentPage();
});

function highlightCurrentPage() {
  $("a[href='" + location.href + "']").parent().addClass("active");
}
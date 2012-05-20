$(document).ready(function(){
  $('.scroll-to-link a').click(function(event){
    $('.scroll-to-link a').parent('li').removeClass('active')
    $(this).parent('li').addClass('active')
    var target = '#' + $(this).data('scrollto');
    $.scrollTo($(target), 1000, { offset:-40 });
    event.preventDefault();
  });
});

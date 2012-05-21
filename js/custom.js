$(document).ready(function(){

  $('.scroll-to-link a').click(function(event){
    $('.scroll-to-link a').parent('li').removeClass('active')
    $(this).parent('li').addClass('active')
    var target = '#' + $(this).data('scrollto');
    $.scrollTo($(target), 1000, { offset:-40 });
    event.preventDefault();
  });

  var env = 'dev';

  var urls = {
    dev:  'http://localhost:3000/posts.json?callback=parseComments',
    prod: 'http://falling-light-4652.herokuapp.com/posts.json?callback=parseComments'
  }

  var parseComments = function(posts){
    $('#posts').html('');
    $.each(posts, function(index, post){
      $('#posts').prepend('<tr><td>' + post.comment.replace(/\n/g, '<br />') + '</td></tr>');
    })
  }

  var getComments = function(){
    $.ajax({
      dataType: 'jsonp',
      url: urls[env],
      success: parseComments
    });
  };

  $('form#sign-guestbook').bind('submit', function(event){
    var form = $(this);
    $.ajax({
      type: 'POST',
      data: form.serialize(),
      url: urls[env],
      complete: function(){
        form[0].reset();
        getComments();
      }
    });
    event.preventDefault();
  });

  getComments();

});

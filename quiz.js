$(function() {
  'use strict';

  $('.answer').on('click', function() {
    var $selected = $(this);
    $selected.addClass("selected");
    if ($selected.hasClass('correct') || $selected.hasClass('wrong')) {
      return;
    }
    var answer = $selected.text();

    $.post('/dotinstall/quiz/_answer.php', {
          answer: answer
    }).done(function(res) {
      //alert(res.correct_answer);
      $('.answer').each(function() {
        if ($(this).text() === res.correct_answer) {
            $(this).addClass('correct');
          }else {
            $(this).addClass('wrong');
          }
      })
      if (answer === res.correct_answer) {
        // correct!
        $selected.text(answer + "....correct!");
      } else {
        // wrong!
        $selected.text(answer + ".....wrong!");
      }

      $('#btn').removeClass('disabled');
    });
  });

  $('#btn').on('click', function() {
    if (!$(this).hasClass('disabled')) {
      location.reload();
    }
  });

});

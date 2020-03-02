$(function (){
  $('#text1').bind('copy', function() {
    highlight($(this)[0]);
  });
  $('#text2').bind('copy', function() {
    highlight($(this)[0]);
  });
  $('#text1').bind('paste', function() {
    paste($(this)[0]);
  });
  $('#text2').bind('paste', function() {
    paste($(this)[0]);
  });



  $('#paste').on('click',function(){
    paste($('#text2'));
  })
  function highlight(currentText) {
    $('#clipboard').text("");
    var start = currentText.selectionStart;
    var end =currentText.selectionEnd;
    var selection = currentText.value.substring(start,end);
    console.log(selection);
    $('#clipboard').text(selection);
  }

  function paste (textBox){
    var currentText = $('#clipboard').text();
    var start = textBox[0].selectionStart;
    var firstChunk = textBox.val().substring(0,start);
    var endChunk = textBox.val().substring(start);
    textBox.val(firstChunk+ currentText + endChunk);

  }
});

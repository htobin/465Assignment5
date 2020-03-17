//main function
$(function (){
  //copy to clipboard from textbox 1
  $('#text1').bind('copy', function() {
    highlight($(this)[0]);
  });
  //copy to clipboard from textbox 2
  $('#text2').bind('copy', function() {
    highlight($(this)[0]);
  });

  //paste to textbox 1 with PASTE button
  $('#paste').on('click',function(){
    paste($('#text1'));
  });
  //paste to textbox 2 with PASTE button
  $('#paste').on('click',function(){
    paste($('#text2'));
  });

  //function that highlights the text that will be pasted to clipboard
  //parameter: currentText, text that will be highlighted
  function highlight(currentText) {
    $('#clipboard').text("");
    var start = currentText.selectionStart;
    var end =currentText.selectionEnd;
    var selection = currentText.value.substring(start,end);
    console.log(selection);
    $('#clipboard').text(selection);
  }

  //function that pastes from ta cliboard to textbox
  //parameter:textBox, the target textbox that will be pasted in
  function paste (textBox){
    var currentText = $('#clipboard').text();
    var start = textBox[0].selectionStart;
    var firstChunk = textBox.val().substring(0,start);
    var endChunk = textBox.val().substring(start);
    textBox.val(firstChunk+ currentText + endChunk);

  }
});

//main function
$(function (){

  var startForCut = 0;
  var endForCut = 0;
  var cutFromThisBox = null;
  //Functions to copy from one textbox to another
  //take copy from clipboard to textbox1
  $('#text1').bind('copy', function(e) {
    e.preventDefault();
    paste($('#text1'));
  });
  //take copy from clipboard to textbox2
  $('#text2').bind('copy', function(e) {
    e.preventDefault();
    paste($('#text2'));
  });

  //Functions to copy from one textbox to another
  //take copy from clipboard to textbox1
  $('#text1').bind('cut', function(e) {
    e.preventDefault();
    var startIndex = $(this)[0].selectionStart;
    var endIndex = $(this)[0].selectionEnd;
    cutFromInitialHighlight(cutFromThisBox);
    paste($('#text1'), startIndex, endIndex);
  });
  //take copy from clipboard to textbox2
  $('#text2').bind('cut', function(e) {
    e.preventDefault();
    var startIndex = $(this)[0].selectionStart;
    var endIndex = $(this)[0].selectionEnd;
    cutFromInitialHighlight(cutFromThisBox);
    paste($('#text2'), startIndex, endIndex);
  });


  //paste to textbox 1 with PASTE button
  $('#paste').on('click',function(){
    paste($('#text1'));
  });
  //paste to textbox 2 with PASTE button
  $('#paste').on('click',function(){
    paste($('#text2'));
  });

  $('#text1').on('mouseup',function() {
      if(checkClipBoard())
      {
        cutFromThisBox = $(this);
        highlight($(this)[0]);
      }
  });

  $('#text2').on('mouseup',function() {
    if(checkClipBoard())
    {
      cutFromThisBox = $(this);
      highlight($(this)[0]);
    }
  });


  function checkClipBoard(){
    var clipboard = $('#clipboard');
    if(clipboard.text().length == 0)
    {
      return true;
    }
    return false;
  }

  function cutFromInitialHighlight(originalTextBox)
  {
    var firstChunk = originalTextBox.val().substring(0,startForCut);
    var endChunk = originalTextBox.val().substring(endForCut);
    originalTextBox.val(firstChunk + "" + endChunk);
  }

  //function that highlights the text that will be pasted to clipboard
  //parameter: currentText, text that will be highlighted
  function highlight(currentText) {
    //select initial text
    var start = currentText.selectionStart;
    var end =currentText.selectionEnd;

    //keep track of indexes of text
    startForCut = start;
    endForCut = end;

    var selection = currentText.value.substring(start,end);
    $('#clipboard').text(selection);
    $('#clipboard').val(selection);

  }

  //function that pastes from ta cliboard to textbox
  //parameter:textBox, the target textbox that will be pasted in
  function paste (textBox, startIndex, endIndex){
    var currentText = $('#clipboard').text();

    //highlight the text that wil be removed
    // var startOfhighlightedText = textBox[0].selectionStart;
    // var endOfhighlightedText =textBox[0].selectionEnd;
    var firstChunk = textBox.val().substring(0, startIndex);
    var endChunk = textBox.val().substring(endIndex);
    textBox.val(firstChunk + currentText + endChunk);


    //clear the textbox
    var clipboard = $('#clipboard');
    clipboard.val("");
    clipboard.text("");
  }
});

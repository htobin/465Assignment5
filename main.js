//main function
$(function (){

  //global variables for finding where to cut
  var startForCut = 0;
  var endForCut = 0;
  var cutFromThisBox = null;



  //Copying functions
  //copy hotkey is pressed in textbox 1
  $('#text1').bind('copy', function(e) {
    //change function of copy hotkey
    e.preventDefault();

    //where find where to paste
    var startIndex = $(this)[0].selectionStart;
    var endIndex = $(this)[0].selectionEnd;

    //paste within the indexes
    paste($('#text1'),startIndex,endIndex);
  });

  //copyhotkey is pressed in textbox2, see comments of first copy function
  $('#text2').bind('copy', function(e) {
    e.preventDefault();
    var startIndex = $(this)[0].selectionStart;
    var endIndex = $(this)[0].selectionEnd;
    paste($('#text2'),startIndex,endIndex);
  });

  //Functions to cut
  $('#text1').bind('cut', function(e) {
    e.preventDefault();

    //finding index where to paste to
    var startIndex = $(this)[0].selectionStart;
    var endIndex = $(this)[0].selectionEnd;

    //find the intial box that was cut from
    cutFromInitialHighlight(cutFromThisBox);

    //paste in the appropriate textbox
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


  //call to clipboard check
  $('#text1').on('mouseup',function() {
      if(checkClipBoard())
      {
        cutFromThisBox = $(this);
        highlight($(this)[0]);
      }
  });

  //call to clipboard check
  $('#text2').on('mouseup',function() {
    if(checkClipBoard())
    {
      cutFromThisBox = $(this);
      highlight($(this)[0]);
    }
  });

  //check if anything is in the clipboard
  function checkClipBoard(){
    var clipboard = $('#clipboard');
    if(clipboard.text().length == 0)
    {
      return true;
    }
    return false;
  }

  //check which textbox is being cut from
  function cutFromInitialHighlight(originalTextBox)
  {
    //take the substring being cut out from the textbox
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

    //put text into clipboard
    var selection = currentText.value.substring(start,end);
    $('#clipboard').text(selection);
    $('#clipboard').val(selection);

  }

  //function that pastes from ta clipoard to textbox
  //parameter:textBox, the target textbox that will be pasted in
  function paste (textBox, startIndex, endIndex){
    var currentText = $('#clipboard').text();


    var firstChunk = textBox.val().substring(0, startIndex);
    var endChunk = textBox.val().substring(endIndex);
    textBox.val(firstChunk + currentText + endChunk);


    //clear the textbox
    var clipboard = $('#clipboard');
    clipboard.val("");
    clipboard.text("");
  }
});

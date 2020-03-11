// global variable for clipboard
var clip = [];
//global variables for finding where to cut
var startForCut = 0;
var endForCut = 0;
var activeTextBox = null;
var cutFromThisBox = null;

/*
 * BUTTON FUNCTIONS
*/

// function that copies clipboard into current active textbox
function copy() {
    var clipboard = document.getElementById('clipboard').innerHTML;
    
    if (activeTextBox.id === 'text1') {
        paste("text1", clipboard, startForCut, endForCut);
    } else {
        paste("text2", clipboard, startForCut, endForCut);
    }
}

// function that cuts clipboard into current active textbox
function cut() {
    var clipboard = document.getElementById('clipboard').innerHTML;
    
    if (activeTextBox.id === 'text1') {
        paste("text1", clipboard, startForCut, endForCut);
        paste(cutFromThisBox.id, "", cutFromThisBox.selectionStart, cutFromThisBox.selectionEnd);
    } else {
        paste("text2", clipboard, startForCut, endForCut);
        paste(cutFromThisBox.id, "", cutFromThisBox.selectionStart, cutFromThisBox.selectionEnd);
    }
}

/*
 * KEYBOARD FUNCTIONS
 * Credit: Hoku Tobin
*/

  //take copy from clipboard to textbox1.
  $('#text1').bind('copy', function(e) {
    e.preventDefault();
    var clipboard = document.getElementById('clipboard').innerHTML;
    paste("text1", clipboard, startForCut, endForCut);
  });

  //take copy from clipboard to textbox2.
  $('#text2').bind('copy', function(e) {
    e.preventDefault();
    var clipboard = document.getElementById('clipboard').innerHTML;
    paste("text2", clipboard, startForCut, endForCut);
  });

  //take cut from clipboard to textbox1.
  $('#text1').bind('cut', function(e) {
    e.preventDefault();
    var clipboard = document.getElementById('clipboard').innerHTML;
    paste("text1", clipboard, startForCut, endForCut);
    paste(cutFromThisBox.id, "", cutFromThisBox.selectionStart, cutFromThisBox.selectionEnd);
  });

  //take cut from clipboard to textbox2.
  $('#text2').bind('cut', function(e) {
    e.preventDefault();
    var clipboard = document.getElementById('clipboard').innerHTML;
    paste("text2", clipboard, startForCut, endForCut);
    paste(cutFromThisBox.id, "", cutFromThisBox.selectionStart, cutFromThisBox.selectionEnd);
  });
  
/*
 * OTHER FUNCTIONS
*/

// function handles string manipulation for pasting clipboard.
// credit: Hoku Tobin
function paste(dest, clip, cutStart, cutEnd) {
    var box = document.getElementById(dest);
    var firstChunk = box.innerHTML.substring(0,cutStart);
    var endChunk = box.innerHTML.substring(cutEnd);
    box.innerHTML = firstChunk + clip + endChunk;
}

// function that updates clipboard history.
function clipHistory() {
    var ret = "Clipboard History:\n<ol>";
    
    for (var i = 0; i < clip.length; i++) {
        ret += "<li>" + clip[i] + "</li>";
    }
    ret += "</ol>\n";
    document.getElementById('clip-history').innerHTML = ret;
}

/* 
 * copies selection from either textbox and saves it into clipboard.
 * code inspired from: 
 * https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement
*/
function onMouseUp(e) {
    activeTextBox = document.activeElement;
    var selection;

    selection = activeTextBox.value.substring(
        activeTextBox.selectionStart, activeTextBox.selectionEnd
    );
    
    startForCut = activeTextBox.selectionStart;
    endForCut = activeTextBox.selectionEnd;

    if (selection != "") {
      cutFromThisBox = activeTextBox;
      document.getElementById('clipboard').innerHTML = selection;
      document.getElementById('clipboard').value = selection;
      clip.push(selection);
      clipHistory();
    }
}

document.getElementById('text1').addEventListener('mouseup', onMouseUp, false);
document.getElementById('text2').addEventListener('mouseup', onMouseUp, false);


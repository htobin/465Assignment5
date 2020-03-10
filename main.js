// global variable for clipboard
var clip = [];
//global variables for finding where to cut
var startForCut = 0;
var endForCut = 0;
var activeTextBox = null;

// function that copies clipboard into current active textbox
function copy() {
    var clipboard = document.getElementById('clipboard').innerHTML;
    
    if (activeTextBox.id === 'text1') {
        /* do paste */
        paste("text1", clipboard);
    } else {
        /* do paste */
        paste("text2", clipboard);
    }
}

// function that cuts clipboard into current active textbox
function cut() {
    var clipboard = document.getElementById('clipboard').innerHTML;
    
    if (activeTextBox.id === 'text1') {
        /* do paste */
        paste("text1", clipboard);
        document.getElementById('text2').innerHTML.replace(clipboard, '');
    } else {
        /* do paste */
        paste("text2", clipboard);
        document.getElementById('text1').innerHTML.replace(clipboard, '');
    }
}

// function handles string manipulation for pasting clipboard
// credit: Hoku Tobin
function paste(dest, clip) {
    var box = document.getElementById(dest);
    var firstChunk = box.innerHTML.substring(0,startForCut);
    var endChunk = box.innerHTML.substring(endForCut);
    box.innerHTML = firstChunk + clip + endChunk;
}

function clipHistory() {
    var ret = "Clipboard History:\n<ol>";
    
    for (var i = 0; i < clip.length; i++) {
        console.log(clip[i]);
        ret += "<li>" + clip[i] + "</li>";
    }
    ret += "</ol>\n";
    console.log(ret);
    document.getElementById('clip-history').innerHTML = ret;
}

/* 
 * copies selection from either textbox and saves it into clipboard
 * code inspired from: 
 * https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement
*/
function onMouseUp(e) {
    activeTextBox = document.activeElement;
    console.log(activeTextBox);
    var selection;

    selection = activeTextBox.value.substring(
        activeTextBox.selectionStart, activeTextBox.selectionEnd
    );

    startForCut = activeTextBox.selectionStart;
    endForCut = activeTextBox.selectionEnd;

    if (selection != "") {
      document.getElementById('clipboard').innerHTML = selection;
      document.getElementById('clipboard').value = selection;
      clip.push(selection);
      clipHistory();
    }
}

document.getElementById('text1').addEventListener('mouseup', onMouseUp, false);
document.getElementById('text2').addEventListener('mouseup', onMouseUp, false);


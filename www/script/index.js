
function sayIt(text) {
    if (text.length==0) {
        editAction();
        return;
    }
    var input =  document.getElementById('sayThis');
    var buttonSayIt = document.getElementById('buttonSayIt');
    var buttonEdit = document.getElementById('buttonEdit');
    var buttonClear = document.getElementById('buttonClear');
    var speech = new SpeechSynthesisUtterance(text);
    speech.addEventListener('start', function () {
        input.disabled=true;
        buttonSayIt.disabled=true;
        buttonEdit.disabled=true;
        buttonClear.disabled=true;
    });
    speech.addEventListener('end', function () {
        input.disabled=false;
        buttonSayIt.disabled=false;
        buttonEdit.disabled=false;
        buttonClear.disabled=false;
        editAction();
    });
    speech.lang = 'en-EN';
    speech.lang = 'de-DE';
    speech.pitch = 1.3;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
    log('say');
}


function clearInput() {
    document.getElementById('sayThis').value='';
    document.getElementById('sayThis').focus();
    log('clear');
}

function edit() {
    log('edit');
    editAction();
}

function editAction() {
    var input = document.getElementById('sayThis');
    input.focus();
    var len = input.value.length*2;
    input.setSelectionRange(len,len);
}

function log(action) {
    $.ajax( {
        url: 'do.html?action=' + action,
        success: function ( data ) {
            // Do nothing
        }
    } );
}

window.onload = function() {
    checkSpeechsynthesis();
    document.getElementById("sayThis").focus();
};

function checkSpeechsynthesis() {
    if (!Modernizr.speechsynthesis) {
        window.location = "noSpeech.html";
    }
}

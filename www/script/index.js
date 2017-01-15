var localVoice;
var localVoices = new Array();

var localLanguage = 'de';

var count = 0;
var init = 0;

function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
        return;
    }

    if (init == 1 || localVoices.length > 0) {
        console.log("already done");
        return;
    }

    var voices = speechSynthesis.getVoices();

    count++;
    console.log('count: ' + count);

    init = 1;
    for(var i = 0; i < voices.length ; i++) {
        var v = voices[i];
        localVoices.push(v);

        var option = document.createElement('option');
        option.textContent = v.name + ' (' + v.lang + ')';

        option.setAttribute('data-lang', v.lang);
        option.setAttribute('data-name', v.name);
        document.getElementById("voiceList").appendChild(option);
    }

    console.log(voices.length + ' voices added.');

    if (localVoices && localVoices.length>0) {
        document.getElementById('voiceListContainer').style.display='';
    }
    else {
        document.getElementById('voiceListContainer').style.display='none';
    }

}


if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function sayIt(text) {
    if (text.length == 0) {
        editAction();
        return;
    }

    var utterance = new SpeechSynthesisUtterance(text);

    if (localVoice) {
        utterance.voice = localVoice;
    }


    utterance.addEventListener('start', function () {
        /*
         input.disabled=true;
         buttonSayIt.disabled=true;
         buttonEdit.disabled=true;
         buttonClear.disabled=true;
         */
    });
    utterance.addEventListener('end', function () {
        /*
         input.disabled=false;
         buttonSayIt.disabled=false;
         buttonEdit.disabled=false;
         buttonClear.disabled=false;
         */
        editAction();
    });

    if (localLanguage) {
        utterance.lang = localLanguage;
    } else {
        utterance.lang = 'de';
    }

    utterance.pitch = 1.0;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
    log('say' + ((localVoice && typeof localVoice != 'undefined') ? ('&voice=' + localVoice.name + '(' + localVoice.lang + ')') : ''));
}


function clearInput() {
    document.getElementById('sayThis').value = '';
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
    var len = input.value.length * 2;
    input.setSelectionRange(len, len);
}

function log(action) {
    $.ajax({
        url: 'do.html?action=' + action,
        success: function (data) {
            // Do nothing
        }
    });
}



function updateVoice(select) {
    var myoption = select.options[select.selectedIndex];
    console.log(myoption);
    var lang = myoption.dataset.lang;
    var name = myoption.dataset.name;

    console.log('name = ' + name);
    if (name) {
        localVoice = localVoices.filter(function (voice) {
            return voice.name == name;
        })[0];
    } else {
        localVoice = null;
    }
}


window.onload = function () {
    checkSpeechsynthesis();
    document.getElementById("sayThis").focus();
    populateVoiceList();
};

function checkSpeechsynthesis() {
    if (!Modernizr.speechsynthesis) {
        window.location = "noSpeech.html";
    }
}














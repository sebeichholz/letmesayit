var localVoice;
var localVoices;

var languageList = {
    'de': 'Deutsch',
    'en': 'English',
    'fr': 'Francais',
};

var localLanguage;


function initLanguages() {
    var select = $("#languageList")[0];
    for (var lang in languageList) {
        select.add(new Option(languageList[lang], lang));
    }
}

function getVoices() {
    return new Promise(function (resolve, reject) {
        speechSynthesis.onvoiceschanged = function (e) {
            var voices = this.getVoices();
            if (voices.length > 0)
                resolve(voices); // Array with Voices
            else
                reject(voices); // Empty Array
        };
        speechSynthesis.getVoices();
    });
}


function sayIt(text) {
    if (text.length == 0) {
        editAction();
        return;
    }
    /*
     var input =  document.getElementById('sayThis');
     var buttonSayIt = document.getElementById('buttonSayIt');
     var buttonEdit = document.getElementById('buttonEdit');
     var buttonClear = document.getElementById('buttonClear');
     */
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
    log('say');
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


function initVoices() {

    getVoices().then(function (voices) {
        var select = $("#voiceList")[0];
        for (var i = 0; i < voices.length; i++) {
            console.log(voices[i].lang + ': ' + voices[i].name + ', localService=' + voices[i].localService);
            select.add(new Option(voices[i].name + ' (' + voices[i].lang + ', localService=' + voices[i].localService + ')', voices[i].name));
        }
        localVoices = voices;
        if (localVoices && localVoices.length>0) {
            document.getElementById('voiceListContainer').style.display='';
        }
        else {
            document.getElementById('voiceListContainer').style.display='none';
        }

    }, function (voices) {
        //$('#result').text(voices);
    });

}


function setActiveVoice(voiceName) {
    //alert("setActiveVoice: " + voiceName);
    if (voiceName) {

        localVoice = localVoices.filter(function (voice) {
            return voice.name == voiceName;
        })[0];

    }

}

function setActiveLanguage(langName) {
    if (langName) {
        localLanguage = langName;
    }
}

window.onload = function () {
    checkSpeechsynthesis();
    document.getElementById("sayThis").focus();
    initVoices();
    initLanguages();
};

function checkSpeechsynthesis() {
    if (!Modernizr.speechsynthesis) {
        window.location = "noSpeech.html";
    }
}







/*
function populateVoiceList() {

    if(typeof speechSynthesis === 'undefined') {
        return;
    }

    for(var i = 0; i < voices.length ; i++) {
        var option = '';
        option += voices[i].name + ' (' + voices[i].lang + ')';

        option += ', lang=' + voices[i].lang;
        option += ', name=' +  voices[i].name;
        document.getElementById('voices').innerHTML += (option + "<br/>");

        if (voices[i].lang.indexOf('de') != -1) {
            document.getElementById('voices_de').innerHTML += (option + "<br/>");
        }

        if (voices[i].lang.indexOf('en') != -1) {
            document.getElementById('voices_en').innerHTML += (option + "<br/>");
        }

    }
    document.getElementById("voiceCount").innerHTML = voices.length + ' Stimmen';
    document.getElementById("userAgent").innerHTML = navigator.userAgent;

}

stateChange();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

*/

new Vue({
    el: '#app',
    data: {
        sayThis: '',
        buttonsDisabled: false,
        activeVoiceName: null,
        localVoices: new Array(),
        count: 0,
        init: 0,
        selectedVoice: null,
        settingsVisible: false,
        xxx: null,
    },
    methods: {
        talk: function () {
            var self = this;

            if (this.sayThis.length == 0) {
                this.edit();
                return;
            }

            var utterance = new SpeechSynthesisUtterance(this.sayThis);

            utterance.addEventListener('start', function () {
                self.buttonsDisabled = true;

            });

            utterance.addEventListener('end', function () {
                self.buttonsDisabled = false;
                self.edit();
            });

            utterance.voice = null;
            if (this.selectedVoice && typeof this.selectedVoice != 'undefined') {
                //console.log('this.selectedVoice = --' + this.selectedVoice + '--');
                var v = null;
                for (var i=0; i < this.localVoices.length; i++) {
                    if (this.localVoices[i].name === this.selectedVoice) {
                        v = this.localVoices[i];
                    }
                }
                utterance.voice = v;
            }

            this.log('say' + ((utterance.voice && typeof utterance.voice != 'undefined') ? ('&voice=' + utterance.voice.name + '(' + utterance.voice.lang + ')') : ''));
            window.speechSynthesis.speak(utterance);

        },

        edit: function () {
            var input = document.getElementById('sayThis');
            var len = input.value.length * 2;
            input.setSelectionRange(len, len);
            setTimeout(function () {
                input.focus();
            }, 5);
        },

        clearInput: function () {
            this.sayThis = '';
            this.edit();
        },

        log: function (action) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'do.html?action=' + action);
            xhr.send();
        },

        checkSpeechsynthesis: function () {
            if (!Modernizr.speechsynthesis) {
                window.location = "noSpeech.html";
            }
        },

        populateVoiceList: function () {
            var self = this;
            if (typeof speechSynthesis === 'undefined') {
                return;
            }

            if (this.init == 1 || this.localVoices.length > 0) {
                console.log("already done");
                return;
            }

            var voices = speechSynthesis.getVoices();

            setTimeout(function () {
                self.populateVoiceListNew(voices)
            }, 500);



        },
        populateVoiceListNew: function (voices) {
            this.count++;
            console.log('count: ' + this.count);

            this.init = 1;
            for (var i = 0; i < voices.length; i++) {
                var v = voices[i];
                this.localVoices.push(v);

                var option = document.createElement('option');
                option.textContent = v.name + ' (' + v.lang + ')';

                option.setAttribute('data-lang', v.lang);
                option.setAttribute('data-name', v.name);
                //document.getElementById("voiceList").appendChild(option);
            }

            console.log(voices.length + ' voices added.');

            if (this.localVoices && this.localVoices.length > 0) {
                document.getElementById('voiceListContainer').style.display = '';
            }
            else {
                document.getElementById('voiceListContainer').style.display = 'none';
            }
        },
        selectVoice: function () {
            alert('selectVoice');
        },

        settings: function () {
            this.settingsVisible = !this.settingsVisible;
        }

    },
    mounted()
    {
        this.checkSpeechsynthesis();
        if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.populateVoiceList;
        };

        document.getElementById("sayThis").focus();

        this.populateVoiceList();

    },

    computed: {

    }
})














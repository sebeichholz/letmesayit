<template>
  <div>
    <div id="textarea">
      <textarea v-show="!settingsVisible" type="text" id="sayThis" v-model="sayThis" rows="2"
                v-bind:placeholder="$t('typeHere') + '...'"></textarea>
    </div>

    <!-- #####################  Buttons ###################### -->
    <div>
      <div id="divButtons" class="button-group">

        <a id="btnTalk" v-show="!settingsVisible" class="large success button noselect" @click="talk()"
           v-bind:disabled="buttonsDisabled">
           <font-awesome-icon icon="comment" style="font-size:250%"/>
           </a>
        <a id="btnEdit" v-show="!settingsVisible" class="large warning button noselect" @click="edit()"
           v-bind:disabled="buttonsDisabled">
           <font-awesome-icon icon="pen-to-square" style="font-size:250%"/>
           </a>
        <a id="btnClear" v-show="!settingsVisible" class="large alert button noselect" @click="clearInput()"
           v-bind:disabled="buttonsDisabled">
            <font-awesome-icon icon="trash-can" style="font-size:250%"/>
           </a>

        <a id="btnSettings" class="large button noselect" v-bind:class="{ hollow: !settingsVisible }"
           @click="settings()" v-bind:disabled="buttonsDisabled" v-show="localVoices.length>0">
            <font-awesome-icon icon="sliders" style="font-size:250%"/>
           </a>
      </div>
    </div>


    <div style="width: 100%;">
      <form id="settings" v-show="settingsVisible">
        <div class="row">
          <div class="medium-6 columns">

          </div>
          <div class="medium-6 columns" id="voiceListContainer" v-show="localVoices.length>0" style="display: none;">
            <label><b>{{ $t('voice') }}:</b>
              <!--<input style="margin: 0; margin-left: 1cm;" id="filter_voices" value="de" type="checkbox"/> nur deutsche Stimmen-->
              <select v-model="selectedVoice" id="selectVoice">
                <!--<option value="null">Standard</option>-->
                <option v-for="voice in localVoices" v-bind:value="voice.name">
                  {{ voice.lang + ' ' + voice.name }}
                </option>
              </select>
            </label>
          </div>
        </div>
      </form>
    </div>


  </div>
</template>

<script>



  export default {
  name: 'textbox',
  data () {
    return {
        sayThis: '',
        buttonsDisabled: false,
        activeVoiceName: null,
        localVoices: new Array(),
        count: 0,
        init: 0,
        selectedVoice: null,
        settingsVisible: false,
    }
  },
  methods: {
      talk: function () {
          var self = this;

          if (this.sayThis.length == 0) {
              this.edit();
              return;
          }

          var utterance = new SpeechSynthesisUtterance(this.sayThis.toLowerCase());

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
              for (var i = 0; i < this.localVoices.length; i++) {
                  if (this.localVoices[i].name === this.selectedVoice) {
                      v = this.localVoices[i];
                  }
              }
              utterance.voice = v;
          }

          var language = this.detectLanguage();
          this.log('say' + ((utterance.voice && typeof utterance.voice != 'undefined') ? ('&voice=' + utterance.voice.name + '(' + utterance.voice.lang + ')') : '') + '&lang=' + language);
          window.speechSynthesis.speak(utterance);

      },

      detectLanguage: function() {
        return navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
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
          //var xhr = new XMLHttpRequest();
          //xhr.open('GET', 'static/do.html?action=' + action);
          //xhr.send();
      },

      checkSpeechsynthesis: function () {
          if (!Modernizr.speechsynthesis) {
              window.location = "static/noSpeech.html";
          };
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
  mounted: function () {
    this.checkSpeechsynthesis();
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.populateVoiceList;
    }
    document.getElementById("sayThis").focus();

    this.populateVoiceList();

  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#textarea {
    margin: 0px;
}

#facebook {
    display: none;
}

#sayThis {
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    font-size: 120%;
    margin: 0px;
    height: 1.5em;
}

#sayThis:focus{
  border: 2px solid orange;
}

#divButtons {
    background-color: #dddddd;
}

#divButtons div {
    border: 0px solid orange;
}

#divButtons a {
    font-size: 8.5pt;
    color: white !important;
    font-weight: bold;
    border: 0px solid black;
}

#btnSettings {
    float: right;
}

#footer {
    position: fixed;
    bottom: 2px;
    right: 5px;
    opacity: 0.7;
    text-align: right;
    width: 100%;
    font-size: 8pt;
}

#footer a {
    margin-right: 2mm;
}

#voicesLengthDebug {
    font-size: 7pt; color: white;
}

.selected {
    border: 1px solid red !important;
}


/* Ansicht für Tablets */
@media screen and (min-width: 38.75em) {

    #sayThis {
        padding: 10px;
    }

    #footer a {
        margin-right: 1cm;
    }

    #footer {
        font-size: 14pt;
    }

    #facebook {
        display: inline;
    }

}




@media screen and (min-height: 22.75em) {
    /* iphone SE */
    #sayThis {
        height: 4.5em;
        font-size: 150%;
    }
    #divButtons a {
        font-size: 10pt;
        min-width: 5em;
    }
    /*
    body {
        background-color: purple !important;
    }
    */
}


@media screen and (min-height: 32.00em) {
    /* IPad Air landscape */
    #sayThis {
        height: 5em;
        font-size: 180%;
    }
    #divButtons a {
        font-size: 13pt;
    }
/*
    body {
        background-color: blue !important;
    }
    */
}

@media screen and (min-height: 36.00em) {
    /* IPad Air portrait */
    #sayThis {
        height: 4.5em;
        font-size: 250%;
    }

    #divButtons a {
        font-size: 14pt;
        min-width: 5em;
    }
    /*
    body {
        background-color: green !important;
    }
    */
}

@media screen and (min-height: 36.00em) and (orientation: portrait) {
  /* IPad Air portrait */
  #sayThis {
    font-size: 350%;
    height: 5em;
  }

}







[v-cloak] {
    display: none;
}

.noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  not supported by any browser */
}









</style>

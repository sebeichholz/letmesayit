function populateVoiceList() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  voices = speechSynthesis.getVoices();

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

populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
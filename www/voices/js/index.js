function populateVoiceList() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  voices = speechSynthesis.getVoices();

  for(i = 0; i < voices.length ; i++) {
    var option = i + ') ';
    option += voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option += ' -- DEFAULT';
    }

    option += ', lang=' + voices[i].lang;
    option += ', name=' +  voices[i].name;
    document.getElementById("voices").append(option + "\n");
  }
    document.getElementById("voiceCount").innerHTML = voices.length + ' Stimmen';
    document.getElementById("userAgent").innerHTML = navigator.userAgent;

}

populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
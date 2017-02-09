import Vue from 'vue'
import VueI18n from 'vue-i18n';
import lang_de from './de';
import lang_en from './en';
Vue.use(VueI18n);

var DEFAULT_LANG = 'de';

function detectLanguage() {
  return navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
};

var langs = new Map();
langs.set('de', lang_de);
langs.set('en', lang_en);

  //Vue.locale('en', en);
langs.forEach(function (value, key) {
  console.log(key + '/' + value);
  Vue.locale(key, value);
});

var browserLang = detectLanguage();
console.log('browserLang: ' + browserLang);
console.log('browserLang: ' + browserLang.substr(0,2));
browserLang = browserLang.substr(0,2)

if (langs.has(browserLang)) {
  Vue.config.lang = browserLang;
} else {
  Vue.config.lang = DEFAULT_LANG;
}





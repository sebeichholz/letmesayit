var moment = require('moment')

function getEnvName(browser) {
  var txt = ''
    + (typeof browser.options.desiredCapabilities.device == 'undefined' ? '' : (browser.options.desiredCapabilities.device + '_'))
    + (typeof browser.options.desiredCapabilities.os == 'undefined' ? '' : (browser.options.desiredCapabilities.os + '_'))
    + (typeof browser.options.desiredCapabilities.os_version == 'undefined' ? '' : (browser.options.desiredCapabilities.os_version + '_'))
    + (typeof browser.options.desiredCapabilities.browserName == 'undefined' ? '' : (browser.options.desiredCapabilities.browserName + '_'))
    + (typeof browser.options.desiredCapabilities.browser_version == 'undefined' ? '' : (browser.options.desiredCapabilities.browser_version + '_'));
  return txt;
}

function createFilename(browser, shortname) {
  var time = moment().format('YYYYMMDD_HHmmss');
  var env = getEnvName(browser);
  var filename = time + '_'
    + env
    + '.png';
  var fullFilename = './reports/' + shortname + '/' + filename;
  return fullFilename;
}


module.exports = {
  '@disabled': false,
  'main page available': function (browser) {

    var shortname = 'SCREENSHOT';
    var filename = createFilename(browser, shortname);

    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000)
      .pause(3000)
      .saveScreenshot(filename)
    ;


  }
};

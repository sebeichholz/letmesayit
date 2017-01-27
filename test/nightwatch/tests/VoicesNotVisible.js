var assert = require('assert');

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
        //+ shortname + '_'
        + env
        + '.png';
    var fullFilename = './reports/' + shortname + '/' + filename;
    return fullFilename;
}

function checkForTrue(browser, condition, fullFilename) {
    console.log('checkForTrue: "' + fullFilename + '". Condition: ' + condition);
    browser
        .expect.element('#true').to.have.attribute('data-' + condition);
}


module.exports = {

    'voices combobos is not visible': function (browser) {
        browser
            .url(browser.launch_url)
            .pause(3000)
        ;


        if (true) {
            var shortname = 'CHECK-CMB-VOICE-NOT-VISIBLE';
            var filename = createFilename(browser, shortname);
            browser
                .saveScreenshot(createFilename(browser, 'BEFORE_' + shortname))
                .isVisible('#selectVoice', function (result) {
                    var trueCondition = !result.value;
                    browser.saveScreenshot(filename + '_' + (trueCondition?'OK':'ERROR') + '.png');
                    browser.expect.element('#true').to.have.attribute('data-' + trueCondition);
                });
        }

        //browser.end();

    }

};
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

    'all buttons available and visible': function (browser) {
        browser
            .url(browser.launch_url)
            .pause(3000)
        ;


        browser.expect.element('#sayThis').to.be.present;
        browser.expect.element('#sayThis').to.be.visible;

        browser.expect.element('#btnTalk').to.be.present;
        browser.expect.element('#btnTalk').to.be.visible;

        browser.expect.element('#btnEdit').to.be.present;
        browser.expect.element('#btnEdit').to.be.visible;

        browser.expect.element('#btnClear').to.be.present;
        browser.expect.element('#btnClear').to.be.visible;


        browser
            .getLocation('#btnTalk', function (locationBtnTalk) {

                checkForTrue(browser, locationBtnTalk.value.y > 0, 'BTN-TALK-YPOS', 'locationBtnTalk.value.y > 0');
                browser.getLocation('#btnClear', function (locationBtnClear) {

                    checkForTrue(browser, locationBtnClear.value.y > 0, 'BTN-CLEAR-YPOS', 'locationBtnClear.value.y > 0');
                    checkForTrue(browser, locationBtnClear.value.y == locationBtnTalk.value.y, 'BTN-CLEAR-YPOS-EQ-TALK-YPOS', 'locationBtnClear.value.y == locationBtnTalk.value.y');

                    browser.isVisible('#btnSettings', function (result) {
                        if (!result.value) {
                            checkForTrue(browser, result.value, 'BTN-SETTINGS-VISIBLE', 'isVisible(#btnSettings)');
                        } else {
                            browser.getLocation('#btnSettings', function (locationBtnSettings) {
                                checkForTrue(browser, locationBtnSettings.value.y > 0, 'BTN-SETTINGS-YPOS', 'locationBtnSettings.value.y > 0');
                                checkForTrue(browser, locationBtnTalk.value.y == locationBtnSettings.value.y, 'BTN-SETTINGS-YPOS', 'locationBtnTalk.value.y == locationBtnSettings.value.y');

                            });
                        }
                    });

                });
            });

        //browser.end();

    }

};
module.exports = {
    '@disabled': true,
    'main page available' : function (browser) {
        browser
            .url(browser.launch_url)
            .waitForElementVisible('body', 1000)
            .pause(1000)
            .assert.title('Let me say it! Your browser speaks for you.')
        ;

        browser.setValue('#sayThis', 'Hallo ich heiße Sebastian');
        browser.assert.value('#sayThis', 'Hallo ich heiße Sebastian');

        browser.click('#btnClear');
        browser.pause(1000);
        browser.assert.value('#sayThis', '');


    }
};
var webdriver = require('selenium-webdriver');

// Input capabilities
var capabilities = {
    'browserName' : 'iPhone',
    'platform' : 'MAC',
    'device' : 'iPhone 6S Plus',
    'browserstack.user' : 'sebastianeichhol1',
    'browserstack.key' : '',
    'browserstack.debug' : 'true',
    'build' : 'First build',
    'project' : 'LetMeSayIt'
}


var driver = new webdriver.Builder().
usingServer('http://hub-cloud.browserstack.com/wd/hub').
withCapabilities(capabilities).
build();

driver.get('http://letmesayit.org');
//driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack');
//driver.findElement(webdriver.By.name('btnG')).click();

driver.getTitle().then(function(title) {
    console.log(title);
});

driver.quit();
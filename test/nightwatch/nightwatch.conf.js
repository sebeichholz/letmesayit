
/*

iphones:
nightwatch -e iphone4s,iphone4s_6,iphone5,iphone5s,iphone6,iphone6plus,iphone6s,iphone6splus

ipads:
nightwatch -e ipadmini4,ipadpro,ipad2,ipad3,ipad3_6,ipadmini,ipad4,ipadmini2,ipadair,ipadair2

win<10:
nightwatch -e win81_opera1216,win81_firefox51,win81_chrome55,win7_firefox51

win10:
nightwatch -e win10_chrome55,win10_firefox51,win10_ie11,win10_edge14,win10_edge13

 */
nightwatch_config = {
    "src_folders": ["tests"],
    selenium: {
        "start_process": false,
        "host": "hub-cloud.browserstack.com",
        "port": 80
    },

    test_settings: {
        default: {
            //launch_url: "http://letmesayit.org?test",
            launch_url: "http://localhost:8080?test",

            screenshots : {
                "enabled" : true,
                "on_failure" : true,
                "on_error" : false,
                "path" : "./reports/ERRORS/"
            },

            desiredCapabilities: {

                'browserstack.user': 'sebastianeichhol1',
                'browserstack.key': 'fu7H6fsUd4BeMbjxX3Bz',

                'browserstack.local': true,

                'browserstack.debug': false,
                'browserstack.video' : false,

                /*
                'browserName': 'iPad',
                'platform': 'MAC',
                'device': 'iPad Mini 4'
                */


            }
        },

        win10_chrome55: {
            desiredCapabilities: {
                'browserName' : 'Chrome',
                'browser_version' : '55.0',
                'os' : 'Windows',
                'os_version' : '10',
                'resolution' : '1024x768'
            }
        },
        win10_firefox51: {
            desiredCapabilities: {
                'browserName' : 'Firefox',
                'browser_version' : '51.0 beta',
                'os' : 'Windows',
                'os_version' : '10',
                'resolution' : '1024x768'
            }
        },
        win81_opera1216: {
            desiredCapabilities: {
                'browserName' : 'Opera',
                'browser_version' : '12.16',
                'os' : 'Windows',
                'os_version' : '8.1',
                'resolution' : '1024x768'
            }
        },
        win10_ie11: {
            desiredCapabilities: {
                'browserName' : 'IE',
                'browser_version' : '11.0',
                'os' : 'Windows',
                'os_version' : '10',
                'resolution' : '1024x768'
            }
        },
        win10_edge14: {
            desiredCapabilities: {
                'browserName' : 'Edge',
                'browser_version' : '14.0',
                'os' : 'Windows',
                'os_version' : '10',
                'resolution' : '1024x768'
            }
        },
        win10_edge13: {
            desiredCapabilities: {
                'browserName' : 'Edge',
                'browser_version' : '13.0',
                'os' : 'Windows',
                'os_version' : '10',
                'resolution' : '1024x768'
            }
        },


        win81_firefox51: {
            desiredCapabilities: {
                'browserName' : 'Firefox',
                'browser_version' : '51.0 beta',
                'os' : 'Windows',
                'os_version' : '8.1',
                'resolution' : '1024x768'
            }
        },
        win81_chrome55: {
            desiredCapabilities: {
                'browserName' : 'Chrome',
                'browser_version' : '55.0',
                'os' : 'Windows',
                'os_version' : '8.1',
                'resolution' : '1024x768'
            }
        },

        win7_firefox51: {
            desiredCapabilities: {
                'browserName' : 'Firefox',
                'browser_version' : '51.0 beta',
                'os' : 'Windows',
                'os_version' : '7',
                'resolution' : '1024x768'
            }
        },

        //Iphones
        iphone4s: {
            desiredCapabilities: {
                'browserName' : 'iPhone',
                'platform' : 'MAC',
                'device' : 'iPhone 4S',
                'deviceOrientation' : 'portrait',
            }
        },
        iphone4s_6: {
            desiredCapabilities: {
                'browserName' : 'iPhone',
                'platform' : 'MAC',
                'device' : 'iPhone 4S (6.0)',
                'deviceOrientation' : 'portrait',
            }
        },
        iphone5: {
            desiredCapabilities: {
                'browserName' : 'iPhone',
                'platform' : 'MAC',
                'device' : 'iPhone 5',
                'deviceOrientation' : 'portrait',
            }
        },
        iphone5s: {
            desiredCapabilities: {
                'browserName' : 'iPhone',
                'platform' : 'MAC',
                'device' : 'iPhone 5S',
                'deviceOrientation' : 'portrait',
            }
        },
        iphone6: {
            desiredCapabilities: {
                'browserName' : 'iPhone',
                'platform' : 'MAC',
                'device' : 'iPhone 6',
                'deviceOrientation' : 'portrait',
            }
        },
        iphone6plus: {
            desiredCapabilities: {
                'browserName' : 'iPhone',
                'platform' : 'MAC',
                'device' : 'iPhone 6 Plus',
                'deviceOrientation' : 'portrait',
            }
        },
        iphone6s: {
            desiredCapabilities: {
                'browserName' : 'iPhone',
                'platform' : 'MAC',
                'device' : 'iPhone 6S',
                'deviceOrientation' : 'portrait',
            }
        },
        iphone6splus: {
            desiredCapabilities: {
                'browserName' : 'iPhone',
                'platform' : 'MAC',
                'device' : 'iPhone 6S Plus',
                'deviceOrientation' : 'portrait',
            }
        },

        //IPads
        ipadmini4: {
            desiredCapabilities: {
                'browserName' : 'iPad',
                'platform' : 'MAC',
                'device' : 'iPad Mini 4',
                'deviceOrientation' : 'portrait',
            }
        },
        ipadpro: {
            desiredCapabilities: {
                'browserName' : 'iPad',
                'platform' : 'MAC',
                'device' : 'iPad Pro',
                'deviceOrientation' : 'portrait',
            }
        },
        ipad2: {
            desiredCapabilities: {
                'browserName' : 'iPad',
                'platform' : 'MAC',
                'device' : 'iPad 2 (5.0)',
                'deviceOrientation' : 'portrait',
            }
        },
        ipad3: {
            desiredCapabilities: {
                'browserName' : 'iPad',
                'platform' : 'MAC',
                'device' : 'iPad 3rd',
                'deviceOrientation' : 'portrait',
            }
        },
        ipad3_6: {
            desiredCapabilities: {
                'browserName' : 'iPad',
                'platform' : 'MAC',
                'device' : 'iPad 3rd (6.0)',
                'deviceOrientation' : 'portrait',
            }
        },
        ipadmini: {
            desiredCapabilities: {
                'browserName' : 'iPad',
                'platform' : 'MAC',
                'device' : 'iPad Mini',
                'deviceOrientation' : 'portrait',
            }
        },
        ipad4: {
            desiredCapabilities: {
                'browserName' : 'iPad',
                'platform' : 'MAC',
                'device' : 'iPad 4th',
                'deviceOrientation' : 'portrait',
            }
        },
        ipadmini2: {
            desiredCapabilities: {
                'browserName' : 'iPad',
                'platform' : 'MAC',
                'device' : 'iPad Mini 2',
                'deviceOrientation' : 'portrait',
            }
        },
        ipadair: {
            desiredCapabilities: {
                'browserName' : 'iPad',
                'platform' : 'MAC',
                'device' : 'iPad Air',
                'deviceOrientation' : 'portrait',
            }
        },
        ipadair2: {
            desiredCapabilities: {
                'browserName' : 'iPad',
                'platform' : 'MAC',
                'device' : 'iPad Air 2',
                'deviceOrientation' : 'portrait',
            }
        },

        android_nexus5: {
            desiredCapabilities: {
                'browserName' : 'android',
                'platform' : 'ANDROID',
                'device' : 'Google Nexus 5',
                'deviceOrientation' : 'portrait',
            }
        },
    }
};

// Code to copy seleniumhost/port into test settings
for (var i in nightwatch_config.test_settings) {
    var config = nightwatch_config.test_settings[i];
    config['selenium_host'] = nightwatch_config.selenium.host;
    config['selenium_port'] = nightwatch_config.selenium.port;
}

module.exports = nightwatch_config;
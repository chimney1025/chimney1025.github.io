'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('rapidScore App', function() {
    /*
     it('should redirect index.html to index.html#/phones', function() {
     browser.get('app/index.html');
     browser.getLocationAbsUrl().then(function(url) {
     expect(url.split('#')[1]).toBe('/phones');
     });
     });
     */

    describe('Score list view', function() {

        beforeEach(function() {
            browser.get('app/index.html#/sheetmusic');
        });

        it('should filter the score list as user types into the search box', function() {
            var scoreList = element.all(by.repeater('score in scores'));
            var query = element(by.model('query'));
            expect(scoreList.count()).toBe(8);
        });

        it('should filter the score list as user types into the search box', function() {
            var scoreList = element.all(by.repeater('score in scores'));
            var query = element(by.model('query'));
            query.sendKeys('let');
            expect(phoneList.count()).toBe(2);
        });

        it('should filter the score list as user types into the search box', function() {
            var scoreList = element.all(by.repeater('score in scores'));
            var query = element(by.model('query'));
            query.sendKeys('\'');
            expect(phoneList.count()).toBe(2);
        });

        it('should filter the score list as user types into the search box', function() {
            var scoreList = element.all(by.repeater('score in scores'));
            var query = element(by.model('query'));
            query.sendKeys('\'');
            expect(phoneList.count()).toBe(0);
        });
    });

    it('should be possible to control score order via the drop down select box', function() {
        var scoreNameColumn = element.all(by.repeater('score in scores').column('{{score.name}}'));
        var query = element(by.model('query'));

        function getNames() {
            return scoreNameColumn.map(function(elm) {
                return elm.getText();
            });
        }
        /*
         query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

         expect(getNames()).toEqual([
         "Motorola XOOM\u2122 with Wi-Fi",
         "MOTOROLA XOOM\u2122"
         ]);
         */

        element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

        expect(getNames()).toEqual([
            "Let It Go",
            "Let It Go",
            "Memory",
            "Memory",
            "One Summer\s Day",
            "One Summer\s Day",
            "Suites of Joe Hisaish",
            "Suites of Joe Hisaish"
        ]);
    });


    it('should render score specific links', function() {
        var query = element(by.model('query'));
        query.sendKeys('let it go');
        element.all(by.css('.list-item a')).first().click();
        browser.getLocationAbsUrl().then(function(url) {
            expect(url.split('#')[1]).toBe('/sheetmusic/let-it-go');
        });
    });
});


describe('Score detail view', function() {
    beforeEach(function() {
        browser.get('app/index.html#/sheetmusic/memory');
    });


    it('should display memory page', function() {
        expect(element(by.binding('score.name')).getText()).toBe('Memory');
    });

    it('should display add-to-cart button', function() {

    });

    it('should display the score image', function() {
        expect(element(by.css('img.main-image')).getAttribute('src')).toMatch(/sources\/images\/2.jpg/);
    });
});
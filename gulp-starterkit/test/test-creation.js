/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('starterkit generator test', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('starterkit:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.jshintrc',
            '.bowerrc',
            '.gitignore',
            'gulpfile.js',
            'bower.json',
            'package.json',
            'app/layouts/default.hbs',
            'app/pages/home/index.hbs',
            'app/pages/home/home.js',
            'app/pages/home/_home.scss',
            'app/scripts/vendor/jquery-1.10.2.min.js',
            'app/scripts/core/controller.js',
            'app/scripts/util.js',
            'app/scripts/global.js',
            'app/styles/main.scss',
            'app/styles/_vars.scss',
            'app/styles/_normalize.scss',
            'app/styles/_mixins.scss',
            'app/styles/_global.scss',
        ];

        helpers.mockPrompt(this.app, {
            'appName': 'testapp'
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });
});

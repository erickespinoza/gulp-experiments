'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var shell = require('shelljs');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');

var PageGenerator = yeoman.generators.Base.extend({
    
    checkCWDandUsage: function () {
        var files = shell.ls();
        var inTopLevelDirectory = files.indexOf('app');
        if (inTopLevelDirectory === -1) {
            console.log(chalk.bold.red('Error! Page generator should be called from the root project directory.'));
            process.exit(1);
        }

        if (process.argv.length !== 3) {
            console.log(chalk.bold.red('Usage: ') +
                        chalk.bold.green('yo starterkit:page') +
                        chalk.bold.red('\nIgnoring additional arguments'));
        }
    },

    askForName: function () {
        var done = this.async();
        var prompts = [{
            name: 'name',
            message: 'What would you like to name this page?'
        }];

        this.prompt(prompts, function (props) {
            this.name = props.name;
            done();
        }.bind(this));
    },

    validateInpute: function () {
        if (this.name === '' || this.name.match(/^[\s]+$/) !== null) {
            console.log(chalk.bold.red('Error! Please provide a non-empty name.'));
            process.exit(1);
        }
        else if (this.name.match(/^[-A-z0-9]+$/i) === null) {
            console.log(chalk.bold.red('Error! Please provide a name that contains only letters, numbers, and hyphens.'));
            process.exit(1);
        }
    },

    init: function () {
        console.log('You just created a(n) ' + this.name + ' page.');
        this.PageDirectory = 'app/pages/' + this.name;
        this.fileName = this.name;
        this._s = _s;
    },

    files: function () {
        mkdirp(this.PageDirectory);
        this.template('page.hbs', this.PageDirectory + '/' + this.fileName + '.hbs');
        this.copy('page.js', this.PageDirectory + '/' + this.fileName + '.js');
        this.copy('_page.scss', this.PageDirectory + '/_' + this.fileName + '.scss');
    },

    wireUpPageSCSS: function () {
        console.log('Adding page scss import declaration to main.scss...');
        var path = 'app/assets/styles/main.scss',
            file = this.readFileAsString(path);

        var lines = file.split('\n');
        var indexOfLastPage = -1;
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].search('pages') !== -1) {
                indexOfLastPage = i;
            }
        }

        if (indexOfLastPage !== -1) {
            var importSCSSDeclaration = '@import \"../../pages/' + this.fileName + '/' +
                                        this.fileName + '\";';
            lines.splice(indexOfLastPage + 1, 0, importSCSSDeclaration);
        }

        file = '';
        for (var l = 0; l < lines.length; l++) {
            file += (lines[l] + '\n');
        }
        file = file.trimRight();

        this.write(path, file);
    },

    wireUpPageJS: function () {
        console.log('Adding script tag to default.hbs...');
        var path = 'app/layouts/default.hbs',
            file = this.readFileAsString(path);

        var lines = file.split('\n');
        var indexOfLastPage = -1;
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].search('src=\"pages') !== -1) {
                indexOfLastPage = i;
            }
        }
        if (indexOfLastPage !== -1) {
            var spaces = lines[indexOfLastPage].indexOf('<');
            var scriptTag = '<script src=\"pages/' + this.fileName + '/' + this.fileName +
                            '.js\"></script>';
            for (var s = 0; s < spaces; s++) {
                scriptTag = ' ' + scriptTag;
            }
            lines.splice(indexOfLastPage + 1, 0, scriptTag);
        }
        file = '';
        for (var l = 0; l < lines.length; l++) {
            file += (lines[l] + '\n');
        }
        file = file.trimRight();

        this.write(path, file);
    }
});

module.exports = PageGenerator;

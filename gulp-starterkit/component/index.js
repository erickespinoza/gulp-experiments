'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var shell = require('shelljs');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');
var _hw = require("html-wiring");

var ComponentGenerator = yeoman.generators.Base.extend({

    checkCWDandUsage: function () {
        var files = shell.ls();
        var inTopLevelDirectory = files.indexOf('app');
        if (inTopLevelDirectory === -1) {
            console.log(chalk.bold.red('Error! Component generator should be called from the root project directory.'));
            process.exit(1);
        }

        if (process.argv.length !== 3) {
            console.log(chalk.bold.red('Usage: ') +
                        chalk.bold.green('yo starterkit:component') +
                        chalk.bold.red('\nIgnoring additional arguments'));
        }
    },

    askForName: function () {
        var done = this.async();
        var prompts = [{
            name: 'name',
            message: 'What would you like to name this component?'
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
        } else if (this.name.match(/^[-A-z0-9]+$/i) === null) {
            console.log(chalk.bold.red('Error! Please provide a name that contains only letters, numbers, and hyphens.'));
            process.exit(1);
        }
    },

    init: function () {
        console.log('You just created a(n) ' + this.name + ' component.');
        this.componentDirectory = 'app/components/' + this.name;
        this.fileName = this.name;
        this._s = _s;
    },

    files: function () {
        mkdirp(this.componentDirectory);
        this.template('component.hbs', this.componentDirectory + '/' + this.fileName + '.hbs');
        this.copy('component.js', this.componentDirectory + '/' + this.fileName + '.js');
        this.copy('component.json', this.componentDirectory + '/' + this.fileName + '.json');
        this.copy('_component.scss', this.componentDirectory + '/_' + this.fileName + '.scss');
    },

    wireUpComponentSCSS: function () {
        console.log('Adding component scss import declaration to main.scss...');
        var path = 'app/assets/styles/main.scss',
            file = _hw.readFileAsString(path);

        var lines = file.split('\n');
        var indexOfLastComponent = -1;
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].search('component') !== -1) {
                indexOfLastComponent = i;
            }
        }

        if (indexOfLastComponent !== -1) {
            var importSCSSDeclaration = '@import \"../../components/' + this.fileName + '/' +
                                        this.fileName + '\";';
            lines.splice(indexOfLastComponent + 1, 0, importSCSSDeclaration);
        }

        file = '';
        for (var l = 0; l < lines.length; l++) {
            file += (lines[l] + '\n');
        }
        file = file.trimRight();

        this.write(path, file);
    },

    wireUpComponentJS: function () {
        console.log('Adding script tag to default.hbs...');
        var path = 'app/layouts/default.hbs',
            file = _hw.readFileAsString(path);

        var lines = file.split('\n');
        var indexOfLastComponent = -1;
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].search('assets/scripts/main.js') !== -1) {
                indexOfLastComponent = i;
            }
        }
        if (indexOfLastComponent !== -1) {
            var spaces = lines[indexOfLastComponent].indexOf('<');
            var scriptTag = '<script src=\"components/' + this.fileName + '/' + this.fileName +
                            '.js\"></script>';
            for (var s = 0; s < spaces; s++) {
                scriptTag = ' ' + scriptTag;
            }
            lines.splice(indexOfLastComponent + 1, 0, scriptTag);
        }
        file = '';
        for (var l = 0; l < lines.length; l++) {
            file += (lines[l] + '\n');
        }
        file = file.trimRight();

        this.write(path, file);
    },

    successMessage: function () {
        console.log('Success!');
        console.log('Don\'t forget to include the component html in a page or another component...');
        console.log('{{> ' + this.fileName + ' }}');
    }
});

module.exports = ComponentGenerator;

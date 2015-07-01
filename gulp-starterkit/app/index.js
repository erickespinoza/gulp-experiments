'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var _s = require('underscore.string');

var StarterkitGenerator = yeoman.generators.Base.extend({

    init: function () {
        // Check command line usage
        if (process.argv.length !== 3) {
            console.log(chalk.bold.red('Usage: ') +
                        chalk.bold.green('yo starterkit') +
                        chalk.bold.red('\nIgnoring additional arguments'));
        }
        this.pkg = require('../package.json');
        this._s = _s;
    },

    askFor: function () {
        var done = this.async();

        var version = exec('npm -v', function (error, stdout, stderr) {
            if (stderr === '') {
                //var recommendedNPMVersion = >='2.1.0';
                if(stdout[0] < '2') {
                    console.log(chalk.bgRed.underline.bold('\nNPM is Out of Date'));
                    console.log(chalk.bold.red('We recommend cancelling this generation and updating NPM with this command:'));
                    console.log(chalk.bold.yellow('npm update -g npm'));
                } else if(stdout[2] < '1' ) {
                    console.log(chalk.bgRed.underline.bold('\nNPM Out of Date'));
                    console.log(chalk.bold.red('We recommend cancelling this generation and updating NPM with this command:'));
                    console.log(chalk.bold.yellow('npm update -g npm'));
                }
            }
        });


        // have Yeoman greet the user
        //this.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        //this.log(chalk.magenta('You\'re using the fantastic DigitasLBi Starterkit generator.'));

        var prompts = [{
            name: 'appName',
            message: 'What is your project\'s name?'
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;

            done();
        }.bind(this));
    },

    validateInpute: function () {
        if (this.appName === '' || this.appName.match(/^[\s]+$/) !== null) {
            console.log(chalk.bold.red('Error! Please provide a non-empty name.'));
            process.exit(1);
        }
        else if (this.appName.match(/^[-A-z0-9]+$/i) === null) {
            console.log(chalk.bold.red('Error! Please provide a name that contains only letters, numbers, and hyphens.'));
            process.exit(1);
        }
    },

    scaffoldFolders: function () {
        mkdirp('app');
        mkdirp('app/components');
        mkdirp('app/assets');
        mkdirp('app/assets/images');
        mkdirp('app/layouts');
        mkdirp('app/pages');
        mkdirp('app/assets/scripts');
        mkdirp('app/assets/styles');
        mkdirp('app/assets/styles/fonts');
        mkdirp('app/assets/scripts/core');
        mkdirp('app/assets/scripts/vendor');
        mkdirp('app/pages/home');
        mkdirp('app/bower_components');
    },

    copyStyles: function () {
        this.copy('assets/styles/_global.scss', 'app/assets/styles/_global.scss');
        this.copy('assets/styles/_mixins.scss', 'app/assets/styles/_mixins.scss');
        this.copy('assets/styles/_normalize.scss', 'app/assets/styles/_normalize.scss');
        this.copy('assets/styles/_vars.scss', 'app/assets/styles/_vars.scss');
        this.copy('assets/styles/main.scss', 'app/assets/styles/main.scss');
    },

    copyScripts: function () {
        this.copy('assets/scripts/global.js', 'app/assets/scripts/global.js');
        this.copy('assets/scripts/util.js', 'app/assets/scripts/util.js');
        this.copy('assets/scripts/core/controller.js', 'app/assets/scripts/core/controller.js');
        this.copy('assets/scripts/vendor/jquery-1.10.2.min.js', 'app/assets/scripts/vendor/jquery-1.10.2.min.js');
    },

    copyPagesLayoutsComponents: function () {
        this.copy('pages_home/_home.scss', 'app/pages/home/_home.scss');
        this.copy('pages_home/home.js', 'app/pages/home/home.js');
        this.copy('pages_home/index.hbs', 'app/pages/home/index.hbs');

        this.template('layouts/default.hbs', 'app/layouts/default.hbs');
    },

    app: function () {
        this.template('_package.json', 'package.json');
        this.template('_gulpfile.js', 'gulpfile.js');
        this.copy('_bower.json', 'bower.json');

        this.copy('jshintrc', '.jshintrc');
        this.copy('gitignore', '.gitignore');
        this.copy('bowerrc', '.bowerrc');
    }
});

// Install Grunt and Bower dependencies
StarterkitGenerator.prototype.install = function install() {
    this.installDependencies({ skipInstall: this.skipInstall });
};

module.exports = StarterkitGenerator;

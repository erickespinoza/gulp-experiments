# Changelog

## 1.5.0 Stable Release
* Incremented version to 1.5 to encapsulate all 1.4.x updates

## 1.4.5
* Updated jquery to 1.11.3 (last before 2.0)
* Added sublime project files to .gitignore
* Updated Readme 
* Added video caption files (assets/captions) to copy:dist 

## 1.4.4
* Updated controller.js to pass each init() a reference to its corresponding DOM element (components & pages)

## 1.4.3
* Updated package.json to include the latest versions of dependencies
* Replaced deprecated underscore (_) with underscore.string (_s)
* Replaced deprecated mkdir with mkdirp

## 1.4.2
* Bug fix for not including component.js in default.hbs when creating new component

## 1.4.1
* Image copying bug fix - copied after minifying

## 1.4.0
* Updated controller.js to auto-invoke the init() method for a component. People do not need to manually invoke a component anymore.
* Updated package.json to include the latest versions of grunt tasks
* Made box-sizing: border-box a global property of all elements
* Removed device specific breakpoints from a component sass file
* Removed default navigation component
* SVGmin task bug fix
* Remove modernizr - modernizr should only be included on a project by project basis

## 1.3.1
* NPM Version warning to make sure everyone is using at least NPM v1.1.0

## 1.3.0

* stripmq legacy.css built during `grunt serve`
* starterkit image asset replaced with inline data/uri
* added assets/styles/vendor and assets/scripts/vendor folders for easier 3rd party integration and internal bower components
* sass sourcemaps added
* sass updated and mixins improved

## 1.2.3

* changed viewport meta tag to include initial scaling property
* updated autoprefixer to v1.0.1 (Issue 83)

## 1.2.2

* updated controller.js to allow for IE8 compat without a jQuery dependency (Issue 61)

## 1.2.1

* NPM Postinstall script to run bower install (Issue 65)

***

### 1.2.0

* Faster live reload
* BEM SASS support

## 1.0.6

* removed grunt-wiredep from the build, serve, and watch processes and made it an optional task.

## 1.0.5 Stable Release

* removed grunt-uncss as it does not work with javascript event handlers

***

## 1.0.4 UNSTABLE Release

* added grunt-uncss to help with pagespeed optimizations

***

## 1.0.3 Stable Release

* removed breakpoints from vars.scss

***

## 1.0.2 Stable Release

* changed the html in the homepage to reflect subgenerator syntax

***

## 1.0.1 Stable Release

* fixed bug in javascript build
* removed grunt run task (for component generation shell script)

***

## 1.0.0 Stable Release

* automated scaffolding testing - run mocha from command line
* prevent compatability view http://goo.gl/b6PpX
* added input and usage validation
* changed jshint settings
* added to test to ensure subgenerators are being called from root project directory
* includes generator, component and page subgenerator
* moving to generator

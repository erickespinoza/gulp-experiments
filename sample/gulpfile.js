/*global -$ */
'use strict';
// generated on 2015-05-15 using generator-gulp-webapp 0.3.0 changed for assemble implementation on 2015-06-12
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var assemble = require('assemble');
var gulpAssemble = require('gulp-assemble');
var extname = require('gulp-extname');
var concat = require('gulp-concat');
var del = require('del');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var nmq = require('gulp-no-media-queries');
var rev = require('gulp-rev');
var notify = require('gulp-notify');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');

gulp.task('watch', function() {
   // watch for changes
  gulp.watch([
    'app/assets/scripts/**/*.js',
    'app/assets/images/**/*'
  ]).on('change', reload);

  gulp.watch([
    'app/styles/**/*.scss',
    'app/components/**/*.scss',
    'app/pages/**/*.scss'
  ], ['sass']);
  
  gulp.watch([
      'app/assets/scripts/{,*/}*.js',
      'app/components/**/*.js',
      'app/pages/**/*.js',
      '!app/assets/scripts/vendor/*'
  ], ['jshint:server', 'copy:server']).on('ready', browserSync.reload);

  gulp.watch([
    'app/{pages,components,data}/**/*.{json,yaml}',
    'app/components/**/*.hbs',
    'app/layouts/*.hbs',
    'app/pages/**/*.hbs'
    // ], ['assemble:server']);
  ], ['watch-html']).on('ready', browserSync.reload);


  // gulp.watch([
  //   'app/{pages,components,data}/**/*.{json,yaml}',
  //   'app/components/**/*.hbs',
  //   'app/layouts/*.hbs',
  //   'app/pages/**/*.hbs'], ['assemble']);
  // gulp.watch('dist/', ['watch-html']);
  // watch(['dist/*.html', 'dist/**/*.html'], function(files){
  //   return files
  //   .pipe(reload({stream: true}));
  // });
  // gulp.watch('bower.json', ['wiredep', 'fonts']);
  // gulp.watch('dist/**/*.html', ['html']);
});

gulp.task('assemble:dist', function () {

  assemble.data('app/{pages,components,data}/**/*.{json,yaml}');
  assemble.partials('app/components/**/*.hbs');
  assemble.layouts('app/layouts/*.hbs');

  return gulp.src(['app/pages/**/*.hbs'])
    .pipe(gulpAssemble(assemble, { layout: 'default' }))
    .pipe(extname())
    .pipe(gulp.dest('dist/'));
});

gulp.task('assemble:server', function () {

  assemble.data('app/{pages,components,data}/**/*.{json,yaml}');
  assemble.partials('app/components/**/*.hbs');
  assemble.layouts('app/layouts/*.hbs');

  return gulp.src(['app/pages/**/*.hbs'])
    .pipe(gulpAssemble(assemble, { layout: 'default' }))
    .pipe(extname())
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('clean:dist', function (cb) {
  del(['dist/'], cb);
});

gulp.task('clean:server', function (cb) {
  del(['.tmp/'], cb);
});
gulp.task('clear:afterdist', ['usemin'], function (cb) {
  del(['dist/**/*.html', 'dist/*' ,'!dist/assets', '!dist/*.html'], cb);
});

gulp.task('jshint:dist', function () {
  return gulp.src([
      'app/assets/scripts/{,*/}*.js',
      'app/components/**/*.js',
      'app/pages/**/*.js',
      '!app/assets/scripts/vendor/*'
    ])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('jshint:server', function () {
  return gulp.src([
      'app/assets/scripts/{,*/}*.js',
      'app/components/**/*.js',
      'app/pages/**/*.js',
      '!app/assets/scripts/vendor/*'
    ])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('sass', function () {
  return gulp.src('app/assets/styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/assets/styles/'))
    .pipe(reload({stream: true}));
});

gulp.task('sass:dist', function () {
  return gulp.src('app/assets/styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/assets/styles/'))
    .pipe(reload({stream: true}));
});

gulp.task('stripmq:dist', ['sass:dist'], function(){
  gulp.src('.tmp/assets/styles/main.css')
  .pipe(nmq({
    width:'1025px',
    type: 'screen'
  })).pipe(rename('assets/styles/legacy.css'))
  .pipe(gulp.dest("dist"));
});

// gulp.task('stripmq:dist', ['sass:dist'], function(){
//   gulp.src('dist/assets/styles/main.scss')
//   .pipe(stripmq())
//   .pipe(gulp.dest('.tmp/assets/styles/legacy.css'));
// });

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/assets/styles/main.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('dist/assets/styles'));
  gulp.src('app/components/imports/import-body.js')
    .pipe(wiredep())
    .pipe(gulp.dest('dist/assets/scripts'));
});

gulp.task('rev', function() {
  return gulp.src([
      'dist/assets/scripts/{,*/}*.js',
      'dist/pages/**/*.js',
      'dist/components/**/*.js',
      '!dist/assets/scripts/vendor/*',
      'dist/assets/styles/{,*/}*.css',
      'dist/assets/images/**/*.*',
      'dist/assets/styles/fonts/{,*/}*.*'
    ])
    .pipe(rev())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy:server', function () {

    gulp.src(
      'app/assets/scripts/*{.js,*/*.js}'
    ).pipe(gulp.dest('.tmp/assets/scripts/'));
    gulp.src(
      'app/components/**/*.js'
    ).pipe(gulp.dest('.tmp/components/'));
    gulp.src(
      'app/pages/**/*.js'
    ).pipe(gulp.dest('.tmp/pages/'));
    gulp.src(
      'app/assets/vendor/**'
    ).pipe(gulp.dest('.tmp/assets/vendor/'));

    gulp.src(
      'app/assets/styles/fonts/*'
    ).pipe(gulp.dest('.tmp/assets/styles/fonts/'));

    gulp.src('app/assets/json/*.json')
    .pipe(gulp.dest('.tmp/assets/json/'));


});

gulp.task('copy:dist', function () {

    // gulp.src(
    //   'app/assets/scripts/*{.js,*/*.js}'
    // ).pipe(gulp.dest('dist/assets/scripts/'));
    // gulp.src(
    //   'app/components/**/*.js'
    // ).pipe(gulp.dest('dist/components/'));
    // gulp.src(
    //   'app/pages/**/*.js'
    // ).pipe(gulp.dest('dist/pages/'));
    gulp.src(
      ['app/assets/vendor/**/*']
    ).pipe(gulp.dest('dist/assets/vendor/'));

    gulp.src(
      'app/assets/styles/fonts/*'
    ).pipe(gulp.dest('dist/assets/styles/fonts/'));

    gulp.src('app/assets/json/*.json')
    .pipe(gulp.dest('dist/assets/json/'));


});


// gulp.task('scriptsvendor:dist', function() {
//   return gulp.src([
//     'app/assets/vendor/**/*.js',
//     '!app/assets/vendor/handlebars/*'
//     ])
//     .pipe(concat('vendor.js'))
//     .pipe(gulp.dest('dist/assets/scripts'));
// });

// gulp.task('scriptsvendor:server', function() {
//   return gulp.src([
//     'app/assets/vendor/**/*.js',
//     '!app/assets/vendor/handlebars/*'
//     ])
//     .pipe(concat('vendor.js'))
//     .pipe(gulp.dest('.tmp/assets/scripts'));
// });

// gulp.task('scriptmain:dist', ['scriptsvendor:dist'], function(){
//     return gulp.src([
//       'app/assets/scripts/*.js',
//       'app/assets/scripts/**/*.js',
//       'app/pages/**/**/*.js',
//       'app/components/**/*.js',
//       '!app/assets/scripts/vendor/*'
//     ])
//     .pipe(concat('main.js'))
//     .pipe(gulp.dest('dist/assets/scripts'));
// });

// gulp.task('scriptmain:server', ['scriptsvendor:server'], function(){
//     return gulp.src([
//       'app/assets/scripts/*.js',
//       'app/assets/scripts/**/*.js',
//       'app/pages/**/**/*.js',
//       'app/components/**/*.js',
//       '!app/assets/scripts/vendor/*'
//     ])
//     .pipe(concat('main.js'))
//     .pipe(gulp.dest('.tmp/assets/scripts'));
// });

gulp.task('watch-html', ['aux-html'], function(){
  // runSequence('aux-html');
  browserSync.reload();
});

// gulp.task('copyhtml', browserSync.reload);
gulp.task('aux-html', ['assemble:server'], function(){
  // var assets = $.useref.assets({searchPath: ['dist', 'app', '.']});

  return gulp.src('.tmp/**/*.html')
    .pipe($.rename({
      dirname: ''
    }))
    // .pipe(assets)
    // .pipe($.if('*.js', $.uglify()))
    // .pipe($.if('*.css', $.csso()))
    // .pipe(assets.restore())
    // .pipe($.useref())
    // .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('.tmp/'))
    // .pipe(reload({stream: true}));
});


// gulp.task('handlebarse', function(){
//   var options = {
//     batch : [
//         './app/components/**/'
//         // './app/pages/'
//       ]
//   }
//   gulp.src('app/pages/**/*.hbs')
//     .pipe(handlebars({}, options))
//     .pipe(rename(function(path) {
//         path.extname = '.html';
//     }))
//     .pipe(gulp.dest('dist'));
// });


gulp.task('images:dist', function () {
  return gulp.src('app/assets/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('images:server', function () {
  return gulp.src('app/assets/images/**/*')
    // .pipe($.cache($.imagemin({
    //   progressive: true,
    //   interlaced: true,
    //   // don't remove IDs from SVGs, they are often used
    //   // as hooks for embedding and styling
    //   svgoPlugins: [{cleanupIDs: false}]
    // })))
    .pipe(gulp.dest('.tmp/assets/images'));
});

gulp.task('fonts:dist', function () {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/assets/styles/fonts/**/*'))
    .pipe(gulp.dest('dist/assets/styles/fonts'))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:server', function () {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/assets/styles/fonts/**/*'))
    .pipe(gulp.dest('.tmp/assets/styles/fonts'))
    .pipe(reload({stream: true}));
});

gulp.task('notify:build',function(){
  gulp.src('dist').
  pipe(notify("Server is ready!"));
  
});

gulp.task('notify:build', function(){

});

// gulp.task('extras', function () {
//   return gulp.src([
//     'app/*.*',
//     '!app/*.html'
//   ], {
//     dot: true
//   }).pipe(gulp.dest('dist'));
// });

gulp.task('html:server', ['wiredep', 'sass', 'images:server', 'jshint:server', 'copy:server', 'assemble:server', ], function () {
  // var assets = $.useref.assets({searchPath: ['dist', 'app', '.']});

  return gulp.src('.tmp/**/*.html')
    .pipe($.rename({
      dirname: ''
    }))
    // .pipe(assets)
    // .pipe($.if('*.js', $.uglify()))
    // .pipe($.if('*.css', $.csso()))
    // .pipe(assets.restore())
    // .pipe($.useref())
    // .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('.tmp/'))
    // .on('end', function(){browserSync.reload({stream: true})})
    // .pipe(reload({stream: true}));

});

gulp.task('html:dist', ['wiredep', 'stripmq:dist', 'images:dist', 'jshint:dist', 'copy:dist', 'assemble:dist', ], function () {
  // var assets = $.useref.assets({searchPath: ['dist, app']});

  return gulp.src('dist/**/*.html')
    .pipe($.rename({
      dirname: ''
    }))
    // .pipe(assets)
    // .pipe($.if('*.js', $.uglify()))
    // .pipe($.if('*.css', $.csso()))
    // .pipe(assets.restore())
    // .pipe($.useref())
    // .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist/'))
    // .on('end', function(){browserSync.reload({stream: true})})
    .pipe(reload({stream: true}));

});

gulp.task('usemin', ['html:dist'], function(){
  gulp.src('dist/*.html')
  .pipe(usemin({
    js: [uglify()],
    html: [minifyHTML({empty: true, loose: true})]
  }))
  .pipe(gulp.dest('dist/'))
  .pipe(notify('Build complete!'));
});

gulp.task('connect', ['html:server'], function () {
  browserSync({
    // notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp']
    }
  });
  gulp.src('.tmp').pipe(notify("Server is ready!"));
});


gulp.task('build', function () {
  runSequence('clean:dist', 'clear:afterdist', 'notify:build');
  
});

gulp.task('serve', ['clean:server'], function () {
  runSequence('connect', 'watch');
});



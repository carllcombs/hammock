/**
 * $ npm install --save-dev gulp
 * $ npm install --save-dev gulp-sass gulp-autoprefixer gulp-minify-css
 * $ npm install --save-dev gulp-jshint gulp-uglify
 * $ npm install --save-dev gulp-imagemin gulp-svgmin gulp-svg2png
 * $ npm install --save-dev gulp-rename gulp-clean gulp-concat gulp-notify gulp-base64 gulp-cache
 */

// Load plugins
var gulp = require('gulp'),
    // styles
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    // scripts
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    // images
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    svg2png = require('gulp-svg2png'),
    // utilities
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    order = require('gulp-order'),
    notify = require('gulp-notify'),
    base64 = require('gulp-base64'),
    cache = require('gulp-cache');
        // livereload = require('gulp-livereload'),
        // lr = require('tiny-lr'),
        // server = lr();

// Vendor Styles
gulp.task('vendor-styles', function() {
    return gulp.src([
        'src/bower_components/angular/**/*.css',
        'src/bower_components/bootstrap-sass-official/**/*.css',
        'src/bower_components/bootstrap-sass-official/**/*.scss',
        //'src/**/*.css',
        'src/bower_components/**/*.css',
        //'src/**/*.scss',
        'src/bower_components/**/*.scss',
        '!src/bower_components/**/*.min.css',
        '!src/bower_components/bootstrap-sass-official/vendor/assets/stylesheets/bootstrap.scss'
    ])
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('vendor.css'))
    //.pipe(gulp.dest('public/assets/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/assets/css'))
    .pipe(notify({ message: 'Vendor styles task complete' }));
});

// Vendor Scripts
gulp.task('vendor-scripts', function() {
    return gulp.src([
        'src/bower_components/jquery/**/*.js',
        'src/bower_components/angular/**/*.js',
        // 'src/**/*.js',
        'src/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js',
        'src/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js',
        'src/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js',
        'src/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js',
        'src/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
        'src/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js',
        'src/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js',
        'src/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js',
        'src/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js',
        'src/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js',
        'src/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
        'src/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js',
        'src/bower_components/**/*.js',
        '!src/bower_components/**/*.min.js',
        '!src/bower_components/jquery/src/**'
    ])
    // .pipe(jshint('.jshintrc')) // returning lots of errors. need to find a nice solution.
    // .pipe(jshint.reporter('default'))
    .pipe(concat('vendor.js'))
    //.pipe(gulp.dest('public/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/js'))
    .pipe(notify({ message: 'Vendor scripts task complete' }));
});

// App Styles
gulp.task('app-styles', function() {
    return gulp.src([
        'src/app/**/*.css',
        'src/app/**/*.scss',
        '!src/app/**/*.min.css'
    ])
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/'))
    .pipe(notify({ message: 'App styles task complete' }));
});

// App Scripts
gulp.task('app-scripts', function() {
    return gulp.src([
        'src/app/js/plugins/flot/excanvas.js',
        'src/app/js/plugins/flot/jquery.flot.resize.js',
        'src/app/js/plugins/flot/jquery.flot.pie.js',
        'src/app/js/plugins/flot/jquery.flot.tooltip.js',
        'src/app/js/plugins/flot/jquery.flot.js',
        'src/app/js/plugins/**/*.js',
        'src/app/**/*.js'
    ])
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/'))
    .pipe(notify({ message: 'App scripts task complete' }));
});

gulp.task('app-files', function() {
    return gulp.src([
        'src/app/**/*.html',
        'src/app/**/*.eot',
        'src/app/**/*.svg',
        'src/app/**/*.ttf',
        'src/app/**/*.woff',
        'src/app/**/*.otf'
    ])
    .pipe(gulp.dest('public/'))
    .pipe(notify({ message: 'App files task complete' }));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['public/'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('vendor-styles');
    gulp.start('vendor-scripts');
    gulp.start('app-styles');
    gulp.start('app-scripts');
    gulp.start('app-files');
});

// Watch
gulp.task('watch', function() {
    // Watch styles
    gulp.watch([
        'src/app/**/*.css',
        'src/app/**/*.scss',
        '!src/app/**/*.min.css'
    ], ['app-styles']);
    // Watch scripts
    gulp.watch([
        'src/app/js/plugins/flot/excanvas.js',
        'src/app/js/plugins/flot/jquery.flot.resize.js',
        'src/app/js/plugins/flot/jquery.flot.pie.js',
        'src/app/js/plugins/flot/jquery.flot.tooltip.js',
        'src/app/js/plugins/flot/jquery.flot.js',
        'src/app/js/plugins/**/*.js',
        'src/app/**/*.js'
    ], ['app-scripts']);
    // Watch image files
    // gulp.watch('src/images/**/*', ['images']);
    // Watch files
    gulp.watch([
        'src/app/**/*.html',
        'src/app/**/*.eot',
        'src/app/**/*.svg',
        'src/app/**/*.ttf',
        'src/app/**/*.woff',
        'src/app/**/*.otf'
    ], ['app-files']);
});
'use strict';

/**
 * Libraries
 */
const
    argv = require('yargs').argv,
    fs = require('fs'),
    boolean = require('boolean'),

    gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    sourcemaps = require('gulp-sourcemaps'),
    sequence = require('run-sequence'),
    connect = require('gulp-connect');

/**
 * Sources Paths
 */
const PATHS = {
    js: [
        `src/js/main.js`
    ],
    libs: [
        `node_modules/jquery/dist/jquery.min.js`,
        `node_modules/bootstrap/dist/js/bootstrap.min.js`
    ],
    styles: [
        `node_modules/bootstrap/dist/css/bootstrap.min.css`
    ],
	sourceFonts: [
		`node_modules/bootstrap/fonts/`
	],
	distFonts: `dist/fonts/`
};

/**
 * Styles
 */

gulp.task('sass:app', () => {
    return gulp
        .src('src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles'))
});

gulp.task('sass:vendor', () => {
    return gulp
        .src(PATHS.styles)
        .pipe(sourcemaps.init())
		.pipe(concat('vendor.min.css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles'))
});

gulp.task('styles', ['sass:app', 'sass:vendor']);

/**
 * Javascript
 */
gulp.task('js:app', () => {
    return gulp
        .src(PATHS.js)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('js:libs', () => {
    return gulp
        .src(PATHS.libs)
        .pipe(concat('vendor.min.js'))
		.pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('js', ['js:app', 'js:libs']);

/**
 * Server
 */

 gulp.task('server', function() {
   connect.server();
 });

/**
 * Common
 */

gulp.task('copy:fonts', () => {
    return gulp
        .src(PATHS.sourceFonts + '**/*.*')
        .pipe(gulp.dest(PATHS.distFonts));
});

gulp.task('copy:images', () => {
    return gulp
        .src('src/img/**/*.*')
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('clean', () => {
    return gulp
        .src('./dist', {read: false})
        .pipe(rimraf());
});

gulp.task('build', (cb) => {
    sequence('clean',
        [
            'copy:fonts',
            'copy:images',
            'js',
            'styles',
        ], () => cb());
});

gulp.task('default', ['build','server','watch']);

/**
 * Watch
 */
gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['js:app']);
    gulp.watch('src/**/*.scss', ['sass:app']);
    gulp.watch('src/images/**/*.*', ['copy:images']);
    gulp.watch('src/fonts/**/*.*', ['copy:fonts']);
});

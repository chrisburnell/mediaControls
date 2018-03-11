/**
 * Audio Controls Gulp Config
 * @author Chris Burnell
 * @version 1.1.0
 */


'use strict';


// Define gulp-centric objects
let gulp = require('gulp');
let babel = require('gulp-babel');
let eslint = require('gulp-eslint');
let newer = require('gulp-newer');
let plumber = require('gulp-plumber');
let postcss = require('gulp-postcss');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let watch = require('gulp-watch');

// Define other objects
let autoprefixer = require('autoprefixer');
let cssnano = require('cssnano');
let reporter = require('postcss-reporter');
let scss_syntax = require('postcss-scss');

// Define paths
const paths = {
    root: '.',
    src: 'src',
    includes: '_includes'
};

// -----------------------------------------------------------------------------

// Compile CSS from Sass
gulp.task('css-main', () => {
    return gulp.src([`${paths.src}/main.scss`])
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            indentWidth: 4,
            outputStyle: 'expanded'
        }))
        .pipe(postcss([
            autoprefixer(),
            cssnano(),
            reporter({
                plugins: ['!postcss-discard-empty'],
                clearMessages: true,
                throwError: true
            })
        ]))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(`${paths.root}/`));
});

// -----------------------------------------------------------------------------

// Lint JavaScript
gulp.task('js-lint', ['js-transport'], () => {
    return gulp.src([`${paths.includes}/audioControls.min.js`])
        .pipe(plumber())
        .pipe(eslint({
            fix: true
        }))
        .pipe(eslint.format())
        .pipe(gulp.dest(`${paths.includes}/`));
});

// Transport JavaScript
gulp.task('js-transport', () => {
    return gulp.src([`${paths.src}/audioControls.js`])
        .pipe(plumber())
        .pipe(gulp.dest(`${paths.root}/`))
        .pipe(babel())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(`${paths.root}/`))
        .pipe(gulp.dest(`${paths.includes}/`));
});

// -----------------------------------------------------------------------------

// Default task
gulp.task('default', () => {
    gulp.start('css');
    gulp.start('js');
});

// CSS task
gulp.task('css', () => {
    gulp.start('css-main');
});

// JS task
gulp.task('js', () => {
    gulp.start('js-lint');
});

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task('watch', ['css', 'js'], () => {
    watch(`${paths.root}/src/*.scss`, () => {
        gulp.start('css');
    });
    watch(`${paths.root}/src/*.js`, () => {
        gulp.start('js');
    });
});

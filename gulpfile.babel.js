/**
 * Media Controls Gulp Config
 * @author Chris Burnell
 * @version 1.1.2
 */

"use strict";

// Define gulp-centric objects
let gulp = require("gulp");
let babel = require("gulp-babel");
let concat = require("gulp-concat");
let csso = require("gulp-csso");
let newer = require("gulp-newer");
let plumber = require("gulp-plumber");
let postcss = require("gulp-postcss");
let prettier = require("@bdchauvette/gulp-prettier");
let rename = require("gulp-rename");
let sass = require("gulp-sass");
let watch = require("gulp-watch");

// Define other objects
let autoprefixer = require("autoprefixer");

// Define paths
const paths = {
    root: ".",
    css: {
        src: "src",
        dest: "."
    },
    js: {
        src: "src",
        dest: "."
    },
    includes: "_includes"
};

// -----------------------------------------------------------------------------

// Prettify Sass
gulp.task("css-prettify", () => {
    return gulp
        .src([
            `${paths.css.src}/**/*.scss`
        ])
        .pipe(plumber())
        .pipe(newer(`${paths.css.src}`))
        .pipe(
            prettier({
                printWidth: 9999,
                tabWidth: 4
            })
        )
        .pipe(gulp.dest(`${paths.css.src}/`));
});

// Compile CSS from Sass
gulp.task("css-compile", () => {
    return gulp
        .src([
            `${paths.css.src}/main.scss`
        ])
        .pipe(plumber())
        .pipe(
            sass({
                errLogToConsole: true,
                indentWidth: 4,
                outputStyle: "expanded"
            })
        )
        .pipe(postcss([autoprefixer()]))
        .pipe(
            prettier({
                printWidth: 9999,
                tabWidth: 4
            })
        )
        .pipe(gulp.dest(`${paths.css.dest}/`))
        .pipe(csso())
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(gulp.dest(`${paths.css.dest}/`));
});

// -----------------------------------------------------------------------------

// Prettify JavaScript
gulp.task("js-prettify", () => {
    return gulp
        .src([
            `${paths.js.src}/**/*.js`
        ])
        .pipe(plumber())
        .pipe(newer(`${paths.js.src}/`))
        .pipe(
            prettier({
                printWidth: 9999,
                tabWidth: 4
            })
        )
        .pipe(gulp.dest(`${paths.js.src}/`));
});

// Concatenate JavaScript
gulp.task("js-concat", () => {
    return gulp
        .src([
            `${paths.js.src}/**/*.js`
        ])
        .pipe(plumber())
        .pipe(concat("mediaControls.js"))
        .pipe(gulp.dest(`${paths.js.dest}/`))
        .pipe(babel())
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(gulp.dest(`${paths.js.dest}/`));
});

// -----------------------------------------------------------------------------

// CSS task
gulp.task("css", gulp.series("css-prettify", "css-compile"));

// JS task
gulp.task("js", gulp.series("js-concat"));

// Default task
gulp.task("default", gulp.parallel("css", "js"));

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task("watch", () => {
    gulp.watch(`${paths.css.src}/**/*`, gulp.series("css"));
    gulp.watch(`${paths.js.src}/**/*`, gulp.series("js"));
});

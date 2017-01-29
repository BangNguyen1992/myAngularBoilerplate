var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var http = require('http-server');


// Compiles SCSS files from /scss into /css
gulp.task('sass', function () {
	return gulp.src(['./res/css/*.scss', './res/css/**/*.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function () {
	return gulp.src('dist/*.css')
		.pipe(sourcemaps.init())
		.pipe(cleanCSS({
			compatibility: 'ie8'
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}))
});


// Minify JS
gulp.task('minify-js', function () {
	return gulp.src(['res/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify().on('error', function (e) {
			console.log(e);
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// Combine js
gulp.task('scripts', ['minify-js'], function () {
	return gulp.src('./dist/**/*.js')
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./dist'));
});


// Run everything
gulp.task('default', ['minify-css', 'scripts', 'copy']);


// Configure the browserSync task
gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: '.'
		},
		port: 3000
	})
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass', 'minify-js'], function () {
	gulp.watch(['./res/css/*.scss', './res/css/**/*.scss'], ['sass']);
	gulp.watch('res/js/*.js', ['minify-js']);
	// Reloads the browser whenever HTML or JS files change
	gulp.watch(['*.html'], browserSync.reload);
	gulp.watch('res/js/*.js', browserSync.reload);
});
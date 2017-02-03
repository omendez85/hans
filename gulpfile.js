var gulp = require('gulp'),
	rename = require('gulp-rename'),
 	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel'),
	react = require('gulp-react'),
    concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify');

var jsSources = ['source/js/**/*.js'],
    sassMainSources = ['source/scss/main/**/*.scss'],
    outputDirJs = 'js',
    outputDirCss = 'css';

var thirdPartiesCss = ['source/scss/vendor/**/*.scss'];

gulp.task('sass', function() {
	gulp.src(sassMainSources)
		.pipe(sass({style: 'expanded'}))
		.pipe(gulp.dest(outputDirCss))
});

gulp.task('thirdPartiesCss', function() {
	gulp.src(thirdPartiesCss)
		.pipe(sass({style: 'compressed'}))
		.pipe(rename('vendor.css'))
		.pipe(gulp.dest(outputDirCss))
});

gulp.task('js', function() {
  	gulp.src(jsSources)
		.pipe(sourcemaps.init())
		.pipe(react())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('main.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(outputDirJs));
});

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassMainSources, ['sass']);
	gulp.watch(thirdPartiesCss, ['thirdPartiesCss']);
});

gulp.task('default', [ 'js', 'sass', 'watch']);
gulp.task('build', [ 'thirdPartiesCss', 'js', 'sass']);

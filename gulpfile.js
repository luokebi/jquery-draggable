var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

gulp.task('clean', function() {
	return gulp.src('dist')
				.pipe(clean());
});

gulp.task('build',['clean'], function () {
	gulp.src('src/jquery-draggable.js')
		.pipe(uglify())
		.pipe(rename('jquery-draggable.min.js'))
		.pipe(gulp.dest('dist/'));
});
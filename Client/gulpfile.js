var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
gulp.task('browserify',function(){
    browserify('./public/javascripts/Movie.js')
        .transform('reactify')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist/javascripts')) //we don't need to create this folder gulp will auto create this
});
//Then we create copy task
gulp.task('copy',function(){
    gulp.src('./public/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('./public/stylesheets/*.*')
        .pipe(gulp.dest('dist/stylesheets'));
    gulp.src('./public/javascripts/*.*')
        .pipe(gulp.dest('dist/javascripts'));
});
gulp.task('default',['browserify','copy'],function(){
    return gulp.watch('./public/**/*.*',['browserify','copy']);
});

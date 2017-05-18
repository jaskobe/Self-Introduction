var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var pump = require('pump');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');





// 编译scss
gulp.task('sass', function () {

    return gulp.src("./scss/*.scss")
        .pipe(changed('./scss/*.scss'))
        .pipe(watch('./scss/*.scss'))
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(reload({stream: true}));
        
});




//合并js
gulp.task('scripts', function() {
    return gulp.src(['./src/js/dimmer.js'])
        .pipe(concat('semantic-components.js'))
        .pipe(gulp.dest('./src/js/'));
});






// server
gulp.task('browser-sync', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', reload);

});


gulp.task('default', ['browser-sync']);
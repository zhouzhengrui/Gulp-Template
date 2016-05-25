// 引入gulp及组件
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create();

// html任务, 执行file include组件
gulp.task('html', function() {
    gulp.src(['./src/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'));
});

// sass编译任务, css注入
gulp.task('sass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 默认任务
gulp.task('default', function() {
    gulp.run('html', 'sass', 'server');
});

// 静态服务器, 监听任务, 浏览器重载
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch("./src/**/*.scss", ['sass']);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

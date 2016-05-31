// 引入gulp, plugins, config
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    tinyPNG         = require('gulp-tinypng'),
    fileInclude     = require('gulp-file-include'),
    browserSync     = require('browser-sync').create(),
    config          = require('./config.json');

// html任务, 执行fileinclude组件
gulp.task('html', function() {
    gulp.src(['./src/*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'));
});

// sass编译任务, css注入
gulp.task('sass', function() {
    return gulp.src('./src/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'   // nested, compact, expanded, compressed
        }).on('error', sass.logError))

        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 图片压缩任务
gulp.task('tinyPNG', function() {
    gulp.src('./src/img/*.{png,jpg}')
        .pipe(tingPNG('s0X_ATRE4UrEYqtUSDTHkhEQ_Tj93IAn'))
        .pipe(gulp.dest('dist'));
});

// 默认任务
gulp.task('default', function() {
    gulp.run('html', 'sass', 'server');
});

// 后期处理任务
gulp.task('build', function() {
    gulp.run('tunyPNG');
})

// 静态服务器, 监听任务, 浏览器重载
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch("./src/**/*.scss", ['sass']);
    gulp.watch("./dist/**/*.html").on('change', browserSync.reload);
});

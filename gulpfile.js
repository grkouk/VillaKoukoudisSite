const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass & Inject Into Browser
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Move Fonts to src/fonts
gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('src/fonts'))
})

// Move Font Awesome CSS to src/css
gulp.task('fa', function () {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('src/css'))
})

// //Publish task test1
// gulp.task('package', function () {
//     gulp.src('src/css/*.css')
//         .pipe(gulp.dest('dist/css'))
//     gulp.src('src/fonts/*.*')
//         .pipe(gulp.dest('dist/fonts'))
//     gulp.src('src/img/*.*')
//         .pipe(gulp.dest('dist/img'))
//     gulp.src('src/js/*.*')
//         .pipe(gulp.dest('dist/js'))
//     gulp.src('src/favicon.ico')
//         .pipe(gulp.dest('dist'))
//     gulp.src('src/index.html')
//         .pipe(gulp.dest('dist'))
//     gulp.src('dist/**')
//         .pipe(gulp.dest('c:/inetpub/wwwroot/potos.tours'))


// })


gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleanCSS=require('gulp-clean-css');

var merge = require('merge-stream');

// Compile Sass & Inject Into Browser
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(cleanCSS())   
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('toastr',function() {
    var streams=[];

    streams.push(gulp.src('node_modules/toastr/build/toastr.css')
           .pipe(gulp.dest("src/css"))
        );
    streams.push(gulp.src('node_modules/toastr/build/toastr.js.map')
    .pipe(gulp.dest("src/js"))
    );    
    streams.push(gulp.src('node_modules/toastr/build/toastr.min.js')
    .pipe(gulp.dest("src/js"))
    );    
    return merge(streams);
    
});

// gulp.task('daterangepicker',function() {
//     var streams=[];

//     streams.push(gulp.src('node_modules/bootstrap-daterangepicker/daterangepicker.css')
//            .pipe(gulp.dest("src/css"))
//         );
//     streams.push(gulp.src('node_modules/bootstrap-daterangepicker/moment.js')
//     .pipe(gulp.dest("src/js"))
//     );    
//     streams.push(gulp.src('node_modules/bootstrap-daterangepicker/daterangepicker.js')
//     .pipe(gulp.dest("src/js"))
//     );    
//     return merge(streams);
    
// });

// Move JS Files to src/js
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 
                     'node_modules/jquery/dist/jquery.min.js', 
                     'node_modules/popper.js/dist/umd/popper.min.js'])
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





gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
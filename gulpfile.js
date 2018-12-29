
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    list = require('./src/data/data')
    server = require('gulp-webserver');

gulp.task('sass', function(){
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function(){
    return gulp.watch('./src/sass/*.scss',gulp.series('sass'))
})

gulp.task('server', function(){
    return gulp.src('src')
        .pipe(server({
            port: 8888,
            open: true,
            livereload: true,
            middleware: function(req, res, next){
                var pathname = url.parse(req.url).pathname;
                if(pathname == '/favicon.ico'){
                    return res.end()
                }

                if(pathname == '/getData'){
                    console.log( url.parse(req.url, true).query)
                    res.end(JSON.stringify({"code": 1, "data": list}))
                }

                pathname = pathname == "/" ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
            }
        }))
})

gulp.task('dev', gulp.series('sass', 'server', 'watch'))
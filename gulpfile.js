var gulp = require("gulp"),
    shell = require('gulp-shell'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean'),
    destination = "dist/";

gulp.task('default', ['copy', 'styles','compile'], function () {

});

gulp.task('styles', function(){
    gulp.src('src/css/images/**.*')
        .pipe(gulp.dest(destination + 'css/images/'));
    gulp.src('src/css/**/*.css')
        .pipe(gulp.dest(destination + 'css/'));
});

gulp.task('copy', function(){
    
    gulp.src('src/css/fonts/**.ttf')
        .pipe(gulp.dest(destination +'css/fonts/'));

    gulp.src('src/slides/favicon.png')
        .pipe(gulp.dest(destination +'slides/'));

    gulp.src('node_modules/reveal.js/**')
        .pipe(gulp.dest(destination +'libs/reveal/'));

    gulp.src('src/images/**')
        .pipe(gulp.dest(destination +'images/'));
});

gulp.task('compile', function() {

    return gulp.src('src/cours/**/*.md', {
            read: false
        })
        .pipe(shell([
            'pandoc --template=src/tpl/template-html5.html -s -i -t html5 <%= file.path %> -o <%= f(file.path) %>',
        ], {
            templateData: {
                f: function(s) {
                    return s.replace(/\.md/, '.html').replace(/\/src\//, '/dist/');
                }
            }
        }));

    return gulp.src('src/slides/*.md', {
            read: false
        })
        .pipe(shell([
            'pandoc --variable revealjs-url="../libs/reveal" --template=src/tpl/template-revealjs.html --standalone --section-divs --variable theme="simple" --variable transition="default" -s -i -t revealjs <%= file.path %> -o <%= f(file.path) %>',
        ], {
            templateData: {
                f: function(s) {
                    return s.replace(/\.md/, '.html').replace(/\/src\//, '/dist/');
                }
            }
        }));
});

gulp.task('echo', function() {
    console.log("TOTO");
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.md', ['compile']);
    gulp.watch('src/**/*.css', ['styles']);
    gulp.watch('src/tpl/template-html5.html', ['compile']);
});

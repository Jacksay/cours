var gulp = require("gulp"),
    shell = require('gulp-shell'),
    watch = require('gulp-watch'),
    destination = "dist/";

gulp.task('default', ['watch', 'compile-article', 'compile-slide', 'compile-cours', 'compile-index'], function() {

});

//
gulp.task('styles', ['copy-fonts','copy-images','copy-libs', 'copy-ressources'], function() {
    gulp.src('src/css/images/**.*')
        .pipe(gulp.dest(destination + 'css/images/'));
    gulp.src('src/css/fontello/**/*.*')
        .pipe(gulp.dest(destination + 'css/fontello/'));
    gulp.src('src/css/**/*.css')
        .pipe(gulp.dest(destination + 'css/'));
});

// FONTS
gulp.task('prepare', function(){
   gulp.src('src/slides/favicon.png')
         .pipe(gulp.dest(destination + 'slides/'));
   gulp.src('src/cours/favicon.png')
         .pipe(gulp.dest(destination + 'cours/'));
});

// FONTS
gulp.task('copy-fonts', function(){
    gulp.src('src/css/fonts/**.ttf')
        .pipe(gulp.dest(destination + 'css/fonts/'));
});

//
gulp.task('copy-images', function(){
    gulp.src('src/images/**/*')
        .pipe(gulp.dest(destination + 'images/'));
});

gulp.task('copy-ressources', function(){
    gulp.src('src/ressources/**/*')
        .pipe(gulp.dest(destination + 'ressources/'));
});

//
gulp.task('copy-libs', function() {
    gulp.src('src/libs/**')
        .pipe(gulp.dest(destination + 'libs/'));
});


gulp.task('compile-index', ['prepare', 'styles'], function() {
    gulp.src('src/*.md', {
        read: false
    })
        .pipe(shell([
            'pandoc --template=src/tpl/template-index.html -s -i -t html5 <%= file.path %> -o <%= f(file.path) %>',
        ], {
            templateData: {
                f: function(s) {
                    return s.replace(/\.md/, '.html').replace(/\/src\//, '/dist/');
                }
            }
        }));
});

gulp.task('compile-cours', ['prepare', 'styles'], function() {
    gulp.src('src/cours/**/*.md', {
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
});

gulp.task('compile-article', ['prepare', 'styles'], function() {
    gulp.src('src/articles/**/*.md', {
        read: false
    })
        .pipe(shell([
            'pandoc --template=src/tpl/template-article.html -s -i -t html5 <%= file.path %> -o <%= f(file.path) %>',
        ], {
            templateData: {
                f: function(s) {
                    return s.replace(/\.md/, '.html').replace(/\/src\//, '/dist/');
                }
            }
        }));
});

gulp.task('compile-slide', ['prepare','styles'], function() {
    gulp.src('src/slides/*.md', {
        read: false
    })
        .pipe(shell([
            'pandoc --variable revealjs-url="../libs/reveal.js" --template=src/tpl/template-revealjs.html --standalone --section-divs --variable theme="simple" --variable transition="default" -s -i -t revealjs <%= file.path %> -o <%= f(file.path) %>',
        ], {
            templateData: {
                f: function(s) {
                    return s.replace(/\.md/, '.html').replace(/\/src\//, '/dist/');
                }
            }
        }));
});

gulp.task('watch', function() {
    gulp.watch('src/articles/**/*.md', ['compile-article']);
    gulp.watch('src/**/*.md', ['compile-cours', 'compile-slide', 'compile-index']);
    gulp.watch('src/**/*.css', ['styles']);
    gulp.watch('src/tpl/*.html', ['compile-cours', 'compile-slide', 'compile-index']);
});

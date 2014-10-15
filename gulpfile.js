var gulp = require("gulp"),
    shell = require('gulp-shell'),
    watch = require('gulp-watch'),
    destination = "dist/";

gulp.task('default', ['compile-slide', 'compile-cours'], function() {

});

//
gulp.task('styles', ['copy-fonts','copy-images','copy-libs'], function() {
    gulp.src('src/css/images/**.*')
        .pipe(gulp.dest(destination + 'css/images/'));
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

//
gulp.task('copy-fonts', function(){
    gulp.src('src/css/fonts/**.ttf')
        .pipe(gulp.dest(destination + 'css/fonts/'));
});

//
gulp.task('copy-images', function(){
    gulp.src('src/images/**')
        .pipe(gulp.dest(destination + 'images/'));
});

//
gulp.task('copy-libs', function() {
    gulp.src('src/libs/**')
        .pipe(gulp.dest(destination + 'libs/'));
});




gulp.task('compile-cours', ['prepare', 'copy-fonts','copy-images','copy-libs'], function() {
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

gulp.task('compile-slide', ['prepare','copy-fonts','copy-images','copy-libs'], function() {
    gulp.src('src/slides/*.md', {
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
    gulp.watch('src/**/*.md', ['compile-cours', 'compile-slide']);
    gulp.watch('src/**/*.css', ['styles']);
    gulp.watch('src/tpl/*.html', ['compile-cours', 'compile-slide']);
});

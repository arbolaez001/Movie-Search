var gulp = require('gulp'),
      ts = require('gulp-typescript'),
      watch = require('gulp-watch');

gulp.task('scripts', function () {
    return gulp.src('/Users/henryarbolaez/Desktop/Personal Projects/Movie Search/app/assets/typescripts/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'omdb.js'
        }))
        .pipe(gulp.dest('/Users/henryarbolaez/Desktop/Personal Projects/Movie Search/app/assets/javascripts'));
});

gulp.task('watch', function(){
  gulp.watch('/Users/henryarbolaez/Desktop/Personal Projects/Movie Search/app/assets/typescripts/*.ts', ['scripts']);
});

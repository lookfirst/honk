var gulp = require('gulp');
var gulpHelpers = require('gulp-helpers');
var taskMaker = gulpHelpers.taskMaker(gulp);

var path = {
	source: 'src/**/*.js',
	output: 'dist',
	watch: 'src/**'
};

taskMaker.defineTask('es6', {taskName: 'es6', src: path.source, dest: path.output, compilerOptions: {externalHelpers: false, optional: ["runtime"]}});
taskMaker.defineTask('watch', {taskName: 'watch', src: path.watch, tasks: ['es6'], taskDeps: ['es6']});

gulp.task('default', ['watch']);

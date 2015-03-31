var gulp = require('gulp');
var gulpHelpers = require('gulp-helpers');
var taskMaker = gulpHelpers.taskMaker(gulp);

var path = {
	source: 'src/**/*.js',
	output: 'dist',
	watch: 'src/**'
};

taskMaker.defineTask('clean', {taskName: 'clean', src: path.output});
taskMaker.defineTask('babel', {taskName: 'babel', src: path.source, dest: path.output, compilerOptions: {externalHelpers: false, optional: ['runtime']}});
taskMaker.defineTask('watch', {taskName: 'watch', src: path.watch, tasks: ['babel'], taskDeps: ['babel']});

gulp.task('default', ['clean', 'watch']);

import log from './Log';
import winstonStream from 'winston-stream';

import _ from 'lodash';
import {RemoteLS} from 'npm-remote-ls';
import npm from 'npm';

import gulp from 'gulp';
import gulpHelpers from 'gulp-helpers';

var taskMaker = gulpHelpers.taskMaker(gulp);

export default class NpmRepository {

	/**
	 * Given an array of dependencies, npm install them.
	 *
	 * Consider replacing this with shelled out npm. Sigh.
	 *
	 * https://github.com/npm/npm/pull/7800
	 *
	 * @returns {Promise.<T>} and data about the installation
	 */
	install(dependencies) {
		return new Promise((resolve, reject) => {
			let stream = winstonStream(log, 'trace'); // make npm a bit more silent. sigh.

			npm.load({'logstream': stream}, (err) => {
				if (err) return reject(err);

				let log = console.log;
				console.log = function() {};  // make npm a bit more silent. sigh.

				npm.commands.install(dependencies, (err, data) => {
					console.log = log;

					if (err) return reject(err);
					resolve(data);
				});
			})
		});
	}

	/**
	 * Copies the files from node_modules to honk_packages
	 *
	 * @param nodeModules object returned from install(), array of array of dependency data
	 */
	buildDirectoryStructure(nodeModules) {
		taskMaker.defineTask('clean', {taskName: 'clean', src: 'honk_packages'});

		let taskNames = ['clean'];

		_.forEach(nodeModules, (mod) => {
			let name = mod[0]; // base62@0.1.1
			let folder = mod[1]; // node_modules/base62
			let taskName = 'copy-' + name;

			taskNames.push(taskName);

			// TODO: write task that does transformations
			taskMaker.defineTask('copy', {taskName: taskName, src: folder + '/**', dest: 'honk_packages/npm/' + name});
		});

		gulp.task('default', taskNames);

		// TODO: gulp 4.0 changes to series() / parallel()
		// https://github.com/gulpjs/gulp/issues/770
		process.nextTick(() => {
			if (gulp.tasks.default) { gulp.start('default'); }
		});
	}

	/**
	 * Return a promise that resolves to an object tree
	 * {
	 * 		dependencies: []  // sorted mangled list of dependencies
	 * 		top: [] // the top level dependencies tree
	 * }
	 *
	 * @returns {Promise.<T>}
	 */
	getDependencies(top) {
		return this.buildDependencyTree(top).then((tree) => {
			return {
				dependencies: this.buildDependencyList(tree), // using => above allows 'this' to magically work
				top: top
			};
		});
	}

	/**
	 * Takes an array of top level dependencies and builds a flat tree
	 *
	 * @param top the top of the tree
	 */
	buildDependencyTree(top) {
		let promises = [];

		_.forEach(top, (dep) => {
			if (dep.repository === 'npm') { // just in case
				let remote = new RemoteLS();
				promises.push(
					new Promise((resolve) => {
						remote.ls(dep.name, dep.rawSpec, () => {
							dep.tree = remote.tree;
							dep.flat = Object.keys(remote.flat);
							resolve(dep);
						});
					})
				);
			}
		});

		return Promise.all(promises);
	}

	/**
	 * Given an array of objects with an array of .flat dependencies,
	 * remove the duplicates and return a list of dependencies.
	 */
	buildDependencyList(deps) {
		let allFlat = [];
		_.forEach(deps, (dep) => {
			allFlat = _.union(allFlat, dep.flat);
		});

		return Array.sort(allFlat);
	}
}
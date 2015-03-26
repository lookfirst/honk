let _ = require('lodash');
let npa = require('npm-package-arg');

export default class DependencyUtils {
	constructor() {

	}

	/**
	 * Takes an object of dependencies from package.json and groups them by repository.
	 *
	 * The dependency is processed through npm-package-arg, with best effort for github.
	 *
	 * @param dependencies
	 * @return dependencies grouped by repository
	 */
	groupByRepository(dependencies) {
		return _.reduce(dependencies, function(result, dependency, name) {
			let match = dependency.match(/^(.*):(.*)@(.*)/);
			if (match) {
				let repo = match[1];		// github || npm || bower
				let fullName = match[2];	// angular/bower-angular
				let version = match[3];		// ^1.2.3

				// group by repository, so create if needed
				if (!result[repo]) { result[repo] = []; }

				let npaResult = npa(`${fullName}@${version}`);

				// npa can't parse github links like angular/bower-angular, so fix the name
				if (!npaResult.name && repo === 'github' && fullName.indexOf('/') !== -1) {
					let fixed = fullName.match(/\/(.*)/);
					npaResult = npa(`${fixed[1]}@${version}`);
					npaResult.originalName = fullName;
				}

				let data = {};
				data[name] = npaResult;
				result[repo].push(data);
			}

			return result;

		}, {});
	}
}

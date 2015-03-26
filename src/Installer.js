let path = require('path');
let _ = require('lodash');

let DependencyUtils = require('./DependencyUtils');
let NpmRepository = require('./NpmRepository');
let GithubRepository = require('./GithubRepository');

let du = new DependencyUtils();
let npmRepo = new NpmRepository();

export default class Installer {
	constructor(pkg, options) {
		this.pkg = pkg;
		this.options = options;

		if (pkg) {
			this.processPackage();
		} else {
			this.processPackageJson();
		}
	}

	loadPackageJson() {
		return require(path.resolve(process.cwd(), 'package.json'));
	}

	processPackageJson() {
		var packageJson = this.loadPackageJson();
		if (packageJson.honk && packageJson.honk.dependencies) {
			let dependencies = packageJson.honk.dependencies;

			let grouped = du.groupByRepository(dependencies);

			npmRepo.buildDependencyTree(grouped['npm']);
		}
	}

	processPackage() {
		if (this.pkg.startsWith('npm')) {
			console.log(this.pkg);
		}
	}
}
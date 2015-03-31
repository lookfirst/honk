import path from 'path';
import _ from 'lodash';

import log from './Log';
import DependencyUtils from './DependencyUtils';
import NpmRepository from './NpmRepository';
import GithubRepository from './GithubRepository';

let du = new DependencyUtils();
let npmRepo = new NpmRepository();

export default class Installer {
	constructor(pkg, options) {
		this.pkg = pkg;
		this.options = options;

		if (pkg) {
			this.processPackage();
		} else {
			this.processPackageJson().then((result) => {
				log.info(result);
			}).catch((error) => {
				log.error(error);
			});
		}
	}

	loadPackageJson() {
		return require(path.resolve(process.cwd(), 'package.json'));
	}

	/**
	 * @returns Promise
	 */
	processPackageJson() {
		var packageJson = this.loadPackageJson();
		let dependencies = this.gatherDependencies(packageJson);

		let grouped = du.groupByRepository(dependencies);

		this.npmInstall(grouped.npm).then((result) => {
			npmRepo.buildDirectoryStructure(result);
		});

		return Promise.resolve();
	}

	npmInstall(dependencies) {
		return npmRepo.getDependencies(dependencies).then((result) => {
			return npmRepo.install(result.dependencies);
		});
	}

	/**
	 * This is where we build the dependencies objects. Right now,
	 * just looking at honk dependencies in package.json
	 */
	gatherDependencies(packageJson) {
		let dependencies = {};
		if (packageJson.honk && packageJson.honk.dependencies) {
			dependencies = packageJson.honk.dependencies;
		}
		return dependencies;
	}

	processPackage() {
		if (this.pkg.startsWith('npm')) {
			console.log(this.pkg);
		}
	}
}

export default class Installer {
	constructor(pkg, options) {
		this.pkg = pkg;
		this.options = options;

		this.processPackage();
	}

	processPackage() {
		console.log(this.pkg);
	}
}
#!/usr/bin/env node

var commander = require('commander');
var version = require('../package.json').version;

var Installer = require('./Installer');

class CommandLine {
	constructor(argv) {
		commander.version(version);
		this.setup(this);
		commander.parse(argv);
	}

	setup(clazz) {
		commander
			.command('install [package]')
			.description('Install a package')
			.action(function(pkg, options) {
				clazz.install(pkg, options);
			});
	}

	install(pkg, options) {
		new Installer(pkg, options);
	}
}

new CommandLine(process.argv);

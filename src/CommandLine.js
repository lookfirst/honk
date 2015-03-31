#!/usr/bin/env node

import commander from 'commander';
import {version} from '../package.json';

import Installer from './Installer';

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

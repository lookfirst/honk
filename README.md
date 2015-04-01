# honk
Package manager only for browser based JavaScript ES6+. It is intended to be compatible with jspm and systemjs.

This is an experiment to create a package manager like jspm, but a lot simpler and not full of the legacy stuff that is all over the jspm codebase. For instance, I’d like to focus on just being a package manager and not doing bundling at all. There is also a lot of support for configuration options that no longer are documented, making it hard to tell what is needed in the codebase and what isn't.

I’d also like to force people to define the repository for their dependencies. no more `‘angular’: ‘angular@1.3.4’`, it should be `’angular’:’github:angular/bower-angular@1.3.4’`. That would remove the whole need for the repostitory setting and make things more clear.

I’m also not convinced that we need another package manager for nodejs or browserify usage. Just focus things on the web and systemjs only. That simplified a lot of code right there too.

A couple other ideas I’ve come up with for consideration are:

1. for repositories, use their existing mechanisms for download / install. for instance, effectively `npm install` packages to node_modules and then copy from there. this prevents the system from having to manage downloading, caching or worry about configuring npm. same will be true for bower and github and whatever else comes along.

1. use gulp tasks programatically for moving files around. it is already really good at globbing and such, might as re-use the code. this also means that transforming the code in node_modules into jspm_packages could be done as a gulp plugin instead. it would encourage a cleaner api because the plugin could just use that api.

1. all configuration goes into `package.json`:`honk: {}` and is then resolved into a `systemjs.config.js` file. it is one direction and immutable. this means we only need `honk install` and it will always overwrite what is in the `config.js` file.

# Status

1. npm dependency resolution is started and mostly working. `honk install` will read the dependnencies, populate the node_modules folder and then copy the files into a honk_packages folder.

# Todo

1. build a gulp plugin that does the transformation of the code in node_modules -> honk_packages.

let assert = require('power-assert');

let DependencyUtils = require('../dist/DependencyUtils');

describe("DependencyUtils", () => {
	let du = new DependencyUtils();
	let deps = {
		"angular": "github:angular/bower-angular@^1.3.15",
		"react": "npm:react@^0.13.0",
		"foo": "npm:foo@^0.13.0"
	};

	it('#groupByRepository', () => {
		let grouping = du.groupByRepository(deps);

		assert(grouping['npm'].length == 2);
		assert.deepEqual(grouping['npm'][0], {"react": {
			"name": "react",
			"raw": "react@^0.13.0",
			"rawSpec": "^0.13.0",
			"scope": null,
			"spec": ">=0.13.0 <0.14.0",
			"type": "range"
		}});
		assert.deepEqual(grouping['npm'][1], {"foo": {
			"name": "foo",
			"raw": "foo@^0.13.0",
			"rawSpec": "^0.13.0",
			"scope": null,
			"spec": ">=0.13.0 <0.14.0",
			"type": "range"
		}});

		assert(grouping['github'].length == 1);
		assert.deepEqual(grouping['github'][0], {"angular": {
			"originalName": "angular/bower-angular",
			"name": "bower-angular",
			"raw": "bower-angular@^1.3.15",
			"rawSpec": "^1.3.15",
			"scope": null,
			"spec": ">=1.3.15 <2.0.0",
			"type": "range"
		}});
	});
});

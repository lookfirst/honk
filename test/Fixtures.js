export var deps = {
	"angular": "github:angular/bower-angular@^1.3.15",
	"react": "npm:react@^0.13.0",
	"commander": "npm:commander@^2.7.1"
};

export var depsNoPrefix = {
	"angular": "angular/bower-angular@^1.3.15"
};

export var groupedDeps = {
	"npm": [
		{
			"module": "react",
			"name": "react",
			"raw": "react@^0.13.0",
			"rawSpec": "^0.13.0",
			"scope": null,
			"spec": ">=0.13.0 <0.14.0",
			"type": "range",
			"repository": "npm"
		},
		{
			"module": "commander",
			"name": "commander",
			"raw": "commander@^2.7.1",
			"rawSpec": "^2.7.1",
			"scope": null,
			"spec": ">=2.7.1 <3.0.0",
			"type": "range",
			"repository": "npm"
		}
	],
	"github": [
		{
			"module": "angular",
			"originalName": "angular/bower-angular",
			"name": "bower-angular",
			"raw": "bower-angular@^1.3.15",
			"rawSpec": "^1.3.15",
			"scope": null,
			"spec": ">=1.3.15 <2.0.0",
			"type": "range",
			"repository": "github"
		}
	]
};

export var depsWithFlat = [
	{
		"module": "react",
		"name": "react",
		"raw": "react@^0.13.0",
		"rawSpec": "^0.13.0",
		"scope": null,
		"spec": ">=0.13.0 <0.14.0",
		"type": "range",
		"repository": "npm",
		"tree": {
			"react@0.13.1": {
				"envify@3.4.0": {
					"through@2.3.6": {},
					"jstransform@10.1.0": {
						"base62@0.1.1": {},
						"esprima-fb@13001.1001.0-dev-harmony-fb": {},
						"source-map@0.1.31": {
							"amdefine@0.1.0": {}
						}
					}
				}
			}
		},
		"flat": [
			"react@0.13.1",
			"envify@3.4.0",
			"through@2.3.6",
			"jstransform@10.1.0",
			"base62@0.1.1",
			"esprima-fb@13001.1001.0-dev-harmony-fb",
			"source-map@0.1.31",
			"amdefine@0.1.0"
		]
	},
	{
		"module": "commander",
		"name": "commander",
		"raw": "commander@^2.7.1",
		"rawSpec": "^2.7.1",
		"scope": null,
		"spec": ">=2.7.1 <3.0.0",
		"type": "range",
		"repository": "npm",
		"tree": {
			"commander@2.7.1": {
				"should@5.2.0": {
					"should-type@0.0.4": {},
					"should-format@0.0.7": {
						"should-type@0.0.4": {}
					},
					"should-equal@0.3.1": {
						"should-type@0.0.4": {}
					}
				},
				"graceful-readlink@1.0.1": {}
			}
		},
		"flat": [
			"commander@2.7.1",
			"should@5.2.0",
			"should-type@0.0.4",
			"should-format@0.0.7",
			"should-equal@0.3.1",
			"graceful-readlink@1.0.1"
		]
	}
];

export var flatOnly = [
	{
		"flat": [
			"react@0.13.1",
			"commander@2.7.1",
			"should@5.2.0",
			"should-type@0.0.4",
			"should-format@0.0.7",
			"should-equal@0.3.1",
			"graceful-readlink@1.0.1"
		]
	},
	{
		"flat": [
			"react@0.13.1",
			"envify@3.4.0",
			"through@2.3.6",
			"jstransform@10.1.0",
			"base62@0.1.1",
			"esprima-fb@13001.1001.0-dev-harmony-fb",
			"source-map@0.1.31",
			"amdefine@0.1.0",
			"graceful-readlink@1.0.2"
		]
	}

];
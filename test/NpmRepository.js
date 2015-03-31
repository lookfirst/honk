import assert from 'power-assert';
import NpmRepository from '../dist/NpmRepository';
import {groupedDeps, flatOnly} from './Fixtures';

describe("NpmRepository", () => {
	let nr = new NpmRepository();

	/**
	 * Result object looks like Fixtures.depsWithFlat
	 */
	it('#buildDependencyTree', () => {
		return nr.buildDependencyTree(groupedDeps['npm']).then((result) => {
			assert(result.length == 2);
			assert(result[0].module === 'react');
			assert(result[1].module === 'commander');
		});
	});

	it('#buildDependencyList', () => {
		assert.deepEqual(nr.buildDependencyList(flatOnly),
			['amdefine@0.1.0',
			'base62@0.1.1',
			'commander@2.7.1',
			'envify@3.4.0',
			'esprima-fb@13001.1001.0-dev-harmony-fb',
			'graceful-readlink@1.0.1',
			'graceful-readlink@1.0.2',
			'jstransform@10.1.0',
			'react@0.13.1',
			'should-equal@0.3.1',
			'should-format@0.0.7',
			'should-type@0.0.4',
			'should@5.2.0',
			'source-map@0.1.31',
			'through@2.3.6']);
	});
});

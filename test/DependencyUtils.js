import _ from 'lodash';
import assert from 'power-assert';
import DependencyUtils from '../dist/DependencyUtils';
import {groupedDeps, deps, depsNoPrefix} from './Fixtures';

describe("DependencyUtils", () => {
	let du = new DependencyUtils();

	describe('#groupByRepository', () => {
		it('has valid data', () => {
			let grouping = du.groupByRepository(deps);

			assert(grouping['npm'].length == 2);
			assert.deepEqual(grouping['npm'][0], groupedDeps['npm'][0]);
			assert.deepEqual(grouping['npm'][1], groupedDeps['npm'][1]);

			assert(grouping['github'].length == 1);
			assert.deepEqual(grouping['github'][0], groupedDeps['github'][0]);
		});

		it('has a missing repo prefix', () => {
			let grouping = du.groupByRepository(depsNoPrefix);

			assert(_.size(grouping) == 0);
		});
	});
});

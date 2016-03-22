/* jshint node: true */

'use strict';

function getTaskConfig(projectConfig) {
	var taskConfig = {
		someProperty: "a value",
		src:          projectConfig.paths.src.base + 'module-thing.ext',
		watch:        [
			projectConfig.paths.src.components + '**/*.ext'
		]
	};

	return taskConfig;
}

module.exports = getTaskConfig;

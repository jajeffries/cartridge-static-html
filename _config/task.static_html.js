/* jshint node: true */

'use strict';

var path = require('path');

function getTaskConfig(projectConfig) {

	var layouts  = path.resolve(process.cwd(), projectConfig.paths.src.views.layouts) + '/**/*.hbs';
	var partials = path.resolve(process.cwd(), projectConfig.paths.src.components)    + '/**/*.hbs';
	var helpers  = path.resolve(process.cwd(), projectConfig.paths.src.views.helpers  + '/helpers.js');
	var data     = path.resolve(process.cwd(), projectConfig.paths.src.views.data)    + '/**/*.json';

	var taskConfig = {
		extension: 'hbs',
		watch: [
			layouts, partials, helpers, data
		],
		src: {
			layouts:  layouts,
			partials: partials,
			helpers:  helpers,
			data:     data,
		}
	};

	taskConfig.rename = function rename(path) {
		path.extname = '.html';
	};

	return taskConfig;
}

module.exports = getTaskConfig;

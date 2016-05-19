'use strict';
/* ============================================================ *\
	COMPILE TEMPLATES / HTML
\* ============================================================ */

// General gulp tasks
var rename = require('gulp-rename');
var data   = require('gulp-data');
var path   = require('path');
var merge  = require('merge');

//.Handlebars tasks
var handlebars  = require('gulp-compile-handlebars');

/* jshint node: true */

// Basic data source api pending it being split out to another file
function getDataSource(projectConfig) {
	var api = {};

	api.getDataForPath = function getDataForPath(requestedPath) {
		var templateData, dataPath;

		dataPath = path.resolve(projectConfig.paths.src.views.data, requestedPath + '.json');

		try{
			templateData = require(dataPath);
		} catch(err){
			templateData = {};
		}

		return templateData;
	};

	api.getPaths = function getPaths() {
		return;
	};

	return api;
}

// Basic default data source pending it being split out
function DefaultData(projectConfig) {
	var defaultData = require(path.resolve(projectConfig.paths.src.views.data, '_default.json'));

	return {
		apply: function apply(data) {
			return merge.recursive(defaultData, data);
		}
	};
}


module.exports = function(gulp, projectConfig, tasks) {

	/* --------------------
	*	CONFIGURATION
	* ---------------------*/

	var TASK_NAME = 'static_html';

	// Task Config
	var taskConfig      = require(path.resolve(process.cwd(), projectConfig.dirs.config, 'task.' + TASK_NAME + '.js'))(projectConfig);
	var templateHelpers = require(taskConfig.src.helpers);

	/* --------------------
	*	DATA HANDLERS
	* ---------------------*/

	var dataSource  = getDataSource(projectConfig);
	var defaultData = DefaultData(projectConfig);

	/* --------------------
	*	UTILITY FUNCTIONS
	* ---------------------*/

	function getData(file) {
		var relativePath, pathData;

		relativePath = path.relative(projectConfig.paths.src.views.layouts, file.path);
		relativePath = relativePath.replace('.' + taskConfig.extension, '');

		pathData = dataSource.getDataForPath(relativePath);
		pathData = defaultData.apply(pathData);

		return pathData;
	}

	/* --------------------
	*	MODULE TASKS
	* ---------------------*/

	gulp.task(TASK_NAME, function () {
		templateHelpers.register(handlebars.Handlebars);

		var options = {
			helpers: templateHelpers,
			batch:   [projectConfig.paths.src.components]
		};

		return gulp.src(taskConfig.src.layouts)
			.pipe(data(getData))
			.pipe(handlebars({}, options))
			.pipe(rename(taskConfig.rename))
			.pipe(gulp.dest(projectConfig.paths.dest[TASK_NAME]));
	});

	/* --------------------
	*	WATCH TASKS
	* ---------------------*/

	gulp.task('watch:' + TASK_NAME, function () {
		gulp.watch(
			taskConfig.watch,
			[TASK_NAME]
		);
	});

	/* ----------------------------
	*	CARTRIDGE TASK MANAGEMENT
	* -----------------------------*/

	// Add the clean path for the generated styles
	projectConfig.cleanPaths.push(projectConfig.paths.dest[TASK_NAME]);
	// Add the task to the default list
	tasks.default.push(TASK_NAME);
	// Add the task to the watch list
	tasks.watch.push('watch:' + TASK_NAME);
};

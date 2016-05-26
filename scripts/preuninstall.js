'use strict';

// Package config
var packageConfig = require('../package.json');

// Node utils
var cartridgeUtil = require('cartridge-module-util')(packageConfig);
var path          = require('path');

var TASK_NAME = 'static_html';

var PATH_HELPERS = 'views/helpers/';
var PATH_LAYOUTS = 'views/pages/';
var PATH_DATA    = 'views/data/';

function projectConfigDeletePaths(config) {

  delete config.paths.src.views.layouts;
  delete config.paths.src.views.helpers;
  delete config.paths.src.views.data;
  delete config.paths.dest[TASK_NAME];

	return config;
}

// Run through module uninstallation
cartridgeUtil.removeFromRc(packageConfig.name)
	.then(function() {
		return cartridgeUtil.modifyProjectConfig(projectConfigDeletePaths);
	})
	.then(function() {
		return cartridgeUtil.removeModuleConfig(path.resolve('_config', 'task.static-html.js'));
	})
	.then(function() {
		return cartridgeUtil.removeFromProjectDir([
			'views/data',
			'views/helpers',
			'views/pages',
		])
	})

	.then(cartridgeUtil.finishUninstall)

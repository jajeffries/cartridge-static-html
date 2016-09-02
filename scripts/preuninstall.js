'use strict';

// Package config
var packageConfig = require('../package.json');

// Node utils
var cartridgeUtil = require('cartridge-module-util')(packageConfig);
var path          = require('path');

var TASK_NAME = 'static_html';

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
		return cartridgeUtil.removeModuleConfig(path.resolve('_config', 'task.' + TASK_NAME + '.js'));
	})
	.then(cartridgeUtil.finishUninstall)

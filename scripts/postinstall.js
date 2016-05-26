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

// Transform function for adding paths
function projectConfigAddPaths(config) {

	if(!config.paths.src.hasOwnProperty('views')) {
		config.paths.src.views = {};
	}

	if(!config.paths.src.views.hasOwnProperty('layouts')) {
		config.paths.src.views.layouts = PATH_LAYOUTS;
	}

	if(!config.paths.src.views.hasOwnProperty('helpers')) {
		config.paths.src.views.helpers = PATH_HELPERS;
	}

	if(!config.paths.src.views.hasOwnProperty('data')) {
		config.paths.src.views.data = 'views/data/';
	}

	if(!config.paths.dest.hasOwnProperty(TASK_NAME)) {
		config.paths.dest[TASK_NAME] = 'build/';
	}

	return config;
}

function modifyProjectConfig() {
	return cartridgeUtil.modifyProjectConfig(projectConfigAddPaths);
}

function addModuleConfig() {
	return cartridgeUtil.addModuleConfig(path.resolve('_config', 'task.static_html.js'));
}

// Exit if NODE_ENV is development
cartridgeUtil.exitIfDevEnvironment();
// Make sure that the .cartridgerc file exists
cartridgeUtil.ensureCartridgeExists();
// Run through the project setup
cartridgeUtil.addToRc()
	.then(modifyProjectConfig)
	.then(addModuleConfig)
	.then(function(){
		return cartridgeUtil.copyFileToProject(path.resolve('files', '_default.json'), PATH_DATA);
	})
	.then(function(){
		return cartridgeUtil.copyFileToProject(path.resolve('files', 'helpers.js'), PATH_HELPERS);
	})
	.then(function(){
		return cartridgeUtil.copyFileToProject(path.resolve('files', 'index.hbs'), PATH_LAYOUTS);
	})
	.then(cartridgeUtil.finishInstall);

(function() {
	'use strict';

	module.exports.register = function(Handlebars) {

		/**
		* Private methods
		*/

		Handlebars.registerHelper('isEnv', function(env, options) {
			if(env === globals.env.name) {
				return options.fn(this);
			}
		});

		/**
		 * Get the string value of a JSON object, useful for debugging template data
		 *
		 * @param  {Object} obj JSON object
		 * @return {String}     Provided object as a string
		 *
		 * @example
		 * {{ json data }}
		 */
		Handlebars.registerHelper('json', function(obj) {
			return JSON.stringify(obj);
		});

		/**
		 * Helper that gives condition checking
		 *
		 * @param  {*} v1               First variable
		 * @param  {String} operator    Type of comparison to be made
		 * @param  {*} v2               Second variable to compare
		 * @param  {Object} options     Handlebars options object, not required to be passed in
		 * @return {Boolean}            Condition result
		 *
		 * @example
		 * {{#ifCondition var1 '==' var2}} ..render if condition is true... {{/ifCondition}}
		 */
		Handlebars.registerHelper('ifCondition', function (v1, operator, v2, options) {
			switch (operator) {
				case '===':
					return (v1 === v2) ? options.fn(this) : options.inverse(this);
				case '<':
					return (v1 < v2) ? options.fn(this) : options.inverse(this);
				case '<=':
					return (v1 <= v2) ? options.fn(this) : options.inverse(this);
				case '>':
					return (v1 > v2) ? options.fn(this) : options.inverse(this);
				case '>=':
					return (v1 >= v2) ? options.fn(this) : options.inverse(this);
				case '&&':
					return (v1 && v2) ? options.fn(this) : options.inverse(this);
				case '||':
					return (v1 || v2) ? options.fn(this) : options.inverse(this);
				default:
					return options.inverse(this);
			}
		});
		/**
		 * Helper that repeats blocks of code, providing an index to be utilised
		 *
		 * @param  {Bool} 	n           Number of times to repeat a code block
		 * @param  {Obj} 	options
		 * @return {String}             HTML string of content to be put into template
		 *
		 * @example
		 * {{#repeat 4}} <h{{@index}}>Hello, World!</h{{@index}}> {{/repeat}}
		 */
		Handlebars.registerHelper('repeat', function (n, options) {
			var content = '',
			count = n - 1;

			for (var i = 0; i <= count; i++) {
				var data = {
					index: i + 1
				};
				content += options.fn(this, {data: data});
			}

			return content;
		});

		/**
		 * Helper for carrying out modulous
		 */
		Handlebars.registerHelper('moduloIf', function(index_count,mod,block){
			if(parseInt(index_count+1)%(mod)=== 0){
				return block.fn(this);
			}
			return 0;
		});

		/**
		 * Debug module for getting property values
		 */
		Handlebars.registerHelper('debug', function(propertyToDebug, options) {
			var name;
			if(options.hash.hasOwnProperty('name')) {
				name = ' ' + options.hash.name + ' ';
			} else {
				name = '';
			}

			console.log('====================Debug' + name + 'start');
			console.log(propertyToDebug);
			console.log('====================Debug' + name + 'end');
		});

	};
}).call(this);

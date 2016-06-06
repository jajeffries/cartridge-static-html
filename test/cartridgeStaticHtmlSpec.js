/*eslint-env node, mocha */

var path   = require('path');
var fs     = require('fs-extra');
var chai   = require('chai');
var expect = chai.expect;

chai.use(require('chai-fs'));
chai.should();

var MOCK_PROJECT_DIR = path.join(process.cwd(), 'test', 'mock-project');
var HTML_FILEPATH    = path.join(MOCK_PROJECT_DIR, 'build');

process.chdir(MOCK_PROJECT_DIR);

function cleanUp() {
	fs.remove(HTML_FILEPATH);
}

describe('As a gulpfile', function() {
	describe('when a task is included', function() {
		var basicrunner;

		before(function(done) {
			basicrunner = require(path.resolve(process.cwd(), 'basicrunner.js'));

			done();
		});

		it('should add one task to the default group', function() {
			expect(basicrunner.tasks.default.length).to.equal(1);
		});

		it('should add the static_html task to the default group', function() {
			expect(basicrunner.tasks.default[0]).to.equal('static_html');
		});

		it('should add one task to the watch group', function() {
			expect(basicrunner.tasks.watch.length).to.equal(1);
		});

		it('should add the watch:static_html task to the watch group', function() {
			expect(basicrunner.tasks.watch[0]).to.equal('watch:static_html');
		});

		it('should add one clean path to the clean config', function() {
			expect(basicrunner.config.cleanPaths.length).to.equal(1);
		});

		it('should add the generated styles path to the clean config', function() {
			var relative = path.relative(process.cwd(), basicrunner.config.cleanPaths[0]);
			expect(relative).to.equal('build');
		});
	});
});

describe('As a user of the cartridge-sass module', function() {
	var gulprunner = require(path.resolve(process.cwd(), 'gulprunner.js'));

	this.timeout(10000);

	describe('when `gulp static_html` is run', function() {

		before(function(done) {
			gulprunner.run(done);
		});

		after(function() {
			cleanUp();
		});

		it('should generate the index.html file in the build dir', function() {
			expect(path.join(HTML_FILEPATH, 'index.html')).to.be.a.file();
		});

	});

});

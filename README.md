# Cartridge Static HTML

[![Build Status](https://img.shields.io/travis/cartridge/cartridge-static-html.svg?branch=master&style=flat-square)](https://travis-ci.org/cartridge/cartridge-static-html)
[![Appveyor status](https://ci.appveyor.com/api/projects/status/github/cartridge/cartridge-static-html?branch=master&svg=true)](https://travis-ci.org/cartridge/cartridge-static-html)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

[![Dependency Status](https://david-dm.org/cartridge/cartridge-static-html.svg?style=flat-square)](https://david-dm.org/cartridge/cartridge-static-html/caribou)
[![devDependency Status](https://david-dm.org/cartridge/cartridge-static-html/dev-status.svg?style=flat-square)](https://david-dm.org/cartridge/cartridge-static-html/caribou#info=devDependencies)

> Static HTML expansion pack for [Cartridge](https://github.com/cartridge/cartridge)

To use this module, you will need [cartridge-cli](https://github.com/cartridge/cartridge-cli) installed and have a cartridge project setup.

```sh
npm install cartridge-static-html --save-dev
```

This module adds the following to a project:

* Handlebars [compilation](https://github.com/kaanon/gulp-compile-handlebars)

## Config

Once installed, the config file `task.static-html.js` is created and stored in the `_config` directory in the root of your cartridge project.

## Task

This module provides the following gulp tasks

* `gulp static_html` - Compiles all of the pages that are currently defined

## Structure

This module sets up a basic structure for managing a multiple page static site. It adds several files to a project to start this process.

The module creates a `views` directory in the root of the project with several subdirectories.

### layouts
This directory contains the pages for the site. Each page on the site will require one. Initially `views/layouts/index.hbs` is created to give the generated site an index page.

More files can be added to this directory with the format `*pagename*.hbs`. Any files without the `.hbs` extension will be ignored. Subdirectories can be used to give the site structure if required. For example:

`views/layouts/about-us/people.hbs`

Will generate:

`build/about-us/people.html`

> TODO: Move these over to true layouts that  no longer the specify how many pages exist on the site.

### data
This directory contains JSON files containing the data for specific pages.

There is one special data file contained within this directory: `_default.json`. This file is used as default data that all handlebars files will get. Use it to define site wide data or defaults that will be overidden on specific pages.

When the layouts are generated the task will look for a json file matching the same relative path. For example:

`views/layouts/about-us/people.hbs`

When compiled will look for:

`views/data/about-us/people.json`

If the file is found then it will be merged with the `_default.json` file <sup>1</sup> and provided to the handlebars files during compilation. If no file is found the handlebars files will simply get the default data.

1: Page specific files will overwrite duplicate properties in `_default.json`

> TODO: With the move to data providers these will become the single source of truth for which pages exist.

### helpers
Presently this directory contains one file `helpers.js`. This file is used to register the helpers used on the site. Any additional helpers that are required for a project should be added to this file and can then be accessed within the handlebars templates.

#### example
The following helper:
```javascript
Handlebars.registerHelper('getYear', function(name){
	return new Date().getFullYear();
});
```

The partial:
```handlebars
<footer>
	<small class="footer__copyright">Copyright {{ getYear }}</small>
</footer>
```

Would result in:

```html
<footer>
	<small class="footer__copyright">Copyright 2016</small>
</footer>
```

For more information see the handlebars documentation on [helpers](http://handlebarsjs.com/#helpers) and [block helpers](http://handlebarsjs.com/block_helpers.html).

> TODO: Add more documentation on the basic helpers

* * *

## Development
### Commit message standards [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
Try and adhere as closely as possible to the [Angular commit messages guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).

[Commitizen](https://github.com/commitizen/cz-cli) is a command line tool which can help with this:
```sh
npm install -g commitizen
```
Now, simply use `git cz` instead of `git commit` when committing.

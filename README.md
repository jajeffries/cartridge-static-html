# Cartridge Static HTML [![Build Status](https://travis-ci.org/cartridge/cartridge-static-html.svg?branch=master)](https://travis-ci.org/cartridge/cartridge-static-html)

> Starting point for a base [Cartridge](https://github.com/cartridge/cartridge) module

## Using for a new module
[Create a new empty repository](https://github.com/new) for your expansion pack.

Clone this repository
```sh
git@github.com:cartridge/base-module.git
```

Rename the `base-module` directory for your new module eg:
```sh
mv base-module cartridge-my-module
```

Update the git origin to match your new repository eg:

```sh
cd cartridge-my-module
git remote set-url origin git@github.com:cartridge/test.git
git remote -v
```

Install dependencies
```sh
npm install
```

And do some coding!


## Development on the base module
Clone repository
```sh
git@github.com:cartridge/base-module.git
```

Install dependencies
```sh
cd base-module
npm install
```

And do some coding!

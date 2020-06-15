# @yapplabs/broccoli-base64-css [![Build Status](https://travis-ci.org/yapplabs/broccoli-base64-css.svg?branch=master)](https://travis-ci.org/yapplabs/broccoli-base64-css)

[Broccoli](https://github.com/broccolijs/broccoli) plugin to replace asset urls in CSS with base64 strings.

## Installation

```
yarn add @yapplabs/broccoli-base64-css
```

## Usage

```js
let Base64CSS = require('broccoli-base64-css');
let outputNode = new Base64CSS(inputNode, {
  /* options */
});
```

## Options

### imagePath

Type: `String`  
Default: `"public"`

The location to look to locate images referenced in the CSS files being updated.

### fontPath

Type: `String`  
Default: `"public"`

The location to look to locate font resources referenced in the CSS files being updated.

### maxFileSize

Type: `Number`  
Default: `4096`

Images or fonts larger than this size will not be converted.

### extensions

Type: `Array`  
Default: `['css']`

Files with this extension will be processed.

### fileTypes

Type: `Array`  
Default: `['png', 'jpg', 'jpeg', 'gif', 'svg']`

Images/font references with these extensions will be replaced.

### persist

Type: `Boolean`  
Default: `true`

Enable\disable a persistent cache to improve build performance across restarts. Check out [broccoli-persistent-filter](https://github.com/broccolijs/broccoli-persistent-filter) for more details.

## Running Tests

```
yarn install
yarn test
```

## License

This project is distributed under the MIT license.

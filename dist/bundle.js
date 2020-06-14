/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UploadContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _CanvasContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _drawCanvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);





const onChangeInputHandler = (e) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      updateImageData(img);
    };
  };
  reader.readAsDataURL(e.target.files[0]);
};

const updateImageData = (image) => {
  container.innerHTML = Object(_CanvasContainer__WEBPACK_IMPORTED_MODULE_2__["CanvasContainer"])(image);
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  let canvasContainer = document.getElementById("canvas-container");
  canvasContainer.append(canvas);
  Object(_drawCanvas__WEBPACK_IMPORTED_MODULE_3__["drawCanvas"])(canvas, image, 100, 1, "#ffffff");
};

const container = document.getElementById("pixelator-container");

container.innerHTML = Object(_UploadContainer__WEBPACK_IMPORTED_MODULE_1__["UploadContainer"])();

const upload = document.getElementById("upload");
upload.onchange = onChangeInputHandler;

// {!imageData ? (
//   <UploadContainer updateImageData={handleUpdateImageData} />
// ) : (
//   <CanvasContainer image={imageData} pixelSize={pixelSize} gridSize={gridSize} gridColor={gridColor} pixelType={pixelType} />
// )}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(2);
            var content = __webpack_require__(3);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".App {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100vw;\n  height: 100vh;\n}\n\n#pixelator-container {\n  border: 1px solid black;\n  width: 90%;\n  height: 90%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.upload-label {\n  position: relative;\n  border: 1px solid black;\n  width: 90%;\n  height: 90%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n}\n\n.upload-description {\n  text-align: center;\n}\n\n.upload-imgBtn {\n  width: 80%;\n  opacity: 0.2;\n  padding-bottom: 20px;\n  margin-top: 20px;\n}\n\n#canvas-container {\n  position: relative;\n  border: 1px solid black;\n  width: 90%;\n  height: 90%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n}\n\n.img-item {\n  margin-top: 10px;\n  box-shadow: 0 14px 24px 0 rgba(186, 188, 191, 0.5);\n}\n\n#controller {\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n  top: 10px;\n  left: 10px;\n  width: 200px;\n  height: 300px;\n  z-index: 10;\n  background-color: azure;\n  border: 2px solid darkcyan;\n  text-align: center;\n}\n\n#color {\n  width: 100%;\n  height: 30px;\n  font-size: 12px;\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n  color: white;\n  border-top: 1px solid darkcyan;\n  border-bottom: 1px solid darkcyan;\n}\n\n#pixeltype-radio-container {\n  text-align: initial;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadContainer", function() { return UploadContainer; });
/* harmony import */ var _CanvasContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);

const UploadContainer = () => {
  return `<label for="upload" class="upload-label">
    <p class="upload-description">UPLOAD IMAGE</p>
    <img class="upload-imgBtn" src="https://uploads.codesandbox.io/uploads/user/1dcc6c5f-ac13-4c27-b2e3-32ade1d213e9/2Go1-photo.svg" />
    </label>
    <div>
    <input type="file" accept="image/*" id="upload" class="image-upload" hidden />
    </div>`;
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasContainer", function() { return CanvasContainer; });
const CanvasContainer = () => {
  return `<div id="canvas-container"></div>`;
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawCanvas", function() { return drawCanvas; });
/* harmony import */ var _resizeImage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _averageColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _averageLastPixelColor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);



const dataOffset = 4; // we can set how many pixels to skip
const borderSize = 2;

const drawCanvas = (canvas, image, pixelSize, gridSize, gridColor) => {
  gridColor = gridColor || "#000000";
  console.log("drawCanvas ps", pixelSize);
  const ctx = canvas.getContext("2d");
  const [width, height] = Object(_resizeImage__WEBPACK_IMPORTED_MODULE_0__["resizeImage"])(image);
  canvas.width = width - borderSize;
  canvas.height = height - borderSize;
  const tileSize = pixelSize;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const numTileRows = Math.ceil(canvas.height / tileSize);
  const numTileCols = Math.ceil(canvas.width / tileSize);
  ctx.drawImage(image, 0, 0, width, height);

  const grid = gridSize;
  const gridRed = parseInt(gridColor.substr(1, 2), 16);
  const gridGreen = parseInt(gridColor.substr(3, 2), 16);
  const gridBlue = parseInt(gridColor.substr(5, 2), 16);

  // Loop through each tile
  for (let r = 0; r < numTileRows; r++) {
    for (let c = 0; c < numTileCols; c++) {
      // Set the pixel values for each tile
      let average;
      if (c === numTileCols - 1 || r === numTileRows - 1) average = Object(_averageLastPixelColor__WEBPACK_IMPORTED_MODULE_2__["averageLastPixelColor"])(canvas, r, c, ctx, tileSize, dataOffset);
      else average = Object(_averageColor__WEBPACK_IMPORTED_MODULE_1__["averageColor"])(r, c, ctx, tileSize, dataOffset);
      const rgb = average;

      const red = rgb.r;
      const green = rgb.g;
      const blue = rgb.b;

      // Loop through each tile pixel
      if (c === numTileCols - 1) {
        for (let tr = 0; tr < tileSize; tr++) {
          for (let tc = 0; tc < canvas.width - c * tileSize; tc++) {
            // Calculate the true position of the tile pixel
            const trueRow = r * tileSize + tr;
            const trueCol = c * tileSize + tc;

            // Calculate the position of the current pixel in the array
            const position = trueRow * (imageData.width * dataOffset) + trueCol * dataOffset;

            // console.log("position", position);
            // Assign the colour to each pixel
            if (tc < grid || tr < grid || tc > canvas.width - c * tileSize - grid || tr > canvas.height - r * tileSize - grid) {
              pixels[position + 0] = gridRed;
              pixels[position + 1] = gridGreen;
              pixels[position + 2] = gridBlue;
              pixels[position + 3] = 255;
            } else {
              pixels[position + 0] = red;
              pixels[position + 1] = green;
              pixels[position + 2] = blue;
              pixels[position + 3] = 255;
            }
          }
        }
      } else {
        for (let tr = 0; tr < tileSize; tr++) {
          for (let tc = 0; tc < tileSize; tc++) {
            // Calculate the true position of the tile pixel
            const trueRow = r * tileSize + tr;
            const trueCol = c * tileSize + tc;

            // Calculate the position of the current pixel in the array
            const position = trueRow * (imageData.width * dataOffset) + trueCol * dataOffset;

            // console.log("position", position);
            // Assign the colour to each pixel
            if (tc < grid || tr < grid || tr > canvas.height - r * tileSize - grid) {
              pixels[position + 0] = gridRed;
              pixels[position + 1] = gridGreen;
              pixels[position + 2] = gridBlue;
              pixels[position + 3] = 255;
            } else {
              pixels[position + 0] = red;
              pixels[position + 1] = green;
              pixels[position + 2] = blue;
              pixels[position + 3] = 255;
            }
          }
        }
      }
    }
  }

  // Draw image data to the canvas
  ctx.putImageData(imageData, 0, 0);
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resizeImage", function() { return resizeImage; });
const resizeImage = (image) => {
  let MAX_WIDTH = document.getElementById("canvas-container").getBoundingClientRect().width - 1;
  let MAX_HEIGHT = document.getElementById("canvas-container").getBoundingClientRect().height - 1;
  let width = image.width;
  let height = image.height;

  // 아트보드 가로세로 비율
  const artboardRatio = MAX_WIDTH / MAX_HEIGHT;
  // 이미지 가로세로 비율
  const imageRatio = width / height;

  // 아트보드 비율이 이미지 비율보다 크면 이미지의 세로를 아트보드의 세로에 맞춤
  if (artboardRatio > imageRatio) {
    width *= MAX_HEIGHT / height;
    height = MAX_HEIGHT;
  }
  // 이미지 비율이 아트보드 비율보다 크면 이미지의 가로를 아트보드의 가로에 맞춤
  else {
    height *= MAX_WIDTH / width;
    width = MAX_WIDTH;
  }
  return [width, height];
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "averageColor", function() { return averageColor; });
const averageColor = (row, column, ctx, tileSize, dataOffset) => {
  const rgb = {
    r: 0,
    g: 0,
    b: 0,
  };
  let data;

  try {
    data = ctx.getImageData(column * tileSize, row * tileSize, tileSize, tileSize);
  } catch (e) {
    return rgb;
  }

  const length = data.data.length;
  let count = 0;

  for (let i = 0; i < length; i += dataOffset, count++) {
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = Math.floor(rgb.r / count);
  rgb.g = Math.floor(rgb.g / count);
  rgb.b = Math.floor(rgb.b / count);

  return rgb;
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "averageLastPixelColor", function() { return averageLastPixelColor; });
const sizeOffset = 10;

const averageLastPixelColor = (canvas, row, column, ctx, tileSize, dataOffset) => {
  const rgb = {
    r: 0,
    g: 0,
    b: 0,
  };
  let data;

  try {
    data = ctx.getImageData(column * tileSize, row * tileSize, sizeOffset, sizeOffset);
  } catch (e) {
    return rgb;
  }

  const length = data.data.length;
  let count = 0;

  for (let i = 0; i < length; i += dataOffset, count++) {
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = Math.floor(rgb.r / count);
  rgb.g = Math.floor(rgb.g / count);
  rgb.b = Math.floor(rgb.b / count);

  return rgb;
};


/***/ })
/******/ ]);
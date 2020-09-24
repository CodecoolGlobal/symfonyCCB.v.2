(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~app"],{

/***/ "./node_modules/core-js/internals/array-species-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-repeat.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/string-repeat.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
module.exports = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.concat.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.concat.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.date.to-string.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.date.to-string.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.repeat.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.repeat.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var repeat = __webpack_require__(/*! ../internals/string-repeat */ "./node_modules/core-js/internals/string-repeat.js");

// `String.prototype.repeat` method
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
$({ target: 'String', proto: true }, {
  repeat: repeat
});


/***/ }),

/***/ "./node_modules/is-dom-node-list/dist/is-dom-node-list.es.js":
/*!*******************************************************************!*\
  !*** ./node_modules/is-dom-node-list/dist/is-dom-node-list.es.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is_dom_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-dom-node */ "./node_modules/is-dom-node/dist/is-dom-node.es.js");
/*! @license is-dom-node-list v1.2.1

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/


function isDomNodeList(x) {
	var prototypeToString = Object.prototype.toString.call(x);
	var regex = /^\[object (HTMLCollection|NodeList|Object)\]$/;

	return typeof window.NodeList === 'object'
		? x instanceof window.NodeList
		: x !== null &&
				typeof x === 'object' &&
				typeof x.length === 'number' &&
				regex.test(prototypeToString) &&
				(x.length === 0 || Object(is_dom_node__WEBPACK_IMPORTED_MODULE_0__["default"])(x[0]))
}

/* harmony default export */ __webpack_exports__["default"] = (isDomNodeList);


/***/ }),

/***/ "./node_modules/is-dom-node/dist/is-dom-node.es.js":
/*!*********************************************************!*\
  !*** ./node_modules/is-dom-node/dist/is-dom-node.es.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*! @license is-dom-node v1.0.4

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/
function isDomNode(x) {
	return typeof window.Node === 'object'
		? x instanceof window.Node
		: x !== null &&
				typeof x === 'object' &&
				typeof x.nodeType === 'number' &&
				typeof x.nodeName === 'string'
}

/* harmony default export */ __webpack_exports__["default"] = (isDomNode);


/***/ }),

/***/ "./node_modules/miniraf/dist/miniraf.es.js":
/*!*************************************************!*\
  !*** ./node_modules/miniraf/dist/miniraf.es.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*! @license miniraf v1.0.0

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/
var polyfill = (function () {
	var clock = Date.now();

	return function (callback) {
		var currentTime = Date.now();
		if (currentTime - clock > 16) {
			clock = currentTime;
			callback(currentTime);
		} else {
			setTimeout(function () { return polyfill(callback); }, 0);
		}
	}
})();

var index = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	polyfill;

/* harmony default export */ __webpack_exports__["default"] = (index);


/***/ }),

/***/ "./node_modules/rematrix/dist/rematrix.es.js":
/*!***************************************************!*\
  !*** ./node_modules/rematrix/dist/rematrix.es.js ***!
  \***************************************************/
/*! exports provided: format, identity, inverse, multiply, parse, rotate, rotateX, rotateY, rotateZ, scale, scaleX, scaleY, scaleZ, skew, skewX, skewY, toString, translate, translateX, translateY, translateZ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleX", function() { return scaleX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleY", function() { return scaleY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleZ", function() { return scaleZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skew", function() { return skew; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skewX", function() { return skewX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skewY", function() { return skewY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toString", function() { return toString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translateX", function() { return translateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translateY", function() { return translateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translateZ", function() { return translateZ; });
/*! @license Rematrix v0.3.0

	Copyright 2018 Julian Lloyd.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
/**
 * @module Rematrix
 */

/**
 * Transformation matrices in the browser come in two flavors:
 *
 *  - `matrix` using 6 values (short)
 *  - `matrix3d` using 16 values (long)
 *
 * This utility follows this [conversion guide](https://goo.gl/EJlUQ1)
 * to expand short form matrices to their equivalent long form.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */
function format(source) {
	if (source.constructor !== Array) {
		throw new TypeError('Expected array.')
	}
	if (source.length === 16) {
		return source
	}
	if (source.length === 6) {
		var matrix = identity();
		matrix[0] = source[0];
		matrix[1] = source[1];
		matrix[4] = source[2];
		matrix[5] = source[3];
		matrix[12] = source[4];
		matrix[13] = source[5];
		return matrix
	}
	throw new RangeError('Expected array with either 6 or 16 values.')
}

/**
 * Returns a matrix representing no transformation. The product of any matrix
 * multiplied by the identity matrix will be the original matrix.
 *
 * > **Tip:** Similar to how `5 * 1 === 5`, where `1` is the identity.
 *
 * @return {array}
 */
function identity() {
	var matrix = [];
	for (var i = 0; i < 16; i++) {
		i % 5 == 0 ? matrix.push(1) : matrix.push(0);
	}
	return matrix
}

/**
 * Returns a matrix describing the inverse transformation of the source
 * matrix. The product of any matrix multiplied by its inverse will be the
 * identity matrix.
 *
 * > **Tip:** Similar to how `5 * (1/5) === 1`, where `1/5` is the inverse.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */
function inverse(source) {
	var m = format(source);

	var s0 = m[0] * m[5] - m[4] * m[1];
	var s1 = m[0] * m[6] - m[4] * m[2];
	var s2 = m[0] * m[7] - m[4] * m[3];
	var s3 = m[1] * m[6] - m[5] * m[2];
	var s4 = m[1] * m[7] - m[5] * m[3];
	var s5 = m[2] * m[7] - m[6] * m[3];

	var c5 = m[10] * m[15] - m[14] * m[11];
	var c4 = m[9] * m[15] - m[13] * m[11];
	var c3 = m[9] * m[14] - m[13] * m[10];
	var c2 = m[8] * m[15] - m[12] * m[11];
	var c1 = m[8] * m[14] - m[12] * m[10];
	var c0 = m[8] * m[13] - m[12] * m[9];

	var determinant = 1 / (s0 * c5 - s1 * c4 + s2 * c3 + s3 * c2 - s4 * c1 + s5 * c0);

	if (isNaN(determinant) || determinant === Infinity) {
		throw new Error('Inverse determinant attempted to divide by zero.')
	}

	return [
		(m[5] * c5 - m[6] * c4 + m[7] * c3) * determinant,
		(-m[1] * c5 + m[2] * c4 - m[3] * c3) * determinant,
		(m[13] * s5 - m[14] * s4 + m[15] * s3) * determinant,
		(-m[9] * s5 + m[10] * s4 - m[11] * s3) * determinant,

		(-m[4] * c5 + m[6] * c2 - m[7] * c1) * determinant,
		(m[0] * c5 - m[2] * c2 + m[3] * c1) * determinant,
		(-m[12] * s5 + m[14] * s2 - m[15] * s1) * determinant,
		(m[8] * s5 - m[10] * s2 + m[11] * s1) * determinant,

		(m[4] * c4 - m[5] * c2 + m[7] * c0) * determinant,
		(-m[0] * c4 + m[1] * c2 - m[3] * c0) * determinant,
		(m[12] * s4 - m[13] * s2 + m[15] * s0) * determinant,
		(-m[8] * s4 + m[9] * s2 - m[11] * s0) * determinant,

		(-m[4] * c3 + m[5] * c1 - m[6] * c0) * determinant,
		(m[0] * c3 - m[1] * c1 + m[2] * c0) * determinant,
		(-m[12] * s3 + m[13] * s1 - m[14] * s0) * determinant,
		(m[8] * s3 - m[9] * s1 + m[10] * s0) * determinant
	]
}

/**
 * Returns a 4x4 matrix describing the combined transformations
 * of both arguments.
 *
 * > **Note:** Order is very important. For example, rotating 45°
 * along the Z-axis, followed by translating 500 pixels along the
 * Y-axis... is not the same as translating 500 pixels along the
 * Y-axis, followed by rotating 45° along on the Z-axis.
 *
 * @param  {array} m - Accepts both short and long form matrices.
 * @param  {array} x - Accepts both short and long form matrices.
 * @return {array}
 */
function multiply(m, x) {
	var fm = format(m);
	var fx = format(x);
	var product = [];

	for (var i = 0; i < 4; i++) {
		var row = [fm[i], fm[i + 4], fm[i + 8], fm[i + 12]];
		for (var j = 0; j < 4; j++) {
			var k = j * 4;
			var col = [fx[k], fx[k + 1], fx[k + 2], fx[k + 3]];
			var result =
				row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3];

			product[i + k] = result;
		}
	}

	return product
}

/**
 * Attempts to return a 4x4 matrix describing the CSS transform
 * matrix passed in, but will return the identity matrix as a
 * fallback.
 *
 * > **Tip:** This method is used to convert a CSS matrix (retrieved as a
 * `string` from computed styles) to its equivalent array format.
 *
 * @param  {string} source - `matrix` or `matrix3d` CSS Transform value.
 * @return {array}
 */
function parse(source) {
	if (typeof source === 'string') {
		var match = source.match(/matrix(3d)?\(([^)]+)\)/);
		if (match) {
			var raw = match[2].split(', ').map(parseFloat);
			return format(raw)
		}
	}
	return identity()
}

/**
 * Returns a 4x4 matrix describing Z-axis rotation.
 *
 * > **Tip:** This is just an alias for `Rematrix.rotateZ` for parity with CSS
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotate(angle) {
	return rotateZ(angle)
}

/**
 * Returns a 4x4 matrix describing X-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotateX(angle) {
	var theta = Math.PI / 180 * angle;
	var matrix = identity();

	matrix[5] = matrix[10] = Math.cos(theta);
	matrix[6] = matrix[9] = Math.sin(theta);
	matrix[9] *= -1;

	return matrix
}

/**
 * Returns a 4x4 matrix describing Y-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotateY(angle) {
	var theta = Math.PI / 180 * angle;
	var matrix = identity();

	matrix[0] = matrix[10] = Math.cos(theta);
	matrix[2] = matrix[8] = Math.sin(theta);
	matrix[2] *= -1;

	return matrix
}

/**
 * Returns a 4x4 matrix describing Z-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function rotateZ(angle) {
	var theta = Math.PI / 180 * angle;
	var matrix = identity();

	matrix[0] = matrix[5] = Math.cos(theta);
	matrix[1] = matrix[4] = Math.sin(theta);
	matrix[4] *= -1;

	return matrix
}

/**
 * Returns a 4x4 matrix describing 2D scaling. The first argument
 * is used for both X and Y-axis scaling, unless an optional
 * second argument is provided to explicitly define Y-axis scaling.
 *
 * @param  {number} scalar    - Decimal multiplier.
 * @param  {number} [scalarY] - Decimal multiplier.
 * @return {array}
 */
function scale(scalar, scalarY) {
	var matrix = identity();

	matrix[0] = scalar;
	matrix[5] = typeof scalarY === 'number' ? scalarY : scalar;

	return matrix
}

/**
 * Returns a 4x4 matrix describing X-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */
function scaleX(scalar) {
	var matrix = identity();
	matrix[0] = scalar;
	return matrix
}

/**
 * Returns a 4x4 matrix describing Y-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */
function scaleY(scalar) {
	var matrix = identity();
	matrix[5] = scalar;
	return matrix
}

/**
 * Returns a 4x4 matrix describing Z-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */
function scaleZ(scalar) {
	var matrix = identity();
	matrix[10] = scalar;
	return matrix
}

/**
 * Returns a 4x4 matrix describing shear. The first argument
 * defines X-axis shearing, and an optional second argument
 * defines Y-axis shearing.
 *
 * @param  {number} angleX   - Measured in degrees.
 * @param  {number} [angleY] - Measured in degrees.
 * @return {array}
 */
function skew(angleX, angleY) {
	var thetaX = Math.PI / 180 * angleX;
	var matrix = identity();

	matrix[4] = Math.tan(thetaX);

	if (angleY) {
		var thetaY = Math.PI / 180 * angleY;
		matrix[1] = Math.tan(thetaY);
	}

	return matrix
}

/**
 * Returns a 4x4 matrix describing X-axis shear.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */
function skewX(angle) {
	var theta = Math.PI / 180 * angle;
	var matrix = identity();

	matrix[4] = Math.tan(theta);

	return matrix
}

/**
 * Returns a 4x4 matrix describing Y-axis shear.
 *
 * @param  {number} angle - Measured in degrees
 * @return {array}
 */
function skewY(angle) {
	var theta = Math.PI / 180 * angle;
	var matrix = identity();

	matrix[1] = Math.tan(theta);

	return matrix
}

/**
 * Returns a CSS Transform property value equivalent to the source matrix.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {string}
 */
function toString(source) {
	return ("matrix3d(" + (format(source).join(', ')) + ")")
}

/**
 * Returns a 4x4 matrix describing 2D translation. The first
 * argument defines X-axis translation, and an optional second
 * argument defines Y-axis translation.
 *
 * @param  {number} distanceX   - Measured in pixels.
 * @param  {number} [distanceY] - Measured in pixels.
 * @return {array}
 */
function translate(distanceX, distanceY) {
	var matrix = identity();
	matrix[12] = distanceX;

	if (distanceY) {
		matrix[13] = distanceY;
	}

	return matrix
}

/**
 * Returns a 4x4 matrix describing X-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateX(distance) {
	var matrix = identity();
	matrix[12] = distance;
	return matrix
}

/**
 * Returns a 4x4 matrix describing Y-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateY(distance) {
	var matrix = identity();
	matrix[13] = distance;
	return matrix
}

/**
 * Returns a 4x4 matrix describing Z-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateZ(distance) {
	var matrix = identity();
	matrix[14] = distance;
	return matrix
}




/***/ }),

/***/ "./node_modules/scrollreveal/dist/scrollreveal.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/scrollreveal/dist/scrollreveal.es.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tealight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tealight */ "./node_modules/tealight/dist/tealight.es.js");
/* harmony import */ var rematrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rematrix */ "./node_modules/rematrix/dist/rematrix.es.js");
/* harmony import */ var miniraf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! miniraf */ "./node_modules/miniraf/dist/miniraf.es.js");
/*! @license ScrollReveal v4.0.7

	Copyright 2020 Fisssion LLC.

	Licensed under the GNU General Public License 3.0 for
	compatible open source projects and non-commercial use.

	For commercial sites, themes, projects, and applications,
	keep your source code private/proprietary by purchasing
	a commercial license from https://scrollrevealjs.org/
*/




var defaults = {
	delay: 0,
	distance: '0',
	duration: 600,
	easing: 'cubic-bezier(0.5, 0, 0, 1)',
	interval: 0,
	opacity: 0,
	origin: 'bottom',
	rotate: {
		x: 0,
		y: 0,
		z: 0
	},
	scale: 1,
	cleanup: false,
	container: document.documentElement,
	desktop: true,
	mobile: true,
	reset: false,
	useDelay: 'always',
	viewFactor: 0.0,
	viewOffset: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	},
	afterReset: function afterReset() {},
	afterReveal: function afterReveal() {},
	beforeReset: function beforeReset() {},
	beforeReveal: function beforeReveal() {}
};

function failure() {
	document.documentElement.classList.remove('sr');

	return {
		clean: function clean() {},
		destroy: function destroy() {},
		reveal: function reveal() {},
		sync: function sync() {},
		get noop() {
			return true
		}
	}
}

function success() {
	document.documentElement.classList.add('sr');

	if (document.body) {
		document.body.style.height = '100%';
	} else {
		document.addEventListener('DOMContentLoaded', function () {
			document.body.style.height = '100%';
		});
	}
}

var mount = { success: success, failure: failure };

function isObject(x) {
	return (
		x !== null &&
		x instanceof Object &&
		(x.constructor === Object ||
			Object.prototype.toString.call(x) === '[object Object]')
	)
}

function each(collection, callback) {
	if (isObject(collection)) {
		var keys = Object.keys(collection);
		return keys.forEach(function (key) { return callback(collection[key], key, collection); })
	}
	if (collection instanceof Array) {
		return collection.forEach(function (item, i) { return callback(item, i, collection); })
	}
	throw new TypeError('Expected either an array or object literal.')
}

function logger(message) {
	var details = [], len = arguments.length - 1;
	while ( len-- > 0 ) details[ len ] = arguments[ len + 1 ];

	if (this.constructor.debug && console) {
		var report = "%cScrollReveal: " + message;
		details.forEach(function (detail) { return (report += "\n — " + detail); });
		console.log(report, 'color: #ea654b;'); // eslint-disable-line no-console
	}
}

function rinse() {
	var this$1 = this;

	var struct = function () { return ({
		active: [],
		stale: []
	}); };

	var elementIds = struct();
	var sequenceIds = struct();
	var containerIds = struct();

	/**
	 * Take stock of active element IDs.
	 */
	try {
		each(Object(tealight__WEBPACK_IMPORTED_MODULE_0__["default"])('[data-sr-id]'), function (node) {
			var id = parseInt(node.getAttribute('data-sr-id'));
			elementIds.active.push(id);
		});
	} catch (e) {
		throw e
	}
	/**
	 * Destroy stale elements.
	 */
	each(this.store.elements, function (element) {
		if (elementIds.active.indexOf(element.id) === -1) {
			elementIds.stale.push(element.id);
		}
	});

	each(elementIds.stale, function (staleId) { return delete this$1.store.elements[staleId]; });

	/**
	 * Take stock of active container and sequence IDs.
	 */
	each(this.store.elements, function (element) {
		if (containerIds.active.indexOf(element.containerId) === -1) {
			containerIds.active.push(element.containerId);
		}
		if (element.hasOwnProperty('sequence')) {
			if (sequenceIds.active.indexOf(element.sequence.id) === -1) {
				sequenceIds.active.push(element.sequence.id);
			}
		}
	});

	/**
	 * Destroy stale containers.
	 */
	each(this.store.containers, function (container) {
		if (containerIds.active.indexOf(container.id) === -1) {
			containerIds.stale.push(container.id);
		}
	});

	each(containerIds.stale, function (staleId) {
		var stale = this$1.store.containers[staleId].node;
		stale.removeEventListener('scroll', this$1.delegate);
		stale.removeEventListener('resize', this$1.delegate);
		delete this$1.store.containers[staleId];
	});

	/**
	 * Destroy stale sequences.
	 */
	each(this.store.sequences, function (sequence) {
		if (sequenceIds.active.indexOf(sequence.id) === -1) {
			sequenceIds.stale.push(sequence.id);
		}
	});

	each(sequenceIds.stale, function (staleId) { return delete this$1.store.sequences[staleId]; });
}

function clean(target) {
	var this$1 = this;

	var dirty;
	try {
		each(Object(tealight__WEBPACK_IMPORTED_MODULE_0__["default"])(target), function (node) {
			var id = node.getAttribute('data-sr-id');
			if (id !== null) {
				dirty = true;
				var element = this$1.store.elements[id];
				if (element.callbackTimer) {
					window.clearTimeout(element.callbackTimer.clock);
				}
				node.setAttribute('style', element.styles.inline.generated);
				node.removeAttribute('data-sr-id');
				delete this$1.store.elements[id];
			}
		});
	} catch (e) {
		return logger.call(this, 'Clean failed.', e.message)
	}

	if (dirty) {
		try {
			rinse.call(this);
		} catch (e) {
			return logger.call(this, 'Clean failed.', e.message)
		}
	}
}

function destroy() {
	var this$1 = this;

	/**
	 * Remove all generated styles and element ids
	 */
	each(this.store.elements, function (element) {
		element.node.setAttribute('style', element.styles.inline.generated);
		element.node.removeAttribute('data-sr-id');
	});

	/**
	 * Remove all event listeners.
	 */
	each(this.store.containers, function (container) {
		var target =
			container.node === document.documentElement ? window : container.node;
		target.removeEventListener('scroll', this$1.delegate);
		target.removeEventListener('resize', this$1.delegate);
	});

	/**
	 * Clear all data from the store
	 */
	this.store = {
		containers: {},
		elements: {},
		history: [],
		sequences: {}
	};
}

var getPrefixedCssProp = (function () {
	var properties = {};
	var style = document.documentElement.style;

	function getPrefixedCssProperty(name, source) {
		if ( source === void 0 ) source = style;

		if (name && typeof name === 'string') {
			if (properties[name]) {
				return properties[name]
			}
			if (typeof source[name] === 'string') {
				return (properties[name] = name)
			}
			if (typeof source[("-webkit-" + name)] === 'string') {
				return (properties[name] = "-webkit-" + name)
			}
			throw new RangeError(("Unable to find \"" + name + "\" style property."))
		}
		throw new TypeError('Expected a string.')
	}

	getPrefixedCssProperty.clearCache = function () { return (properties = {}); };

	return getPrefixedCssProperty
})();

function style(element) {
	var computed = window.getComputedStyle(element.node);
	var position = computed.position;
	var config = element.config;

	/**
	 * Generate inline styles
	 */
	var inline = {};
	var inlineStyle = element.node.getAttribute('style') || '';
	var inlineMatch = inlineStyle.match(/[\w-]+\s*:\s*[^;]+\s*/gi) || [];

	inline.computed = inlineMatch ? inlineMatch.map(function (m) { return m.trim(); }).join('; ') + ';' : '';

	inline.generated = inlineMatch.some(function (m) { return m.match(/visibility\s?:\s?visible/i); })
		? inline.computed
		: inlineMatch.concat( ['visibility: visible']).map(function (m) { return m.trim(); }).join('; ') + ';';

	/**
	 * Generate opacity styles
	 */
	var computedOpacity = parseFloat(computed.opacity);
	var configOpacity = !isNaN(parseFloat(config.opacity))
		? parseFloat(config.opacity)
		: parseFloat(computed.opacity);

	var opacity = {
		computed: computedOpacity !== configOpacity ? ("opacity: " + computedOpacity + ";") : '',
		generated: computedOpacity !== configOpacity ? ("opacity: " + configOpacity + ";") : ''
	};

	/**
	 * Generate transformation styles
	 */
	var transformations = [];

	if (parseFloat(config.distance)) {
		var axis = config.origin === 'top' || config.origin === 'bottom' ? 'Y' : 'X';

		/**
		 * Let’s make sure our our pixel distances are negative for top and left.
		 * e.g. { origin: 'top', distance: '25px' } starts at `top: -25px` in CSS.
		 */
		var distance = config.distance;
		if (config.origin === 'top' || config.origin === 'left') {
			distance = /^-/.test(distance) ? distance.substr(1) : ("-" + distance);
		}

		var ref = distance.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g);
		var value = ref[0];
		var unit = ref[1];

		switch (unit) {
			case 'em':
				distance = parseInt(computed.fontSize) * value;
				break
			case 'px':
				distance = value;
				break
			case '%':
				/**
				 * Here we use `getBoundingClientRect` instead of
				 * the existing data attached to `element.geometry`
				 * because only the former includes any transformations
				 * current applied to the element.
				 *
				 * If that behavior ends up being unintuitive, this
				 * logic could instead utilize `element.geometry.height`
				 * and `element.geoemetry.width` for the distance calculation
				 */
				distance =
					axis === 'Y'
						? (element.node.getBoundingClientRect().height * value) / 100
						: (element.node.getBoundingClientRect().width * value) / 100;
				break
			default:
				throw new RangeError('Unrecognized or missing distance unit.')
		}

		if (axis === 'Y') {
			transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["translateY"])(distance));
		} else {
			transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["translateX"])(distance));
		}
	}

	if (config.rotate.x) { transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["rotateX"])(config.rotate.x)); }
	if (config.rotate.y) { transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["rotateY"])(config.rotate.y)); }
	if (config.rotate.z) { transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["rotateZ"])(config.rotate.z)); }
	if (config.scale !== 1) {
		if (config.scale === 0) {
			/**
			 * The CSS Transforms matrix interpolation specification
			 * basically disallows transitions of non-invertible
			 * matrixes, which means browsers won't transition
			 * elements with zero scale.
			 *
			 * That’s inconvenient for the API and developer
			 * experience, so we simply nudge their value
			 * slightly above zero; this allows browsers
			 * to transition our element as expected.
			 *
			 * `0.0002` was the smallest number
			 * that performed across browsers.
			 */
			transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["scale"])(0.0002));
		} else {
			transformations.push(Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["scale"])(config.scale));
		}
	}

	var transform = {};
	if (transformations.length) {
		transform.property = getPrefixedCssProp('transform');
		/**
		 * The default computed transform value should be one of:
		 * undefined || 'none' || 'matrix()' || 'matrix3d()'
		 */
		transform.computed = {
			raw: computed[transform.property],
			matrix: Object(rematrix__WEBPACK_IMPORTED_MODULE_1__["parse"])(computed[transform.property])
		};

		transformations.unshift(transform.computed.matrix);
		var product = transformations.reduce(rematrix__WEBPACK_IMPORTED_MODULE_1__["multiply"]);

		transform.generated = {
			initial: ((transform.property) + ": matrix3d(" + (product.join(', ')) + ");"),
			final: ((transform.property) + ": matrix3d(" + (transform.computed.matrix.join(', ')) + ");")
		};
	} else {
		transform.generated = {
			initial: '',
			final: ''
		};
	}

	/**
	 * Generate transition styles
	 */
	var transition = {};
	if (opacity.generated || transform.generated.initial) {
		transition.property = getPrefixedCssProp('transition');
		transition.computed = computed[transition.property];
		transition.fragments = [];

		var delay = config.delay;
		var duration = config.duration;
		var easing = config.easing;

		if (opacity.generated) {
			transition.fragments.push({
				delayed: ("opacity " + (duration / 1000) + "s " + easing + " " + (delay / 1000) + "s"),
				instant: ("opacity " + (duration / 1000) + "s " + easing + " 0s")
			});
		}

		if (transform.generated.initial) {
			transition.fragments.push({
				delayed: ((transform.property) + " " + (duration / 1000) + "s " + easing + " " + (delay / 1000) + "s"),
				instant: ((transform.property) + " " + (duration / 1000) + "s " + easing + " 0s")
			});
		}

		/**
		 * The default computed transition property should be undefined, or one of:
		 * '' || 'none 0s ease 0s' || 'all 0s ease 0s' || 'all 0s 0s cubic-bezier()'
		 */
		var hasCustomTransition =
			transition.computed && !transition.computed.match(/all 0s|none 0s/);

		if (hasCustomTransition) {
			transition.fragments.unshift({
				delayed: transition.computed,
				instant: transition.computed
			});
		}

		var composed = transition.fragments.reduce(
			function (composition, fragment, i) {
				composition.delayed += i === 0 ? fragment.delayed : (", " + (fragment.delayed));
				composition.instant += i === 0 ? fragment.instant : (", " + (fragment.instant));
				return composition
			},
			{
				delayed: '',
				instant: ''
			}
		);

		transition.generated = {
			delayed: ((transition.property) + ": " + (composed.delayed) + ";"),
			instant: ((transition.property) + ": " + (composed.instant) + ";")
		};
	} else {
		transition.generated = {
			delayed: '',
			instant: ''
		};
	}

	return {
		inline: inline,
		opacity: opacity,
		position: position,
		transform: transform,
		transition: transition
	}
}

function animate(element, force) {
	if ( force === void 0 ) force = {};

	var pristine = force.pristine || this.pristine;
	var delayed =
		element.config.useDelay === 'always' ||
		(element.config.useDelay === 'onload' && pristine) ||
		(element.config.useDelay === 'once' && !element.seen);

	var shouldReveal = element.visible && !element.revealed;
	var shouldReset = !element.visible && element.revealed && element.config.reset;

	if (force.reveal || shouldReveal) {
		return triggerReveal.call(this, element, delayed)
	}

	if (force.reset || shouldReset) {
		return triggerReset.call(this, element)
	}
}

function triggerReveal(element, delayed) {
	var styles = [
		element.styles.inline.generated,
		element.styles.opacity.computed,
		element.styles.transform.generated.final
	];
	if (delayed) {
		styles.push(element.styles.transition.generated.delayed);
	} else {
		styles.push(element.styles.transition.generated.instant);
	}
	element.revealed = element.seen = true;
	element.node.setAttribute('style', styles.filter(function (s) { return s !== ''; }).join(' '));
	registerCallbacks.call(this, element, delayed);
}

function triggerReset(element) {
	var styles = [
		element.styles.inline.generated,
		element.styles.opacity.generated,
		element.styles.transform.generated.initial,
		element.styles.transition.generated.instant
	];
	element.revealed = false;
	element.node.setAttribute('style', styles.filter(function (s) { return s !== ''; }).join(' '));
	registerCallbacks.call(this, element);
}

function registerCallbacks(element, isDelayed) {
	var this$1 = this;

	var duration = isDelayed
		? element.config.duration + element.config.delay
		: element.config.duration;

	var beforeCallback = element.revealed
		? element.config.beforeReveal
		: element.config.beforeReset;

	var afterCallback = element.revealed
		? element.config.afterReveal
		: element.config.afterReset;

	var elapsed = 0;
	if (element.callbackTimer) {
		elapsed = Date.now() - element.callbackTimer.start;
		window.clearTimeout(element.callbackTimer.clock);
	}

	beforeCallback(element.node);

	element.callbackTimer = {
		start: Date.now(),
		clock: window.setTimeout(function () {
			afterCallback(element.node);
			element.callbackTimer = null;
			if (element.revealed && !element.config.reset && element.config.cleanup) {
				clean.call(this$1, element.node);
			}
		}, duration - elapsed)
	};
}

var nextUniqueId = (function () {
	var uid = 0;
	return function () { return uid++; }
})();

function sequence(element, pristine) {
	if ( pristine === void 0 ) pristine = this.pristine;

	/**
	 * We first check if the element should reset.
	 */
	if (!element.visible && element.revealed && element.config.reset) {
		return animate.call(this, element, { reset: true })
	}

	var seq = this.store.sequences[element.sequence.id];
	var i = element.sequence.index;

	if (seq) {
		var visible = new SequenceModel(seq, 'visible', this.store);
		var revealed = new SequenceModel(seq, 'revealed', this.store);

		seq.models = { visible: visible, revealed: revealed };

		/**
		 * If the sequence has no revealed members,
		 * then we reveal the first visible element
		 * within that sequence.
		 *
		 * The sequence then cues a recursive call
		 * in both directions.
		 */
		if (!revealed.body.length) {
			var nextId = seq.members[visible.body[0]];
			var nextElement = this.store.elements[nextId];

			if (nextElement) {
				cue.call(this, seq, visible.body[0], -1, pristine);
				cue.call(this, seq, visible.body[0], +1, pristine);
				return animate.call(this, nextElement, { reveal: true, pristine: pristine })
			}
		}

		/**
		 * If our element isn’t resetting, we check the
		 * element sequence index against the head, and
		 * then the foot of the sequence.
		 */
		if (
			!seq.blocked.head &&
			i === [].concat( revealed.head ).pop() &&
			i >= [].concat( visible.body ).shift()
		) {
			cue.call(this, seq, i, -1, pristine);
			return animate.call(this, element, { reveal: true, pristine: pristine })
		}

		if (
			!seq.blocked.foot &&
			i === [].concat( revealed.foot ).shift() &&
			i <= [].concat( visible.body ).pop()
		) {
			cue.call(this, seq, i, +1, pristine);
			return animate.call(this, element, { reveal: true, pristine: pristine })
		}
	}
}

function Sequence(interval) {
	var i = Math.abs(interval);
	if (!isNaN(i)) {
		this.id = nextUniqueId();
		this.interval = Math.max(i, 16);
		this.members = [];
		this.models = {};
		this.blocked = {
			head: false,
			foot: false
		};
	} else {
		throw new RangeError('Invalid sequence interval.')
	}
}

function SequenceModel(seq, prop, store) {
	var this$1 = this;

	this.head = [];
	this.body = [];
	this.foot = [];

	each(seq.members, function (id, index) {
		var element = store.elements[id];
		if (element && element[prop]) {
			this$1.body.push(index);
		}
	});

	if (this.body.length) {
		each(seq.members, function (id, index) {
			var element = store.elements[id];
			if (element && !element[prop]) {
				if (index < this$1.body[0]) {
					this$1.head.push(index);
				} else {
					this$1.foot.push(index);
				}
			}
		});
	}
}

function cue(seq, i, direction, pristine) {
	var this$1 = this;

	var blocked = ['head', null, 'foot'][1 + direction];
	var nextId = seq.members[i + direction];
	var nextElement = this.store.elements[nextId];

	seq.blocked[blocked] = true;

	setTimeout(function () {
		seq.blocked[blocked] = false;
		if (nextElement) {
			sequence.call(this$1, nextElement, pristine);
		}
	}, seq.interval);
}

function initialize() {
	var this$1 = this;

	rinse.call(this);

	each(this.store.elements, function (element) {
		var styles = [element.styles.inline.generated];

		if (element.visible) {
			styles.push(element.styles.opacity.computed);
			styles.push(element.styles.transform.generated.final);
			element.revealed = true;
		} else {
			styles.push(element.styles.opacity.generated);
			styles.push(element.styles.transform.generated.initial);
			element.revealed = false;
		}

		element.node.setAttribute('style', styles.filter(function (s) { return s !== ''; }).join(' '));
	});

	each(this.store.containers, function (container) {
		var target =
			container.node === document.documentElement ? window : container.node;
		target.addEventListener('scroll', this$1.delegate);
		target.addEventListener('resize', this$1.delegate);
	});

	/**
	 * Manually invoke delegate once to capture
	 * element and container dimensions, container
	 * scroll position, and trigger any valid reveals
	 */
	this.delegate();

	/**
	 * Wipe any existing `setTimeout` now
	 * that initialization has completed.
	 */
	this.initTimeout = null;
}

function isMobile(agent) {
	if ( agent === void 0 ) agent = navigator.userAgent;

	return /Android|iPhone|iPad|iPod/i.test(agent)
}

function deepAssign(target) {
	var sources = [], len = arguments.length - 1;
	while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

	if (isObject(target)) {
		each(sources, function (source) {
			each(source, function (data, key) {
				if (isObject(data)) {
					if (!target[key] || !isObject(target[key])) {
						target[key] = {};
					}
					deepAssign(target[key], data);
				} else {
					target[key] = data;
				}
			});
		});
		return target
	} else {
		throw new TypeError('Target must be an object literal.')
	}
}

function reveal(target, options, syncing) {
	var this$1 = this;
	if ( options === void 0 ) options = {};
	if ( syncing === void 0 ) syncing = false;

	var containerBuffer = [];
	var sequence$$1;
	var interval = options.interval || defaults.interval;

	try {
		if (interval) {
			sequence$$1 = new Sequence(interval);
		}

		var nodes = Object(tealight__WEBPACK_IMPORTED_MODULE_0__["default"])(target);
		if (!nodes.length) {
			throw new Error('Invalid reveal target.')
		}

		var elements = nodes.reduce(function (elementBuffer, elementNode) {
			var element = {};
			var existingId = elementNode.getAttribute('data-sr-id');

			if (existingId) {
				deepAssign(element, this$1.store.elements[existingId]);

				/**
				 * In order to prevent previously generated styles
				 * from throwing off the new styles, the style tag
				 * has to be reverted to its pre-reveal state.
				 */
				element.node.setAttribute('style', element.styles.inline.computed);
			} else {
				element.id = nextUniqueId();
				element.node = elementNode;
				element.seen = false;
				element.revealed = false;
				element.visible = false;
			}

			var config = deepAssign({}, element.config || this$1.defaults, options);

			if ((!config.mobile && isMobile()) || (!config.desktop && !isMobile())) {
				if (existingId) {
					clean.call(this$1, element);
				}
				return elementBuffer // skip elements that are disabled
			}

			var containerNode = Object(tealight__WEBPACK_IMPORTED_MODULE_0__["default"])(config.container)[0];
			if (!containerNode) {
				throw new Error('Invalid container.')
			}
			if (!containerNode.contains(elementNode)) {
				return elementBuffer // skip elements found outside the container
			}

			var containerId;
			{
				containerId = getContainerId(
					containerNode,
					containerBuffer,
					this$1.store.containers
				);
				if (containerId === null) {
					containerId = nextUniqueId();
					containerBuffer.push({ id: containerId, node: containerNode });
				}
			}

			element.config = config;
			element.containerId = containerId;
			element.styles = style(element);

			if (sequence$$1) {
				element.sequence = {
					id: sequence$$1.id,
					index: sequence$$1.members.length
				};
				sequence$$1.members.push(element.id);
			}

			elementBuffer.push(element);
			return elementBuffer
		}, []);

		/**
		 * Modifying the DOM via setAttribute needs to be handled
		 * separately from reading computed styles in the map above
		 * for the browser to batch DOM changes (limiting reflows)
		 */
		each(elements, function (element) {
			this$1.store.elements[element.id] = element;
			element.node.setAttribute('data-sr-id', element.id);
		});
	} catch (e) {
		return logger.call(this, 'Reveal failed.', e.message)
	}

	/**
	 * Now that element set-up is complete...
	 * Let’s commit any container and sequence data we have to the store.
	 */
	each(containerBuffer, function (container) {
		this$1.store.containers[container.id] = {
			id: container.id,
			node: container.node
		};
	});
	if (sequence$$1) {
		this.store.sequences[sequence$$1.id] = sequence$$1;
	}

	/**
	 * If reveal wasn't invoked by sync, we want to
	 * make sure to add this call to the history.
	 */
	if (syncing !== true) {
		this.store.history.push({ target: target, options: options });

		/**
		 * Push initialization to the event queue, giving
		 * multiple reveal calls time to be interpreted.
		 */
		if (this.initTimeout) {
			window.clearTimeout(this.initTimeout);
		}
		this.initTimeout = window.setTimeout(initialize.bind(this), 0);
	}
}

function getContainerId(node) {
	var collections = [], len = arguments.length - 1;
	while ( len-- > 0 ) collections[ len ] = arguments[ len + 1 ];

	var id = null;
	each(collections, function (collection) {
		each(collection, function (container) {
			if (id === null && container.node === node) {
				id = container.id;
			}
		});
	});
	return id
}

/**
 * Re-runs the reveal method for each record stored in history,
 * for capturing new content asynchronously loaded into the DOM.
 */
function sync() {
	var this$1 = this;

	each(this.store.history, function (record) {
		reveal.call(this$1, record.target, record.options, true);
	});

	initialize.call(this);
}

var polyfill = function (x) { return (x > 0) - (x < 0) || +x; };
var mathSign = Math.sign || polyfill;

function getGeometry(target, isContainer) {
	/**
	 * We want to ignore padding and scrollbars for container elements.
	 * More information here: https://goo.gl/vOZpbz
	 */
	var height = isContainer ? target.node.clientHeight : target.node.offsetHeight;
	var width = isContainer ? target.node.clientWidth : target.node.offsetWidth;

	var offsetTop = 0;
	var offsetLeft = 0;
	var node = target.node;

	do {
		if (!isNaN(node.offsetTop)) {
			offsetTop += node.offsetTop;
		}
		if (!isNaN(node.offsetLeft)) {
			offsetLeft += node.offsetLeft;
		}
		node = node.offsetParent;
	} while (node)

	return {
		bounds: {
			top: offsetTop,
			right: offsetLeft + width,
			bottom: offsetTop + height,
			left: offsetLeft
		},
		height: height,
		width: width
	}
}

function getScrolled(container) {
	var top, left;
	if (container.node === document.documentElement) {
		top = window.pageYOffset;
		left = window.pageXOffset;
	} else {
		top = container.node.scrollTop;
		left = container.node.scrollLeft;
	}
	return { top: top, left: left }
}

function isElementVisible(element) {
	if ( element === void 0 ) element = {};

	var container = this.store.containers[element.containerId];
	if (!container) { return }

	var viewFactor = Math.max(0, Math.min(1, element.config.viewFactor));
	var viewOffset = element.config.viewOffset;

	var elementBounds = {
		top: element.geometry.bounds.top + element.geometry.height * viewFactor,
		right: element.geometry.bounds.right - element.geometry.width * viewFactor,
		bottom: element.geometry.bounds.bottom - element.geometry.height * viewFactor,
		left: element.geometry.bounds.left + element.geometry.width * viewFactor
	};

	var containerBounds = {
		top: container.geometry.bounds.top + container.scroll.top + viewOffset.top,
		right: container.geometry.bounds.right + container.scroll.left - viewOffset.right,
		bottom:
			container.geometry.bounds.bottom + container.scroll.top - viewOffset.bottom,
		left: container.geometry.bounds.left + container.scroll.left + viewOffset.left
	};

	return (
		(elementBounds.top < containerBounds.bottom &&
			elementBounds.right > containerBounds.left &&
			elementBounds.bottom > containerBounds.top &&
			elementBounds.left < containerBounds.right) ||
		element.styles.position === 'fixed'
	)
}

function delegate(
	event,
	elements
) {
	var this$1 = this;
	if ( event === void 0 ) event = { type: 'init' };
	if ( elements === void 0 ) elements = this.store.elements;

	Object(miniraf__WEBPACK_IMPORTED_MODULE_2__["default"])(function () {
		var stale = event.type === 'init' || event.type === 'resize';

		each(this$1.store.containers, function (container) {
			if (stale) {
				container.geometry = getGeometry.call(this$1, container, true);
			}
			var scroll = getScrolled.call(this$1, container);
			if (container.scroll) {
				container.direction = {
					x: mathSign(scroll.left - container.scroll.left),
					y: mathSign(scroll.top - container.scroll.top)
				};
			}
			container.scroll = scroll;
		});

		/**
		 * Due to how the sequencer is implemented, it’s
		 * important that we update the state of all
		 * elements, before any animation logic is
		 * evaluated (in the second loop below).
		 */
		each(elements, function (element) {
			if (stale || element.geometry === undefined) {
				element.geometry = getGeometry.call(this$1, element);
			}
			element.visible = isElementVisible.call(this$1, element);
		});

		each(elements, function (element) {
			if (element.sequence) {
				sequence.call(this$1, element);
			} else {
				animate.call(this$1, element);
			}
		});

		this$1.pristine = false;
	});
}

function isTransformSupported() {
	var style = document.documentElement.style;
	return 'transform' in style || 'WebkitTransform' in style
}

function isTransitionSupported() {
	var style = document.documentElement.style;
	return 'transition' in style || 'WebkitTransition' in style
}

var version = "4.0.7";

var boundDelegate;
var boundDestroy;
var boundReveal;
var boundClean;
var boundSync;
var config;
var debug;
var instance;

function ScrollReveal(options) {
	if ( options === void 0 ) options = {};

	var invokedWithoutNew =
		typeof this === 'undefined' ||
		Object.getPrototypeOf(this) !== ScrollReveal.prototype;

	if (invokedWithoutNew) {
		return new ScrollReveal(options)
	}

	if (!ScrollReveal.isSupported()) {
		logger.call(this, 'Instantiation failed.', 'This browser is not supported.');
		return mount.failure()
	}

	var buffer;
	try {
		buffer = config
			? deepAssign({}, config, options)
			: deepAssign({}, defaults, options);
	} catch (e) {
		logger.call(this, 'Invalid configuration.', e.message);
		return mount.failure()
	}

	try {
		var container = Object(tealight__WEBPACK_IMPORTED_MODULE_0__["default"])(buffer.container)[0];
		if (!container) {
			throw new Error('Invalid container.')
		}
	} catch (e) {
		logger.call(this, e.message);
		return mount.failure()
	}

	config = buffer;

	if ((!config.mobile && isMobile()) || (!config.desktop && !isMobile())) {
		logger.call(
			this,
			'This device is disabled.',
			("desktop: " + (config.desktop)),
			("mobile: " + (config.mobile))
		);
		return mount.failure()
	}

	mount.success();

	this.store = {
		containers: {},
		elements: {},
		history: [],
		sequences: {}
	};

	this.pristine = true;

	boundDelegate = boundDelegate || delegate.bind(this);
	boundDestroy = boundDestroy || destroy.bind(this);
	boundReveal = boundReveal || reveal.bind(this);
	boundClean = boundClean || clean.bind(this);
	boundSync = boundSync || sync.bind(this);

	Object.defineProperty(this, 'delegate', { get: function () { return boundDelegate; } });
	Object.defineProperty(this, 'destroy', { get: function () { return boundDestroy; } });
	Object.defineProperty(this, 'reveal', { get: function () { return boundReveal; } });
	Object.defineProperty(this, 'clean', { get: function () { return boundClean; } });
	Object.defineProperty(this, 'sync', { get: function () { return boundSync; } });

	Object.defineProperty(this, 'defaults', { get: function () { return config; } });
	Object.defineProperty(this, 'version', { get: function () { return version; } });
	Object.defineProperty(this, 'noop', { get: function () { return false; } });

	return instance ? instance : (instance = this)
}

ScrollReveal.isSupported = function () { return isTransformSupported() && isTransitionSupported(); };

Object.defineProperty(ScrollReveal, 'debug', {
	get: function () { return debug || false; },
	set: function (value) { return (debug = typeof value === 'boolean' ? value : debug); }
});

ScrollReveal();

/* harmony default export */ __webpack_exports__["default"] = (ScrollReveal);


/***/ }),

/***/ "./node_modules/tealight/dist/tealight.es.js":
/*!***************************************************!*\
  !*** ./node_modules/tealight/dist/tealight.es.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is_dom_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-dom-node */ "./node_modules/is-dom-node/dist/is-dom-node.es.js");
/* harmony import */ var is_dom_node_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is-dom-node-list */ "./node_modules/is-dom-node-list/dist/is-dom-node-list.es.js");
/*! @license Tealight v0.3.6

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/



function tealight(target, context) {
  if ( context === void 0 ) context = document;

  if (target instanceof Array) { return target.filter(is_dom_node__WEBPACK_IMPORTED_MODULE_0__["default"]); }
  if (Object(is_dom_node__WEBPACK_IMPORTED_MODULE_0__["default"])(target)) { return [target]; }
  if (Object(is_dom_node_list__WEBPACK_IMPORTED_MODULE_1__["default"])(target)) { return Array.prototype.slice.call(target); }
  if (typeof target === "string") {
    try {
      var query = context.querySelectorAll(target);
      return Array.prototype.slice.call(query);
    } catch (err) {
      return [];
    }
  }
  return [];
}

/* harmony default export */ __webpack_exports__["default"] = (tealight);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1yZXBlYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5jb25jYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5kYXRlLnRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5yZXBlYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLWRvbS1ub2RlLWxpc3QvZGlzdC9pcy1kb20tbm9kZS1saXN0LmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1kb20tbm9kZS9kaXN0L2lzLWRvbS1ub2RlLmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9taW5pcmFmL2Rpc3QvbWluaXJhZi5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVtYXRyaXgvZGlzdC9yZW1hdHJpeC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2Nyb2xscmV2ZWFsL2Rpc3Qvc2Nyb2xscmV2ZWFsLmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90ZWFsaWdodC9kaXN0L3RlYWxpZ2h0LmVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGVBQWUsbUJBQU8sQ0FBQyw2RUFBd0I7QUFDL0MsY0FBYyxtQkFBTyxDQUFDLDJFQUF1QjtBQUM3QyxzQkFBc0IsbUJBQU8sQ0FBQyw2RkFBZ0M7O0FBRTlEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ25CYTtBQUNiLGdCQUFnQixtQkFBTyxDQUFDLCtFQUF5QjtBQUNqRCw2QkFBNkIsbUJBQU8sQ0FBQywyR0FBdUM7O0FBRTVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxNQUFNO0FBQ2Q7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2JhO0FBQ2IsUUFBUSxtQkFBTyxDQUFDLHVFQUFxQjtBQUNyQyxZQUFZLG1CQUFPLENBQUMscUVBQW9CO0FBQ3hDLGNBQWMsbUJBQU8sQ0FBQywyRUFBdUI7QUFDN0MsZUFBZSxtQkFBTyxDQUFDLDZFQUF3QjtBQUMvQyxlQUFlLG1CQUFPLENBQUMsNkVBQXdCO0FBQy9DLGVBQWUsbUJBQU8sQ0FBQyw2RUFBd0I7QUFDL0MscUJBQXFCLG1CQUFPLENBQUMseUZBQThCO0FBQzNELHlCQUF5QixtQkFBTyxDQUFDLG1HQUFtQztBQUNwRSxtQ0FBbUMsbUJBQU8sQ0FBQywySEFBK0M7QUFDMUYsc0JBQXNCLG1CQUFPLENBQUMsNkZBQWdDO0FBQzlELGlCQUFpQixtQkFBTyxDQUFDLDZGQUFnQzs7QUFFekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsK0NBQStDO0FBQ2xELGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxZQUFZO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUIsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDM0RELGVBQWUsbUJBQU8sQ0FBQywyRUFBdUI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7OztBQ2hCQSxRQUFRLG1CQUFPLENBQUMsdUVBQXFCO0FBQ3JDLGFBQWEsbUJBQU8sQ0FBQyxxRkFBNEI7O0FBRWpEO0FBQ0E7QUFDQSxHQUFHLGdDQUFnQztBQUNuQztBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNQRDtBQUFBO0FBQUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDb0M7O0FBRXBDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMkRBQVM7QUFDaEM7O0FBRWUsNEVBQWEsRUFBQzs7Ozs7Ozs7Ozs7OztBQ3RDN0I7QUFBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsd0VBQVMsRUFBQzs7Ozs7Ozs7Ozs7OztBQ2hDekI7QUFBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCwyQkFBMkIsMkJBQTJCLEVBQUU7QUFDeEQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsb0VBQUssRUFBQzs7Ozs7Ozs7Ozs7OztBQzFDckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE1BQU07QUFDbEIsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE1BQU07QUFDbEIsWUFBWSxNQUFNO0FBQ2xCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVxTTs7Ozs7Ozs7Ozs7OztBQ3Jhck07QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ3lCO0FBQzRFO0FBQzNFOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0YscUNBQXFDO0FBQ3JDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCLGdDQUFnQztBQUNoQyw4QkFBOEI7QUFDOUIsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLG1EQUFtRCxFQUFFO0FBQzNGO0FBQ0E7QUFDQSxnREFBZ0Qsc0NBQXNDLEVBQUU7QUFDeEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUNBQXFDLHFDQUFxQyxFQUFFO0FBQzVFLHNDQUFzQyxHQUFHO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLEVBQUUsRUFBRTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLHdEQUFDO0FBQ1I7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRiw0Q0FBNEMsOENBQThDLEVBQUU7O0FBRTVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRiw2Q0FBNkMsK0NBQStDLEVBQUU7QUFDOUY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTyx3REFBQztBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrREFBa0Qsd0JBQXdCLEVBQUU7O0FBRTVFO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RCwrREFBK0QsaUJBQWlCLEVBQUUsU0FBUyxRQUFROztBQUVuRyxtREFBbUQsNkNBQTZDLEVBQUU7QUFDbEc7QUFDQSxtRUFBbUUsaUJBQWlCLEVBQUUsU0FBUyxRQUFROztBQUV2RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1GQUFtRjtBQUNuRixrRkFBa0Y7QUFDbEY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxrQ0FBa0M7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QiwyREFBVTtBQUNsQyxHQUFHO0FBQ0gsd0JBQXdCLDJEQUFVO0FBQ2xDO0FBQ0E7O0FBRUEsdUJBQXVCLHNCQUFzQix3REFBTyxtQkFBbUI7QUFDdkUsdUJBQXVCLHNCQUFzQix3REFBTyxtQkFBbUI7QUFDdkUsdUJBQXVCLHNCQUFzQix3REFBTyxtQkFBbUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzREFBSztBQUM3QixHQUFHO0FBQ0gsd0JBQXdCLHNEQUFLO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxzREFBSztBQUNoQjs7QUFFQTtBQUNBLHVDQUF1QyxpREFBUTs7QUFFL0M7QUFDQSw4RUFBOEU7QUFDOUUsOEZBQThGO0FBQzlGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1FQUFtRTtBQUNuRSxtRUFBbUU7QUFDbkU7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxpQkFBaUIsRUFBRTtBQUNuRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsaUJBQWlCLEVBQUU7QUFDbkY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsY0FBYztBQUNuQyxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsY0FBYztBQUNwRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLG1DQUFtQztBQUMvRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsbUNBQW1DO0FBQzFFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxtQ0FBbUM7QUFDMUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBaUUsaUJBQWlCLEVBQUU7QUFDcEYsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsd0RBQUM7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsd0RBQUM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1Q0FBdUM7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsbUNBQW1DOztBQUU5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBLDZCQUE2QixnQ0FBZ0M7QUFDN0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7O0FBRUEsQ0FBQyx1REFBRztBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixrQkFBa0I7QUFDbEIsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQix3REFBQztBQUNuQjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQixjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMENBQTBDLG1CQUFtQixzQkFBc0IsRUFBRSxFQUFFO0FBQ3ZGLHlDQUF5QyxtQkFBbUIscUJBQXFCLEVBQUUsRUFBRTtBQUNyRix3Q0FBd0MsbUJBQW1CLG9CQUFvQixFQUFFLEVBQUU7QUFDbkYsdUNBQXVDLG1CQUFtQixtQkFBbUIsRUFBRSxFQUFFO0FBQ2pGLHNDQUFzQyxtQkFBbUIsa0JBQWtCLEVBQUUsRUFBRTs7QUFFL0UsMENBQTBDLG1CQUFtQixlQUFlLEVBQUUsRUFBRTtBQUNoRix5Q0FBeUMsbUJBQW1CLGdCQUFnQixFQUFFLEVBQUU7QUFDaEYsc0NBQXNDLG1CQUFtQixjQUFjLEVBQUUsRUFBRTs7QUFFM0U7QUFDQTs7QUFFQSx3Q0FBd0MsMERBQTBEOztBQUVsRztBQUNBLG1CQUFtQix1QkFBdUIsRUFBRTtBQUM1Qyx3QkFBd0IsNkRBQTZEO0FBQ3JGLENBQUM7O0FBRUQ7O0FBRWUsMkVBQVksRUFBQzs7Ozs7Ozs7Ozs7OztBQy9vQzVCO0FBQUE7QUFBQTtBQUFBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ29DO0FBQ1M7O0FBRTdDO0FBQ0E7O0FBRUEsZ0NBQWdDLHNCQUFzQixtREFBUyxFQUFFO0FBQ2pFLE1BQU0sMkRBQVMsV0FBVyxpQkFBaUI7QUFDM0MsTUFBTSxnRUFBYSxXQUFXLDJDQUEyQztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHVFQUFRLEVBQUMiLCJmaWxlIjoidmVuZG9yc35hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG4vLyBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5c3BlY2llc2NyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWxBcnJheSwgbGVuZ3RoKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbEFycmF5KSkge1xuICAgIEMgPSBvcmlnaW5hbEFycmF5LmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBlbHNlIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIG5ldyAoQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDKShsZW5ndGggPT09IDAgPyAwIDogbGVuZ3RoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS5yZXBlYXRgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5yZXBlYXRcbm1vZHVsZS5leHBvcnRzID0gJycucmVwZWF0IHx8IGZ1bmN0aW9uIHJlcGVhdChjb3VudCkge1xuICB2YXIgc3RyID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcykpO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHZhciBuID0gdG9JbnRlZ2VyKGNvdW50KTtcbiAgaWYgKG4gPCAwIHx8IG4gPT0gSW5maW5pdHkpIHRocm93IFJhbmdlRXJyb3IoJ1dyb25nIG51bWJlciBvZiByZXBldGl0aW9ucycpO1xuICBmb3IgKDtuID4gMDsgKG4gPj4+PSAxKSAmJiAoc3RyICs9IHN0cikpIGlmIChuICYgMSkgcmVzdWx0ICs9IHN0cjtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEUgPSB3ZWxsS25vd25TeW1ib2woJ2lzQ29uY2F0U3ByZWFkYWJsZScpO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgaW5kZXggZXhjZWVkZWQnO1xuXG4vLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbi8vIGRlb3B0aW1pemF0aW9uIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCA9IFY4X1ZFUlNJT04gPj0gNTEgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIGFycmF5W0lTX0NPTkNBVF9TUFJFQURBQkxFXSA9IGZhbHNlO1xuICByZXR1cm4gYXJyYXkuY29uY2F0KClbMF0gIT09IGFycmF5O1xufSk7XG5cbnZhciBTUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdjb25jYXQnKTtcblxudmFyIGlzQ29uY2F0U3ByZWFkYWJsZSA9IGZ1bmN0aW9uIChPKSB7XG4gIGlmICghaXNPYmplY3QoTykpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNwcmVhZGFibGUgPSBPW0lTX0NPTkNBVF9TUFJFQURBQkxFXTtcbiAgcmV0dXJuIHNwcmVhZGFibGUgIT09IHVuZGVmaW5lZCA/ICEhc3ByZWFkYWJsZSA6IGlzQXJyYXkoTyk7XG59O1xuXG52YXIgRk9SQ0VEID0gIUlTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgfHwgIVNQRUNJRVNfU1VQUE9SVDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5jb25jYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmNvbmNhdFxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQGlzQ29uY2F0U3ByZWFkYWJsZSBhbmQgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQgfSwge1xuICBjb25jYXQ6IGZ1bmN0aW9uIGNvbmNhdChhcmcpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgMCk7XG4gICAgdmFyIG4gPSAwO1xuICAgIHZhciBpLCBrLCBsZW5ndGgsIGxlbiwgRTtcbiAgICBmb3IgKGkgPSAtMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBFID0gaSA9PT0gLTEgPyBPIDogYXJndW1lbnRzW2ldO1xuICAgICAgaWYgKGlzQ29uY2F0U3ByZWFkYWJsZShFKSkge1xuICAgICAgICBsZW4gPSB0b0xlbmd0aChFLmxlbmd0aCk7XG4gICAgICAgIGlmIChuICsgbGVuID4gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCBsZW47IGsrKywgbisrKSBpZiAoayBpbiBFKSBjcmVhdGVQcm9wZXJ0eShBLCBuLCBFW2tdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChuID49IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShBLCBuKyssIEUpO1xuICAgICAgfVxuICAgIH1cbiAgICBBLmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIiwidmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG5cbnZhciBEYXRlUHJvdG90eXBlID0gRGF0ZS5wcm90b3R5cGU7XG52YXIgSU5WQUxJRF9EQVRFID0gJ0ludmFsaWQgRGF0ZSc7XG52YXIgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJztcbnZhciBuYXRpdmVEYXRlVG9TdHJpbmcgPSBEYXRlUHJvdG90eXBlW1RPX1NUUklOR107XG52YXIgZ2V0VGltZSA9IERhdGVQcm90b3R5cGUuZ2V0VGltZTtcblxuLy8gYERhdGUucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWRhdGUucHJvdG90eXBlLnRvc3RyaW5nXG5pZiAobmV3IERhdGUoTmFOKSArICcnICE9IElOVkFMSURfREFURSkge1xuICByZWRlZmluZShEYXRlUHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHZhciB2YWx1ZSA9IGdldFRpbWUuY2FsbCh0aGlzKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IG5hdGl2ZURhdGVUb1N0cmluZy5jYWxsKHRoaXMpIDogSU5WQUxJRF9EQVRFO1xuICB9KTtcbn1cbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIHJlcGVhdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctcmVwZWF0Jyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnJlcGVhdGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnJlcGVhdFxuJCh7IHRhcmdldDogJ1N0cmluZycsIHByb3RvOiB0cnVlIH0sIHtcbiAgcmVwZWF0OiByZXBlYXRcbn0pO1xuIiwiLyohIEBsaWNlbnNlIGlzLWRvbS1ub2RlLWxpc3QgdjEuMi4xXG5cblx0Q29weXJpZ2h0IDIwMTggRmlzc3Npb24gTExDLlxuXG5cdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0U09GVFdBUkUuXG5cbiovXG5pbXBvcnQgaXNEb21Ob2RlIGZyb20gJ2lzLWRvbS1ub2RlJztcblxuZnVuY3Rpb24gaXNEb21Ob2RlTGlzdCh4KSB7XG5cdHZhciBwcm90b3R5cGVUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblx0dmFyIHJlZ2V4ID0gL15cXFtvYmplY3QgKEhUTUxDb2xsZWN0aW9ufE5vZGVMaXN0fE9iamVjdClcXF0kLztcblxuXHRyZXR1cm4gdHlwZW9mIHdpbmRvdy5Ob2RlTGlzdCA9PT0gJ29iamVjdCdcblx0XHQ/IHggaW5zdGFuY2VvZiB3aW5kb3cuTm9kZUxpc3Rcblx0XHQ6IHggIT09IG51bGwgJiZcblx0XHRcdFx0dHlwZW9mIHggPT09ICdvYmplY3QnICYmXG5cdFx0XHRcdHR5cGVvZiB4Lmxlbmd0aCA9PT0gJ251bWJlcicgJiZcblx0XHRcdFx0cmVnZXgudGVzdChwcm90b3R5cGVUb1N0cmluZykgJiZcblx0XHRcdFx0KHgubGVuZ3RoID09PSAwIHx8IGlzRG9tTm9kZSh4WzBdKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNEb21Ob2RlTGlzdDtcbiIsIi8qISBAbGljZW5zZSBpcy1kb20tbm9kZSB2MS4wLjRcblxuXHRDb3B5cmlnaHQgMjAxOCBGaXNzc2lvbiBMTEMuXG5cblx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuXHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuXHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcblx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuXHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuXHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRTT0ZUV0FSRS5cblxuKi9cbmZ1bmN0aW9uIGlzRG9tTm9kZSh4KSB7XG5cdHJldHVybiB0eXBlb2Ygd2luZG93Lk5vZGUgPT09ICdvYmplY3QnXG5cdFx0PyB4IGluc3RhbmNlb2Ygd2luZG93Lk5vZGVcblx0XHQ6IHggIT09IG51bGwgJiZcblx0XHRcdFx0dHlwZW9mIHggPT09ICdvYmplY3QnICYmXG5cdFx0XHRcdHR5cGVvZiB4Lm5vZGVUeXBlID09PSAnbnVtYmVyJyAmJlxuXHRcdFx0XHR0eXBlb2YgeC5ub2RlTmFtZSA9PT0gJ3N0cmluZydcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNEb21Ob2RlO1xuIiwiLyohIEBsaWNlbnNlIG1pbmlyYWYgdjEuMC4wXG5cblx0Q29weXJpZ2h0IDIwMTggRmlzc3Npb24gTExDLlxuXG5cdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0U09GVFdBUkUuXG5cbiovXG52YXIgcG9seWZpbGwgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgY2xvY2sgPSBEYXRlLm5vdygpO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHR2YXIgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuXHRcdGlmIChjdXJyZW50VGltZSAtIGNsb2NrID4gMTYpIHtcblx0XHRcdGNsb2NrID0gY3VycmVudFRpbWU7XG5cdFx0XHRjYWxsYmFjayhjdXJyZW50VGltZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gcG9seWZpbGwoY2FsbGJhY2spOyB9LCAwKTtcblx0XHR9XG5cdH1cbn0pKCk7XG5cbnZhciBpbmRleCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHR3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdHBvbHlmaWxsO1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsIi8qISBAbGljZW5zZSBSZW1hdHJpeCB2MC4zLjBcblxuXHRDb3B5cmlnaHQgMjAxOCBKdWxpYW4gTGxveWQuXG5cblx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuXHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuXHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuXHRhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuXHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuXHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5cdFRIRSBTT0ZUV0FSRS5cbiovXG4vKipcbiAqIEBtb2R1bGUgUmVtYXRyaXhcbiAqL1xuXG4vKipcbiAqIFRyYW5zZm9ybWF0aW9uIG1hdHJpY2VzIGluIHRoZSBicm93c2VyIGNvbWUgaW4gdHdvIGZsYXZvcnM6XG4gKlxuICogIC0gYG1hdHJpeGAgdXNpbmcgNiB2YWx1ZXMgKHNob3J0KVxuICogIC0gYG1hdHJpeDNkYCB1c2luZyAxNiB2YWx1ZXMgKGxvbmcpXG4gKlxuICogVGhpcyB1dGlsaXR5IGZvbGxvd3MgdGhpcyBbY29udmVyc2lvbiBndWlkZV0oaHR0cHM6Ly9nb28uZ2wvRUpsVVExKVxuICogdG8gZXhwYW5kIHNob3J0IGZvcm0gbWF0cmljZXMgdG8gdGhlaXIgZXF1aXZhbGVudCBsb25nIGZvcm0uXG4gKlxuICogQHBhcmFtICB7YXJyYXl9IHNvdXJjZSAtIEFjY2VwdHMgYm90aCBzaG9ydCBhbmQgbG9uZyBmb3JtIG1hdHJpY2VzLlxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGZvcm1hdChzb3VyY2UpIHtcblx0aWYgKHNvdXJjZS5jb25zdHJ1Y3RvciAhPT0gQXJyYXkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhcnJheS4nKVxuXHR9XG5cdGlmIChzb3VyY2UubGVuZ3RoID09PSAxNikge1xuXHRcdHJldHVybiBzb3VyY2Vcblx0fVxuXHRpZiAoc291cmNlLmxlbmd0aCA9PT0gNikge1xuXHRcdHZhciBtYXRyaXggPSBpZGVudGl0eSgpO1xuXHRcdG1hdHJpeFswXSA9IHNvdXJjZVswXTtcblx0XHRtYXRyaXhbMV0gPSBzb3VyY2VbMV07XG5cdFx0bWF0cml4WzRdID0gc291cmNlWzJdO1xuXHRcdG1hdHJpeFs1XSA9IHNvdXJjZVszXTtcblx0XHRtYXRyaXhbMTJdID0gc291cmNlWzRdO1xuXHRcdG1hdHJpeFsxM10gPSBzb3VyY2VbNV07XG5cdFx0cmV0dXJuIG1hdHJpeFxuXHR9XG5cdHRocm93IG5ldyBSYW5nZUVycm9yKCdFeHBlY3RlZCBhcnJheSB3aXRoIGVpdGhlciA2IG9yIDE2IHZhbHVlcy4nKVxufVxuXG4vKipcbiAqIFJldHVybnMgYSBtYXRyaXggcmVwcmVzZW50aW5nIG5vIHRyYW5zZm9ybWF0aW9uLiBUaGUgcHJvZHVjdCBvZiBhbnkgbWF0cml4XG4gKiBtdWx0aXBsaWVkIGJ5IHRoZSBpZGVudGl0eSBtYXRyaXggd2lsbCBiZSB0aGUgb3JpZ2luYWwgbWF0cml4LlxuICpcbiAqID4gKipUaXA6KiogU2ltaWxhciB0byBob3cgYDUgKiAxID09PSA1YCwgd2hlcmUgYDFgIGlzIHRoZSBpZGVudGl0eS5cbiAqXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkoKSB7XG5cdHZhciBtYXRyaXggPSBbXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG5cdFx0aSAlIDUgPT0gMCA/IG1hdHJpeC5wdXNoKDEpIDogbWF0cml4LnB1c2goMCk7XG5cdH1cblx0cmV0dXJuIG1hdHJpeFxufVxuXG4vKipcbiAqIFJldHVybnMgYSBtYXRyaXggZGVzY3JpYmluZyB0aGUgaW52ZXJzZSB0cmFuc2Zvcm1hdGlvbiBvZiB0aGUgc291cmNlXG4gKiBtYXRyaXguIFRoZSBwcm9kdWN0IG9mIGFueSBtYXRyaXggbXVsdGlwbGllZCBieSBpdHMgaW52ZXJzZSB3aWxsIGJlIHRoZVxuICogaWRlbnRpdHkgbWF0cml4LlxuICpcbiAqID4gKipUaXA6KiogU2ltaWxhciB0byBob3cgYDUgKiAoMS81KSA9PT0gMWAsIHdoZXJlIGAxLzVgIGlzIHRoZSBpbnZlcnNlLlxuICpcbiAqIEBwYXJhbSAge2FycmF5fSBzb3VyY2UgLSBBY2NlcHRzIGJvdGggc2hvcnQgYW5kIGxvbmcgZm9ybSBtYXRyaWNlcy5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiBpbnZlcnNlKHNvdXJjZSkge1xuXHR2YXIgbSA9IGZvcm1hdChzb3VyY2UpO1xuXG5cdHZhciBzMCA9IG1bMF0gKiBtWzVdIC0gbVs0XSAqIG1bMV07XG5cdHZhciBzMSA9IG1bMF0gKiBtWzZdIC0gbVs0XSAqIG1bMl07XG5cdHZhciBzMiA9IG1bMF0gKiBtWzddIC0gbVs0XSAqIG1bM107XG5cdHZhciBzMyA9IG1bMV0gKiBtWzZdIC0gbVs1XSAqIG1bMl07XG5cdHZhciBzNCA9IG1bMV0gKiBtWzddIC0gbVs1XSAqIG1bM107XG5cdHZhciBzNSA9IG1bMl0gKiBtWzddIC0gbVs2XSAqIG1bM107XG5cblx0dmFyIGM1ID0gbVsxMF0gKiBtWzE1XSAtIG1bMTRdICogbVsxMV07XG5cdHZhciBjNCA9IG1bOV0gKiBtWzE1XSAtIG1bMTNdICogbVsxMV07XG5cdHZhciBjMyA9IG1bOV0gKiBtWzE0XSAtIG1bMTNdICogbVsxMF07XG5cdHZhciBjMiA9IG1bOF0gKiBtWzE1XSAtIG1bMTJdICogbVsxMV07XG5cdHZhciBjMSA9IG1bOF0gKiBtWzE0XSAtIG1bMTJdICogbVsxMF07XG5cdHZhciBjMCA9IG1bOF0gKiBtWzEzXSAtIG1bMTJdICogbVs5XTtcblxuXHR2YXIgZGV0ZXJtaW5hbnQgPSAxIC8gKHMwICogYzUgLSBzMSAqIGM0ICsgczIgKiBjMyArIHMzICogYzIgLSBzNCAqIGMxICsgczUgKiBjMCk7XG5cblx0aWYgKGlzTmFOKGRldGVybWluYW50KSB8fCBkZXRlcm1pbmFudCA9PT0gSW5maW5pdHkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmVyc2UgZGV0ZXJtaW5hbnQgYXR0ZW1wdGVkIHRvIGRpdmlkZSBieSB6ZXJvLicpXG5cdH1cblxuXHRyZXR1cm4gW1xuXHRcdChtWzVdICogYzUgLSBtWzZdICogYzQgKyBtWzddICogYzMpICogZGV0ZXJtaW5hbnQsXG5cdFx0KC1tWzFdICogYzUgKyBtWzJdICogYzQgLSBtWzNdICogYzMpICogZGV0ZXJtaW5hbnQsXG5cdFx0KG1bMTNdICogczUgLSBtWzE0XSAqIHM0ICsgbVsxNV0gKiBzMykgKiBkZXRlcm1pbmFudCxcblx0XHQoLW1bOV0gKiBzNSArIG1bMTBdICogczQgLSBtWzExXSAqIHMzKSAqIGRldGVybWluYW50LFxuXG5cdFx0KC1tWzRdICogYzUgKyBtWzZdICogYzIgLSBtWzddICogYzEpICogZGV0ZXJtaW5hbnQsXG5cdFx0KG1bMF0gKiBjNSAtIG1bMl0gKiBjMiArIG1bM10gKiBjMSkgKiBkZXRlcm1pbmFudCxcblx0XHQoLW1bMTJdICogczUgKyBtWzE0XSAqIHMyIC0gbVsxNV0gKiBzMSkgKiBkZXRlcm1pbmFudCxcblx0XHQobVs4XSAqIHM1IC0gbVsxMF0gKiBzMiArIG1bMTFdICogczEpICogZGV0ZXJtaW5hbnQsXG5cblx0XHQobVs0XSAqIGM0IC0gbVs1XSAqIGMyICsgbVs3XSAqIGMwKSAqIGRldGVybWluYW50LFxuXHRcdCgtbVswXSAqIGM0ICsgbVsxXSAqIGMyIC0gbVszXSAqIGMwKSAqIGRldGVybWluYW50LFxuXHRcdChtWzEyXSAqIHM0IC0gbVsxM10gKiBzMiArIG1bMTVdICogczApICogZGV0ZXJtaW5hbnQsXG5cdFx0KC1tWzhdICogczQgKyBtWzldICogczIgLSBtWzExXSAqIHMwKSAqIGRldGVybWluYW50LFxuXG5cdFx0KC1tWzRdICogYzMgKyBtWzVdICogYzEgLSBtWzZdICogYzApICogZGV0ZXJtaW5hbnQsXG5cdFx0KG1bMF0gKiBjMyAtIG1bMV0gKiBjMSArIG1bMl0gKiBjMCkgKiBkZXRlcm1pbmFudCxcblx0XHQoLW1bMTJdICogczMgKyBtWzEzXSAqIHMxIC0gbVsxNF0gKiBzMCkgKiBkZXRlcm1pbmFudCxcblx0XHQobVs4XSAqIHMzIC0gbVs5XSAqIHMxICsgbVsxMF0gKiBzMCkgKiBkZXRlcm1pbmFudFxuXHRdXG59XG5cbi8qKlxuICogUmV0dXJucyBhIDR4NCBtYXRyaXggZGVzY3JpYmluZyB0aGUgY29tYmluZWQgdHJhbnNmb3JtYXRpb25zXG4gKiBvZiBib3RoIGFyZ3VtZW50cy5cbiAqXG4gKiA+ICoqTm90ZToqKiBPcmRlciBpcyB2ZXJ5IGltcG9ydGFudC4gRm9yIGV4YW1wbGUsIHJvdGF0aW5nIDQ1wrBcbiAqIGFsb25nIHRoZSBaLWF4aXMsIGZvbGxvd2VkIGJ5IHRyYW5zbGF0aW5nIDUwMCBwaXhlbHMgYWxvbmcgdGhlXG4gKiBZLWF4aXMuLi4gaXMgbm90IHRoZSBzYW1lIGFzIHRyYW5zbGF0aW5nIDUwMCBwaXhlbHMgYWxvbmcgdGhlXG4gKiBZLWF4aXMsIGZvbGxvd2VkIGJ5IHJvdGF0aW5nIDQ1wrAgYWxvbmcgb24gdGhlIFotYXhpcy5cbiAqXG4gKiBAcGFyYW0gIHthcnJheX0gbSAtIEFjY2VwdHMgYm90aCBzaG9ydCBhbmQgbG9uZyBmb3JtIG1hdHJpY2VzLlxuICogQHBhcmFtICB7YXJyYXl9IHggLSBBY2NlcHRzIGJvdGggc2hvcnQgYW5kIGxvbmcgZm9ybSBtYXRyaWNlcy5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiBtdWx0aXBseShtLCB4KSB7XG5cdHZhciBmbSA9IGZvcm1hdChtKTtcblx0dmFyIGZ4ID0gZm9ybWF0KHgpO1xuXHR2YXIgcHJvZHVjdCA9IFtdO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdFx0dmFyIHJvdyA9IFtmbVtpXSwgZm1baSArIDRdLCBmbVtpICsgOF0sIGZtW2kgKyAxMl1dO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgNDsgaisrKSB7XG5cdFx0XHR2YXIgayA9IGogKiA0O1xuXHRcdFx0dmFyIGNvbCA9IFtmeFtrXSwgZnhbayArIDFdLCBmeFtrICsgMl0sIGZ4W2sgKyAzXV07XG5cdFx0XHR2YXIgcmVzdWx0ID1cblx0XHRcdFx0cm93WzBdICogY29sWzBdICsgcm93WzFdICogY29sWzFdICsgcm93WzJdICogY29sWzJdICsgcm93WzNdICogY29sWzNdO1xuXG5cdFx0XHRwcm9kdWN0W2kgKyBrXSA9IHJlc3VsdDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcHJvZHVjdFxufVxuXG4vKipcbiAqIEF0dGVtcHRzIHRvIHJldHVybiBhIDR4NCBtYXRyaXggZGVzY3JpYmluZyB0aGUgQ1NTIHRyYW5zZm9ybVxuICogbWF0cml4IHBhc3NlZCBpbiwgYnV0IHdpbGwgcmV0dXJuIHRoZSBpZGVudGl0eSBtYXRyaXggYXMgYVxuICogZmFsbGJhY2suXG4gKlxuICogPiAqKlRpcDoqKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIGNvbnZlcnQgYSBDU1MgbWF0cml4IChyZXRyaWV2ZWQgYXMgYVxuICogYHN0cmluZ2AgZnJvbSBjb21wdXRlZCBzdHlsZXMpIHRvIGl0cyBlcXVpdmFsZW50IGFycmF5IGZvcm1hdC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHNvdXJjZSAtIGBtYXRyaXhgIG9yIGBtYXRyaXgzZGAgQ1NTIFRyYW5zZm9ybSB2YWx1ZS5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiBwYXJzZShzb3VyY2UpIHtcblx0aWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnKSB7XG5cdFx0dmFyIG1hdGNoID0gc291cmNlLm1hdGNoKC9tYXRyaXgoM2QpP1xcKChbXildKylcXCkvKTtcblx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdHZhciByYXcgPSBtYXRjaFsyXS5zcGxpdCgnLCAnKS5tYXAocGFyc2VGbG9hdCk7XG5cdFx0XHRyZXR1cm4gZm9ybWF0KHJhdylcblx0XHR9XG5cdH1cblx0cmV0dXJuIGlkZW50aXR5KClcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgNHg0IG1hdHJpeCBkZXNjcmliaW5nIFotYXhpcyByb3RhdGlvbi5cbiAqXG4gKiA+ICoqVGlwOioqIFRoaXMgaXMganVzdCBhbiBhbGlhcyBmb3IgYFJlbWF0cml4LnJvdGF0ZVpgIGZvciBwYXJpdHkgd2l0aCBDU1NcbiAqXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGFuZ2xlIC0gTWVhc3VyZWQgaW4gZGVncmVlcy5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiByb3RhdGUoYW5nbGUpIHtcblx0cmV0dXJuIHJvdGF0ZVooYW5nbGUpXG59XG5cbi8qKlxuICogUmV0dXJucyBhIDR4NCBtYXRyaXggZGVzY3JpYmluZyBYLWF4aXMgcm90YXRpb24uXG4gKlxuICogQHBhcmFtICB7bnVtYmVyfSBhbmdsZSAtIE1lYXN1cmVkIGluIGRlZ3JlZXMuXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gcm90YXRlWChhbmdsZSkge1xuXHR2YXIgdGhldGEgPSBNYXRoLlBJIC8gMTgwICogYW5nbGU7XG5cdHZhciBtYXRyaXggPSBpZGVudGl0eSgpO1xuXG5cdG1hdHJpeFs1XSA9IG1hdHJpeFsxMF0gPSBNYXRoLmNvcyh0aGV0YSk7XG5cdG1hdHJpeFs2XSA9IG1hdHJpeFs5XSA9IE1hdGguc2luKHRoZXRhKTtcblx0bWF0cml4WzldICo9IC0xO1xuXG5cdHJldHVybiBtYXRyaXhcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgNHg0IG1hdHJpeCBkZXNjcmliaW5nIFktYXhpcyByb3RhdGlvbi5cbiAqXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGFuZ2xlIC0gTWVhc3VyZWQgaW4gZGVncmVlcy5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiByb3RhdGVZKGFuZ2xlKSB7XG5cdHZhciB0aGV0YSA9IE1hdGguUEkgLyAxODAgKiBhbmdsZTtcblx0dmFyIG1hdHJpeCA9IGlkZW50aXR5KCk7XG5cblx0bWF0cml4WzBdID0gbWF0cml4WzEwXSA9IE1hdGguY29zKHRoZXRhKTtcblx0bWF0cml4WzJdID0gbWF0cml4WzhdID0gTWF0aC5zaW4odGhldGEpO1xuXHRtYXRyaXhbMl0gKj0gLTE7XG5cblx0cmV0dXJuIG1hdHJpeFxufVxuXG4vKipcbiAqIFJldHVybnMgYSA0eDQgbWF0cml4IGRlc2NyaWJpbmcgWi1heGlzIHJvdGF0aW9uLlxuICpcbiAqIEBwYXJhbSAge251bWJlcn0gYW5nbGUgLSBNZWFzdXJlZCBpbiBkZWdyZWVzLlxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHJvdGF0ZVooYW5nbGUpIHtcblx0dmFyIHRoZXRhID0gTWF0aC5QSSAvIDE4MCAqIGFuZ2xlO1xuXHR2YXIgbWF0cml4ID0gaWRlbnRpdHkoKTtcblxuXHRtYXRyaXhbMF0gPSBtYXRyaXhbNV0gPSBNYXRoLmNvcyh0aGV0YSk7XG5cdG1hdHJpeFsxXSA9IG1hdHJpeFs0XSA9IE1hdGguc2luKHRoZXRhKTtcblx0bWF0cml4WzRdICo9IC0xO1xuXG5cdHJldHVybiBtYXRyaXhcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgNHg0IG1hdHJpeCBkZXNjcmliaW5nIDJEIHNjYWxpbmcuIFRoZSBmaXJzdCBhcmd1bWVudFxuICogaXMgdXNlZCBmb3IgYm90aCBYIGFuZCBZLWF4aXMgc2NhbGluZywgdW5sZXNzIGFuIG9wdGlvbmFsXG4gKiBzZWNvbmQgYXJndW1lbnQgaXMgcHJvdmlkZWQgdG8gZXhwbGljaXRseSBkZWZpbmUgWS1heGlzIHNjYWxpbmcuXG4gKlxuICogQHBhcmFtICB7bnVtYmVyfSBzY2FsYXIgICAgLSBEZWNpbWFsIG11bHRpcGxpZXIuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IFtzY2FsYXJZXSAtIERlY2ltYWwgbXVsdGlwbGllci5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiBzY2FsZShzY2FsYXIsIHNjYWxhclkpIHtcblx0dmFyIG1hdHJpeCA9IGlkZW50aXR5KCk7XG5cblx0bWF0cml4WzBdID0gc2NhbGFyO1xuXHRtYXRyaXhbNV0gPSB0eXBlb2Ygc2NhbGFyWSA9PT0gJ251bWJlcicgPyBzY2FsYXJZIDogc2NhbGFyO1xuXG5cdHJldHVybiBtYXRyaXhcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgNHg0IG1hdHJpeCBkZXNjcmliaW5nIFgtYXhpcyBzY2FsaW5nLlxuICpcbiAqIEBwYXJhbSAge251bWJlcn0gc2NhbGFyIC0gRGVjaW1hbCBtdWx0aXBsaWVyLlxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHNjYWxlWChzY2FsYXIpIHtcblx0dmFyIG1hdHJpeCA9IGlkZW50aXR5KCk7XG5cdG1hdHJpeFswXSA9IHNjYWxhcjtcblx0cmV0dXJuIG1hdHJpeFxufVxuXG4vKipcbiAqIFJldHVybnMgYSA0eDQgbWF0cml4IGRlc2NyaWJpbmcgWS1heGlzIHNjYWxpbmcuXG4gKlxuICogQHBhcmFtICB7bnVtYmVyfSBzY2FsYXIgLSBEZWNpbWFsIG11bHRpcGxpZXIuXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gc2NhbGVZKHNjYWxhcikge1xuXHR2YXIgbWF0cml4ID0gaWRlbnRpdHkoKTtcblx0bWF0cml4WzVdID0gc2NhbGFyO1xuXHRyZXR1cm4gbWF0cml4XG59XG5cbi8qKlxuICogUmV0dXJucyBhIDR4NCBtYXRyaXggZGVzY3JpYmluZyBaLWF4aXMgc2NhbGluZy5cbiAqXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHNjYWxhciAtIERlY2ltYWwgbXVsdGlwbGllci5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiBzY2FsZVooc2NhbGFyKSB7XG5cdHZhciBtYXRyaXggPSBpZGVudGl0eSgpO1xuXHRtYXRyaXhbMTBdID0gc2NhbGFyO1xuXHRyZXR1cm4gbWF0cml4XG59XG5cbi8qKlxuICogUmV0dXJucyBhIDR4NCBtYXRyaXggZGVzY3JpYmluZyBzaGVhci4gVGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBkZWZpbmVzIFgtYXhpcyBzaGVhcmluZywgYW5kIGFuIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudFxuICogZGVmaW5lcyBZLWF4aXMgc2hlYXJpbmcuXG4gKlxuICogQHBhcmFtICB7bnVtYmVyfSBhbmdsZVggICAtIE1lYXN1cmVkIGluIGRlZ3JlZXMuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IFthbmdsZVldIC0gTWVhc3VyZWQgaW4gZGVncmVlcy5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiBza2V3KGFuZ2xlWCwgYW5nbGVZKSB7XG5cdHZhciB0aGV0YVggPSBNYXRoLlBJIC8gMTgwICogYW5nbGVYO1xuXHR2YXIgbWF0cml4ID0gaWRlbnRpdHkoKTtcblxuXHRtYXRyaXhbNF0gPSBNYXRoLnRhbih0aGV0YVgpO1xuXG5cdGlmIChhbmdsZVkpIHtcblx0XHR2YXIgdGhldGFZID0gTWF0aC5QSSAvIDE4MCAqIGFuZ2xlWTtcblx0XHRtYXRyaXhbMV0gPSBNYXRoLnRhbih0aGV0YVkpO1xuXHR9XG5cblx0cmV0dXJuIG1hdHJpeFxufVxuXG4vKipcbiAqIFJldHVybnMgYSA0eDQgbWF0cml4IGRlc2NyaWJpbmcgWC1heGlzIHNoZWFyLlxuICpcbiAqIEBwYXJhbSAge251bWJlcn0gYW5nbGUgLSBNZWFzdXJlZCBpbiBkZWdyZWVzLlxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHNrZXdYKGFuZ2xlKSB7XG5cdHZhciB0aGV0YSA9IE1hdGguUEkgLyAxODAgKiBhbmdsZTtcblx0dmFyIG1hdHJpeCA9IGlkZW50aXR5KCk7XG5cblx0bWF0cml4WzRdID0gTWF0aC50YW4odGhldGEpO1xuXG5cdHJldHVybiBtYXRyaXhcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgNHg0IG1hdHJpeCBkZXNjcmliaW5nIFktYXhpcyBzaGVhci5cbiAqXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGFuZ2xlIC0gTWVhc3VyZWQgaW4gZGVncmVlc1xuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHNrZXdZKGFuZ2xlKSB7XG5cdHZhciB0aGV0YSA9IE1hdGguUEkgLyAxODAgKiBhbmdsZTtcblx0dmFyIG1hdHJpeCA9IGlkZW50aXR5KCk7XG5cblx0bWF0cml4WzFdID0gTWF0aC50YW4odGhldGEpO1xuXG5cdHJldHVybiBtYXRyaXhcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgQ1NTIFRyYW5zZm9ybSBwcm9wZXJ0eSB2YWx1ZSBlcXVpdmFsZW50IHRvIHRoZSBzb3VyY2UgbWF0cml4LlxuICpcbiAqIEBwYXJhbSAge2FycmF5fSBzb3VyY2UgLSBBY2NlcHRzIGJvdGggc2hvcnQgYW5kIGxvbmcgZm9ybSBtYXRyaWNlcy5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcoc291cmNlKSB7XG5cdHJldHVybiAoXCJtYXRyaXgzZChcIiArIChmb3JtYXQoc291cmNlKS5qb2luKCcsICcpKSArIFwiKVwiKVxufVxuXG4vKipcbiAqIFJldHVybnMgYSA0eDQgbWF0cml4IGRlc2NyaWJpbmcgMkQgdHJhbnNsYXRpb24uIFRoZSBmaXJzdFxuICogYXJndW1lbnQgZGVmaW5lcyBYLWF4aXMgdHJhbnNsYXRpb24sIGFuZCBhbiBvcHRpb25hbCBzZWNvbmRcbiAqIGFyZ3VtZW50IGRlZmluZXMgWS1heGlzIHRyYW5zbGF0aW9uLlxuICpcbiAqIEBwYXJhbSAge251bWJlcn0gZGlzdGFuY2VYICAgLSBNZWFzdXJlZCBpbiBwaXhlbHMuXG4gKiBAcGFyYW0gIHtudW1iZXJ9IFtkaXN0YW5jZVldIC0gTWVhc3VyZWQgaW4gcGl4ZWxzLlxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHRyYW5zbGF0ZShkaXN0YW5jZVgsIGRpc3RhbmNlWSkge1xuXHR2YXIgbWF0cml4ID0gaWRlbnRpdHkoKTtcblx0bWF0cml4WzEyXSA9IGRpc3RhbmNlWDtcblxuXHRpZiAoZGlzdGFuY2VZKSB7XG5cdFx0bWF0cml4WzEzXSA9IGRpc3RhbmNlWTtcblx0fVxuXG5cdHJldHVybiBtYXRyaXhcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgNHg0IG1hdHJpeCBkZXNjcmliaW5nIFgtYXhpcyB0cmFuc2xhdGlvbi5cbiAqXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGRpc3RhbmNlIC0gTWVhc3VyZWQgaW4gcGl4ZWxzLlxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHRyYW5zbGF0ZVgoZGlzdGFuY2UpIHtcblx0dmFyIG1hdHJpeCA9IGlkZW50aXR5KCk7XG5cdG1hdHJpeFsxMl0gPSBkaXN0YW5jZTtcblx0cmV0dXJuIG1hdHJpeFxufVxuXG4vKipcbiAqIFJldHVybnMgYSA0eDQgbWF0cml4IGRlc2NyaWJpbmcgWS1heGlzIHRyYW5zbGF0aW9uLlxuICpcbiAqIEBwYXJhbSAge251bWJlcn0gZGlzdGFuY2UgLSBNZWFzdXJlZCBpbiBwaXhlbHMuXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gdHJhbnNsYXRlWShkaXN0YW5jZSkge1xuXHR2YXIgbWF0cml4ID0gaWRlbnRpdHkoKTtcblx0bWF0cml4WzEzXSA9IGRpc3RhbmNlO1xuXHRyZXR1cm4gbWF0cml4XG59XG5cbi8qKlxuICogUmV0dXJucyBhIDR4NCBtYXRyaXggZGVzY3JpYmluZyBaLWF4aXMgdHJhbnNsYXRpb24uXG4gKlxuICogQHBhcmFtICB7bnVtYmVyfSBkaXN0YW5jZSAtIE1lYXN1cmVkIGluIHBpeGVscy5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiB0cmFuc2xhdGVaKGRpc3RhbmNlKSB7XG5cdHZhciBtYXRyaXggPSBpZGVudGl0eSgpO1xuXHRtYXRyaXhbMTRdID0gZGlzdGFuY2U7XG5cdHJldHVybiBtYXRyaXhcbn1cblxuZXhwb3J0IHsgZm9ybWF0LCBpZGVudGl0eSwgaW52ZXJzZSwgbXVsdGlwbHksIHBhcnNlLCByb3RhdGUsIHJvdGF0ZVgsIHJvdGF0ZVksIHJvdGF0ZVosIHNjYWxlLCBzY2FsZVgsIHNjYWxlWSwgc2NhbGVaLCBza2V3LCBza2V3WCwgc2tld1ksIHRvU3RyaW5nLCB0cmFuc2xhdGUsIHRyYW5zbGF0ZVgsIHRyYW5zbGF0ZVksIHRyYW5zbGF0ZVogfTtcbiIsIi8qISBAbGljZW5zZSBTY3JvbGxSZXZlYWwgdjQuMC43XG5cblx0Q29weXJpZ2h0IDIwMjAgRmlzc3Npb24gTExDLlxuXG5cdExpY2Vuc2VkIHVuZGVyIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSAzLjAgZm9yXG5cdGNvbXBhdGlibGUgb3BlbiBzb3VyY2UgcHJvamVjdHMgYW5kIG5vbi1jb21tZXJjaWFsIHVzZS5cblxuXHRGb3IgY29tbWVyY2lhbCBzaXRlcywgdGhlbWVzLCBwcm9qZWN0cywgYW5kIGFwcGxpY2F0aW9ucyxcblx0a2VlcCB5b3VyIHNvdXJjZSBjb2RlIHByaXZhdGUvcHJvcHJpZXRhcnkgYnkgcHVyY2hhc2luZ1xuXHRhIGNvbW1lcmNpYWwgbGljZW5zZSBmcm9tIGh0dHBzOi8vc2Nyb2xscmV2ZWFsanMub3JnL1xuKi9cbmltcG9ydCAkIGZyb20gJ3RlYWxpZ2h0JztcbmltcG9ydCB7IHRyYW5zbGF0ZVksIHRyYW5zbGF0ZVgsIHJvdGF0ZVgsIHJvdGF0ZVksIHJvdGF0ZVosIHNjYWxlLCBwYXJzZSwgbXVsdGlwbHkgfSBmcm9tICdyZW1hdHJpeCc7XG5pbXBvcnQgcmFmIGZyb20gJ21pbmlyYWYnO1xuXG52YXIgZGVmYXVsdHMgPSB7XG5cdGRlbGF5OiAwLFxuXHRkaXN0YW5jZTogJzAnLFxuXHRkdXJhdGlvbjogNjAwLFxuXHRlYXNpbmc6ICdjdWJpYy1iZXppZXIoMC41LCAwLCAwLCAxKScsXG5cdGludGVydmFsOiAwLFxuXHRvcGFjaXR5OiAwLFxuXHRvcmlnaW46ICdib3R0b20nLFxuXHRyb3RhdGU6IHtcblx0XHR4OiAwLFxuXHRcdHk6IDAsXG5cdFx0ejogMFxuXHR9LFxuXHRzY2FsZTogMSxcblx0Y2xlYW51cDogZmFsc2UsXG5cdGNvbnRhaW5lcjogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuXHRkZXNrdG9wOiB0cnVlLFxuXHRtb2JpbGU6IHRydWUsXG5cdHJlc2V0OiBmYWxzZSxcblx0dXNlRGVsYXk6ICdhbHdheXMnLFxuXHR2aWV3RmFjdG9yOiAwLjAsXG5cdHZpZXdPZmZzZXQ6IHtcblx0XHR0b3A6IDAsXG5cdFx0cmlnaHQ6IDAsXG5cdFx0Ym90dG9tOiAwLFxuXHRcdGxlZnQ6IDBcblx0fSxcblx0YWZ0ZXJSZXNldDogZnVuY3Rpb24gYWZ0ZXJSZXNldCgpIHt9LFxuXHRhZnRlclJldmVhbDogZnVuY3Rpb24gYWZ0ZXJSZXZlYWwoKSB7fSxcblx0YmVmb3JlUmVzZXQ6IGZ1bmN0aW9uIGJlZm9yZVJlc2V0KCkge30sXG5cdGJlZm9yZVJldmVhbDogZnVuY3Rpb24gYmVmb3JlUmV2ZWFsKCkge31cbn07XG5cbmZ1bmN0aW9uIGZhaWx1cmUoKSB7XG5cdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzcicpO1xuXG5cdHJldHVybiB7XG5cdFx0Y2xlYW46IGZ1bmN0aW9uIGNsZWFuKCkge30sXG5cdFx0ZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHt9LFxuXHRcdHJldmVhbDogZnVuY3Rpb24gcmV2ZWFsKCkge30sXG5cdFx0c3luYzogZnVuY3Rpb24gc3luYygpIHt9LFxuXHRcdGdldCBub29wKCkge1xuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gc3VjY2VzcygpIHtcblx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NyJyk7XG5cblx0aWYgKGRvY3VtZW50LmJvZHkpIHtcblx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLmhlaWdodCA9ICcxMDAlJztcblx0fSBlbHNlIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG5cdFx0fSk7XG5cdH1cbn1cblxudmFyIG1vdW50ID0geyBzdWNjZXNzOiBzdWNjZXNzLCBmYWlsdXJlOiBmYWlsdXJlIH07XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcblx0cmV0dXJuIChcblx0XHR4ICE9PSBudWxsICYmXG5cdFx0eCBpbnN0YW5jZW9mIE9iamVjdCAmJlxuXHRcdCh4LmNvbnN0cnVjdG9yID09PSBPYmplY3QgfHxcblx0XHRcdE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cdClcbn1cblxuZnVuY3Rpb24gZWFjaChjb2xsZWN0aW9uLCBjYWxsYmFjaykge1xuXHRpZiAoaXNPYmplY3QoY29sbGVjdGlvbikpIHtcblx0XHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKGNvbGxlY3Rpb24pO1xuXHRcdHJldHVybiBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gY2FsbGJhY2soY29sbGVjdGlvbltrZXldLCBrZXksIGNvbGxlY3Rpb24pOyB9KVxuXHR9XG5cdGlmIChjb2xsZWN0aW9uIGluc3RhbmNlb2YgQXJyYXkpIHtcblx0XHRyZXR1cm4gY29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7IHJldHVybiBjYWxsYmFjayhpdGVtLCBpLCBjb2xsZWN0aW9uKTsgfSlcblx0fVxuXHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBlaXRoZXIgYW4gYXJyYXkgb3Igb2JqZWN0IGxpdGVyYWwuJylcbn1cblxuZnVuY3Rpb24gbG9nZ2VyKG1lc3NhZ2UpIHtcblx0dmFyIGRldGFpbHMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG5cdHdoaWxlICggbGVuLS0gPiAwICkgZGV0YWlsc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuXHRpZiAodGhpcy5jb25zdHJ1Y3Rvci5kZWJ1ZyAmJiBjb25zb2xlKSB7XG5cdFx0dmFyIHJlcG9ydCA9IFwiJWNTY3JvbGxSZXZlYWw6IFwiICsgbWVzc2FnZTtcblx0XHRkZXRhaWxzLmZvckVhY2goZnVuY3Rpb24gKGRldGFpbCkgeyByZXR1cm4gKHJlcG9ydCArPSBcIlxcbiDigJQgXCIgKyBkZXRhaWwpOyB9KTtcblx0XHRjb25zb2xlLmxvZyhyZXBvcnQsICdjb2xvcjogI2VhNjU0YjsnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdH1cbn1cblxuZnVuY3Rpb24gcmluc2UoKSB7XG5cdHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdHZhciBzdHJ1Y3QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAoe1xuXHRcdGFjdGl2ZTogW10sXG5cdFx0c3RhbGU6IFtdXG5cdH0pOyB9O1xuXG5cdHZhciBlbGVtZW50SWRzID0gc3RydWN0KCk7XG5cdHZhciBzZXF1ZW5jZUlkcyA9IHN0cnVjdCgpO1xuXHR2YXIgY29udGFpbmVySWRzID0gc3RydWN0KCk7XG5cblx0LyoqXG5cdCAqIFRha2Ugc3RvY2sgb2YgYWN0aXZlIGVsZW1lbnQgSURzLlxuXHQgKi9cblx0dHJ5IHtcblx0XHRlYWNoKCQoJ1tkYXRhLXNyLWlkXScpLCBmdW5jdGlvbiAobm9kZSkge1xuXHRcdFx0dmFyIGlkID0gcGFyc2VJbnQobm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3ItaWQnKSk7XG5cdFx0XHRlbGVtZW50SWRzLmFjdGl2ZS5wdXNoKGlkKTtcblx0XHR9KTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHRocm93IGVcblx0fVxuXHQvKipcblx0ICogRGVzdHJveSBzdGFsZSBlbGVtZW50cy5cblx0ICovXG5cdGVhY2godGhpcy5zdG9yZS5lbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRpZiAoZWxlbWVudElkcy5hY3RpdmUuaW5kZXhPZihlbGVtZW50LmlkKSA9PT0gLTEpIHtcblx0XHRcdGVsZW1lbnRJZHMuc3RhbGUucHVzaChlbGVtZW50LmlkKTtcblx0XHR9XG5cdH0pO1xuXG5cdGVhY2goZWxlbWVudElkcy5zdGFsZSwgZnVuY3Rpb24gKHN0YWxlSWQpIHsgcmV0dXJuIGRlbGV0ZSB0aGlzJDEuc3RvcmUuZWxlbWVudHNbc3RhbGVJZF07IH0pO1xuXG5cdC8qKlxuXHQgKiBUYWtlIHN0b2NrIG9mIGFjdGl2ZSBjb250YWluZXIgYW5kIHNlcXVlbmNlIElEcy5cblx0ICovXG5cdGVhY2godGhpcy5zdG9yZS5lbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRpZiAoY29udGFpbmVySWRzLmFjdGl2ZS5pbmRleE9mKGVsZW1lbnQuY29udGFpbmVySWQpID09PSAtMSkge1xuXHRcdFx0Y29udGFpbmVySWRzLmFjdGl2ZS5wdXNoKGVsZW1lbnQuY29udGFpbmVySWQpO1xuXHRcdH1cblx0XHRpZiAoZWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnc2VxdWVuY2UnKSkge1xuXHRcdFx0aWYgKHNlcXVlbmNlSWRzLmFjdGl2ZS5pbmRleE9mKGVsZW1lbnQuc2VxdWVuY2UuaWQpID09PSAtMSkge1xuXHRcdFx0XHRzZXF1ZW5jZUlkcy5hY3RpdmUucHVzaChlbGVtZW50LnNlcXVlbmNlLmlkKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBEZXN0cm95IHN0YWxlIGNvbnRhaW5lcnMuXG5cdCAqL1xuXHRlYWNoKHRoaXMuc3RvcmUuY29udGFpbmVycywgZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuXHRcdGlmIChjb250YWluZXJJZHMuYWN0aXZlLmluZGV4T2YoY29udGFpbmVyLmlkKSA9PT0gLTEpIHtcblx0XHRcdGNvbnRhaW5lcklkcy5zdGFsZS5wdXNoKGNvbnRhaW5lci5pZCk7XG5cdFx0fVxuXHR9KTtcblxuXHRlYWNoKGNvbnRhaW5lcklkcy5zdGFsZSwgZnVuY3Rpb24gKHN0YWxlSWQpIHtcblx0XHR2YXIgc3RhbGUgPSB0aGlzJDEuc3RvcmUuY29udGFpbmVyc1tzdGFsZUlkXS5ub2RlO1xuXHRcdHN0YWxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMkMS5kZWxlZ2F0ZSk7XG5cdFx0c3RhbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcyQxLmRlbGVnYXRlKTtcblx0XHRkZWxldGUgdGhpcyQxLnN0b3JlLmNvbnRhaW5lcnNbc3RhbGVJZF07XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBEZXN0cm95IHN0YWxlIHNlcXVlbmNlcy5cblx0ICovXG5cdGVhY2godGhpcy5zdG9yZS5zZXF1ZW5jZXMsIGZ1bmN0aW9uIChzZXF1ZW5jZSkge1xuXHRcdGlmIChzZXF1ZW5jZUlkcy5hY3RpdmUuaW5kZXhPZihzZXF1ZW5jZS5pZCkgPT09IC0xKSB7XG5cdFx0XHRzZXF1ZW5jZUlkcy5zdGFsZS5wdXNoKHNlcXVlbmNlLmlkKTtcblx0XHR9XG5cdH0pO1xuXG5cdGVhY2goc2VxdWVuY2VJZHMuc3RhbGUsIGZ1bmN0aW9uIChzdGFsZUlkKSB7IHJldHVybiBkZWxldGUgdGhpcyQxLnN0b3JlLnNlcXVlbmNlc1tzdGFsZUlkXTsgfSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFuKHRhcmdldCkge1xuXHR2YXIgdGhpcyQxID0gdGhpcztcblxuXHR2YXIgZGlydHk7XG5cdHRyeSB7XG5cdFx0ZWFjaCgkKHRhcmdldCksIGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHR2YXIgaWQgPSBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1zci1pZCcpO1xuXHRcdFx0aWYgKGlkICE9PSBudWxsKSB7XG5cdFx0XHRcdGRpcnR5ID0gdHJ1ZTtcblx0XHRcdFx0dmFyIGVsZW1lbnQgPSB0aGlzJDEuc3RvcmUuZWxlbWVudHNbaWRdO1xuXHRcdFx0XHRpZiAoZWxlbWVudC5jYWxsYmFja1RpbWVyKSB7XG5cdFx0XHRcdFx0d2luZG93LmNsZWFyVGltZW91dChlbGVtZW50LmNhbGxiYWNrVGltZXIuY2xvY2spO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIGVsZW1lbnQuc3R5bGVzLmlubGluZS5nZW5lcmF0ZWQpO1xuXHRcdFx0XHRub2RlLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zci1pZCcpO1xuXHRcdFx0XHRkZWxldGUgdGhpcyQxLnN0b3JlLmVsZW1lbnRzW2lkXTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBsb2dnZXIuY2FsbCh0aGlzLCAnQ2xlYW4gZmFpbGVkLicsIGUubWVzc2FnZSlcblx0fVxuXG5cdGlmIChkaXJ0eSkge1xuXHRcdHRyeSB7XG5cdFx0XHRyaW5zZS5jYWxsKHRoaXMpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBsb2dnZXIuY2FsbCh0aGlzLCAnQ2xlYW4gZmFpbGVkLicsIGUubWVzc2FnZSlcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVzdHJveSgpIHtcblx0dmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbGwgZ2VuZXJhdGVkIHN0eWxlcyBhbmQgZWxlbWVudCBpZHNcblx0ICovXG5cdGVhY2godGhpcy5zdG9yZS5lbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRlbGVtZW50Lm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIGVsZW1lbnQuc3R5bGVzLmlubGluZS5nZW5lcmF0ZWQpO1xuXHRcdGVsZW1lbnQubm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3ItaWQnKTtcblx0fSk7XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbGwgZXZlbnQgbGlzdGVuZXJzLlxuXHQgKi9cblx0ZWFjaCh0aGlzLnN0b3JlLmNvbnRhaW5lcnMsIGZ1bmN0aW9uIChjb250YWluZXIpIHtcblx0XHR2YXIgdGFyZ2V0ID1cblx0XHRcdGNvbnRhaW5lci5ub2RlID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgPyB3aW5kb3cgOiBjb250YWluZXIubm9kZTtcblx0XHR0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcyQxLmRlbGVnYXRlKTtcblx0XHR0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcyQxLmRlbGVnYXRlKTtcblx0fSk7XG5cblx0LyoqXG5cdCAqIENsZWFyIGFsbCBkYXRhIGZyb20gdGhlIHN0b3JlXG5cdCAqL1xuXHR0aGlzLnN0b3JlID0ge1xuXHRcdGNvbnRhaW5lcnM6IHt9LFxuXHRcdGVsZW1lbnRzOiB7fSxcblx0XHRoaXN0b3J5OiBbXSxcblx0XHRzZXF1ZW5jZXM6IHt9XG5cdH07XG59XG5cbnZhciBnZXRQcmVmaXhlZENzc1Byb3AgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgcHJvcGVydGllcyA9IHt9O1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cblx0ZnVuY3Rpb24gZ2V0UHJlZml4ZWRDc3NQcm9wZXJ0eShuYW1lLCBzb3VyY2UpIHtcblx0XHRpZiAoIHNvdXJjZSA9PT0gdm9pZCAwICkgc291cmNlID0gc3R5bGU7XG5cblx0XHRpZiAobmFtZSAmJiB0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChwcm9wZXJ0aWVzW25hbWVdKSB7XG5cdFx0XHRcdHJldHVybiBwcm9wZXJ0aWVzW25hbWVdXG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIHNvdXJjZVtuYW1lXSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0cmV0dXJuIChwcm9wZXJ0aWVzW25hbWVdID0gbmFtZSlcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygc291cmNlWyhcIi13ZWJraXQtXCIgKyBuYW1lKV0gPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHJldHVybiAocHJvcGVydGllc1tuYW1lXSA9IFwiLXdlYmtpdC1cIiArIG5hbWUpXG5cdFx0XHR9XG5cdFx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcigoXCJVbmFibGUgdG8gZmluZCBcXFwiXCIgKyBuYW1lICsgXCJcXFwiIHN0eWxlIHByb3BlcnR5LlwiKSlcblx0XHR9XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcuJylcblx0fVxuXG5cdGdldFByZWZpeGVkQ3NzUHJvcGVydHkuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIChwcm9wZXJ0aWVzID0ge30pOyB9O1xuXG5cdHJldHVybiBnZXRQcmVmaXhlZENzc1Byb3BlcnR5XG59KSgpO1xuXG5mdW5jdGlvbiBzdHlsZShlbGVtZW50KSB7XG5cdHZhciBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQubm9kZSk7XG5cdHZhciBwb3NpdGlvbiA9IGNvbXB1dGVkLnBvc2l0aW9uO1xuXHR2YXIgY29uZmlnID0gZWxlbWVudC5jb25maWc7XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlIGlubGluZSBzdHlsZXNcblx0ICovXG5cdHZhciBpbmxpbmUgPSB7fTtcblx0dmFyIGlubGluZVN0eWxlID0gZWxlbWVudC5ub2RlLmdldEF0dHJpYnV0ZSgnc3R5bGUnKSB8fCAnJztcblx0dmFyIGlubGluZU1hdGNoID0gaW5saW5lU3R5bGUubWF0Y2goL1tcXHctXStcXHMqOlxccypbXjtdK1xccyovZ2kpIHx8IFtdO1xuXG5cdGlubGluZS5jb21wdXRlZCA9IGlubGluZU1hdGNoID8gaW5saW5lTWF0Y2gubWFwKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLnRyaW0oKTsgfSkuam9pbignOyAnKSArICc7JyA6ICcnO1xuXG5cdGlubGluZS5nZW5lcmF0ZWQgPSBpbmxpbmVNYXRjaC5zb21lKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLm1hdGNoKC92aXNpYmlsaXR5XFxzPzpcXHM/dmlzaWJsZS9pKTsgfSlcblx0XHQ/IGlubGluZS5jb21wdXRlZFxuXHRcdDogaW5saW5lTWF0Y2guY29uY2F0KCBbJ3Zpc2liaWxpdHk6IHZpc2libGUnXSkubWFwKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLnRyaW0oKTsgfSkuam9pbignOyAnKSArICc7JztcblxuXHQvKipcblx0ICogR2VuZXJhdGUgb3BhY2l0eSBzdHlsZXNcblx0ICovXG5cdHZhciBjb21wdXRlZE9wYWNpdHkgPSBwYXJzZUZsb2F0KGNvbXB1dGVkLm9wYWNpdHkpO1xuXHR2YXIgY29uZmlnT3BhY2l0eSA9ICFpc05hTihwYXJzZUZsb2F0KGNvbmZpZy5vcGFjaXR5KSlcblx0XHQ/IHBhcnNlRmxvYXQoY29uZmlnLm9wYWNpdHkpXG5cdFx0OiBwYXJzZUZsb2F0KGNvbXB1dGVkLm9wYWNpdHkpO1xuXG5cdHZhciBvcGFjaXR5ID0ge1xuXHRcdGNvbXB1dGVkOiBjb21wdXRlZE9wYWNpdHkgIT09IGNvbmZpZ09wYWNpdHkgPyAoXCJvcGFjaXR5OiBcIiArIGNvbXB1dGVkT3BhY2l0eSArIFwiO1wiKSA6ICcnLFxuXHRcdGdlbmVyYXRlZDogY29tcHV0ZWRPcGFjaXR5ICE9PSBjb25maWdPcGFjaXR5ID8gKFwib3BhY2l0eTogXCIgKyBjb25maWdPcGFjaXR5ICsgXCI7XCIpIDogJydcblx0fTtcblxuXHQvKipcblx0ICogR2VuZXJhdGUgdHJhbnNmb3JtYXRpb24gc3R5bGVzXG5cdCAqL1xuXHR2YXIgdHJhbnNmb3JtYXRpb25zID0gW107XG5cblx0aWYgKHBhcnNlRmxvYXQoY29uZmlnLmRpc3RhbmNlKSkge1xuXHRcdHZhciBheGlzID0gY29uZmlnLm9yaWdpbiA9PT0gJ3RvcCcgfHwgY29uZmlnLm9yaWdpbiA9PT0gJ2JvdHRvbScgPyAnWScgOiAnWCc7XG5cblx0XHQvKipcblx0XHQgKiBMZXTigJlzIG1ha2Ugc3VyZSBvdXIgb3VyIHBpeGVsIGRpc3RhbmNlcyBhcmUgbmVnYXRpdmUgZm9yIHRvcCBhbmQgbGVmdC5cblx0XHQgKiBlLmcuIHsgb3JpZ2luOiAndG9wJywgZGlzdGFuY2U6ICcyNXB4JyB9IHN0YXJ0cyBhdCBgdG9wOiAtMjVweGAgaW4gQ1NTLlxuXHRcdCAqL1xuXHRcdHZhciBkaXN0YW5jZSA9IGNvbmZpZy5kaXN0YW5jZTtcblx0XHRpZiAoY29uZmlnLm9yaWdpbiA9PT0gJ3RvcCcgfHwgY29uZmlnLm9yaWdpbiA9PT0gJ2xlZnQnKSB7XG5cdFx0XHRkaXN0YW5jZSA9IC9eLS8udGVzdChkaXN0YW5jZSkgPyBkaXN0YW5jZS5zdWJzdHIoMSkgOiAoXCItXCIgKyBkaXN0YW5jZSk7XG5cdFx0fVxuXG5cdFx0dmFyIHJlZiA9IGRpc3RhbmNlLm1hdGNoKC8oXi0/XFxkK1xcLj9cXGQ/KXwoZW0kfHB4JHwlJCkvZyk7XG5cdFx0dmFyIHZhbHVlID0gcmVmWzBdO1xuXHRcdHZhciB1bml0ID0gcmVmWzFdO1xuXG5cdFx0c3dpdGNoICh1bml0KSB7XG5cdFx0XHRjYXNlICdlbSc6XG5cdFx0XHRcdGRpc3RhbmNlID0gcGFyc2VJbnQoY29tcHV0ZWQuZm9udFNpemUpICogdmFsdWU7XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdweCc6XG5cdFx0XHRcdGRpc3RhbmNlID0gdmFsdWU7XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICclJzpcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIEhlcmUgd2UgdXNlIGBnZXRCb3VuZGluZ0NsaWVudFJlY3RgIGluc3RlYWQgb2Zcblx0XHRcdFx0ICogdGhlIGV4aXN0aW5nIGRhdGEgYXR0YWNoZWQgdG8gYGVsZW1lbnQuZ2VvbWV0cnlgXG5cdFx0XHRcdCAqIGJlY2F1c2Ugb25seSB0aGUgZm9ybWVyIGluY2x1ZGVzIGFueSB0cmFuc2Zvcm1hdGlvbnNcblx0XHRcdFx0ICogY3VycmVudCBhcHBsaWVkIHRvIHRoZSBlbGVtZW50LlxuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiBJZiB0aGF0IGJlaGF2aW9yIGVuZHMgdXAgYmVpbmcgdW5pbnR1aXRpdmUsIHRoaXNcblx0XHRcdFx0ICogbG9naWMgY291bGQgaW5zdGVhZCB1dGlsaXplIGBlbGVtZW50Lmdlb21ldHJ5LmhlaWdodGBcblx0XHRcdFx0ICogYW5kIGBlbGVtZW50Lmdlb2VtZXRyeS53aWR0aGAgZm9yIHRoZSBkaXN0YW5jZSBjYWxjdWxhdGlvblxuXHRcdFx0XHQgKi9cblx0XHRcdFx0ZGlzdGFuY2UgPVxuXHRcdFx0XHRcdGF4aXMgPT09ICdZJ1xuXHRcdFx0XHRcdFx0PyAoZWxlbWVudC5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCAqIHZhbHVlKSAvIDEwMFxuXHRcdFx0XHRcdFx0OiAoZWxlbWVudC5ub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoICogdmFsdWUpIC8gMTAwO1xuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1VucmVjb2duaXplZCBvciBtaXNzaW5nIGRpc3RhbmNlIHVuaXQuJylcblx0XHR9XG5cblx0XHRpZiAoYXhpcyA9PT0gJ1knKSB7XG5cdFx0XHR0cmFuc2Zvcm1hdGlvbnMucHVzaCh0cmFuc2xhdGVZKGRpc3RhbmNlKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRyYW5zZm9ybWF0aW9ucy5wdXNoKHRyYW5zbGF0ZVgoZGlzdGFuY2UpKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoY29uZmlnLnJvdGF0ZS54KSB7IHRyYW5zZm9ybWF0aW9ucy5wdXNoKHJvdGF0ZVgoY29uZmlnLnJvdGF0ZS54KSk7IH1cblx0aWYgKGNvbmZpZy5yb3RhdGUueSkgeyB0cmFuc2Zvcm1hdGlvbnMucHVzaChyb3RhdGVZKGNvbmZpZy5yb3RhdGUueSkpOyB9XG5cdGlmIChjb25maWcucm90YXRlLnopIHsgdHJhbnNmb3JtYXRpb25zLnB1c2gocm90YXRlWihjb25maWcucm90YXRlLnopKTsgfVxuXHRpZiAoY29uZmlnLnNjYWxlICE9PSAxKSB7XG5cdFx0aWYgKGNvbmZpZy5zY2FsZSA9PT0gMCkge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBUaGUgQ1NTIFRyYW5zZm9ybXMgbWF0cml4IGludGVycG9sYXRpb24gc3BlY2lmaWNhdGlvblxuXHRcdFx0ICogYmFzaWNhbGx5IGRpc2FsbG93cyB0cmFuc2l0aW9ucyBvZiBub24taW52ZXJ0aWJsZVxuXHRcdFx0ICogbWF0cml4ZXMsIHdoaWNoIG1lYW5zIGJyb3dzZXJzIHdvbid0IHRyYW5zaXRpb25cblx0XHRcdCAqIGVsZW1lbnRzIHdpdGggemVybyBzY2FsZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGF04oCZcyBpbmNvbnZlbmllbnQgZm9yIHRoZSBBUEkgYW5kIGRldmVsb3BlclxuXHRcdFx0ICogZXhwZXJpZW5jZSwgc28gd2Ugc2ltcGx5IG51ZGdlIHRoZWlyIHZhbHVlXG5cdFx0XHQgKiBzbGlnaHRseSBhYm92ZSB6ZXJvOyB0aGlzIGFsbG93cyBicm93c2Vyc1xuXHRcdFx0ICogdG8gdHJhbnNpdGlvbiBvdXIgZWxlbWVudCBhcyBleHBlY3RlZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBgMC4wMDAyYCB3YXMgdGhlIHNtYWxsZXN0IG51bWJlclxuXHRcdFx0ICogdGhhdCBwZXJmb3JtZWQgYWNyb3NzIGJyb3dzZXJzLlxuXHRcdFx0ICovXG5cdFx0XHR0cmFuc2Zvcm1hdGlvbnMucHVzaChzY2FsZSgwLjAwMDIpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dHJhbnNmb3JtYXRpb25zLnB1c2goc2NhbGUoY29uZmlnLnNjYWxlKSk7XG5cdFx0fVxuXHR9XG5cblx0dmFyIHRyYW5zZm9ybSA9IHt9O1xuXHRpZiAodHJhbnNmb3JtYXRpb25zLmxlbmd0aCkge1xuXHRcdHRyYW5zZm9ybS5wcm9wZXJ0eSA9IGdldFByZWZpeGVkQ3NzUHJvcCgndHJhbnNmb3JtJyk7XG5cdFx0LyoqXG5cdFx0ICogVGhlIGRlZmF1bHQgY29tcHV0ZWQgdHJhbnNmb3JtIHZhbHVlIHNob3VsZCBiZSBvbmUgb2Y6XG5cdFx0ICogdW5kZWZpbmVkIHx8ICdub25lJyB8fCAnbWF0cml4KCknIHx8ICdtYXRyaXgzZCgpJ1xuXHRcdCAqL1xuXHRcdHRyYW5zZm9ybS5jb21wdXRlZCA9IHtcblx0XHRcdHJhdzogY29tcHV0ZWRbdHJhbnNmb3JtLnByb3BlcnR5XSxcblx0XHRcdG1hdHJpeDogcGFyc2UoY29tcHV0ZWRbdHJhbnNmb3JtLnByb3BlcnR5XSlcblx0XHR9O1xuXG5cdFx0dHJhbnNmb3JtYXRpb25zLnVuc2hpZnQodHJhbnNmb3JtLmNvbXB1dGVkLm1hdHJpeCk7XG5cdFx0dmFyIHByb2R1Y3QgPSB0cmFuc2Zvcm1hdGlvbnMucmVkdWNlKG11bHRpcGx5KTtcblxuXHRcdHRyYW5zZm9ybS5nZW5lcmF0ZWQgPSB7XG5cdFx0XHRpbml0aWFsOiAoKHRyYW5zZm9ybS5wcm9wZXJ0eSkgKyBcIjogbWF0cml4M2QoXCIgKyAocHJvZHVjdC5qb2luKCcsICcpKSArIFwiKTtcIiksXG5cdFx0XHRmaW5hbDogKCh0cmFuc2Zvcm0ucHJvcGVydHkpICsgXCI6IG1hdHJpeDNkKFwiICsgKHRyYW5zZm9ybS5jb21wdXRlZC5tYXRyaXguam9pbignLCAnKSkgKyBcIik7XCIpXG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHR0cmFuc2Zvcm0uZ2VuZXJhdGVkID0ge1xuXHRcdFx0aW5pdGlhbDogJycsXG5cdFx0XHRmaW5hbDogJydcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlIHRyYW5zaXRpb24gc3R5bGVzXG5cdCAqL1xuXHR2YXIgdHJhbnNpdGlvbiA9IHt9O1xuXHRpZiAob3BhY2l0eS5nZW5lcmF0ZWQgfHwgdHJhbnNmb3JtLmdlbmVyYXRlZC5pbml0aWFsKSB7XG5cdFx0dHJhbnNpdGlvbi5wcm9wZXJ0eSA9IGdldFByZWZpeGVkQ3NzUHJvcCgndHJhbnNpdGlvbicpO1xuXHRcdHRyYW5zaXRpb24uY29tcHV0ZWQgPSBjb21wdXRlZFt0cmFuc2l0aW9uLnByb3BlcnR5XTtcblx0XHR0cmFuc2l0aW9uLmZyYWdtZW50cyA9IFtdO1xuXG5cdFx0dmFyIGRlbGF5ID0gY29uZmlnLmRlbGF5O1xuXHRcdHZhciBkdXJhdGlvbiA9IGNvbmZpZy5kdXJhdGlvbjtcblx0XHR2YXIgZWFzaW5nID0gY29uZmlnLmVhc2luZztcblxuXHRcdGlmIChvcGFjaXR5LmdlbmVyYXRlZCkge1xuXHRcdFx0dHJhbnNpdGlvbi5mcmFnbWVudHMucHVzaCh7XG5cdFx0XHRcdGRlbGF5ZWQ6IChcIm9wYWNpdHkgXCIgKyAoZHVyYXRpb24gLyAxMDAwKSArIFwicyBcIiArIGVhc2luZyArIFwiIFwiICsgKGRlbGF5IC8gMTAwMCkgKyBcInNcIiksXG5cdFx0XHRcdGluc3RhbnQ6IChcIm9wYWNpdHkgXCIgKyAoZHVyYXRpb24gLyAxMDAwKSArIFwicyBcIiArIGVhc2luZyArIFwiIDBzXCIpXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAodHJhbnNmb3JtLmdlbmVyYXRlZC5pbml0aWFsKSB7XG5cdFx0XHR0cmFuc2l0aW9uLmZyYWdtZW50cy5wdXNoKHtcblx0XHRcdFx0ZGVsYXllZDogKCh0cmFuc2Zvcm0ucHJvcGVydHkpICsgXCIgXCIgKyAoZHVyYXRpb24gLyAxMDAwKSArIFwicyBcIiArIGVhc2luZyArIFwiIFwiICsgKGRlbGF5IC8gMTAwMCkgKyBcInNcIiksXG5cdFx0XHRcdGluc3RhbnQ6ICgodHJhbnNmb3JtLnByb3BlcnR5KSArIFwiIFwiICsgKGR1cmF0aW9uIC8gMTAwMCkgKyBcInMgXCIgKyBlYXNpbmcgKyBcIiAwc1wiKVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogVGhlIGRlZmF1bHQgY29tcHV0ZWQgdHJhbnNpdGlvbiBwcm9wZXJ0eSBzaG91bGQgYmUgdW5kZWZpbmVkLCBvciBvbmUgb2Y6XG5cdFx0ICogJycgfHwgJ25vbmUgMHMgZWFzZSAwcycgfHwgJ2FsbCAwcyBlYXNlIDBzJyB8fCAnYWxsIDBzIDBzIGN1YmljLWJlemllcigpJ1xuXHRcdCAqL1xuXHRcdHZhciBoYXNDdXN0b21UcmFuc2l0aW9uID1cblx0XHRcdHRyYW5zaXRpb24uY29tcHV0ZWQgJiYgIXRyYW5zaXRpb24uY29tcHV0ZWQubWF0Y2goL2FsbCAwc3xub25lIDBzLyk7XG5cblx0XHRpZiAoaGFzQ3VzdG9tVHJhbnNpdGlvbikge1xuXHRcdFx0dHJhbnNpdGlvbi5mcmFnbWVudHMudW5zaGlmdCh7XG5cdFx0XHRcdGRlbGF5ZWQ6IHRyYW5zaXRpb24uY29tcHV0ZWQsXG5cdFx0XHRcdGluc3RhbnQ6IHRyYW5zaXRpb24uY29tcHV0ZWRcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHZhciBjb21wb3NlZCA9IHRyYW5zaXRpb24uZnJhZ21lbnRzLnJlZHVjZShcblx0XHRcdGZ1bmN0aW9uIChjb21wb3NpdGlvbiwgZnJhZ21lbnQsIGkpIHtcblx0XHRcdFx0Y29tcG9zaXRpb24uZGVsYXllZCArPSBpID09PSAwID8gZnJhZ21lbnQuZGVsYXllZCA6IChcIiwgXCIgKyAoZnJhZ21lbnQuZGVsYXllZCkpO1xuXHRcdFx0XHRjb21wb3NpdGlvbi5pbnN0YW50ICs9IGkgPT09IDAgPyBmcmFnbWVudC5pbnN0YW50IDogKFwiLCBcIiArIChmcmFnbWVudC5pbnN0YW50KSk7XG5cdFx0XHRcdHJldHVybiBjb21wb3NpdGlvblxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGVsYXllZDogJycsXG5cdFx0XHRcdGluc3RhbnQ6ICcnXG5cdFx0XHR9XG5cdFx0KTtcblxuXHRcdHRyYW5zaXRpb24uZ2VuZXJhdGVkID0ge1xuXHRcdFx0ZGVsYXllZDogKCh0cmFuc2l0aW9uLnByb3BlcnR5KSArIFwiOiBcIiArIChjb21wb3NlZC5kZWxheWVkKSArIFwiO1wiKSxcblx0XHRcdGluc3RhbnQ6ICgodHJhbnNpdGlvbi5wcm9wZXJ0eSkgKyBcIjogXCIgKyAoY29tcG9zZWQuaW5zdGFudCkgKyBcIjtcIilcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHRyYW5zaXRpb24uZ2VuZXJhdGVkID0ge1xuXHRcdFx0ZGVsYXllZDogJycsXG5cdFx0XHRpbnN0YW50OiAnJ1xuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGlubGluZTogaW5saW5lLFxuXHRcdG9wYWNpdHk6IG9wYWNpdHksXG5cdFx0cG9zaXRpb246IHBvc2l0aW9uLFxuXHRcdHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuXHRcdHRyYW5zaXRpb246IHRyYW5zaXRpb25cblx0fVxufVxuXG5mdW5jdGlvbiBhbmltYXRlKGVsZW1lbnQsIGZvcmNlKSB7XG5cdGlmICggZm9yY2UgPT09IHZvaWQgMCApIGZvcmNlID0ge307XG5cblx0dmFyIHByaXN0aW5lID0gZm9yY2UucHJpc3RpbmUgfHwgdGhpcy5wcmlzdGluZTtcblx0dmFyIGRlbGF5ZWQgPVxuXHRcdGVsZW1lbnQuY29uZmlnLnVzZURlbGF5ID09PSAnYWx3YXlzJyB8fFxuXHRcdChlbGVtZW50LmNvbmZpZy51c2VEZWxheSA9PT0gJ29ubG9hZCcgJiYgcHJpc3RpbmUpIHx8XG5cdFx0KGVsZW1lbnQuY29uZmlnLnVzZURlbGF5ID09PSAnb25jZScgJiYgIWVsZW1lbnQuc2Vlbik7XG5cblx0dmFyIHNob3VsZFJldmVhbCA9IGVsZW1lbnQudmlzaWJsZSAmJiAhZWxlbWVudC5yZXZlYWxlZDtcblx0dmFyIHNob3VsZFJlc2V0ID0gIWVsZW1lbnQudmlzaWJsZSAmJiBlbGVtZW50LnJldmVhbGVkICYmIGVsZW1lbnQuY29uZmlnLnJlc2V0O1xuXG5cdGlmIChmb3JjZS5yZXZlYWwgfHwgc2hvdWxkUmV2ZWFsKSB7XG5cdFx0cmV0dXJuIHRyaWdnZXJSZXZlYWwuY2FsbCh0aGlzLCBlbGVtZW50LCBkZWxheWVkKVxuXHR9XG5cblx0aWYgKGZvcmNlLnJlc2V0IHx8IHNob3VsZFJlc2V0KSB7XG5cdFx0cmV0dXJuIHRyaWdnZXJSZXNldC5jYWxsKHRoaXMsIGVsZW1lbnQpXG5cdH1cbn1cblxuZnVuY3Rpb24gdHJpZ2dlclJldmVhbChlbGVtZW50LCBkZWxheWVkKSB7XG5cdHZhciBzdHlsZXMgPSBbXG5cdFx0ZWxlbWVudC5zdHlsZXMuaW5saW5lLmdlbmVyYXRlZCxcblx0XHRlbGVtZW50LnN0eWxlcy5vcGFjaXR5LmNvbXB1dGVkLFxuXHRcdGVsZW1lbnQuc3R5bGVzLnRyYW5zZm9ybS5nZW5lcmF0ZWQuZmluYWxcblx0XTtcblx0aWYgKGRlbGF5ZWQpIHtcblx0XHRzdHlsZXMucHVzaChlbGVtZW50LnN0eWxlcy50cmFuc2l0aW9uLmdlbmVyYXRlZC5kZWxheWVkKTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZXMucHVzaChlbGVtZW50LnN0eWxlcy50cmFuc2l0aW9uLmdlbmVyYXRlZC5pbnN0YW50KTtcblx0fVxuXHRlbGVtZW50LnJldmVhbGVkID0gZWxlbWVudC5zZWVuID0gdHJ1ZTtcblx0ZWxlbWVudC5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZXMuZmlsdGVyKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzICE9PSAnJzsgfSkuam9pbignICcpKTtcblx0cmVnaXN0ZXJDYWxsYmFja3MuY2FsbCh0aGlzLCBlbGVtZW50LCBkZWxheWVkKTtcbn1cblxuZnVuY3Rpb24gdHJpZ2dlclJlc2V0KGVsZW1lbnQpIHtcblx0dmFyIHN0eWxlcyA9IFtcblx0XHRlbGVtZW50LnN0eWxlcy5pbmxpbmUuZ2VuZXJhdGVkLFxuXHRcdGVsZW1lbnQuc3R5bGVzLm9wYWNpdHkuZ2VuZXJhdGVkLFxuXHRcdGVsZW1lbnQuc3R5bGVzLnRyYW5zZm9ybS5nZW5lcmF0ZWQuaW5pdGlhbCxcblx0XHRlbGVtZW50LnN0eWxlcy50cmFuc2l0aW9uLmdlbmVyYXRlZC5pbnN0YW50XG5cdF07XG5cdGVsZW1lbnQucmV2ZWFsZWQgPSBmYWxzZTtcblx0ZWxlbWVudC5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZXMuZmlsdGVyKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzICE9PSAnJzsgfSkuam9pbignICcpKTtcblx0cmVnaXN0ZXJDYWxsYmFja3MuY2FsbCh0aGlzLCBlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJDYWxsYmFja3MoZWxlbWVudCwgaXNEZWxheWVkKSB7XG5cdHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdHZhciBkdXJhdGlvbiA9IGlzRGVsYXllZFxuXHRcdD8gZWxlbWVudC5jb25maWcuZHVyYXRpb24gKyBlbGVtZW50LmNvbmZpZy5kZWxheVxuXHRcdDogZWxlbWVudC5jb25maWcuZHVyYXRpb247XG5cblx0dmFyIGJlZm9yZUNhbGxiYWNrID0gZWxlbWVudC5yZXZlYWxlZFxuXHRcdD8gZWxlbWVudC5jb25maWcuYmVmb3JlUmV2ZWFsXG5cdFx0OiBlbGVtZW50LmNvbmZpZy5iZWZvcmVSZXNldDtcblxuXHR2YXIgYWZ0ZXJDYWxsYmFjayA9IGVsZW1lbnQucmV2ZWFsZWRcblx0XHQ/IGVsZW1lbnQuY29uZmlnLmFmdGVyUmV2ZWFsXG5cdFx0OiBlbGVtZW50LmNvbmZpZy5hZnRlclJlc2V0O1xuXG5cdHZhciBlbGFwc2VkID0gMDtcblx0aWYgKGVsZW1lbnQuY2FsbGJhY2tUaW1lcikge1xuXHRcdGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gZWxlbWVudC5jYWxsYmFja1RpbWVyLnN0YXJ0O1xuXHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoZWxlbWVudC5jYWxsYmFja1RpbWVyLmNsb2NrKTtcblx0fVxuXG5cdGJlZm9yZUNhbGxiYWNrKGVsZW1lbnQubm9kZSk7XG5cblx0ZWxlbWVudC5jYWxsYmFja1RpbWVyID0ge1xuXHRcdHN0YXJ0OiBEYXRlLm5vdygpLFxuXHRcdGNsb2NrOiB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRhZnRlckNhbGxiYWNrKGVsZW1lbnQubm9kZSk7XG5cdFx0XHRlbGVtZW50LmNhbGxiYWNrVGltZXIgPSBudWxsO1xuXHRcdFx0aWYgKGVsZW1lbnQucmV2ZWFsZWQgJiYgIWVsZW1lbnQuY29uZmlnLnJlc2V0ICYmIGVsZW1lbnQuY29uZmlnLmNsZWFudXApIHtcblx0XHRcdFx0Y2xlYW4uY2FsbCh0aGlzJDEsIGVsZW1lbnQubm9kZSk7XG5cdFx0XHR9XG5cdFx0fSwgZHVyYXRpb24gLSBlbGFwc2VkKVxuXHR9O1xufVxuXG52YXIgbmV4dFVuaXF1ZUlkID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHVpZCA9IDA7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiB1aWQrKzsgfVxufSkoKTtcblxuZnVuY3Rpb24gc2VxdWVuY2UoZWxlbWVudCwgcHJpc3RpbmUpIHtcblx0aWYgKCBwcmlzdGluZSA9PT0gdm9pZCAwICkgcHJpc3RpbmUgPSB0aGlzLnByaXN0aW5lO1xuXG5cdC8qKlxuXHQgKiBXZSBmaXJzdCBjaGVjayBpZiB0aGUgZWxlbWVudCBzaG91bGQgcmVzZXQuXG5cdCAqL1xuXHRpZiAoIWVsZW1lbnQudmlzaWJsZSAmJiBlbGVtZW50LnJldmVhbGVkICYmIGVsZW1lbnQuY29uZmlnLnJlc2V0KSB7XG5cdFx0cmV0dXJuIGFuaW1hdGUuY2FsbCh0aGlzLCBlbGVtZW50LCB7IHJlc2V0OiB0cnVlIH0pXG5cdH1cblxuXHR2YXIgc2VxID0gdGhpcy5zdG9yZS5zZXF1ZW5jZXNbZWxlbWVudC5zZXF1ZW5jZS5pZF07XG5cdHZhciBpID0gZWxlbWVudC5zZXF1ZW5jZS5pbmRleDtcblxuXHRpZiAoc2VxKSB7XG5cdFx0dmFyIHZpc2libGUgPSBuZXcgU2VxdWVuY2VNb2RlbChzZXEsICd2aXNpYmxlJywgdGhpcy5zdG9yZSk7XG5cdFx0dmFyIHJldmVhbGVkID0gbmV3IFNlcXVlbmNlTW9kZWwoc2VxLCAncmV2ZWFsZWQnLCB0aGlzLnN0b3JlKTtcblxuXHRcdHNlcS5tb2RlbHMgPSB7IHZpc2libGU6IHZpc2libGUsIHJldmVhbGVkOiByZXZlYWxlZCB9O1xuXG5cdFx0LyoqXG5cdFx0ICogSWYgdGhlIHNlcXVlbmNlIGhhcyBubyByZXZlYWxlZCBtZW1iZXJzLFxuXHRcdCAqIHRoZW4gd2UgcmV2ZWFsIHRoZSBmaXJzdCB2aXNpYmxlIGVsZW1lbnRcblx0XHQgKiB3aXRoaW4gdGhhdCBzZXF1ZW5jZS5cblx0XHQgKlxuXHRcdCAqIFRoZSBzZXF1ZW5jZSB0aGVuIGN1ZXMgYSByZWN1cnNpdmUgY2FsbFxuXHRcdCAqIGluIGJvdGggZGlyZWN0aW9ucy5cblx0XHQgKi9cblx0XHRpZiAoIXJldmVhbGVkLmJvZHkubGVuZ3RoKSB7XG5cdFx0XHR2YXIgbmV4dElkID0gc2VxLm1lbWJlcnNbdmlzaWJsZS5ib2R5WzBdXTtcblx0XHRcdHZhciBuZXh0RWxlbWVudCA9IHRoaXMuc3RvcmUuZWxlbWVudHNbbmV4dElkXTtcblxuXHRcdFx0aWYgKG5leHRFbGVtZW50KSB7XG5cdFx0XHRcdGN1ZS5jYWxsKHRoaXMsIHNlcSwgdmlzaWJsZS5ib2R5WzBdLCAtMSwgcHJpc3RpbmUpO1xuXHRcdFx0XHRjdWUuY2FsbCh0aGlzLCBzZXEsIHZpc2libGUuYm9keVswXSwgKzEsIHByaXN0aW5lKTtcblx0XHRcdFx0cmV0dXJuIGFuaW1hdGUuY2FsbCh0aGlzLCBuZXh0RWxlbWVudCwgeyByZXZlYWw6IHRydWUsIHByaXN0aW5lOiBwcmlzdGluZSB9KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIElmIG91ciBlbGVtZW50IGlzbuKAmXQgcmVzZXR0aW5nLCB3ZSBjaGVjayB0aGVcblx0XHQgKiBlbGVtZW50IHNlcXVlbmNlIGluZGV4IGFnYWluc3QgdGhlIGhlYWQsIGFuZFxuXHRcdCAqIHRoZW4gdGhlIGZvb3Qgb2YgdGhlIHNlcXVlbmNlLlxuXHRcdCAqL1xuXHRcdGlmIChcblx0XHRcdCFzZXEuYmxvY2tlZC5oZWFkICYmXG5cdFx0XHRpID09PSBbXS5jb25jYXQoIHJldmVhbGVkLmhlYWQgKS5wb3AoKSAmJlxuXHRcdFx0aSA+PSBbXS5jb25jYXQoIHZpc2libGUuYm9keSApLnNoaWZ0KClcblx0XHQpIHtcblx0XHRcdGN1ZS5jYWxsKHRoaXMsIHNlcSwgaSwgLTEsIHByaXN0aW5lKTtcblx0XHRcdHJldHVybiBhbmltYXRlLmNhbGwodGhpcywgZWxlbWVudCwgeyByZXZlYWw6IHRydWUsIHByaXN0aW5lOiBwcmlzdGluZSB9KVxuXHRcdH1cblxuXHRcdGlmIChcblx0XHRcdCFzZXEuYmxvY2tlZC5mb290ICYmXG5cdFx0XHRpID09PSBbXS5jb25jYXQoIHJldmVhbGVkLmZvb3QgKS5zaGlmdCgpICYmXG5cdFx0XHRpIDw9IFtdLmNvbmNhdCggdmlzaWJsZS5ib2R5ICkucG9wKClcblx0XHQpIHtcblx0XHRcdGN1ZS5jYWxsKHRoaXMsIHNlcSwgaSwgKzEsIHByaXN0aW5lKTtcblx0XHRcdHJldHVybiBhbmltYXRlLmNhbGwodGhpcywgZWxlbWVudCwgeyByZXZlYWw6IHRydWUsIHByaXN0aW5lOiBwcmlzdGluZSB9KVxuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBTZXF1ZW5jZShpbnRlcnZhbCkge1xuXHR2YXIgaSA9IE1hdGguYWJzKGludGVydmFsKTtcblx0aWYgKCFpc05hTihpKSkge1xuXHRcdHRoaXMuaWQgPSBuZXh0VW5pcXVlSWQoKTtcblx0XHR0aGlzLmludGVydmFsID0gTWF0aC5tYXgoaSwgMTYpO1xuXHRcdHRoaXMubWVtYmVycyA9IFtdO1xuXHRcdHRoaXMubW9kZWxzID0ge307XG5cdFx0dGhpcy5ibG9ja2VkID0ge1xuXHRcdFx0aGVhZDogZmFsc2UsXG5cdFx0XHRmb290OiBmYWxzZVxuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc2VxdWVuY2UgaW50ZXJ2YWwuJylcblx0fVxufVxuXG5mdW5jdGlvbiBTZXF1ZW5jZU1vZGVsKHNlcSwgcHJvcCwgc3RvcmUpIHtcblx0dmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0dGhpcy5oZWFkID0gW107XG5cdHRoaXMuYm9keSA9IFtdO1xuXHR0aGlzLmZvb3QgPSBbXTtcblxuXHRlYWNoKHNlcS5tZW1iZXJzLCBmdW5jdGlvbiAoaWQsIGluZGV4KSB7XG5cdFx0dmFyIGVsZW1lbnQgPSBzdG9yZS5lbGVtZW50c1tpZF07XG5cdFx0aWYgKGVsZW1lbnQgJiYgZWxlbWVudFtwcm9wXSkge1xuXHRcdFx0dGhpcyQxLmJvZHkucHVzaChpbmRleCk7XG5cdFx0fVxuXHR9KTtcblxuXHRpZiAodGhpcy5ib2R5Lmxlbmd0aCkge1xuXHRcdGVhY2goc2VxLm1lbWJlcnMsIGZ1bmN0aW9uIChpZCwgaW5kZXgpIHtcblx0XHRcdHZhciBlbGVtZW50ID0gc3RvcmUuZWxlbWVudHNbaWRdO1xuXHRcdFx0aWYgKGVsZW1lbnQgJiYgIWVsZW1lbnRbcHJvcF0pIHtcblx0XHRcdFx0aWYgKGluZGV4IDwgdGhpcyQxLmJvZHlbMF0pIHtcblx0XHRcdFx0XHR0aGlzJDEuaGVhZC5wdXNoKGluZGV4KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzJDEuZm9vdC5wdXNoKGluZGV4KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGN1ZShzZXEsIGksIGRpcmVjdGlvbiwgcHJpc3RpbmUpIHtcblx0dmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0dmFyIGJsb2NrZWQgPSBbJ2hlYWQnLCBudWxsLCAnZm9vdCddWzEgKyBkaXJlY3Rpb25dO1xuXHR2YXIgbmV4dElkID0gc2VxLm1lbWJlcnNbaSArIGRpcmVjdGlvbl07XG5cdHZhciBuZXh0RWxlbWVudCA9IHRoaXMuc3RvcmUuZWxlbWVudHNbbmV4dElkXTtcblxuXHRzZXEuYmxvY2tlZFtibG9ja2VkXSA9IHRydWU7XG5cblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0c2VxLmJsb2NrZWRbYmxvY2tlZF0gPSBmYWxzZTtcblx0XHRpZiAobmV4dEVsZW1lbnQpIHtcblx0XHRcdHNlcXVlbmNlLmNhbGwodGhpcyQxLCBuZXh0RWxlbWVudCwgcHJpc3RpbmUpO1xuXHRcdH1cblx0fSwgc2VxLmludGVydmFsKTtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcblx0dmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0cmluc2UuY2FsbCh0aGlzKTtcblxuXHRlYWNoKHRoaXMuc3RvcmUuZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0dmFyIHN0eWxlcyA9IFtlbGVtZW50LnN0eWxlcy5pbmxpbmUuZ2VuZXJhdGVkXTtcblxuXHRcdGlmIChlbGVtZW50LnZpc2libGUpIHtcblx0XHRcdHN0eWxlcy5wdXNoKGVsZW1lbnQuc3R5bGVzLm9wYWNpdHkuY29tcHV0ZWQpO1xuXHRcdFx0c3R5bGVzLnB1c2goZWxlbWVudC5zdHlsZXMudHJhbnNmb3JtLmdlbmVyYXRlZC5maW5hbCk7XG5cdFx0XHRlbGVtZW50LnJldmVhbGVkID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGVzLnB1c2goZWxlbWVudC5zdHlsZXMub3BhY2l0eS5nZW5lcmF0ZWQpO1xuXHRcdFx0c3R5bGVzLnB1c2goZWxlbWVudC5zdHlsZXMudHJhbnNmb3JtLmdlbmVyYXRlZC5pbml0aWFsKTtcblx0XHRcdGVsZW1lbnQucmV2ZWFsZWQgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRlbGVtZW50Lm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlcy5maWx0ZXIoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMgIT09ICcnOyB9KS5qb2luKCcgJykpO1xuXHR9KTtcblxuXHRlYWNoKHRoaXMuc3RvcmUuY29udGFpbmVycywgZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuXHRcdHZhciB0YXJnZXQgPVxuXHRcdFx0Y29udGFpbmVyLm5vZGUgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA/IHdpbmRvdyA6IGNvbnRhaW5lci5ub2RlO1xuXHRcdHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzJDEuZGVsZWdhdGUpO1xuXHRcdHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzJDEuZGVsZWdhdGUpO1xuXHR9KTtcblxuXHQvKipcblx0ICogTWFudWFsbHkgaW52b2tlIGRlbGVnYXRlIG9uY2UgdG8gY2FwdHVyZVxuXHQgKiBlbGVtZW50IGFuZCBjb250YWluZXIgZGltZW5zaW9ucywgY29udGFpbmVyXG5cdCAqIHNjcm9sbCBwb3NpdGlvbiwgYW5kIHRyaWdnZXIgYW55IHZhbGlkIHJldmVhbHNcblx0ICovXG5cdHRoaXMuZGVsZWdhdGUoKTtcblxuXHQvKipcblx0ICogV2lwZSBhbnkgZXhpc3RpbmcgYHNldFRpbWVvdXRgIG5vd1xuXHQgKiB0aGF0IGluaXRpYWxpemF0aW9uIGhhcyBjb21wbGV0ZWQuXG5cdCAqL1xuXHR0aGlzLmluaXRUaW1lb3V0ID0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNNb2JpbGUoYWdlbnQpIHtcblx0aWYgKCBhZ2VudCA9PT0gdm9pZCAwICkgYWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG5cdHJldHVybiAvQW5kcm9pZHxpUGhvbmV8aVBhZHxpUG9kL2kudGVzdChhZ2VudClcbn1cblxuZnVuY3Rpb24gZGVlcEFzc2lnbih0YXJnZXQpIHtcblx0dmFyIHNvdXJjZXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG5cdHdoaWxlICggbGVuLS0gPiAwICkgc291cmNlc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuXHRpZiAoaXNPYmplY3QodGFyZ2V0KSkge1xuXHRcdGVhY2goc291cmNlcywgZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0ZWFjaChzb3VyY2UsIGZ1bmN0aW9uIChkYXRhLCBrZXkpIHtcblx0XHRcdFx0aWYgKGlzT2JqZWN0KGRhdGEpKSB7XG5cdFx0XHRcdFx0aWYgKCF0YXJnZXRba2V5XSB8fCAhaXNPYmplY3QodGFyZ2V0W2tleV0pKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXRba2V5XSA9IHt9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkZWVwQXNzaWduKHRhcmdldFtrZXldLCBkYXRhKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0YXJnZXRba2V5XSA9IGRhdGE7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0YXJnZXRcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdUYXJnZXQgbXVzdCBiZSBhbiBvYmplY3QgbGl0ZXJhbC4nKVxuXHR9XG59XG5cbmZ1bmN0aW9uIHJldmVhbCh0YXJnZXQsIG9wdGlvbnMsIHN5bmNpbmcpIHtcblx0dmFyIHRoaXMkMSA9IHRoaXM7XG5cdGlmICggb3B0aW9ucyA9PT0gdm9pZCAwICkgb3B0aW9ucyA9IHt9O1xuXHRpZiAoIHN5bmNpbmcgPT09IHZvaWQgMCApIHN5bmNpbmcgPSBmYWxzZTtcblxuXHR2YXIgY29udGFpbmVyQnVmZmVyID0gW107XG5cdHZhciBzZXF1ZW5jZSQkMTtcblx0dmFyIGludGVydmFsID0gb3B0aW9ucy5pbnRlcnZhbCB8fCBkZWZhdWx0cy5pbnRlcnZhbDtcblxuXHR0cnkge1xuXHRcdGlmIChpbnRlcnZhbCkge1xuXHRcdFx0c2VxdWVuY2UkJDEgPSBuZXcgU2VxdWVuY2UoaW50ZXJ2YWwpO1xuXHRcdH1cblxuXHRcdHZhciBub2RlcyA9ICQodGFyZ2V0KTtcblx0XHRpZiAoIW5vZGVzLmxlbmd0aCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHJldmVhbCB0YXJnZXQuJylcblx0XHR9XG5cblx0XHR2YXIgZWxlbWVudHMgPSBub2Rlcy5yZWR1Y2UoZnVuY3Rpb24gKGVsZW1lbnRCdWZmZXIsIGVsZW1lbnROb2RlKSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IHt9O1xuXHRcdFx0dmFyIGV4aXN0aW5nSWQgPSBlbGVtZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3ItaWQnKTtcblxuXHRcdFx0aWYgKGV4aXN0aW5nSWQpIHtcblx0XHRcdFx0ZGVlcEFzc2lnbihlbGVtZW50LCB0aGlzJDEuc3RvcmUuZWxlbWVudHNbZXhpc3RpbmdJZF0pO1xuXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBJbiBvcmRlciB0byBwcmV2ZW50IHByZXZpb3VzbHkgZ2VuZXJhdGVkIHN0eWxlc1xuXHRcdFx0XHQgKiBmcm9tIHRocm93aW5nIG9mZiB0aGUgbmV3IHN0eWxlcywgdGhlIHN0eWxlIHRhZ1xuXHRcdFx0XHQgKiBoYXMgdG8gYmUgcmV2ZXJ0ZWQgdG8gaXRzIHByZS1yZXZlYWwgc3RhdGUuXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRlbGVtZW50Lm5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIGVsZW1lbnQuc3R5bGVzLmlubGluZS5jb21wdXRlZCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50LmlkID0gbmV4dFVuaXF1ZUlkKCk7XG5cdFx0XHRcdGVsZW1lbnQubm9kZSA9IGVsZW1lbnROb2RlO1xuXHRcdFx0XHRlbGVtZW50LnNlZW4gPSBmYWxzZTtcblx0XHRcdFx0ZWxlbWVudC5yZXZlYWxlZCA9IGZhbHNlO1xuXHRcdFx0XHRlbGVtZW50LnZpc2libGUgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNvbmZpZyA9IGRlZXBBc3NpZ24oe30sIGVsZW1lbnQuY29uZmlnIHx8IHRoaXMkMS5kZWZhdWx0cywgb3B0aW9ucyk7XG5cblx0XHRcdGlmICgoIWNvbmZpZy5tb2JpbGUgJiYgaXNNb2JpbGUoKSkgfHwgKCFjb25maWcuZGVza3RvcCAmJiAhaXNNb2JpbGUoKSkpIHtcblx0XHRcdFx0aWYgKGV4aXN0aW5nSWQpIHtcblx0XHRcdFx0XHRjbGVhbi5jYWxsKHRoaXMkMSwgZWxlbWVudCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGVsZW1lbnRCdWZmZXIgLy8gc2tpcCBlbGVtZW50cyB0aGF0IGFyZSBkaXNhYmxlZFxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY29udGFpbmVyTm9kZSA9ICQoY29uZmlnLmNvbnRhaW5lcilbMF07XG5cdFx0XHRpZiAoIWNvbnRhaW5lck5vZGUpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvbnRhaW5lci4nKVxuXHRcdFx0fVxuXHRcdFx0aWYgKCFjb250YWluZXJOb2RlLmNvbnRhaW5zKGVsZW1lbnROb2RlKSkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbWVudEJ1ZmZlciAvLyBza2lwIGVsZW1lbnRzIGZvdW5kIG91dHNpZGUgdGhlIGNvbnRhaW5lclxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY29udGFpbmVySWQ7XG5cdFx0XHR7XG5cdFx0XHRcdGNvbnRhaW5lcklkID0gZ2V0Q29udGFpbmVySWQoXG5cdFx0XHRcdFx0Y29udGFpbmVyTm9kZSxcblx0XHRcdFx0XHRjb250YWluZXJCdWZmZXIsXG5cdFx0XHRcdFx0dGhpcyQxLnN0b3JlLmNvbnRhaW5lcnNcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKGNvbnRhaW5lcklkID09PSBudWxsKSB7XG5cdFx0XHRcdFx0Y29udGFpbmVySWQgPSBuZXh0VW5pcXVlSWQoKTtcblx0XHRcdFx0XHRjb250YWluZXJCdWZmZXIucHVzaCh7IGlkOiBjb250YWluZXJJZCwgbm9kZTogY29udGFpbmVyTm9kZSB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRlbGVtZW50LmNvbmZpZyA9IGNvbmZpZztcblx0XHRcdGVsZW1lbnQuY29udGFpbmVySWQgPSBjb250YWluZXJJZDtcblx0XHRcdGVsZW1lbnQuc3R5bGVzID0gc3R5bGUoZWxlbWVudCk7XG5cblx0XHRcdGlmIChzZXF1ZW5jZSQkMSkge1xuXHRcdFx0XHRlbGVtZW50LnNlcXVlbmNlID0ge1xuXHRcdFx0XHRcdGlkOiBzZXF1ZW5jZSQkMS5pZCxcblx0XHRcdFx0XHRpbmRleDogc2VxdWVuY2UkJDEubWVtYmVycy5sZW5ndGhcblx0XHRcdFx0fTtcblx0XHRcdFx0c2VxdWVuY2UkJDEubWVtYmVycy5wdXNoKGVsZW1lbnQuaWQpO1xuXHRcdFx0fVxuXG5cdFx0XHRlbGVtZW50QnVmZmVyLnB1c2goZWxlbWVudCk7XG5cdFx0XHRyZXR1cm4gZWxlbWVudEJ1ZmZlclxuXHRcdH0sIFtdKTtcblxuXHRcdC8qKlxuXHRcdCAqIE1vZGlmeWluZyB0aGUgRE9NIHZpYSBzZXRBdHRyaWJ1dGUgbmVlZHMgdG8gYmUgaGFuZGxlZFxuXHRcdCAqIHNlcGFyYXRlbHkgZnJvbSByZWFkaW5nIGNvbXB1dGVkIHN0eWxlcyBpbiB0aGUgbWFwIGFib3ZlXG5cdFx0ICogZm9yIHRoZSBicm93c2VyIHRvIGJhdGNoIERPTSBjaGFuZ2VzIChsaW1pdGluZyByZWZsb3dzKVxuXHRcdCAqL1xuXHRcdGVhY2goZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHR0aGlzJDEuc3RvcmUuZWxlbWVudHNbZWxlbWVudC5pZF0gPSBlbGVtZW50O1xuXHRcdFx0ZWxlbWVudC5ub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1zci1pZCcsIGVsZW1lbnQuaWQpO1xuXHRcdH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGxvZ2dlci5jYWxsKHRoaXMsICdSZXZlYWwgZmFpbGVkLicsIGUubWVzc2FnZSlcblx0fVxuXG5cdC8qKlxuXHQgKiBOb3cgdGhhdCBlbGVtZW50IHNldC11cCBpcyBjb21wbGV0ZS4uLlxuXHQgKiBMZXTigJlzIGNvbW1pdCBhbnkgY29udGFpbmVyIGFuZCBzZXF1ZW5jZSBkYXRhIHdlIGhhdmUgdG8gdGhlIHN0b3JlLlxuXHQgKi9cblx0ZWFjaChjb250YWluZXJCdWZmZXIsIGZ1bmN0aW9uIChjb250YWluZXIpIHtcblx0XHR0aGlzJDEuc3RvcmUuY29udGFpbmVyc1tjb250YWluZXIuaWRdID0ge1xuXHRcdFx0aWQ6IGNvbnRhaW5lci5pZCxcblx0XHRcdG5vZGU6IGNvbnRhaW5lci5ub2RlXG5cdFx0fTtcblx0fSk7XG5cdGlmIChzZXF1ZW5jZSQkMSkge1xuXHRcdHRoaXMuc3RvcmUuc2VxdWVuY2VzW3NlcXVlbmNlJCQxLmlkXSA9IHNlcXVlbmNlJCQxO1xuXHR9XG5cblx0LyoqXG5cdCAqIElmIHJldmVhbCB3YXNuJ3QgaW52b2tlZCBieSBzeW5jLCB3ZSB3YW50IHRvXG5cdCAqIG1ha2Ugc3VyZSB0byBhZGQgdGhpcyBjYWxsIHRvIHRoZSBoaXN0b3J5LlxuXHQgKi9cblx0aWYgKHN5bmNpbmcgIT09IHRydWUpIHtcblx0XHR0aGlzLnN0b3JlLmhpc3RvcnkucHVzaCh7IHRhcmdldDogdGFyZ2V0LCBvcHRpb25zOiBvcHRpb25zIH0pO1xuXG5cdFx0LyoqXG5cdFx0ICogUHVzaCBpbml0aWFsaXphdGlvbiB0byB0aGUgZXZlbnQgcXVldWUsIGdpdmluZ1xuXHRcdCAqIG11bHRpcGxlIHJldmVhbCBjYWxscyB0aW1lIHRvIGJlIGludGVycHJldGVkLlxuXHRcdCAqL1xuXHRcdGlmICh0aGlzLmluaXRUaW1lb3V0KSB7XG5cdFx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuaW5pdFRpbWVvdXQpO1xuXHRcdH1cblx0XHR0aGlzLmluaXRUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoaW5pdGlhbGl6ZS5iaW5kKHRoaXMpLCAwKTtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXRDb250YWluZXJJZChub2RlKSB7XG5cdHZhciBjb2xsZWN0aW9ucyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcblx0d2hpbGUgKCBsZW4tLSA+IDAgKSBjb2xsZWN0aW9uc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuXHR2YXIgaWQgPSBudWxsO1xuXHRlYWNoKGNvbGxlY3Rpb25zLCBmdW5jdGlvbiAoY29sbGVjdGlvbikge1xuXHRcdGVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuXHRcdFx0aWYgKGlkID09PSBudWxsICYmIGNvbnRhaW5lci5ub2RlID09PSBub2RlKSB7XG5cdFx0XHRcdGlkID0gY29udGFpbmVyLmlkO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblx0cmV0dXJuIGlkXG59XG5cbi8qKlxuICogUmUtcnVucyB0aGUgcmV2ZWFsIG1ldGhvZCBmb3IgZWFjaCByZWNvcmQgc3RvcmVkIGluIGhpc3RvcnksXG4gKiBmb3IgY2FwdHVyaW5nIG5ldyBjb250ZW50IGFzeW5jaHJvbm91c2x5IGxvYWRlZCBpbnRvIHRoZSBET00uXG4gKi9cbmZ1bmN0aW9uIHN5bmMoKSB7XG5cdHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdGVhY2godGhpcy5zdG9yZS5oaXN0b3J5LCBmdW5jdGlvbiAocmVjb3JkKSB7XG5cdFx0cmV2ZWFsLmNhbGwodGhpcyQxLCByZWNvcmQudGFyZ2V0LCByZWNvcmQub3B0aW9ucywgdHJ1ZSk7XG5cdH0pO1xuXG5cdGluaXRpYWxpemUuY2FsbCh0aGlzKTtcbn1cblxudmFyIHBvbHlmaWxsID0gZnVuY3Rpb24gKHgpIHsgcmV0dXJuICh4ID4gMCkgLSAoeCA8IDApIHx8ICt4OyB9O1xudmFyIG1hdGhTaWduID0gTWF0aC5zaWduIHx8IHBvbHlmaWxsO1xuXG5mdW5jdGlvbiBnZXRHZW9tZXRyeSh0YXJnZXQsIGlzQ29udGFpbmVyKSB7XG5cdC8qKlxuXHQgKiBXZSB3YW50IHRvIGlnbm9yZSBwYWRkaW5nIGFuZCBzY3JvbGxiYXJzIGZvciBjb250YWluZXIgZWxlbWVudHMuXG5cdCAqIE1vcmUgaW5mb3JtYXRpb24gaGVyZTogaHR0cHM6Ly9nb28uZ2wvdk9acGJ6XG5cdCAqL1xuXHR2YXIgaGVpZ2h0ID0gaXNDb250YWluZXIgPyB0YXJnZXQubm9kZS5jbGllbnRIZWlnaHQgOiB0YXJnZXQubm9kZS5vZmZzZXRIZWlnaHQ7XG5cdHZhciB3aWR0aCA9IGlzQ29udGFpbmVyID8gdGFyZ2V0Lm5vZGUuY2xpZW50V2lkdGggOiB0YXJnZXQubm9kZS5vZmZzZXRXaWR0aDtcblxuXHR2YXIgb2Zmc2V0VG9wID0gMDtcblx0dmFyIG9mZnNldExlZnQgPSAwO1xuXHR2YXIgbm9kZSA9IHRhcmdldC5ub2RlO1xuXG5cdGRvIHtcblx0XHRpZiAoIWlzTmFOKG5vZGUub2Zmc2V0VG9wKSkge1xuXHRcdFx0b2Zmc2V0VG9wICs9IG5vZGUub2Zmc2V0VG9wO1xuXHRcdH1cblx0XHRpZiAoIWlzTmFOKG5vZGUub2Zmc2V0TGVmdCkpIHtcblx0XHRcdG9mZnNldExlZnQgKz0gbm9kZS5vZmZzZXRMZWZ0O1xuXHRcdH1cblx0XHRub2RlID0gbm9kZS5vZmZzZXRQYXJlbnQ7XG5cdH0gd2hpbGUgKG5vZGUpXG5cblx0cmV0dXJuIHtcblx0XHRib3VuZHM6IHtcblx0XHRcdHRvcDogb2Zmc2V0VG9wLFxuXHRcdFx0cmlnaHQ6IG9mZnNldExlZnQgKyB3aWR0aCxcblx0XHRcdGJvdHRvbTogb2Zmc2V0VG9wICsgaGVpZ2h0LFxuXHRcdFx0bGVmdDogb2Zmc2V0TGVmdFxuXHRcdH0sXG5cdFx0aGVpZ2h0OiBoZWlnaHQsXG5cdFx0d2lkdGg6IHdpZHRoXG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsZWQoY29udGFpbmVyKSB7XG5cdHZhciB0b3AsIGxlZnQ7XG5cdGlmIChjb250YWluZXIubm9kZSA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG5cdFx0dG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXHRcdGxlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQ7XG5cdH0gZWxzZSB7XG5cdFx0dG9wID0gY29udGFpbmVyLm5vZGUuc2Nyb2xsVG9wO1xuXHRcdGxlZnQgPSBjb250YWluZXIubm9kZS5zY3JvbGxMZWZ0O1xuXHR9XG5cdHJldHVybiB7IHRvcDogdG9wLCBsZWZ0OiBsZWZ0IH1cbn1cblxuZnVuY3Rpb24gaXNFbGVtZW50VmlzaWJsZShlbGVtZW50KSB7XG5cdGlmICggZWxlbWVudCA9PT0gdm9pZCAwICkgZWxlbWVudCA9IHt9O1xuXG5cdHZhciBjb250YWluZXIgPSB0aGlzLnN0b3JlLmNvbnRhaW5lcnNbZWxlbWVudC5jb250YWluZXJJZF07XG5cdGlmICghY29udGFpbmVyKSB7IHJldHVybiB9XG5cblx0dmFyIHZpZXdGYWN0b3IgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBlbGVtZW50LmNvbmZpZy52aWV3RmFjdG9yKSk7XG5cdHZhciB2aWV3T2Zmc2V0ID0gZWxlbWVudC5jb25maWcudmlld09mZnNldDtcblxuXHR2YXIgZWxlbWVudEJvdW5kcyA9IHtcblx0XHR0b3A6IGVsZW1lbnQuZ2VvbWV0cnkuYm91bmRzLnRvcCArIGVsZW1lbnQuZ2VvbWV0cnkuaGVpZ2h0ICogdmlld0ZhY3Rvcixcblx0XHRyaWdodDogZWxlbWVudC5nZW9tZXRyeS5ib3VuZHMucmlnaHQgLSBlbGVtZW50Lmdlb21ldHJ5LndpZHRoICogdmlld0ZhY3Rvcixcblx0XHRib3R0b206IGVsZW1lbnQuZ2VvbWV0cnkuYm91bmRzLmJvdHRvbSAtIGVsZW1lbnQuZ2VvbWV0cnkuaGVpZ2h0ICogdmlld0ZhY3Rvcixcblx0XHRsZWZ0OiBlbGVtZW50Lmdlb21ldHJ5LmJvdW5kcy5sZWZ0ICsgZWxlbWVudC5nZW9tZXRyeS53aWR0aCAqIHZpZXdGYWN0b3Jcblx0fTtcblxuXHR2YXIgY29udGFpbmVyQm91bmRzID0ge1xuXHRcdHRvcDogY29udGFpbmVyLmdlb21ldHJ5LmJvdW5kcy50b3AgKyBjb250YWluZXIuc2Nyb2xsLnRvcCArIHZpZXdPZmZzZXQudG9wLFxuXHRcdHJpZ2h0OiBjb250YWluZXIuZ2VvbWV0cnkuYm91bmRzLnJpZ2h0ICsgY29udGFpbmVyLnNjcm9sbC5sZWZ0IC0gdmlld09mZnNldC5yaWdodCxcblx0XHRib3R0b206XG5cdFx0XHRjb250YWluZXIuZ2VvbWV0cnkuYm91bmRzLmJvdHRvbSArIGNvbnRhaW5lci5zY3JvbGwudG9wIC0gdmlld09mZnNldC5ib3R0b20sXG5cdFx0bGVmdDogY29udGFpbmVyLmdlb21ldHJ5LmJvdW5kcy5sZWZ0ICsgY29udGFpbmVyLnNjcm9sbC5sZWZ0ICsgdmlld09mZnNldC5sZWZ0XG5cdH07XG5cblx0cmV0dXJuIChcblx0XHQoZWxlbWVudEJvdW5kcy50b3AgPCBjb250YWluZXJCb3VuZHMuYm90dG9tICYmXG5cdFx0XHRlbGVtZW50Qm91bmRzLnJpZ2h0ID4gY29udGFpbmVyQm91bmRzLmxlZnQgJiZcblx0XHRcdGVsZW1lbnRCb3VuZHMuYm90dG9tID4gY29udGFpbmVyQm91bmRzLnRvcCAmJlxuXHRcdFx0ZWxlbWVudEJvdW5kcy5sZWZ0IDwgY29udGFpbmVyQm91bmRzLnJpZ2h0KSB8fFxuXHRcdGVsZW1lbnQuc3R5bGVzLnBvc2l0aW9uID09PSAnZml4ZWQnXG5cdClcbn1cblxuZnVuY3Rpb24gZGVsZWdhdGUoXG5cdGV2ZW50LFxuXHRlbGVtZW50c1xuKSB7XG5cdHZhciB0aGlzJDEgPSB0aGlzO1xuXHRpZiAoIGV2ZW50ID09PSB2b2lkIDAgKSBldmVudCA9IHsgdHlwZTogJ2luaXQnIH07XG5cdGlmICggZWxlbWVudHMgPT09IHZvaWQgMCApIGVsZW1lbnRzID0gdGhpcy5zdG9yZS5lbGVtZW50cztcblxuXHRyYWYoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBzdGFsZSA9IGV2ZW50LnR5cGUgPT09ICdpbml0JyB8fCBldmVudC50eXBlID09PSAncmVzaXplJztcblxuXHRcdGVhY2godGhpcyQxLnN0b3JlLmNvbnRhaW5lcnMsIGZ1bmN0aW9uIChjb250YWluZXIpIHtcblx0XHRcdGlmIChzdGFsZSkge1xuXHRcdFx0XHRjb250YWluZXIuZ2VvbWV0cnkgPSBnZXRHZW9tZXRyeS5jYWxsKHRoaXMkMSwgY29udGFpbmVyLCB0cnVlKTtcblx0XHRcdH1cblx0XHRcdHZhciBzY3JvbGwgPSBnZXRTY3JvbGxlZC5jYWxsKHRoaXMkMSwgY29udGFpbmVyKTtcblx0XHRcdGlmIChjb250YWluZXIuc2Nyb2xsKSB7XG5cdFx0XHRcdGNvbnRhaW5lci5kaXJlY3Rpb24gPSB7XG5cdFx0XHRcdFx0eDogbWF0aFNpZ24oc2Nyb2xsLmxlZnQgLSBjb250YWluZXIuc2Nyb2xsLmxlZnQpLFxuXHRcdFx0XHRcdHk6IG1hdGhTaWduKHNjcm9sbC50b3AgLSBjb250YWluZXIuc2Nyb2xsLnRvcClcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGNvbnRhaW5lci5zY3JvbGwgPSBzY3JvbGw7XG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKiBEdWUgdG8gaG93IHRoZSBzZXF1ZW5jZXIgaXMgaW1wbGVtZW50ZWQsIGl04oCZc1xuXHRcdCAqIGltcG9ydGFudCB0aGF0IHdlIHVwZGF0ZSB0aGUgc3RhdGUgb2YgYWxsXG5cdFx0ICogZWxlbWVudHMsIGJlZm9yZSBhbnkgYW5pbWF0aW9uIGxvZ2ljIGlzXG5cdFx0ICogZXZhbHVhdGVkIChpbiB0aGUgc2Vjb25kIGxvb3AgYmVsb3cpLlxuXHRcdCAqL1xuXHRcdGVhY2goZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRpZiAoc3RhbGUgfHwgZWxlbWVudC5nZW9tZXRyeSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGVsZW1lbnQuZ2VvbWV0cnkgPSBnZXRHZW9tZXRyeS5jYWxsKHRoaXMkMSwgZWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0XHRlbGVtZW50LnZpc2libGUgPSBpc0VsZW1lbnRWaXNpYmxlLmNhbGwodGhpcyQxLCBlbGVtZW50KTtcblx0XHR9KTtcblxuXHRcdGVhY2goZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRpZiAoZWxlbWVudC5zZXF1ZW5jZSkge1xuXHRcdFx0XHRzZXF1ZW5jZS5jYWxsKHRoaXMkMSwgZWxlbWVudCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbmltYXRlLmNhbGwodGhpcyQxLCBlbGVtZW50KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMkMS5wcmlzdGluZSA9IGZhbHNlO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gaXNUcmFuc2Zvcm1TdXBwb3J0ZWQoKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblx0cmV0dXJuICd0cmFuc2Zvcm0nIGluIHN0eWxlIHx8ICdXZWJraXRUcmFuc2Zvcm0nIGluIHN0eWxlXG59XG5cbmZ1bmN0aW9uIGlzVHJhbnNpdGlvblN1cHBvcnRlZCgpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXHRyZXR1cm4gJ3RyYW5zaXRpb24nIGluIHN0eWxlIHx8ICdXZWJraXRUcmFuc2l0aW9uJyBpbiBzdHlsZVxufVxuXG52YXIgdmVyc2lvbiA9IFwiNC4wLjdcIjtcblxudmFyIGJvdW5kRGVsZWdhdGU7XG52YXIgYm91bmREZXN0cm95O1xudmFyIGJvdW5kUmV2ZWFsO1xudmFyIGJvdW5kQ2xlYW47XG52YXIgYm91bmRTeW5jO1xudmFyIGNvbmZpZztcbnZhciBkZWJ1ZztcbnZhciBpbnN0YW5jZTtcblxuZnVuY3Rpb24gU2Nyb2xsUmV2ZWFsKG9wdGlvbnMpIHtcblx0aWYgKCBvcHRpb25zID09PSB2b2lkIDAgKSBvcHRpb25zID0ge307XG5cblx0dmFyIGludm9rZWRXaXRob3V0TmV3ID1cblx0XHR0eXBlb2YgdGhpcyA9PT0gJ3VuZGVmaW5lZCcgfHxcblx0XHRPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykgIT09IFNjcm9sbFJldmVhbC5wcm90b3R5cGU7XG5cblx0aWYgKGludm9rZWRXaXRob3V0TmV3KSB7XG5cdFx0cmV0dXJuIG5ldyBTY3JvbGxSZXZlYWwob3B0aW9ucylcblx0fVxuXG5cdGlmICghU2Nyb2xsUmV2ZWFsLmlzU3VwcG9ydGVkKCkpIHtcblx0XHRsb2dnZXIuY2FsbCh0aGlzLCAnSW5zdGFudGlhdGlvbiBmYWlsZWQuJywgJ1RoaXMgYnJvd3NlciBpcyBub3Qgc3VwcG9ydGVkLicpO1xuXHRcdHJldHVybiBtb3VudC5mYWlsdXJlKClcblx0fVxuXG5cdHZhciBidWZmZXI7XG5cdHRyeSB7XG5cdFx0YnVmZmVyID0gY29uZmlnXG5cdFx0XHQ/IGRlZXBBc3NpZ24oe30sIGNvbmZpZywgb3B0aW9ucylcblx0XHRcdDogZGVlcEFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0bG9nZ2VyLmNhbGwodGhpcywgJ0ludmFsaWQgY29uZmlndXJhdGlvbi4nLCBlLm1lc3NhZ2UpO1xuXHRcdHJldHVybiBtb3VudC5mYWlsdXJlKClcblx0fVxuXG5cdHRyeSB7XG5cdFx0dmFyIGNvbnRhaW5lciA9ICQoYnVmZmVyLmNvbnRhaW5lcilbMF07XG5cdFx0aWYgKCFjb250YWluZXIpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb250YWluZXIuJylcblx0XHR9XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRsb2dnZXIuY2FsbCh0aGlzLCBlLm1lc3NhZ2UpO1xuXHRcdHJldHVybiBtb3VudC5mYWlsdXJlKClcblx0fVxuXG5cdGNvbmZpZyA9IGJ1ZmZlcjtcblxuXHRpZiAoKCFjb25maWcubW9iaWxlICYmIGlzTW9iaWxlKCkpIHx8ICghY29uZmlnLmRlc2t0b3AgJiYgIWlzTW9iaWxlKCkpKSB7XG5cdFx0bG9nZ2VyLmNhbGwoXG5cdFx0XHR0aGlzLFxuXHRcdFx0J1RoaXMgZGV2aWNlIGlzIGRpc2FibGVkLicsXG5cdFx0XHQoXCJkZXNrdG9wOiBcIiArIChjb25maWcuZGVza3RvcCkpLFxuXHRcdFx0KFwibW9iaWxlOiBcIiArIChjb25maWcubW9iaWxlKSlcblx0XHQpO1xuXHRcdHJldHVybiBtb3VudC5mYWlsdXJlKClcblx0fVxuXG5cdG1vdW50LnN1Y2Nlc3MoKTtcblxuXHR0aGlzLnN0b3JlID0ge1xuXHRcdGNvbnRhaW5lcnM6IHt9LFxuXHRcdGVsZW1lbnRzOiB7fSxcblx0XHRoaXN0b3J5OiBbXSxcblx0XHRzZXF1ZW5jZXM6IHt9XG5cdH07XG5cblx0dGhpcy5wcmlzdGluZSA9IHRydWU7XG5cblx0Ym91bmREZWxlZ2F0ZSA9IGJvdW5kRGVsZWdhdGUgfHwgZGVsZWdhdGUuYmluZCh0aGlzKTtcblx0Ym91bmREZXN0cm95ID0gYm91bmREZXN0cm95IHx8IGRlc3Ryb3kuYmluZCh0aGlzKTtcblx0Ym91bmRSZXZlYWwgPSBib3VuZFJldmVhbCB8fCByZXZlYWwuYmluZCh0aGlzKTtcblx0Ym91bmRDbGVhbiA9IGJvdW5kQ2xlYW4gfHwgY2xlYW4uYmluZCh0aGlzKTtcblx0Ym91bmRTeW5jID0gYm91bmRTeW5jIHx8IHN5bmMuYmluZCh0aGlzKTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2RlbGVnYXRlJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJvdW5kRGVsZWdhdGU7IH0gfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGVzdHJveScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBib3VuZERlc3Ryb3k7IH0gfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmV2ZWFsJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJvdW5kUmV2ZWFsOyB9IH0pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NsZWFuJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJvdW5kQ2xlYW47IH0gfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc3luYycsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBib3VuZFN5bmM7IH0gfSk7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdkZWZhdWx0cycsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25maWc7IH0gfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndmVyc2lvbicsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB2ZXJzaW9uOyB9IH0pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ25vb3AnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0gfSk7XG5cblx0cmV0dXJuIGluc3RhbmNlID8gaW5zdGFuY2UgOiAoaW5zdGFuY2UgPSB0aGlzKVxufVxuXG5TY3JvbGxSZXZlYWwuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpc1RyYW5zZm9ybVN1cHBvcnRlZCgpICYmIGlzVHJhbnNpdGlvblN1cHBvcnRlZCgpOyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoU2Nyb2xsUmV2ZWFsLCAnZGVidWcnLCB7XG5cdGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVidWcgfHwgZmFsc2U7IH0sXG5cdHNldDogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiAoZGVidWcgPSB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyA/IHZhbHVlIDogZGVidWcpOyB9XG59KTtcblxuU2Nyb2xsUmV2ZWFsKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbFJldmVhbDtcbiIsIi8qISBAbGljZW5zZSBUZWFsaWdodCB2MC4zLjZcblxuXHRDb3B5cmlnaHQgMjAxOCBGaXNzc2lvbiBMTEMuXG5cblx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuXHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuXHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcblx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuXHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuXHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRTT0ZUV0FSRS5cblxuKi9cbmltcG9ydCBpc0RvbU5vZGUgZnJvbSAnaXMtZG9tLW5vZGUnO1xuaW1wb3J0IGlzRG9tTm9kZUxpc3QgZnJvbSAnaXMtZG9tLW5vZGUtbGlzdCc7XG5cbmZ1bmN0aW9uIHRlYWxpZ2h0KHRhcmdldCwgY29udGV4dCkge1xuICBpZiAoIGNvbnRleHQgPT09IHZvaWQgMCApIGNvbnRleHQgPSBkb2N1bWVudDtcblxuICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgQXJyYXkpIHsgcmV0dXJuIHRhcmdldC5maWx0ZXIoaXNEb21Ob2RlKTsgfVxuICBpZiAoaXNEb21Ob2RlKHRhcmdldCkpIHsgcmV0dXJuIFt0YXJnZXRdOyB9XG4gIGlmIChpc0RvbU5vZGVMaXN0KHRhcmdldCkpIHsgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRhcmdldCk7IH1cbiAgaWYgKHR5cGVvZiB0YXJnZXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHF1ZXJ5ID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldCk7XG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocXVlcnkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRlYWxpZ2h0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
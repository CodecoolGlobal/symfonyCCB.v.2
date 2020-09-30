(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~app"],{

/***/ "./node_modules/core-js/internals/array-method-has-species-support.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-has-species-support.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

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

/***/ "./node_modules/core-js/internals/create-property.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/engine-user-agent.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-v8-version.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLXJlcGVhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmRhdGUudG8tc3RyaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLnJlcGVhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtZG9tLW5vZGUtbGlzdC9kaXN0L2lzLWRvbS1ub2RlLWxpc3QuZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLWRvbS1ub2RlL2Rpc3QvaXMtZG9tLW5vZGUuZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21pbmlyYWYvZGlzdC9taW5pcmFmLmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZW1hdHJpeC9kaXN0L3JlbWF0cml4LmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zY3JvbGxyZXZlYWwvZGlzdC9zY3JvbGxyZXZlYWwuZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RlYWxpZ2h0L2Rpc3QvdGVhbGlnaHQuZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsWUFBWSxtQkFBTyxDQUFDLHFFQUFvQjtBQUN4QyxzQkFBc0IsbUJBQU8sQ0FBQyw2RkFBZ0M7QUFDOUQsaUJBQWlCLG1CQUFPLENBQUMsNkZBQWdDOztBQUV6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7OztBQ2xCQSxlQUFlLG1CQUFPLENBQUMsNkVBQXdCO0FBQy9DLGNBQWMsbUJBQU8sQ0FBQywyRUFBdUI7QUFDN0Msc0JBQXNCLG1CQUFPLENBQUMsNkZBQWdDOztBQUU5RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7QUNuQmE7QUFDYixrQkFBa0IsbUJBQU8sQ0FBQyxtRkFBMkI7QUFDckQsMkJBQTJCLG1CQUFPLENBQUMsdUdBQXFDO0FBQ3hFLCtCQUErQixtQkFBTyxDQUFDLCtHQUF5Qzs7QUFFaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEEsaUJBQWlCLG1CQUFPLENBQUMsbUZBQTJCOztBQUVwRDs7Ozs7Ozs7Ozs7O0FDRkEsYUFBYSxtQkFBTyxDQUFDLHVFQUFxQjtBQUMxQyxnQkFBZ0IsbUJBQU8sQ0FBQyw2RkFBZ0M7O0FBRXhEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNuQmE7QUFDYixnQkFBZ0IsbUJBQU8sQ0FBQywrRUFBeUI7QUFDakQsNkJBQTZCLG1CQUFPLENBQUMs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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZ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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQSw2QkFBNkIsZ0NBQWdDO0FBQzdEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDOztBQUVBLENBQUMsdURBQUc7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0Isd0RBQUM7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEIsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBDQUEwQyxtQkFBbUIsc0JBQXNCLEVBQUUsRUFBRTtBQUN2Rix5Q0FBeUMsbUJBQW1CLHFCQUFxQixFQUFFLEVBQUU7QUFDckYsd0NBQXdDLG1CQUFtQixvQkFBb0IsRUFBRSxFQUFFO0FBQ25GLHVDQUF1QyxtQkFBbUIsbUJBQW1CLEVBQUUsRUFBRTtBQUNqRixzQ0FBc0MsbUJBQW1CLGtCQUFrQixFQUFFLEVBQUU7O0FBRS9FLDBDQUEwQyxtQkFBbUIsZUFBZSxFQUFFLEVBQUU7QUFDaEYseUNBQXlDLG1CQUFtQixnQkFBZ0IsRUFBRSxFQUFFO0FBQ2hGLHNDQUFzQyxtQkFBbUIsY0FBYyxFQUFFLEVBQUU7O0FBRTNFO0FBQ0E7O0FBRUEsd0NBQXdDLDBEQUEwRDs7QUFFbEc7QUFDQSxtQkFBbUIsdUJBQXVCLEVBQUU7QUFDNUMsd0JBQXdCLDZEQUE2RDtBQUNyRixDQUFDOztBQUVEOztBQUVlLDJFQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUMvb0M1QjtBQUFBO0FBQUE7QUFBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNvQztBQUNTOztBQUU3QztBQUNBOztBQUVBLGdDQUFnQyxzQkFBc0IsbURBQVMsRUFBRTtBQUNqRSxNQUFNLDJEQUFTLFdBQVcsaUJBQWlCO0FBQzNDLE1BQU0sZ0VBQWEsV0FBVywyQ0FBMkM7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSx1RUFBUSxFQUFDIiwiZmlsZSI6InZlbmRvcnN+YXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG4vLyBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5c3BlY2llc2NyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWxBcnJheSwgbGVuZ3RoKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbEFycmF5KSkge1xuICAgIEMgPSBvcmlnaW5hbEFycmF5LmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBlbHNlIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIG5ldyAoQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDKShsZW5ndGggPT09IDAgPyAwIDogbGVuZ3RoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIHByb3BlcnR5S2V5ID0gdG9QcmltaXRpdmUoa2V5KTtcbiAgaWYgKHByb3BlcnR5S2V5IGluIG9iamVjdCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIHByb3BlcnR5S2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbcHJvcGVydHlLZXldID0gdmFsdWU7XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignbmF2aWdhdG9yJywgJ3VzZXJBZ2VudCcpIHx8ICcnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucztcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4O1xudmFyIG1hdGNoLCB2ZXJzaW9uO1xuXG5pZiAodjgpIHtcbiAgbWF0Y2ggPSB2OC5zcGxpdCgnLicpO1xuICB2ZXJzaW9uID0gbWF0Y2hbMF0gKyBtYXRjaFsxXTtcbn0gZWxzZSBpZiAodXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uICYmICt2ZXJzaW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUucmVwZWF0YCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUucmVwZWF0XG5tb2R1bGUuZXhwb3J0cyA9ICcnLnJlcGVhdCB8fCBmdW5jdGlvbiByZXBlYXQoY291bnQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgbiA9IHRvSW50ZWdlcihjb3VudCk7XG4gIGlmIChuIDwgMCB8fCBuID09IEluZmluaXR5KSB0aHJvdyBSYW5nZUVycm9yKCdXcm9uZyBudW1iZXIgb2YgcmVwZXRpdGlvbnMnKTtcbiAgZm9yICg7biA+IDA7IChuID4+Pj0gMSkgJiYgKHN0ciArPSBzdHIpKSBpZiAobiAmIDEpIHJlc3VsdCArPSBzdHI7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcblxudmFyIElTX0NPTkNBVF9TUFJFQURBQkxFID0gd2VsbEtub3duU3ltYm9sKCdpc0NvbmNhdFNwcmVhZGFibGUnKTtcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gMHgxRkZGRkZGRkZGRkZGRjtcbnZhciBNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQgPSAnTWF4aW11bSBhbGxvd2VkIGluZGV4IGV4Y2VlZGVkJztcblxuLy8gV2UgY2FuJ3QgdXNlIHRoaXMgZmVhdHVyZSBkZXRlY3Rpb24gaW4gVjggc2luY2UgaXQgY2F1c2VzXG4vLyBkZW9wdGltaXphdGlvbiBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3OVxudmFyIElTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgPSBWOF9WRVJTSU9OID49IDUxIHx8ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBhcnJheSA9IFtdO1xuICBhcnJheVtJU19DT05DQVRfU1BSRUFEQUJMRV0gPSBmYWxzZTtcbiAgcmV0dXJuIGFycmF5LmNvbmNhdCgpWzBdICE9PSBhcnJheTtcbn0pO1xuXG52YXIgU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnY29uY2F0Jyk7XG5cbnZhciBpc0NvbmNhdFNwcmVhZGFibGUgPSBmdW5jdGlvbiAoTykge1xuICBpZiAoIWlzT2JqZWN0KE8pKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzcHJlYWRhYmxlID0gT1tJU19DT05DQVRfU1BSRUFEQUJMRV07XG4gIHJldHVybiBzcHJlYWRhYmxlICE9PSB1bmRlZmluZWQgPyAhIXNwcmVhZGFibGUgOiBpc0FycmF5KE8pO1xufTtcblxudmFyIEZPUkNFRCA9ICFJU19DT05DQVRfU1BSRUFEQUJMRV9TVVBQT1JUIHx8ICFTUEVDSUVTX1NVUFBPUlQ7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuY29uY2F0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5jb25jYXRcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBpc0NvbmNhdFNwcmVhZGFibGUgYW5kIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgY29uY2F0OiBmdW5jdGlvbiBjb25jYXQoYXJnKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBBID0gYXJyYXlTcGVjaWVzQ3JlYXRlKE8sIDApO1xuICAgIHZhciBuID0gMDtcbiAgICB2YXIgaSwgaywgbGVuZ3RoLCBsZW4sIEU7XG4gICAgZm9yIChpID0gLTEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgRSA9IGkgPT09IC0xID8gTyA6IGFyZ3VtZW50c1tpXTtcbiAgICAgIGlmIChpc0NvbmNhdFNwcmVhZGFibGUoRSkpIHtcbiAgICAgICAgbGVuID0gdG9MZW5ndGgoRS5sZW5ndGgpO1xuICAgICAgICBpZiAobiArIGxlbiA+IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBmb3IgKGsgPSAwOyBrIDwgbGVuOyBrKyssIG4rKykgaWYgKGsgaW4gRSkgY3JlYXRlUHJvcGVydHkoQSwgbiwgRVtrXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobiA+PSBNQVhfU0FGRV9JTlRFR0VSKSB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEKTtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkoQSwgbisrLCBFKTtcbiAgICAgIH1cbiAgICB9XG4gICAgQS5sZW5ndGggPSBuO1xuICAgIHJldHVybiBBO1xuICB9XG59KTtcbiIsInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xuXG52YXIgRGF0ZVByb3RvdHlwZSA9IERhdGUucHJvdG90eXBlO1xudmFyIElOVkFMSURfREFURSA9ICdJbnZhbGlkIERhdGUnO1xudmFyIFRPX1NUUklORyA9ICd0b1N0cmluZyc7XG52YXIgbmF0aXZlRGF0ZVRvU3RyaW5nID0gRGF0ZVByb3RvdHlwZVtUT19TVFJJTkddO1xudmFyIGdldFRpbWUgPSBEYXRlUHJvdG90eXBlLmdldFRpbWU7XG5cbi8vIGBEYXRlLnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1kYXRlLnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKG5ldyBEYXRlKE5hTikgKyAnJyAhPSBJTlZBTElEX0RBVEUpIHtcbiAgcmVkZWZpbmUoRGF0ZVByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICB2YXIgdmFsdWUgPSBnZXRUaW1lLmNhbGwodGhpcyk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyBuYXRpdmVEYXRlVG9TdHJpbmcuY2FsbCh0aGlzKSA6IElOVkFMSURfREFURTtcbiAgfSk7XG59XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciByZXBlYXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXJlcGVhdCcpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS5yZXBlYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5yZXBlYXRcbiQoeyB0YXJnZXQ6ICdTdHJpbmcnLCBwcm90bzogdHJ1ZSB9LCB7XG4gIHJlcGVhdDogcmVwZWF0XG59KTtcbiIsIi8qISBAbGljZW5zZSBpcy1kb20tbm9kZS1saXN0IHYxLjIuMVxuXG5cdENvcHlyaWdodCAyMDE4IEZpc3NzaW9uIExMQy5cblxuXHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcblx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuXHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuXHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5cdFNPRlRXQVJFLlxuXG4qL1xuaW1wb3J0IGlzRG9tTm9kZSBmcm9tICdpcy1kb20tbm9kZSc7XG5cbmZ1bmN0aW9uIGlzRG9tTm9kZUxpc3QoeCkge1xuXHR2YXIgcHJvdG90eXBlVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cdHZhciByZWdleCA9IC9eXFxbb2JqZWN0IChIVE1MQ29sbGVjdGlvbnxOb2RlTGlzdHxPYmplY3QpXFxdJC87XG5cblx0cmV0dXJuIHR5cGVvZiB3aW5kb3cuTm9kZUxpc3QgPT09ICdvYmplY3QnXG5cdFx0PyB4IGluc3RhbmNlb2Ygd2luZG93Lk5vZGVMaXN0XG5cdFx0OiB4ICE9PSBudWxsICYmXG5cdFx0XHRcdHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0XHR0eXBlb2YgeC5sZW5ndGggPT09ICdudW1iZXInICYmXG5cdFx0XHRcdHJlZ2V4LnRlc3QocHJvdG90eXBlVG9TdHJpbmcpICYmXG5cdFx0XHRcdCh4Lmxlbmd0aCA9PT0gMCB8fCBpc0RvbU5vZGUoeFswXSkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRG9tTm9kZUxpc3Q7XG4iLCIvKiEgQGxpY2Vuc2UgaXMtZG9tLW5vZGUgdjEuMC40XG5cblx0Q29weXJpZ2h0IDIwMTggRmlzc3Npb24gTExDLlxuXG5cdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0U09GVFdBUkUuXG5cbiovXG5mdW5jdGlvbiBpc0RvbU5vZGUoeCkge1xuXHRyZXR1cm4gdHlwZW9mIHdpbmRvdy5Ob2RlID09PSAnb2JqZWN0J1xuXHRcdD8geCBpbnN0YW5jZW9mIHdpbmRvdy5Ob2RlXG5cdFx0OiB4ICE9PSBudWxsICYmXG5cdFx0XHRcdHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0XHR0eXBlb2YgeC5ub2RlVHlwZSA9PT0gJ251bWJlcicgJiZcblx0XHRcdFx0dHlwZW9mIHgubm9kZU5hbWUgPT09ICdzdHJpbmcnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRG9tTm9kZTtcbiIsIi8qISBAbGljZW5zZSBtaW5pcmFmIHYxLjAuMFxuXG5cdENvcHlyaWdodCAyMDE4IEZpc3NzaW9uIExMQy5cblxuXHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcblx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuXHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuXHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5cdFNPRlRXQVJFLlxuXG4qL1xudmFyIHBvbHlmaWxsID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIGNsb2NrID0gRGF0ZS5ub3coKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0dmFyIGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcblx0XHRpZiAoY3VycmVudFRpbWUgLSBjbG9jayA+IDE2KSB7XG5cdFx0XHRjbG9jayA9IGN1cnJlbnRUaW1lO1xuXHRcdFx0Y2FsbGJhY2soY3VycmVudFRpbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBvbHlmaWxsKGNhbGxiYWNrKTsgfSwgMCk7XG5cdFx0fVxuXHR9XG59KSgpO1xuXG52YXIgaW5kZXggPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRwb2x5ZmlsbDtcblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG4iLCIvKiEgQGxpY2Vuc2UgUmVtYXRyaXggdjAuMy4wXG5cblx0Q29weXJpZ2h0IDIwMTggSnVsaWFuIExsb3lkLlxuXG5cdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cblx0YWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuXHRUSEUgU09GVFdBUkUuXG4qL1xuLyoqXG4gKiBAbW9kdWxlIFJlbWF0cml4XG4gKi9cblxuLyoqXG4gKiBUcmFuc2Zvcm1hdGlvbiBtYXRyaWNlcyBpbiB0aGUgYnJvd3NlciBjb21lIGluIHR3byBmbGF2b3JzOlxuICpcbiAqICAtIGBtYXRyaXhgIHVzaW5nIDYgdmFsdWVzIChzaG9ydClcbiAqICAtIGBtYXRyaXgzZGAgdXNpbmcgMTYgdmFsdWVzIChsb25nKVxuICpcbiAqIFRoaXMgdXRpbGl0eSBmb2xsb3dzIHRoaXMgW2NvbnZlcnNpb24gZ3VpZGVdKGh0dHBzOi8vZ29vLmdsL0VKbFVRMSlcbiAqIHRvIGV4cGFuZCBzaG9ydCBmb3JtIG1hdHJpY2VzIHRvIHRoZWlyIGVxdWl2YWxlbnQgbG9uZyBmb3JtLlxuICpcbiAqIEBwYXJhbSAge2FycmF5fSBzb3VyY2UgLSBBY2NlcHRzIGJvdGggc2hvcnQgYW5kIGxvbmcgZm9ybSBtYXRyaWNlcy5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiBmb3JtYXQoc291cmNlKSB7XG5cdGlmIChzb3VyY2UuY29uc3RydWN0b3IgIT09IEFycmF5KSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYXJyYXkuJylcblx0fVxuXHRpZiAoc291cmNlLmxlbmd0aCA9PT0gMTYpIHtcblx0XHRyZXR1cm4gc291cmNlXG5cdH1cblx0aWYgKHNvdXJjZS5sZW5ndGggPT09IDYpIHtcblx0XHR2YXIgbWF0cml4ID0gaWRlbnRpdHkoKTtcblx0XHRtYXRyaXhbMF0gPSBzb3VyY2VbMF07XG5cdFx0bWF0cml4WzFdID0gc291cmNlWzFdO1xuXHRcdG1hdHJpeFs0XSA9IHNvdXJjZVsyXTtcblx0XHRtYXRyaXhbNV0gPSBzb3VyY2VbM107XG5cdFx0bWF0cml4WzEyXSA9IHNvdXJjZVs0XTtcblx0XHRtYXRyaXhbMTNdID0gc291cmNlWzVdO1xuXHRcdHJldHVybiBtYXRyaXhcblx0fVxuXHR0aHJvdyBuZXcgUmFuZ2VFcnJvcignRXhwZWN0ZWQgYXJyYXkgd2l0aCBlaXRoZXIgNiBvciAxNiB2YWx1ZXMuJylcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbWF0cml4IHJlcHJlc2VudGluZyBubyB0cmFuc2Zvcm1hdGlvbi4gVGhlIHByb2R1Y3Qgb2YgYW55IG1hdHJpeFxuICogbXVsdGlwbGllZCBieSB0aGUgaWRlbnRpdHkgbWF0cml4IHdpbGwgYmUgdGhlIG9yaWdpbmFsIG1hdHJpeC5cbiAqXG4gKiA+ICoqVGlwOioqIFNpbWlsYXIgdG8gaG93IGA1ICogMSA9PT0gNWAsIHdoZXJlIGAxYCBpcyB0aGUgaWRlbnRpdHkuXG4gKlxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KCkge1xuXHR2YXIgbWF0cml4ID0gW107XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykge1xuXHRcdGkgJSA1ID09IDAgPyBtYXRyaXgucHVzaCgxKSA6IG1hdHJpeC5wdXNoKDApO1xuXHR9XG5cdHJldHVybiBtYXRyaXhcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbWF0cml4IGRlc2NyaWJpbmcgdGhlIGludmVyc2UgdHJhbnNmb3JtYXRpb24gb2YgdGhlIHNvdXJjZVxuICogbWF0cml4LiBUaGUgcHJvZHVjdCBvZiBhbnkgbWF0cml4IG11bHRpcGxpZWQgYnkgaXRzIGludmVyc2Ugd2lsbCBiZSB0aGVcbiAqIGlkZW50aXR5IG1hdHJpeC5cbiAqXG4gKiA+ICoqVGlwOioqIFNpbWlsYXIgdG8gaG93IGA1ICogKDEvNSkgPT09IDFgLCB3aGVyZSBgMS81YCBpcyB0aGUgaW52ZXJzZS5cbiAqXG4gKiBAcGFyYW0gIHthcnJheX0gc291cmNlIC0gQWNjZXB0cyBib3RoIHNob3J0IGFuZCBsb25nIGZvcm0gbWF0cmljZXMuXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gaW52ZXJzZShzb3VyY2UpIHtcblx0dmFyIG0gPSBmb3JtYXQoc291cmNlKTtcblxuXHR2YXIgczAgPSBtWzBdICogbVs1XSAtIG1bNF0gKiBtWzFdO1xuXHR2YXIgczEgPSBtWzBdICogbVs2XSAtIG1bNF0gKiBtWzJdO1xuXHR2YXIgczIgPSBtWzBdICogbVs3XSAtIG1bNF0gKiBtWzNdO1xuXHR2YXIgczMgPSBtWzFdICogbVs2XSAtIG1bNV0gKiBtWzJdO1xuXHR2YXIgczQgPSBtWzFdICogbVs3XSAtIG1bNV0gKiBtWzNdO1xuXHR2YXIgczUgPSBtWzJdICogbVs3XSAtIG1bNl0gKiBtWzNdO1xuXG5cdHZhciBjNSA9IG1bMTBdICogbVsxNV0gLSBtWzE0XSAqIG1bMTFdO1xuXHR2YXIgYzQgPSBtWzldICogbVsxNV0gLSBtWzEzXSAqIG1bMTFdO1xuXHR2YXIgYzMgPSBtWzldICogbVsxNF0gLSBtWzEzXSAqIG1bMTBdO1xuXHR2YXIgYzIgPSBtWzhdICogbVsxNV0gLSBtWzEyXSAqIG1bMTFdO1xuXHR2YXIgYzEgPSBtWzhdICogbVsxNF0gLSBtWzEyXSAqIG1bMTBdO1xuXHR2YXIgYzAgPSBtWzhdICogbVsxM10gLSBtWzEyXSAqIG1bOV07XG5cblx0dmFyIGRldGVybWluYW50ID0gMSAvIChzMCAqIGM1IC0gczEgKiBjNCArIHMyICogYzMgKyBzMyAqIGMyIC0gczQgKiBjMSArIHM1ICogYzApO1xuXG5cdGlmIChpc05hTihkZXRlcm1pbmFudCkgfHwgZGV0ZXJtaW5hbnQgPT09IEluZmluaXR5KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZlcnNlIGRldGVybWluYW50IGF0dGVtcHRlZCB0byBkaXZpZGUgYnkgemVyby4nKVxuXHR9XG5cblx0cmV0dXJuIFtcblx0XHQobVs1XSAqIGM1IC0gbVs2XSAqIGM0ICsgbVs3XSAqIGMzKSAqIGRldGVybWluYW50LFxuXHRcdCgtbVsxXSAqIGM1ICsgbVsyXSAqIGM0IC0gbVszXSAqIGMzKSAqIGRldGVybWluYW50LFxuXHRcdChtWzEzXSAqIHM1IC0gbVsxNF0gKiBzNCArIG1bMTVdICogczMpICogZGV0ZXJtaW5hbnQsXG5cdFx0KC1tWzldICogczUgKyBtWzEwXSAqIHM0IC0gbVsxMV0gKiBzMykgKiBkZXRlcm1pbmFudCxcblxuXHRcdCgtbVs0XSAqIGM1ICsgbVs2XSAqIGMyIC0gbVs3XSAqIGMxKSAqIGRldGVybWluYW50LFxuXHRcdChtWzBdICogYzUgLSBtWzJdICogYzIgKyBtWzNdICogYzEpICogZGV0ZXJtaW5hbnQsXG5cdFx0KC1tWzEyXSAqIHM1ICsgbVsxNF0gKiBzMiAtIG1bMTVdICogczEpICogZGV0ZXJtaW5hbnQsXG5cdFx0KG1bOF0gKiBzNSAtIG1bMTBdICogczIgKyBtWzExXSAqIHMxKSAqIGRldGVybWluYW50LFxuXG5cdFx0KG1bNF0gKiBjNCAtIG1bNV0gKiBjMiArIG1bN10gKiBjMCkgKiBkZXRlcm1pbmFudCxcblx0XHQoLW1bMF0gKiBjNCArIG1bMV0gKiBjMiAtIG1bM10gKiBjMCkgKiBkZXRlcm1pbmFudCxcblx0XHQobVsxMl0gKiBzNCAtIG1bMTNdICogczIgKyBtWzE1XSAqIHMwKSAqIGRldGVybWluYW50LFxuXHRcdCgtbVs4XSAqIHM0ICsgbVs5XSAqIHMyIC0gbVsxMV0gKiBzMCkgKiBkZXRlcm1pbmFudCxcblxuXHRcdCgtbVs0XSAqIGMzICsgbVs1XSAqIGMxIC0gbVs2XSAqIGMwKSAqIGRldGVybWluYW50LFxuXHRcdChtWzBdICogYzMgLSBtWzFdICogYzEgKyBtWzJdICogYzApICogZGV0ZXJtaW5hbnQsXG5cdFx0KC1tWzEyXSAqIHMzICsgbVsxM10gKiBzMSAtIG1bMTRdICogczApICogZGV0ZXJtaW5hbnQsXG5cdFx0KG1bOF0gKiBzMyAtIG1bOV0gKiBzMSArIG1bMTBdICogczApICogZGV0ZXJtaW5hbnRcblx0XVxufVxuXG4vKipcbiAqIFJldHVybnMgYSA0eDQgbWF0cml4IGRlc2NyaWJpbmcgdGhlIGNvbWJpbmVkIHRyYW5zZm9ybWF0aW9uc1xuICogb2YgYm90aCBhcmd1bWVudHMuXG4gKlxuICogPiAqKk5vdGU6KiogT3JkZXIgaXMgdmVyeSBpbXBvcnRhbnQuIEZvciBleGFtcGxlLCByb3RhdGluZyA0NcKwXG4gKiBhbG9uZyB0aGUgWi1heGlzLCBmb2xsb3dlZCBieSB0cmFuc2xhdGluZyA1MDAgcGl4ZWxzIGFsb25nIHRoZVxuICogWS1heGlzLi4uIGlzIG5vdCB0aGUgc2FtZSBhcyB0cmFuc2xhdGluZyA1MDAgcGl4ZWxzIGFsb25nIHRoZVxuICogWS1heGlzLCBmb2xsb3dlZCBieSByb3RhdGluZyA0NcKwIGFsb25nIG9uIHRoZSBaLWF4aXMuXG4gKlxuICogQHBhcmFtICB7YXJyYXl9IG0gLSBBY2NlcHRzIGJvdGggc2hvcnQgYW5kIGxvbmcgZm9ybSBtYXRyaWNlcy5cbiAqIEBwYXJhbSAge2FycmF5fSB4IC0gQWNjZXB0cyBib3RoIHNob3J0IGFuZCBsb25nIGZvcm0gbWF0cmljZXMuXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gbXVsdGlwbHkobSwgeCkge1xuXHR2YXIgZm0gPSBmb3JtYXQobSk7XG5cdHZhciBmeCA9IGZvcm1hdCh4KTtcblx0dmFyIHByb2R1Y3QgPSBbXTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHRcdHZhciByb3cgPSBbZm1baV0sIGZtW2kgKyA0XSwgZm1baSArIDhdLCBmbVtpICsgMTJdXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IDQ7IGorKykge1xuXHRcdFx0dmFyIGsgPSBqICogNDtcblx0XHRcdHZhciBjb2wgPSBbZnhba10sIGZ4W2sgKyAxXSwgZnhbayArIDJdLCBmeFtrICsgM11dO1xuXHRcdFx0dmFyIHJlc3VsdCA9XG5cdFx0XHRcdHJvd1swXSAqIGNvbFswXSArIHJvd1sxXSAqIGNvbFsxXSArIHJvd1syXSAqIGNvbFsyXSArIHJvd1szXSAqIGNvbFszXTtcblxuXHRcdFx0cHJvZHVjdFtpICsga10gPSByZXN1bHQ7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHByb2R1Y3Rcbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byByZXR1cm4gYSA0eDQgbWF0cml4IGRlc2NyaWJpbmcgdGhlIENTUyB0cmFuc2Zvcm1cbiAqIG1hdHJpeCBwYXNzZWQgaW4sIGJ1dCB3aWxsIHJldHVybiB0aGUgaWRlbnRpdHkgbWF0cml4IGFzIGFcbiAqIGZhbGxiYWNrLlxuICpcbiAqID4gKipUaXA6KiogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBjb252ZXJ0IGEgQ1NTIG1hdHJpeCAocmV0cmlldmVkIGFzIGFcbiAqIGBzdHJpbmdgIGZyb20gY29tcHV0ZWQgc3R5bGVzKSB0byBpdHMgZXF1aXZhbGVudCBhcnJheSBmb3JtYXQuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBzb3VyY2UgLSBgbWF0cml4YCBvciBgbWF0cml4M2RgIENTUyBUcmFuc2Zvcm0gdmFsdWUuXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gcGFyc2Uoc291cmNlKSB7XG5cdGlmICh0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJykge1xuXHRcdHZhciBtYXRjaCA9IHNvdXJjZS5tYXRjaCgvbWF0cml4KDNkKT9cXCgoW14pXSspXFwpLyk7XG5cdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHR2YXIgcmF3ID0gbWF0Y2hbMl0uc3BsaXQoJywgJykubWFwKHBhcnNlRmxvYXQpO1xuXHRcdFx0cmV0dXJuIGZvcm1hdChyYXcpXG5cdFx0fVxuXHR9XG5cdHJldHVybiBpZGVudGl0eSgpXG59XG5cbi8qKlxuICogUmV0dXJucyBhIDR4NCBtYXRyaXggZGVzY3JpYmluZyBaLWF4aXMgcm90YXRpb24uXG4gKlxuICogPiAqKlRpcDoqKiBUaGlzIGlzIGp1c3QgYW4gYWxpYXMgZm9yIGBSZW1hdHJpeC5yb3RhdGVaYCBmb3IgcGFyaXR5IHdpdGggQ1NTXG4gKlxuICogQHBhcmFtICB7bnVtYmVyfSBhbmdsZSAtIE1lYXN1cmVkIGluIGRlZ3JlZXMuXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gcm90YXRlKGFuZ2xlKSB7XG5cdHJldHVybiByb3RhdGVaKGFuZ2xlKVxufVxuXG4vKipcbiAqIFJldHVybnMgYSA0eDQgbWF0cml4IGRlc2NyaWJpbmcgWC1heGlzIHJvdGF0aW9uLlxuICpcbiAqIEBwYXJhbSAge251bWJlcn0gYW5nbGUgLSBNZWFzdXJlZCBpbiBkZWdyZWVzLlxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHJvdGF0ZVgoYW5nbGUpIHtcblx0dmFyIHRoZXRhID0gTWF0aC5QSSAvIDE4MCAqIGFuZ2xlO1xuXHR2YXIgbWF0cml4ID0gaWRlbnRpdHkoKTtcblxuXHRtYXRyaXhbNV0gPSBtYXRyaXhbMTBdID0gTWF0aC5jb3ModGhldGEpO1xuXHRtYXRyaXhbNl0gPSBtYXRyaXhbOV0gPSBNYXRoLnNpbih0aGV0YSk7XG5cdG1hdHJpeFs5XSAqPSAtMTtcblxuXHRyZXR1cm4gbWF0cml4XG59XG5cbi8qKlxuICogUmV0dXJucyBhIDR4NCBtYXRyaXggZGVzY3JpYmluZyBZLWF4aXMgcm90YXRpb24uXG4gKlxuICogQHBhcmFtICB7bnVtYmVyfSBhbmdsZSAtIE1lYXN1cmVkIGluIGRlZ3JlZXMuXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gcm90YXRlWShhbmdsZSkge1xuXHR2YXIgdGhldGEgPSBNYXRoLlBJIC8gMTgwICogYW5nbGU7XG5cdHZhciBtYXRyaXggPSBpZGVudGl0eSgpO1xuXG5cdG1hdHJpeFswXSA9IG1hdHJpeFsxMF0gPSBNYXRoLmNvcyh0aGV0YSk7XG5cdG1hdHJpeFsyXSA9IG1hdHJpeFs4XSA9IE1hdGguc2luKHRoZXRhKTtcblx0bWF0cml4WzJdICo9IC0xO1xuXG5cdHJldHVybiBtYXRyaXhcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgNHg0IG1hdHJpeCBkZXNjcmliaW5nIFotYXhpcyByb3RhdGlvbi5cbiAqXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGFuZ2xlIC0gTWVhc3VyZWQgaW4gZGVncmVlcy5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiByb3RhdGVaKGFuZ2xlKSB7XG5cdHZhciB0aGV0YSA9IE1hdGguUEkgLyAxODAgKiBhbmdsZTtcblx0dmFyIG1hdHJpeCA9IGlkZW50aXR5KCk7XG5cblx0bWF0cml4WzBdID0gbWF0cml4WzVdID0gTWF0aC5jb3ModGhldGEpO1xuXHRtYXRyaXhbMV0gPSBtYXRyaXhbNF0gPSBNYXRoLnNpbih0aGV0YSk7XG5cdG1hdHJpeFs0XSAqPSAtMTtcblxuXHRyZXR1cm4gbWF0cml4XG59XG5cbi8qKlxuICogUmV0dXJucyBhIDR4NCBtYXRyaXggZGVzY3JpYmluZyAyRCBzY2FsaW5nLiBUaGUgZmlyc3QgYXJndW1lbnRcbiAqIGlzIHVzZWQgZm9yIGJvdGggWCBhbmQgWS1heGlzIHNjYWxpbmcsIHVubGVzcyBhbiBvcHRpb25hbFxuICogc2Vjb25kIGFyZ3VtZW50IGlzIHByb3ZpZGVkIHRvIGV4cGxpY2l0bHkgZGVmaW5lIFktYXhpcyBzY2FsaW5nLlxuICpcbiAqIEBwYXJhbSAge251bWJlcn0gc2NhbGFyICAgIC0gRGVjaW1hbCBtdWx0aXBsaWVyLlxuICogQHBhcmFtICB7bnVtYmVyfSBbc2NhbGFyWV0gLSBEZWNpbWFsIG11bHRpcGxpZXIuXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gc2NhbGUoc2NhbGFyLCBzY2FsYXJZKSB7XG5cdHZhciBtYXRyaXggPSBpZGVudGl0eSgpO1xuXG5cdG1hdHJpeFswXSA9IHNjYWxhcjtcblx0bWF0cml4WzVdID0gdHlwZW9mIHNjYWxhclkgPT09ICdudW1iZXInID8gc2NhbGFyWSA6IHNjYWxhcjtcblxuXHRyZXR1cm4gbWF0cml4XG59XG5cbi8qKlxuICogUmV0dXJucyBhIDR4NCBtYXRyaXggZGVzY3JpYmluZyBYLWF4aXMgc2NhbGluZy5cbiAqXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHNjYWxhciAtIERlY2ltYWwgbXVsdGlwbGllci5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiBzY2FsZVgoc2NhbGFyKSB7XG5cdHZhciBtYXRyaXggPSBpZGVudGl0eSgpO1xuXHRtYXRyaXhbMF0gPSBzY2FsYXI7XG5cdHJldHVybiBtYXRyaXhcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgNHg0IG1hdHJpeCBkZXNjcmliaW5nIFktYXhpcyBzY2FsaW5nLlxuICpcbiAqIEBwYXJhbSAge251bWJlcn0gc2NhbGFyIC0gRGVjaW1hbCBtdWx0aXBsaWVyLlxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHNjYWxlWShzY2FsYXIpIHtcblx0dmFyIG1hdHJpeCA9IGlkZW50aXR5KCk7XG5cdG1hdHJpeFs1XSA9IHNjYWxhcjtcblx0cmV0dXJuIG1hdHJpeFxufVxuXG4vKipcbiAqIFJldHVybnMgYSA0eDQgbWF0cml4IGRlc2NyaWJpbmcgWi1heGlzIHNjYWxpbmcuXG4gKlxuICogQHBhcmFtICB7bnVtYmVyfSBzY2FsYXIgLSBEZWNpbWFsIG11bHRpcGxpZXIuXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gc2NhbGVaKHNjYWxhcikge1xuXHR2YXIgbWF0cml4ID0gaWRlbnRpdHkoKTtcblx0bWF0cml4WzEwXSA9IHNjYWxhcjtcblx0cmV0dXJuIG1hdHJpeFxufVxuXG4vKipcbiAqIFJldHVybnMgYSA0eDQgbWF0cml4IGRlc2NyaWJpbmcgc2hlYXIuIFRoZSBmaXJzdCBhcmd1bWVudFxuICogZGVmaW5lcyBYLWF4aXMgc2hlYXJpbmcsIGFuZCBhbiBvcHRpb25hbCBzZWNvbmQgYXJndW1lbnRcbiAqIGRlZmluZXMgWS1heGlzIHNoZWFyaW5nLlxuICpcbiAqIEBwYXJhbSAge251bWJlcn0gYW5nbGVYICAgLSBNZWFzdXJlZCBpbiBkZWdyZWVzLlxuICogQHBhcmFtICB7bnVtYmVyfSBbYW5nbGVZXSAtIE1lYXN1cmVkIGluIGRlZ3JlZXMuXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gc2tldyhhbmdsZVgsIGFuZ2xlWSkge1xuXHR2YXIgdGhldGFYID0gTWF0aC5QSSAvIDE4MCAqIGFuZ2xlWDtcblx0dmFyIG1hdHJpeCA9IGlkZW50aXR5KCk7XG5cblx0bWF0cml4WzRdID0gTWF0aC50YW4odGhldGFYKTtcblxuXHRpZiAoYW5nbGVZKSB7XG5cdFx0dmFyIHRoZXRhWSA9IE1hdGguUEkgLyAxODAgKiBhbmdsZVk7XG5cdFx0bWF0cml4WzFdID0gTWF0aC50YW4odGhldGFZKTtcblx0fVxuXG5cdHJldHVybiBtYXRyaXhcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgNHg0IG1hdHJpeCBkZXNjcmliaW5nIFgtYXhpcyBzaGVhci5cbiAqXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGFuZ2xlIC0gTWVhc3VyZWQgaW4gZGVncmVlcy5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiBza2V3WChhbmdsZSkge1xuXHR2YXIgdGhldGEgPSBNYXRoLlBJIC8gMTgwICogYW5nbGU7XG5cdHZhciBtYXRyaXggPSBpZGVudGl0eSgpO1xuXG5cdG1hdHJpeFs0XSA9IE1hdGgudGFuKHRoZXRhKTtcblxuXHRyZXR1cm4gbWF0cml4XG59XG5cbi8qKlxuICogUmV0dXJucyBhIDR4NCBtYXRyaXggZGVzY3JpYmluZyBZLWF4aXMgc2hlYXIuXG4gKlxuICogQHBhcmFtICB7bnVtYmVyfSBhbmdsZSAtIE1lYXN1cmVkIGluIGRlZ3JlZXNcbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiBza2V3WShhbmdsZSkge1xuXHR2YXIgdGhldGEgPSBNYXRoLlBJIC8gMTgwICogYW5nbGU7XG5cdHZhciBtYXRyaXggPSBpZGVudGl0eSgpO1xuXG5cdG1hdHJpeFsxXSA9IE1hdGgudGFuKHRoZXRhKTtcblxuXHRyZXR1cm4gbWF0cml4XG59XG5cbi8qKlxuICogUmV0dXJucyBhIENTUyBUcmFuc2Zvcm0gcHJvcGVydHkgdmFsdWUgZXF1aXZhbGVudCB0byB0aGUgc291cmNlIG1hdHJpeC5cbiAqXG4gKiBAcGFyYW0gIHthcnJheX0gc291cmNlIC0gQWNjZXB0cyBib3RoIHNob3J0IGFuZCBsb25nIGZvcm0gbWF0cmljZXMuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHNvdXJjZSkge1xuXHRyZXR1cm4gKFwibWF0cml4M2QoXCIgKyAoZm9ybWF0KHNvdXJjZSkuam9pbignLCAnKSkgKyBcIilcIilcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgNHg0IG1hdHJpeCBkZXNjcmliaW5nIDJEIHRyYW5zbGF0aW9uLiBUaGUgZmlyc3RcbiAqIGFyZ3VtZW50IGRlZmluZXMgWC1heGlzIHRyYW5zbGF0aW9uLCBhbmQgYW4gb3B0aW9uYWwgc2Vjb25kXG4gKiBhcmd1bWVudCBkZWZpbmVzIFktYXhpcyB0cmFuc2xhdGlvbi5cbiAqXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGRpc3RhbmNlWCAgIC0gTWVhc3VyZWQgaW4gcGl4ZWxzLlxuICogQHBhcmFtICB7bnVtYmVyfSBbZGlzdGFuY2VZXSAtIE1lYXN1cmVkIGluIHBpeGVscy5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiB0cmFuc2xhdGUoZGlzdGFuY2VYLCBkaXN0YW5jZVkpIHtcblx0dmFyIG1hdHJpeCA9IGlkZW50aXR5KCk7XG5cdG1hdHJpeFsxMl0gPSBkaXN0YW5jZVg7XG5cblx0aWYgKGRpc3RhbmNlWSkge1xuXHRcdG1hdHJpeFsxM10gPSBkaXN0YW5jZVk7XG5cdH1cblxuXHRyZXR1cm4gbWF0cml4XG59XG5cbi8qKlxuICogUmV0dXJucyBhIDR4NCBtYXRyaXggZGVzY3JpYmluZyBYLWF4aXMgdHJhbnNsYXRpb24uXG4gKlxuICogQHBhcmFtICB7bnVtYmVyfSBkaXN0YW5jZSAtIE1lYXN1cmVkIGluIHBpeGVscy5cbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5mdW5jdGlvbiB0cmFuc2xhdGVYKGRpc3RhbmNlKSB7XG5cdHZhciBtYXRyaXggPSBpZGVudGl0eSgpO1xuXHRtYXRyaXhbMTJdID0gZGlzdGFuY2U7XG5cdHJldHVybiBtYXRyaXhcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgNHg0IG1hdHJpeCBkZXNjcmliaW5nIFktYXhpcyB0cmFuc2xhdGlvbi5cbiAqXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGRpc3RhbmNlIC0gTWVhc3VyZWQgaW4gcGl4ZWxzLlxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHRyYW5zbGF0ZVkoZGlzdGFuY2UpIHtcblx0dmFyIG1hdHJpeCA9IGlkZW50aXR5KCk7XG5cdG1hdHJpeFsxM10gPSBkaXN0YW5jZTtcblx0cmV0dXJuIG1hdHJpeFxufVxuXG4vKipcbiAqIFJldHVybnMgYSA0eDQgbWF0cml4IGRlc2NyaWJpbmcgWi1heGlzIHRyYW5zbGF0aW9uLlxuICpcbiAqIEBwYXJhbSAge251bWJlcn0gZGlzdGFuY2UgLSBNZWFzdXJlZCBpbiBwaXhlbHMuXG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZnVuY3Rpb24gdHJhbnNsYXRlWihkaXN0YW5jZSkge1xuXHR2YXIgbWF0cml4ID0gaWRlbnRpdHkoKTtcblx0bWF0cml4WzE0XSA9IGRpc3RhbmNlO1xuXHRyZXR1cm4gbWF0cml4XG59XG5cbmV4cG9ydCB7IGZvcm1hdCwgaWRlbnRpdHksIGludmVyc2UsIG11bHRpcGx5LCBwYXJzZSwgcm90YXRlLCByb3RhdGVYLCByb3RhdGVZLCByb3RhdGVaLCBzY2FsZSwgc2NhbGVYLCBzY2FsZVksIHNjYWxlWiwgc2tldywgc2tld1gsIHNrZXdZLCB0b1N0cmluZywgdHJhbnNsYXRlLCB0cmFuc2xhdGVYLCB0cmFuc2xhdGVZLCB0cmFuc2xhdGVaIH07XG4iLCIvKiEgQGxpY2Vuc2UgU2Nyb2xsUmV2ZWFsIHY0LjAuN1xuXG5cdENvcHlyaWdodCAyMDIwIEZpc3NzaW9uIExMQy5cblxuXHRMaWNlbnNlZCB1bmRlciB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgMy4wIGZvclxuXHRjb21wYXRpYmxlIG9wZW4gc291cmNlIHByb2plY3RzIGFuZCBub24tY29tbWVyY2lhbCB1c2UuXG5cblx0Rm9yIGNvbW1lcmNpYWwgc2l0ZXMsIHRoZW1lcywgcHJvamVjdHMsIGFuZCBhcHBsaWNhdGlvbnMsXG5cdGtlZXAgeW91ciBzb3VyY2UgY29kZSBwcml2YXRlL3Byb3ByaWV0YXJ5IGJ5IHB1cmNoYXNpbmdcblx0YSBjb21tZXJjaWFsIGxpY2Vuc2UgZnJvbSBodHRwczovL3Njcm9sbHJldmVhbGpzLm9yZy9cbiovXG5pbXBvcnQgJCBmcm9tICd0ZWFsaWdodCc7XG5pbXBvcnQgeyB0cmFuc2xhdGVZLCB0cmFuc2xhdGVYLCByb3RhdGVYLCByb3RhdGVZLCByb3RhdGVaLCBzY2FsZSwgcGFyc2UsIG11bHRpcGx5IH0gZnJvbSAncmVtYXRyaXgnO1xuaW1wb3J0IHJhZiBmcm9tICdtaW5pcmFmJztcblxudmFyIGRlZmF1bHRzID0ge1xuXHRkZWxheTogMCxcblx0ZGlzdGFuY2U6ICcwJyxcblx0ZHVyYXRpb246IDYwMCxcblx0ZWFzaW5nOiAnY3ViaWMtYmV6aWVyKDAuNSwgMCwgMCwgMSknLFxuXHRpbnRlcnZhbDogMCxcblx0b3BhY2l0eTogMCxcblx0b3JpZ2luOiAnYm90dG9tJyxcblx0cm90YXRlOiB7XG5cdFx0eDogMCxcblx0XHR5OiAwLFxuXHRcdHo6IDBcblx0fSxcblx0c2NhbGU6IDEsXG5cdGNsZWFudXA6IGZhbHNlLFxuXHRjb250YWluZXI6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcblx0ZGVza3RvcDogdHJ1ZSxcblx0bW9iaWxlOiB0cnVlLFxuXHRyZXNldDogZmFsc2UsXG5cdHVzZURlbGF5OiAnYWx3YXlzJyxcblx0dmlld0ZhY3RvcjogMC4wLFxuXHR2aWV3T2Zmc2V0OiB7XG5cdFx0dG9wOiAwLFxuXHRcdHJpZ2h0OiAwLFxuXHRcdGJvdHRvbTogMCxcblx0XHRsZWZ0OiAwXG5cdH0sXG5cdGFmdGVyUmVzZXQ6IGZ1bmN0aW9uIGFmdGVyUmVzZXQoKSB7fSxcblx0YWZ0ZXJSZXZlYWw6IGZ1bmN0aW9uIGFmdGVyUmV2ZWFsKCkge30sXG5cdGJlZm9yZVJlc2V0OiBmdW5jdGlvbiBiZWZvcmVSZXNldCgpIHt9LFxuXHRiZWZvcmVSZXZlYWw6IGZ1bmN0aW9uIGJlZm9yZVJldmVhbCgpIHt9XG59O1xuXG5mdW5jdGlvbiBmYWlsdXJlKCkge1xuXHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc3InKTtcblxuXHRyZXR1cm4ge1xuXHRcdGNsZWFuOiBmdW5jdGlvbiBjbGVhbigpIHt9LFxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7fSxcblx0XHRyZXZlYWw6IGZ1bmN0aW9uIHJldmVhbCgpIHt9LFxuXHRcdHN5bmM6IGZ1bmN0aW9uIHN5bmMoKSB7fSxcblx0XHRnZXQgbm9vcCgpIHtcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XG5cdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzcicpO1xuXG5cdGlmIChkb2N1bWVudC5ib2R5KSB7XG5cdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG5cdH0gZWxzZSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuXHRcdH0pO1xuXHR9XG59XG5cbnZhciBtb3VudCA9IHsgc3VjY2Vzczogc3VjY2VzcywgZmFpbHVyZTogZmFpbHVyZSB9O1xuXG5mdW5jdGlvbiBpc09iamVjdCh4KSB7XG5cdHJldHVybiAoXG5cdFx0eCAhPT0gbnVsbCAmJlxuXHRcdHggaW5zdGFuY2VvZiBPYmplY3QgJiZcblx0XHQoeC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0IHx8XG5cdFx0XHRPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXHQpXG59XG5cbmZ1bmN0aW9uIGVhY2goY29sbGVjdGlvbiwgY2FsbGJhY2spIHtcblx0aWYgKGlzT2JqZWN0KGNvbGxlY3Rpb24pKSB7XG5cdFx0dmFyIGtleXMgPSBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKTtcblx0XHRyZXR1cm4ga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGNhbGxiYWNrKGNvbGxlY3Rpb25ba2V5XSwga2V5LCBjb2xsZWN0aW9uKTsgfSlcblx0fVxuXHRpZiAoY29sbGVjdGlvbiBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkgeyByZXR1cm4gY2FsbGJhY2soaXRlbSwgaSwgY29sbGVjdGlvbik7IH0pXG5cdH1cblx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgZWl0aGVyIGFuIGFycmF5IG9yIG9iamVjdCBsaXRlcmFsLicpXG59XG5cbmZ1bmN0aW9uIGxvZ2dlcihtZXNzYWdlKSB7XG5cdHZhciBkZXRhaWxzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuXHR3aGlsZSAoIGxlbi0tID4gMCApIGRldGFpbHNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cblx0aWYgKHRoaXMuY29uc3RydWN0b3IuZGVidWcgJiYgY29uc29sZSkge1xuXHRcdHZhciByZXBvcnQgPSBcIiVjU2Nyb2xsUmV2ZWFsOiBcIiArIG1lc3NhZ2U7XG5cdFx0ZGV0YWlscy5mb3JFYWNoKGZ1bmN0aW9uIChkZXRhaWwpIHsgcmV0dXJuIChyZXBvcnQgKz0gXCJcXG4g4oCUIFwiICsgZGV0YWlsKTsgfSk7XG5cdFx0Y29uc29sZS5sb2cocmVwb3J0LCAnY29sb3I6ICNlYTY1NGI7Jyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHR9XG59XG5cbmZ1bmN0aW9uIHJpbnNlKCkge1xuXHR2YXIgdGhpcyQxID0gdGhpcztcblxuXHR2YXIgc3RydWN0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gKHtcblx0XHRhY3RpdmU6IFtdLFxuXHRcdHN0YWxlOiBbXVxuXHR9KTsgfTtcblxuXHR2YXIgZWxlbWVudElkcyA9IHN0cnVjdCgpO1xuXHR2YXIgc2VxdWVuY2VJZHMgPSBzdHJ1Y3QoKTtcblx0dmFyIGNvbnRhaW5lcklkcyA9IHN0cnVjdCgpO1xuXG5cdC8qKlxuXHQgKiBUYWtlIHN0b2NrIG9mIGFjdGl2ZSBlbGVtZW50IElEcy5cblx0ICovXG5cdHRyeSB7XG5cdFx0ZWFjaCgkKCdbZGF0YS1zci1pZF0nKSwgZnVuY3Rpb24gKG5vZGUpIHtcblx0XHRcdHZhciBpZCA9IHBhcnNlSW50KG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXNyLWlkJykpO1xuXHRcdFx0ZWxlbWVudElkcy5hY3RpdmUucHVzaChpZCk7XG5cdFx0fSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHR0aHJvdyBlXG5cdH1cblx0LyoqXG5cdCAqIERlc3Ryb3kgc3RhbGUgZWxlbWVudHMuXG5cdCAqL1xuXHRlYWNoKHRoaXMuc3RvcmUuZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0aWYgKGVsZW1lbnRJZHMuYWN0aXZlLmluZGV4T2YoZWxlbWVudC5pZCkgPT09IC0xKSB7XG5cdFx0XHRlbGVtZW50SWRzLnN0YWxlLnB1c2goZWxlbWVudC5pZCk7XG5cdFx0fVxuXHR9KTtcblxuXHRlYWNoKGVsZW1lbnRJZHMuc3RhbGUsIGZ1bmN0aW9uIChzdGFsZUlkKSB7IHJldHVybiBkZWxldGUgdGhpcyQxLnN0b3JlLmVsZW1lbnRzW3N0YWxlSWRdOyB9KTtcblxuXHQvKipcblx0ICogVGFrZSBzdG9jayBvZiBhY3RpdmUgY29udGFpbmVyIGFuZCBzZXF1ZW5jZSBJRHMuXG5cdCAqL1xuXHRlYWNoKHRoaXMuc3RvcmUuZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0aWYgKGNvbnRhaW5lcklkcy5hY3RpdmUuaW5kZXhPZihlbGVtZW50LmNvbnRhaW5lcklkKSA9PT0gLTEpIHtcblx0XHRcdGNvbnRhaW5lcklkcy5hY3RpdmUucHVzaChlbGVtZW50LmNvbnRhaW5lcklkKTtcblx0XHR9XG5cdFx0aWYgKGVsZW1lbnQuaGFzT3duUHJvcGVydHkoJ3NlcXVlbmNlJykpIHtcblx0XHRcdGlmIChzZXF1ZW5jZUlkcy5hY3RpdmUuaW5kZXhPZihlbGVtZW50LnNlcXVlbmNlLmlkKSA9PT0gLTEpIHtcblx0XHRcdFx0c2VxdWVuY2VJZHMuYWN0aXZlLnB1c2goZWxlbWVudC5zZXF1ZW5jZS5pZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvKipcblx0ICogRGVzdHJveSBzdGFsZSBjb250YWluZXJzLlxuXHQgKi9cblx0ZWFjaCh0aGlzLnN0b3JlLmNvbnRhaW5lcnMsIGZ1bmN0aW9uIChjb250YWluZXIpIHtcblx0XHRpZiAoY29udGFpbmVySWRzLmFjdGl2ZS5pbmRleE9mKGNvbnRhaW5lci5pZCkgPT09IC0xKSB7XG5cdFx0XHRjb250YWluZXJJZHMuc3RhbGUucHVzaChjb250YWluZXIuaWQpO1xuXHRcdH1cblx0fSk7XG5cblx0ZWFjaChjb250YWluZXJJZHMuc3RhbGUsIGZ1bmN0aW9uIChzdGFsZUlkKSB7XG5cdFx0dmFyIHN0YWxlID0gdGhpcyQxLnN0b3JlLmNvbnRhaW5lcnNbc3RhbGVJZF0ubm9kZTtcblx0XHRzdGFsZS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzJDEuZGVsZWdhdGUpO1xuXHRcdHN0YWxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMkMS5kZWxlZ2F0ZSk7XG5cdFx0ZGVsZXRlIHRoaXMkMS5zdG9yZS5jb250YWluZXJzW3N0YWxlSWRdO1xuXHR9KTtcblxuXHQvKipcblx0ICogRGVzdHJveSBzdGFsZSBzZXF1ZW5jZXMuXG5cdCAqL1xuXHRlYWNoKHRoaXMuc3RvcmUuc2VxdWVuY2VzLCBmdW5jdGlvbiAoc2VxdWVuY2UpIHtcblx0XHRpZiAoc2VxdWVuY2VJZHMuYWN0aXZlLmluZGV4T2Yoc2VxdWVuY2UuaWQpID09PSAtMSkge1xuXHRcdFx0c2VxdWVuY2VJZHMuc3RhbGUucHVzaChzZXF1ZW5jZS5pZCk7XG5cdFx0fVxuXHR9KTtcblxuXHRlYWNoKHNlcXVlbmNlSWRzLnN0YWxlLCBmdW5jdGlvbiAoc3RhbGVJZCkgeyByZXR1cm4gZGVsZXRlIHRoaXMkMS5zdG9yZS5zZXF1ZW5jZXNbc3RhbGVJZF07IH0pO1xufVxuXG5mdW5jdGlvbiBjbGVhbih0YXJnZXQpIHtcblx0dmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0dmFyIGRpcnR5O1xuXHR0cnkge1xuXHRcdGVhY2goJCh0YXJnZXQpLCBmdW5jdGlvbiAobm9kZSkge1xuXHRcdFx0dmFyIGlkID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3ItaWQnKTtcblx0XHRcdGlmIChpZCAhPT0gbnVsbCkge1xuXHRcdFx0XHRkaXJ0eSA9IHRydWU7XG5cdFx0XHRcdHZhciBlbGVtZW50ID0gdGhpcyQxLnN0b3JlLmVsZW1lbnRzW2lkXTtcblx0XHRcdFx0aWYgKGVsZW1lbnQuY2FsbGJhY2tUaW1lcikge1xuXHRcdFx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoZWxlbWVudC5jYWxsYmFja1RpbWVyLmNsb2NrKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBlbGVtZW50LnN0eWxlcy5pbmxpbmUuZ2VuZXJhdGVkKTtcblx0XHRcdFx0bm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3ItaWQnKTtcblx0XHRcdFx0ZGVsZXRlIHRoaXMkMS5zdG9yZS5lbGVtZW50c1tpZF07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gbG9nZ2VyLmNhbGwodGhpcywgJ0NsZWFuIGZhaWxlZC4nLCBlLm1lc3NhZ2UpXG5cdH1cblxuXHRpZiAoZGlydHkpIHtcblx0XHR0cnkge1xuXHRcdFx0cmluc2UuY2FsbCh0aGlzKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gbG9nZ2VyLmNhbGwodGhpcywgJ0NsZWFuIGZhaWxlZC4nLCBlLm1lc3NhZ2UpXG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYWxsIGdlbmVyYXRlZCBzdHlsZXMgYW5kIGVsZW1lbnQgaWRzXG5cdCAqL1xuXHRlYWNoKHRoaXMuc3RvcmUuZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0ZWxlbWVudC5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBlbGVtZW50LnN0eWxlcy5pbmxpbmUuZ2VuZXJhdGVkKTtcblx0XHRlbGVtZW50Lm5vZGUucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyLWlkJyk7XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYWxsIGV2ZW50IGxpc3RlbmVycy5cblx0ICovXG5cdGVhY2godGhpcy5zdG9yZS5jb250YWluZXJzLCBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG5cdFx0dmFyIHRhcmdldCA9XG5cdFx0XHRjb250YWluZXIubm9kZSA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ID8gd2luZG93IDogY29udGFpbmVyLm5vZGU7XG5cdFx0dGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMkMS5kZWxlZ2F0ZSk7XG5cdFx0dGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMkMS5kZWxlZ2F0ZSk7XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBDbGVhciBhbGwgZGF0YSBmcm9tIHRoZSBzdG9yZVxuXHQgKi9cblx0dGhpcy5zdG9yZSA9IHtcblx0XHRjb250YWluZXJzOiB7fSxcblx0XHRlbGVtZW50czoge30sXG5cdFx0aGlzdG9yeTogW10sXG5cdFx0c2VxdWVuY2VzOiB7fVxuXHR9O1xufVxuXG52YXIgZ2V0UHJlZml4ZWRDc3NQcm9wID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHByb3BlcnRpZXMgPSB7fTtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG5cdGZ1bmN0aW9uIGdldFByZWZpeGVkQ3NzUHJvcGVydHkobmFtZSwgc291cmNlKSB7XG5cdFx0aWYgKCBzb3VyY2UgPT09IHZvaWQgMCApIHNvdXJjZSA9IHN0eWxlO1xuXG5cdFx0aWYgKG5hbWUgJiYgdHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAocHJvcGVydGllc1tuYW1lXSkge1xuXHRcdFx0XHRyZXR1cm4gcHJvcGVydGllc1tuYW1lXVxuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBzb3VyY2VbbmFtZV0gPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHJldHVybiAocHJvcGVydGllc1tuYW1lXSA9IG5hbWUpXG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIHNvdXJjZVsoXCItd2Via2l0LVwiICsgbmFtZSldID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRyZXR1cm4gKHByb3BlcnRpZXNbbmFtZV0gPSBcIi13ZWJraXQtXCIgKyBuYW1lKVxuXHRcdFx0fVxuXHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoKFwiVW5hYmxlIHRvIGZpbmQgXFxcIlwiICsgbmFtZSArIFwiXFxcIiBzdHlsZSBwcm9wZXJ0eS5cIikpXG5cdFx0fVxuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nLicpXG5cdH1cblxuXHRnZXRQcmVmaXhlZENzc1Byb3BlcnR5LmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAocHJvcGVydGllcyA9IHt9KTsgfTtcblxuXHRyZXR1cm4gZ2V0UHJlZml4ZWRDc3NQcm9wZXJ0eVxufSkoKTtcblxuZnVuY3Rpb24gc3R5bGUoZWxlbWVudCkge1xuXHR2YXIgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50Lm5vZGUpO1xuXHR2YXIgcG9zaXRpb24gPSBjb21wdXRlZC5wb3NpdGlvbjtcblx0dmFyIGNvbmZpZyA9IGVsZW1lbnQuY29uZmlnO1xuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZSBpbmxpbmUgc3R5bGVzXG5cdCAqL1xuXHR2YXIgaW5saW5lID0ge307XG5cdHZhciBpbmxpbmVTdHlsZSA9IGVsZW1lbnQubm9kZS5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgfHwgJyc7XG5cdHZhciBpbmxpbmVNYXRjaCA9IGlubGluZVN0eWxlLm1hdGNoKC9bXFx3LV0rXFxzKjpcXHMqW147XStcXHMqL2dpKSB8fCBbXTtcblxuXHRpbmxpbmUuY29tcHV0ZWQgPSBpbmxpbmVNYXRjaCA/IGlubGluZU1hdGNoLm1hcChmdW5jdGlvbiAobSkgeyByZXR1cm4gbS50cmltKCk7IH0pLmpvaW4oJzsgJykgKyAnOycgOiAnJztcblxuXHRpbmxpbmUuZ2VuZXJhdGVkID0gaW5saW5lTWF0Y2guc29tZShmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5tYXRjaCgvdmlzaWJpbGl0eVxccz86XFxzP3Zpc2libGUvaSk7IH0pXG5cdFx0PyBpbmxpbmUuY29tcHV0ZWRcblx0XHQ6IGlubGluZU1hdGNoLmNvbmNhdCggWyd2aXNpYmlsaXR5OiB2aXNpYmxlJ10pLm1hcChmdW5jdGlvbiAobSkgeyByZXR1cm4gbS50cmltKCk7IH0pLmpvaW4oJzsgJykgKyAnOyc7XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlIG9wYWNpdHkgc3R5bGVzXG5cdCAqL1xuXHR2YXIgY29tcHV0ZWRPcGFjaXR5ID0gcGFyc2VGbG9hdChjb21wdXRlZC5vcGFjaXR5KTtcblx0dmFyIGNvbmZpZ09wYWNpdHkgPSAhaXNOYU4ocGFyc2VGbG9hdChjb25maWcub3BhY2l0eSkpXG5cdFx0PyBwYXJzZUZsb2F0KGNvbmZpZy5vcGFjaXR5KVxuXHRcdDogcGFyc2VGbG9hdChjb21wdXRlZC5vcGFjaXR5KTtcblxuXHR2YXIgb3BhY2l0eSA9IHtcblx0XHRjb21wdXRlZDogY29tcHV0ZWRPcGFjaXR5ICE9PSBjb25maWdPcGFjaXR5ID8gKFwib3BhY2l0eTogXCIgKyBjb21wdXRlZE9wYWNpdHkgKyBcIjtcIikgOiAnJyxcblx0XHRnZW5lcmF0ZWQ6IGNvbXB1dGVkT3BhY2l0eSAhPT0gY29uZmlnT3BhY2l0eSA/IChcIm9wYWNpdHk6IFwiICsgY29uZmlnT3BhY2l0eSArIFwiO1wiKSA6ICcnXG5cdH07XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlIHRyYW5zZm9ybWF0aW9uIHN0eWxlc1xuXHQgKi9cblx0dmFyIHRyYW5zZm9ybWF0aW9ucyA9IFtdO1xuXG5cdGlmIChwYXJzZUZsb2F0KGNvbmZpZy5kaXN0YW5jZSkpIHtcblx0XHR2YXIgYXhpcyA9IGNvbmZpZy5vcmlnaW4gPT09ICd0b3AnIHx8IGNvbmZpZy5vcmlnaW4gPT09ICdib3R0b20nID8gJ1knIDogJ1gnO1xuXG5cdFx0LyoqXG5cdFx0ICogTGV04oCZcyBtYWtlIHN1cmUgb3VyIG91ciBwaXhlbCBkaXN0YW5jZXMgYXJlIG5lZ2F0aXZlIGZvciB0b3AgYW5kIGxlZnQuXG5cdFx0ICogZS5nLiB7IG9yaWdpbjogJ3RvcCcsIGRpc3RhbmNlOiAnMjVweCcgfSBzdGFydHMgYXQgYHRvcDogLTI1cHhgIGluIENTUy5cblx0XHQgKi9cblx0XHR2YXIgZGlzdGFuY2UgPSBjb25maWcuZGlzdGFuY2U7XG5cdFx0aWYgKGNvbmZpZy5vcmlnaW4gPT09ICd0b3AnIHx8IGNvbmZpZy5vcmlnaW4gPT09ICdsZWZ0Jykge1xuXHRcdFx0ZGlzdGFuY2UgPSAvXi0vLnRlc3QoZGlzdGFuY2UpID8gZGlzdGFuY2Uuc3Vic3RyKDEpIDogKFwiLVwiICsgZGlzdGFuY2UpO1xuXHRcdH1cblxuXHRcdHZhciByZWYgPSBkaXN0YW5jZS5tYXRjaCgvKF4tP1xcZCtcXC4/XFxkPyl8KGVtJHxweCR8JSQpL2cpO1xuXHRcdHZhciB2YWx1ZSA9IHJlZlswXTtcblx0XHR2YXIgdW5pdCA9IHJlZlsxXTtcblxuXHRcdHN3aXRjaCAodW5pdCkge1xuXHRcdFx0Y2FzZSAnZW0nOlxuXHRcdFx0XHRkaXN0YW5jZSA9IHBhcnNlSW50KGNvbXB1dGVkLmZvbnRTaXplKSAqIHZhbHVlO1xuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAncHgnOlxuXHRcdFx0XHRkaXN0YW5jZSA9IHZhbHVlO1xuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnJSc6XG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBIZXJlIHdlIHVzZSBgZ2V0Qm91bmRpbmdDbGllbnRSZWN0YCBpbnN0ZWFkIG9mXG5cdFx0XHRcdCAqIHRoZSBleGlzdGluZyBkYXRhIGF0dGFjaGVkIHRvIGBlbGVtZW50Lmdlb21ldHJ5YFxuXHRcdFx0XHQgKiBiZWNhdXNlIG9ubHkgdGhlIGZvcm1lciBpbmNsdWRlcyBhbnkgdHJhbnNmb3JtYXRpb25zXG5cdFx0XHRcdCAqIGN1cnJlbnQgYXBwbGllZCB0byB0aGUgZWxlbWVudC5cblx0XHRcdFx0ICpcblx0XHRcdFx0ICogSWYgdGhhdCBiZWhhdmlvciBlbmRzIHVwIGJlaW5nIHVuaW50dWl0aXZlLCB0aGlzXG5cdFx0XHRcdCAqIGxvZ2ljIGNvdWxkIGluc3RlYWQgdXRpbGl6ZSBgZWxlbWVudC5nZW9tZXRyeS5oZWlnaHRgXG5cdFx0XHRcdCAqIGFuZCBgZWxlbWVudC5nZW9lbWV0cnkud2lkdGhgIGZvciB0aGUgZGlzdGFuY2UgY2FsY3VsYXRpb25cblx0XHRcdFx0ICovXG5cdFx0XHRcdGRpc3RhbmNlID1cblx0XHRcdFx0XHRheGlzID09PSAnWSdcblx0XHRcdFx0XHRcdD8gKGVsZW1lbnQubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgKiB2YWx1ZSkgLyAxMDBcblx0XHRcdFx0XHRcdDogKGVsZW1lbnQubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAqIHZhbHVlKSAvIDEwMDtcblx0XHRcdFx0YnJlYWtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKCdVbnJlY29nbml6ZWQgb3IgbWlzc2luZyBkaXN0YW5jZSB1bml0LicpXG5cdFx0fVxuXG5cdFx0aWYgKGF4aXMgPT09ICdZJykge1xuXHRcdFx0dHJhbnNmb3JtYXRpb25zLnB1c2godHJhbnNsYXRlWShkaXN0YW5jZSkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0cmFuc2Zvcm1hdGlvbnMucHVzaCh0cmFuc2xhdGVYKGRpc3RhbmNlKSk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGNvbmZpZy5yb3RhdGUueCkgeyB0cmFuc2Zvcm1hdGlvbnMucHVzaChyb3RhdGVYKGNvbmZpZy5yb3RhdGUueCkpOyB9XG5cdGlmIChjb25maWcucm90YXRlLnkpIHsgdHJhbnNmb3JtYXRpb25zLnB1c2gocm90YXRlWShjb25maWcucm90YXRlLnkpKTsgfVxuXHRpZiAoY29uZmlnLnJvdGF0ZS56KSB7IHRyYW5zZm9ybWF0aW9ucy5wdXNoKHJvdGF0ZVooY29uZmlnLnJvdGF0ZS56KSk7IH1cblx0aWYgKGNvbmZpZy5zY2FsZSAhPT0gMSkge1xuXHRcdGlmIChjb25maWcuc2NhbGUgPT09IDApIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIENTUyBUcmFuc2Zvcm1zIG1hdHJpeCBpbnRlcnBvbGF0aW9uIHNwZWNpZmljYXRpb25cblx0XHRcdCAqIGJhc2ljYWxseSBkaXNhbGxvd3MgdHJhbnNpdGlvbnMgb2Ygbm9uLWludmVydGlibGVcblx0XHRcdCAqIG1hdHJpeGVzLCB3aGljaCBtZWFucyBicm93c2VycyB3b24ndCB0cmFuc2l0aW9uXG5cdFx0XHQgKiBlbGVtZW50cyB3aXRoIHplcm8gc2NhbGUuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhhdOKAmXMgaW5jb252ZW5pZW50IGZvciB0aGUgQVBJIGFuZCBkZXZlbG9wZXJcblx0XHRcdCAqIGV4cGVyaWVuY2UsIHNvIHdlIHNpbXBseSBudWRnZSB0aGVpciB2YWx1ZVxuXHRcdFx0ICogc2xpZ2h0bHkgYWJvdmUgemVybzsgdGhpcyBhbGxvd3MgYnJvd3NlcnNcblx0XHRcdCAqIHRvIHRyYW5zaXRpb24gb3VyIGVsZW1lbnQgYXMgZXhwZWN0ZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogYDAuMDAwMmAgd2FzIHRoZSBzbWFsbGVzdCBudW1iZXJcblx0XHRcdCAqIHRoYXQgcGVyZm9ybWVkIGFjcm9zcyBicm93c2Vycy5cblx0XHRcdCAqL1xuXHRcdFx0dHJhbnNmb3JtYXRpb25zLnB1c2goc2NhbGUoMC4wMDAyKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRyYW5zZm9ybWF0aW9ucy5wdXNoKHNjYWxlKGNvbmZpZy5zY2FsZSkpO1xuXHRcdH1cblx0fVxuXG5cdHZhciB0cmFuc2Zvcm0gPSB7fTtcblx0aWYgKHRyYW5zZm9ybWF0aW9ucy5sZW5ndGgpIHtcblx0XHR0cmFuc2Zvcm0ucHJvcGVydHkgPSBnZXRQcmVmaXhlZENzc1Byb3AoJ3RyYW5zZm9ybScpO1xuXHRcdC8qKlxuXHRcdCAqIFRoZSBkZWZhdWx0IGNvbXB1dGVkIHRyYW5zZm9ybSB2YWx1ZSBzaG91bGQgYmUgb25lIG9mOlxuXHRcdCAqIHVuZGVmaW5lZCB8fCAnbm9uZScgfHwgJ21hdHJpeCgpJyB8fCAnbWF0cml4M2QoKSdcblx0XHQgKi9cblx0XHR0cmFuc2Zvcm0uY29tcHV0ZWQgPSB7XG5cdFx0XHRyYXc6IGNvbXB1dGVkW3RyYW5zZm9ybS5wcm9wZXJ0eV0sXG5cdFx0XHRtYXRyaXg6IHBhcnNlKGNvbXB1dGVkW3RyYW5zZm9ybS5wcm9wZXJ0eV0pXG5cdFx0fTtcblxuXHRcdHRyYW5zZm9ybWF0aW9ucy51bnNoaWZ0KHRyYW5zZm9ybS5jb21wdXRlZC5tYXRyaXgpO1xuXHRcdHZhciBwcm9kdWN0ID0gdHJhbnNmb3JtYXRpb25zLnJlZHVjZShtdWx0aXBseSk7XG5cblx0XHR0cmFuc2Zvcm0uZ2VuZXJhdGVkID0ge1xuXHRcdFx0aW5pdGlhbDogKCh0cmFuc2Zvcm0ucHJvcGVydHkpICsgXCI6IG1hdHJpeDNkKFwiICsgKHByb2R1Y3Quam9pbignLCAnKSkgKyBcIik7XCIpLFxuXHRcdFx0ZmluYWw6ICgodHJhbnNmb3JtLnByb3BlcnR5KSArIFwiOiBtYXRyaXgzZChcIiArICh0cmFuc2Zvcm0uY29tcHV0ZWQubWF0cml4LmpvaW4oJywgJykpICsgXCIpO1wiKVxuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0dHJhbnNmb3JtLmdlbmVyYXRlZCA9IHtcblx0XHRcdGluaXRpYWw6ICcnLFxuXHRcdFx0ZmluYWw6ICcnXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZSB0cmFuc2l0aW9uIHN0eWxlc1xuXHQgKi9cblx0dmFyIHRyYW5zaXRpb24gPSB7fTtcblx0aWYgKG9wYWNpdHkuZ2VuZXJhdGVkIHx8IHRyYW5zZm9ybS5nZW5lcmF0ZWQuaW5pdGlhbCkge1xuXHRcdHRyYW5zaXRpb24ucHJvcGVydHkgPSBnZXRQcmVmaXhlZENzc1Byb3AoJ3RyYW5zaXRpb24nKTtcblx0XHR0cmFuc2l0aW9uLmNvbXB1dGVkID0gY29tcHV0ZWRbdHJhbnNpdGlvbi5wcm9wZXJ0eV07XG5cdFx0dHJhbnNpdGlvbi5mcmFnbWVudHMgPSBbXTtcblxuXHRcdHZhciBkZWxheSA9IGNvbmZpZy5kZWxheTtcblx0XHR2YXIgZHVyYXRpb24gPSBjb25maWcuZHVyYXRpb247XG5cdFx0dmFyIGVhc2luZyA9IGNvbmZpZy5lYXNpbmc7XG5cblx0XHRpZiAob3BhY2l0eS5nZW5lcmF0ZWQpIHtcblx0XHRcdHRyYW5zaXRpb24uZnJhZ21lbnRzLnB1c2goe1xuXHRcdFx0XHRkZWxheWVkOiAoXCJvcGFjaXR5IFwiICsgKGR1cmF0aW9uIC8gMTAwMCkgKyBcInMgXCIgKyBlYXNpbmcgKyBcIiBcIiArIChkZWxheSAvIDEwMDApICsgXCJzXCIpLFxuXHRcdFx0XHRpbnN0YW50OiAoXCJvcGFjaXR5IFwiICsgKGR1cmF0aW9uIC8gMTAwMCkgKyBcInMgXCIgKyBlYXNpbmcgKyBcIiAwc1wiKVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKHRyYW5zZm9ybS5nZW5lcmF0ZWQuaW5pdGlhbCkge1xuXHRcdFx0dHJhbnNpdGlvbi5mcmFnbWVudHMucHVzaCh7XG5cdFx0XHRcdGRlbGF5ZWQ6ICgodHJhbnNmb3JtLnByb3BlcnR5KSArIFwiIFwiICsgKGR1cmF0aW9uIC8gMTAwMCkgKyBcInMgXCIgKyBlYXNpbmcgKyBcIiBcIiArIChkZWxheSAvIDEwMDApICsgXCJzXCIpLFxuXHRcdFx0XHRpbnN0YW50OiAoKHRyYW5zZm9ybS5wcm9wZXJ0eSkgKyBcIiBcIiArIChkdXJhdGlvbiAvIDEwMDApICsgXCJzIFwiICsgZWFzaW5nICsgXCIgMHNcIilcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBkZWZhdWx0IGNvbXB1dGVkIHRyYW5zaXRpb24gcHJvcGVydHkgc2hvdWxkIGJlIHVuZGVmaW5lZCwgb3Igb25lIG9mOlxuXHRcdCAqICcnIHx8ICdub25lIDBzIGVhc2UgMHMnIHx8ICdhbGwgMHMgZWFzZSAwcycgfHwgJ2FsbCAwcyAwcyBjdWJpYy1iZXppZXIoKSdcblx0XHQgKi9cblx0XHR2YXIgaGFzQ3VzdG9tVHJhbnNpdGlvbiA9XG5cdFx0XHR0cmFuc2l0aW9uLmNvbXB1dGVkICYmICF0cmFuc2l0aW9uLmNvbXB1dGVkLm1hdGNoKC9hbGwgMHN8bm9uZSAwcy8pO1xuXG5cdFx0aWYgKGhhc0N1c3RvbVRyYW5zaXRpb24pIHtcblx0XHRcdHRyYW5zaXRpb24uZnJhZ21lbnRzLnVuc2hpZnQoe1xuXHRcdFx0XHRkZWxheWVkOiB0cmFuc2l0aW9uLmNvbXB1dGVkLFxuXHRcdFx0XHRpbnN0YW50OiB0cmFuc2l0aW9uLmNvbXB1dGVkXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR2YXIgY29tcG9zZWQgPSB0cmFuc2l0aW9uLmZyYWdtZW50cy5yZWR1Y2UoXG5cdFx0XHRmdW5jdGlvbiAoY29tcG9zaXRpb24sIGZyYWdtZW50LCBpKSB7XG5cdFx0XHRcdGNvbXBvc2l0aW9uLmRlbGF5ZWQgKz0gaSA9PT0gMCA/IGZyYWdtZW50LmRlbGF5ZWQgOiAoXCIsIFwiICsgKGZyYWdtZW50LmRlbGF5ZWQpKTtcblx0XHRcdFx0Y29tcG9zaXRpb24uaW5zdGFudCArPSBpID09PSAwID8gZnJhZ21lbnQuaW5zdGFudCA6IChcIiwgXCIgKyAoZnJhZ21lbnQuaW5zdGFudCkpO1xuXHRcdFx0XHRyZXR1cm4gY29tcG9zaXRpb25cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGRlbGF5ZWQ6ICcnLFxuXHRcdFx0XHRpbnN0YW50OiAnJ1xuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHR0cmFuc2l0aW9uLmdlbmVyYXRlZCA9IHtcblx0XHRcdGRlbGF5ZWQ6ICgodHJhbnNpdGlvbi5wcm9wZXJ0eSkgKyBcIjogXCIgKyAoY29tcG9zZWQuZGVsYXllZCkgKyBcIjtcIiksXG5cdFx0XHRpbnN0YW50OiAoKHRyYW5zaXRpb24ucHJvcGVydHkpICsgXCI6IFwiICsgKGNvbXBvc2VkLmluc3RhbnQpICsgXCI7XCIpXG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHR0cmFuc2l0aW9uLmdlbmVyYXRlZCA9IHtcblx0XHRcdGRlbGF5ZWQ6ICcnLFxuXHRcdFx0aW5zdGFudDogJydcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbmxpbmU6IGlubGluZSxcblx0XHRvcGFjaXR5OiBvcGFjaXR5LFxuXHRcdHBvc2l0aW9uOiBwb3NpdGlvbixcblx0XHR0cmFuc2Zvcm06IHRyYW5zZm9ybSxcblx0XHR0cmFuc2l0aW9uOiB0cmFuc2l0aW9uXG5cdH1cbn1cblxuZnVuY3Rpb24gYW5pbWF0ZShlbGVtZW50LCBmb3JjZSkge1xuXHRpZiAoIGZvcmNlID09PSB2b2lkIDAgKSBmb3JjZSA9IHt9O1xuXG5cdHZhciBwcmlzdGluZSA9IGZvcmNlLnByaXN0aW5lIHx8IHRoaXMucHJpc3RpbmU7XG5cdHZhciBkZWxheWVkID1cblx0XHRlbGVtZW50LmNvbmZpZy51c2VEZWxheSA9PT0gJ2Fsd2F5cycgfHxcblx0XHQoZWxlbWVudC5jb25maWcudXNlRGVsYXkgPT09ICdvbmxvYWQnICYmIHByaXN0aW5lKSB8fFxuXHRcdChlbGVtZW50LmNvbmZpZy51c2VEZWxheSA9PT0gJ29uY2UnICYmICFlbGVtZW50LnNlZW4pO1xuXG5cdHZhciBzaG91bGRSZXZlYWwgPSBlbGVtZW50LnZpc2libGUgJiYgIWVsZW1lbnQucmV2ZWFsZWQ7XG5cdHZhciBzaG91bGRSZXNldCA9ICFlbGVtZW50LnZpc2libGUgJiYgZWxlbWVudC5yZXZlYWxlZCAmJiBlbGVtZW50LmNvbmZpZy5yZXNldDtcblxuXHRpZiAoZm9yY2UucmV2ZWFsIHx8IHNob3VsZFJldmVhbCkge1xuXHRcdHJldHVybiB0cmlnZ2VyUmV2ZWFsLmNhbGwodGhpcywgZWxlbWVudCwgZGVsYXllZClcblx0fVxuXG5cdGlmIChmb3JjZS5yZXNldCB8fCBzaG91bGRSZXNldCkge1xuXHRcdHJldHVybiB0cmlnZ2VyUmVzZXQuY2FsbCh0aGlzLCBlbGVtZW50KVxuXHR9XG59XG5cbmZ1bmN0aW9uIHRyaWdnZXJSZXZlYWwoZWxlbWVudCwgZGVsYXllZCkge1xuXHR2YXIgc3R5bGVzID0gW1xuXHRcdGVsZW1lbnQuc3R5bGVzLmlubGluZS5nZW5lcmF0ZWQsXG5cdFx0ZWxlbWVudC5zdHlsZXMub3BhY2l0eS5jb21wdXRlZCxcblx0XHRlbGVtZW50LnN0eWxlcy50cmFuc2Zvcm0uZ2VuZXJhdGVkLmZpbmFsXG5cdF07XG5cdGlmIChkZWxheWVkKSB7XG5cdFx0c3R5bGVzLnB1c2goZWxlbWVudC5zdHlsZXMudHJhbnNpdGlvbi5nZW5lcmF0ZWQuZGVsYXllZCk7XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGVzLnB1c2goZWxlbWVudC5zdHlsZXMudHJhbnNpdGlvbi5nZW5lcmF0ZWQuaW5zdGFudCk7XG5cdH1cblx0ZWxlbWVudC5yZXZlYWxlZCA9IGVsZW1lbnQuc2VlbiA9IHRydWU7XG5cdGVsZW1lbnQubm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGVzLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gcyAhPT0gJyc7IH0pLmpvaW4oJyAnKSk7XG5cdHJlZ2lzdGVyQ2FsbGJhY2tzLmNhbGwodGhpcywgZWxlbWVudCwgZGVsYXllZCk7XG59XG5cbmZ1bmN0aW9uIHRyaWdnZXJSZXNldChlbGVtZW50KSB7XG5cdHZhciBzdHlsZXMgPSBbXG5cdFx0ZWxlbWVudC5zdHlsZXMuaW5saW5lLmdlbmVyYXRlZCxcblx0XHRlbGVtZW50LnN0eWxlcy5vcGFjaXR5LmdlbmVyYXRlZCxcblx0XHRlbGVtZW50LnN0eWxlcy50cmFuc2Zvcm0uZ2VuZXJhdGVkLmluaXRpYWwsXG5cdFx0ZWxlbWVudC5zdHlsZXMudHJhbnNpdGlvbi5nZW5lcmF0ZWQuaW5zdGFudFxuXHRdO1xuXHRlbGVtZW50LnJldmVhbGVkID0gZmFsc2U7XG5cdGVsZW1lbnQubm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGVzLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gcyAhPT0gJyc7IH0pLmpvaW4oJyAnKSk7XG5cdHJlZ2lzdGVyQ2FsbGJhY2tzLmNhbGwodGhpcywgZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyQ2FsbGJhY2tzKGVsZW1lbnQsIGlzRGVsYXllZCkge1xuXHR2YXIgdGhpcyQxID0gdGhpcztcblxuXHR2YXIgZHVyYXRpb24gPSBpc0RlbGF5ZWRcblx0XHQ/IGVsZW1lbnQuY29uZmlnLmR1cmF0aW9uICsgZWxlbWVudC5jb25maWcuZGVsYXlcblx0XHQ6IGVsZW1lbnQuY29uZmlnLmR1cmF0aW9uO1xuXG5cdHZhciBiZWZvcmVDYWxsYmFjayA9IGVsZW1lbnQucmV2ZWFsZWRcblx0XHQ/IGVsZW1lbnQuY29uZmlnLmJlZm9yZVJldmVhbFxuXHRcdDogZWxlbWVudC5jb25maWcuYmVmb3JlUmVzZXQ7XG5cblx0dmFyIGFmdGVyQ2FsbGJhY2sgPSBlbGVtZW50LnJldmVhbGVkXG5cdFx0PyBlbGVtZW50LmNvbmZpZy5hZnRlclJldmVhbFxuXHRcdDogZWxlbWVudC5jb25maWcuYWZ0ZXJSZXNldDtcblxuXHR2YXIgZWxhcHNlZCA9IDA7XG5cdGlmIChlbGVtZW50LmNhbGxiYWNrVGltZXIpIHtcblx0XHRlbGFwc2VkID0gRGF0ZS5ub3coKSAtIGVsZW1lbnQuY2FsbGJhY2tUaW1lci5zdGFydDtcblx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KGVsZW1lbnQuY2FsbGJhY2tUaW1lci5jbG9jayk7XG5cdH1cblxuXHRiZWZvcmVDYWxsYmFjayhlbGVtZW50Lm5vZGUpO1xuXG5cdGVsZW1lbnQuY2FsbGJhY2tUaW1lciA9IHtcblx0XHRzdGFydDogRGF0ZS5ub3coKSxcblx0XHRjbG9jazogd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0YWZ0ZXJDYWxsYmFjayhlbGVtZW50Lm5vZGUpO1xuXHRcdFx0ZWxlbWVudC5jYWxsYmFja1RpbWVyID0gbnVsbDtcblx0XHRcdGlmIChlbGVtZW50LnJldmVhbGVkICYmICFlbGVtZW50LmNvbmZpZy5yZXNldCAmJiBlbGVtZW50LmNvbmZpZy5jbGVhbnVwKSB7XG5cdFx0XHRcdGNsZWFuLmNhbGwodGhpcyQxLCBlbGVtZW50Lm5vZGUpO1xuXHRcdFx0fVxuXHRcdH0sIGR1cmF0aW9uIC0gZWxhcHNlZClcblx0fTtcbn1cblxudmFyIG5leHRVbmlxdWVJZCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB1aWQgPSAwO1xuXHRyZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gdWlkKys7IH1cbn0pKCk7XG5cbmZ1bmN0aW9uIHNlcXVlbmNlKGVsZW1lbnQsIHByaXN0aW5lKSB7XG5cdGlmICggcHJpc3RpbmUgPT09IHZvaWQgMCApIHByaXN0aW5lID0gdGhpcy5wcmlzdGluZTtcblxuXHQvKipcblx0ICogV2UgZmlyc3QgY2hlY2sgaWYgdGhlIGVsZW1lbnQgc2hvdWxkIHJlc2V0LlxuXHQgKi9cblx0aWYgKCFlbGVtZW50LnZpc2libGUgJiYgZWxlbWVudC5yZXZlYWxlZCAmJiBlbGVtZW50LmNvbmZpZy5yZXNldCkge1xuXHRcdHJldHVybiBhbmltYXRlLmNhbGwodGhpcywgZWxlbWVudCwgeyByZXNldDogdHJ1ZSB9KVxuXHR9XG5cblx0dmFyIHNlcSA9IHRoaXMuc3RvcmUuc2VxdWVuY2VzW2VsZW1lbnQuc2VxdWVuY2UuaWRdO1xuXHR2YXIgaSA9IGVsZW1lbnQuc2VxdWVuY2UuaW5kZXg7XG5cblx0aWYgKHNlcSkge1xuXHRcdHZhciB2aXNpYmxlID0gbmV3IFNlcXVlbmNlTW9kZWwoc2VxLCAndmlzaWJsZScsIHRoaXMuc3RvcmUpO1xuXHRcdHZhciByZXZlYWxlZCA9IG5ldyBTZXF1ZW5jZU1vZGVsKHNlcSwgJ3JldmVhbGVkJywgdGhpcy5zdG9yZSk7XG5cblx0XHRzZXEubW9kZWxzID0geyB2aXNpYmxlOiB2aXNpYmxlLCByZXZlYWxlZDogcmV2ZWFsZWQgfTtcblxuXHRcdC8qKlxuXHRcdCAqIElmIHRoZSBzZXF1ZW5jZSBoYXMgbm8gcmV2ZWFsZWQgbWVtYmVycyxcblx0XHQgKiB0aGVuIHdlIHJldmVhbCB0aGUgZmlyc3QgdmlzaWJsZSBlbGVtZW50XG5cdFx0ICogd2l0aGluIHRoYXQgc2VxdWVuY2UuXG5cdFx0ICpcblx0XHQgKiBUaGUgc2VxdWVuY2UgdGhlbiBjdWVzIGEgcmVjdXJzaXZlIGNhbGxcblx0XHQgKiBpbiBib3RoIGRpcmVjdGlvbnMuXG5cdFx0ICovXG5cdFx0aWYgKCFyZXZlYWxlZC5ib2R5Lmxlbmd0aCkge1xuXHRcdFx0dmFyIG5leHRJZCA9IHNlcS5tZW1iZXJzW3Zpc2libGUuYm9keVswXV07XG5cdFx0XHR2YXIgbmV4dEVsZW1lbnQgPSB0aGlzLnN0b3JlLmVsZW1lbnRzW25leHRJZF07XG5cblx0XHRcdGlmIChuZXh0RWxlbWVudCkge1xuXHRcdFx0XHRjdWUuY2FsbCh0aGlzLCBzZXEsIHZpc2libGUuYm9keVswXSwgLTEsIHByaXN0aW5lKTtcblx0XHRcdFx0Y3VlLmNhbGwodGhpcywgc2VxLCB2aXNpYmxlLmJvZHlbMF0sICsxLCBwcmlzdGluZSk7XG5cdFx0XHRcdHJldHVybiBhbmltYXRlLmNhbGwodGhpcywgbmV4dEVsZW1lbnQsIHsgcmV2ZWFsOiB0cnVlLCBwcmlzdGluZTogcHJpc3RpbmUgfSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBJZiBvdXIgZWxlbWVudCBpc27igJl0IHJlc2V0dGluZywgd2UgY2hlY2sgdGhlXG5cdFx0ICogZWxlbWVudCBzZXF1ZW5jZSBpbmRleCBhZ2FpbnN0IHRoZSBoZWFkLCBhbmRcblx0XHQgKiB0aGVuIHRoZSBmb290IG9mIHRoZSBzZXF1ZW5jZS5cblx0XHQgKi9cblx0XHRpZiAoXG5cdFx0XHQhc2VxLmJsb2NrZWQuaGVhZCAmJlxuXHRcdFx0aSA9PT0gW10uY29uY2F0KCByZXZlYWxlZC5oZWFkICkucG9wKCkgJiZcblx0XHRcdGkgPj0gW10uY29uY2F0KCB2aXNpYmxlLmJvZHkgKS5zaGlmdCgpXG5cdFx0KSB7XG5cdFx0XHRjdWUuY2FsbCh0aGlzLCBzZXEsIGksIC0xLCBwcmlzdGluZSk7XG5cdFx0XHRyZXR1cm4gYW5pbWF0ZS5jYWxsKHRoaXMsIGVsZW1lbnQsIHsgcmV2ZWFsOiB0cnVlLCBwcmlzdGluZTogcHJpc3RpbmUgfSlcblx0XHR9XG5cblx0XHRpZiAoXG5cdFx0XHQhc2VxLmJsb2NrZWQuZm9vdCAmJlxuXHRcdFx0aSA9PT0gW10uY29uY2F0KCByZXZlYWxlZC5mb290ICkuc2hpZnQoKSAmJlxuXHRcdFx0aSA8PSBbXS5jb25jYXQoIHZpc2libGUuYm9keSApLnBvcCgpXG5cdFx0KSB7XG5cdFx0XHRjdWUuY2FsbCh0aGlzLCBzZXEsIGksICsxLCBwcmlzdGluZSk7XG5cdFx0XHRyZXR1cm4gYW5pbWF0ZS5jYWxsKHRoaXMsIGVsZW1lbnQsIHsgcmV2ZWFsOiB0cnVlLCBwcmlzdGluZTogcHJpc3RpbmUgfSlcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gU2VxdWVuY2UoaW50ZXJ2YWwpIHtcblx0dmFyIGkgPSBNYXRoLmFicyhpbnRlcnZhbCk7XG5cdGlmICghaXNOYU4oaSkpIHtcblx0XHR0aGlzLmlkID0gbmV4dFVuaXF1ZUlkKCk7XG5cdFx0dGhpcy5pbnRlcnZhbCA9IE1hdGgubWF4KGksIDE2KTtcblx0XHR0aGlzLm1lbWJlcnMgPSBbXTtcblx0XHR0aGlzLm1vZGVscyA9IHt9O1xuXHRcdHRoaXMuYmxvY2tlZCA9IHtcblx0XHRcdGhlYWQ6IGZhbHNlLFxuXHRcdFx0Zm9vdDogZmFsc2Vcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHNlcXVlbmNlIGludGVydmFsLicpXG5cdH1cbn1cblxuZnVuY3Rpb24gU2VxdWVuY2VNb2RlbChzZXEsIHByb3AsIHN0b3JlKSB7XG5cdHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdHRoaXMuaGVhZCA9IFtdO1xuXHR0aGlzLmJvZHkgPSBbXTtcblx0dGhpcy5mb290ID0gW107XG5cblx0ZWFjaChzZXEubWVtYmVycywgZnVuY3Rpb24gKGlkLCBpbmRleCkge1xuXHRcdHZhciBlbGVtZW50ID0gc3RvcmUuZWxlbWVudHNbaWRdO1xuXHRcdGlmIChlbGVtZW50ICYmIGVsZW1lbnRbcHJvcF0pIHtcblx0XHRcdHRoaXMkMS5ib2R5LnB1c2goaW5kZXgpO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKHRoaXMuYm9keS5sZW5ndGgpIHtcblx0XHRlYWNoKHNlcS5tZW1iZXJzLCBmdW5jdGlvbiAoaWQsIGluZGV4KSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IHN0b3JlLmVsZW1lbnRzW2lkXTtcblx0XHRcdGlmIChlbGVtZW50ICYmICFlbGVtZW50W3Byb3BdKSB7XG5cdFx0XHRcdGlmIChpbmRleCA8IHRoaXMkMS5ib2R5WzBdKSB7XG5cdFx0XHRcdFx0dGhpcyQxLmhlYWQucHVzaChpbmRleCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcyQxLmZvb3QucHVzaChpbmRleCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5mdW5jdGlvbiBjdWUoc2VxLCBpLCBkaXJlY3Rpb24sIHByaXN0aW5lKSB7XG5cdHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdHZhciBibG9ja2VkID0gWydoZWFkJywgbnVsbCwgJ2Zvb3QnXVsxICsgZGlyZWN0aW9uXTtcblx0dmFyIG5leHRJZCA9IHNlcS5tZW1iZXJzW2kgKyBkaXJlY3Rpb25dO1xuXHR2YXIgbmV4dEVsZW1lbnQgPSB0aGlzLnN0b3JlLmVsZW1lbnRzW25leHRJZF07XG5cblx0c2VxLmJsb2NrZWRbYmxvY2tlZF0gPSB0cnVlO1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdHNlcS5ibG9ja2VkW2Jsb2NrZWRdID0gZmFsc2U7XG5cdFx0aWYgKG5leHRFbGVtZW50KSB7XG5cdFx0XHRzZXF1ZW5jZS5jYWxsKHRoaXMkMSwgbmV4dEVsZW1lbnQsIHByaXN0aW5lKTtcblx0XHR9XG5cdH0sIHNlcS5pbnRlcnZhbCk7XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG5cdHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdHJpbnNlLmNhbGwodGhpcyk7XG5cblx0ZWFjaCh0aGlzLnN0b3JlLmVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdHZhciBzdHlsZXMgPSBbZWxlbWVudC5zdHlsZXMuaW5saW5lLmdlbmVyYXRlZF07XG5cblx0XHRpZiAoZWxlbWVudC52aXNpYmxlKSB7XG5cdFx0XHRzdHlsZXMucHVzaChlbGVtZW50LnN0eWxlcy5vcGFjaXR5LmNvbXB1dGVkKTtcblx0XHRcdHN0eWxlcy5wdXNoKGVsZW1lbnQuc3R5bGVzLnRyYW5zZm9ybS5nZW5lcmF0ZWQuZmluYWwpO1xuXHRcdFx0ZWxlbWVudC5yZXZlYWxlZCA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlcy5wdXNoKGVsZW1lbnQuc3R5bGVzLm9wYWNpdHkuZ2VuZXJhdGVkKTtcblx0XHRcdHN0eWxlcy5wdXNoKGVsZW1lbnQuc3R5bGVzLnRyYW5zZm9ybS5nZW5lcmF0ZWQuaW5pdGlhbCk7XG5cdFx0XHRlbGVtZW50LnJldmVhbGVkID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZWxlbWVudC5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZXMuZmlsdGVyKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzICE9PSAnJzsgfSkuam9pbignICcpKTtcblx0fSk7XG5cblx0ZWFjaCh0aGlzLnN0b3JlLmNvbnRhaW5lcnMsIGZ1bmN0aW9uIChjb250YWluZXIpIHtcblx0XHR2YXIgdGFyZ2V0ID1cblx0XHRcdGNvbnRhaW5lci5ub2RlID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgPyB3aW5kb3cgOiBjb250YWluZXIubm9kZTtcblx0XHR0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcyQxLmRlbGVnYXRlKTtcblx0XHR0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcyQxLmRlbGVnYXRlKTtcblx0fSk7XG5cblx0LyoqXG5cdCAqIE1hbnVhbGx5IGludm9rZSBkZWxlZ2F0ZSBvbmNlIHRvIGNhcHR1cmVcblx0ICogZWxlbWVudCBhbmQgY29udGFpbmVyIGRpbWVuc2lvbnMsIGNvbnRhaW5lclxuXHQgKiBzY3JvbGwgcG9zaXRpb24sIGFuZCB0cmlnZ2VyIGFueSB2YWxpZCByZXZlYWxzXG5cdCAqL1xuXHR0aGlzLmRlbGVnYXRlKCk7XG5cblx0LyoqXG5cdCAqIFdpcGUgYW55IGV4aXN0aW5nIGBzZXRUaW1lb3V0YCBub3dcblx0ICogdGhhdCBpbml0aWFsaXphdGlvbiBoYXMgY29tcGxldGVkLlxuXHQgKi9cblx0dGhpcy5pbml0VGltZW91dCA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzTW9iaWxlKGFnZW50KSB7XG5cdGlmICggYWdlbnQgPT09IHZvaWQgMCApIGFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuXHRyZXR1cm4gL0FuZHJvaWR8aVBob25lfGlQYWR8aVBvZC9pLnRlc3QoYWdlbnQpXG59XG5cbmZ1bmN0aW9uIGRlZXBBc3NpZ24odGFyZ2V0KSB7XG5cdHZhciBzb3VyY2VzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuXHR3aGlsZSAoIGxlbi0tID4gMCApIHNvdXJjZXNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cblx0aWYgKGlzT2JqZWN0KHRhcmdldCkpIHtcblx0XHRlYWNoKHNvdXJjZXMsIGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdGVhY2goc291cmNlLCBmdW5jdGlvbiAoZGF0YSwga2V5KSB7XG5cdFx0XHRcdGlmIChpc09iamVjdChkYXRhKSkge1xuXHRcdFx0XHRcdGlmICghdGFyZ2V0W2tleV0gfHwgIWlzT2JqZWN0KHRhcmdldFtrZXldKSkge1xuXHRcdFx0XHRcdFx0dGFyZ2V0W2tleV0gPSB7fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGVlcEFzc2lnbih0YXJnZXRba2V5XSwgZGF0YSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGFyZ2V0W2tleV0gPSBkYXRhO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGFyZ2V0XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVGFyZ2V0IG11c3QgYmUgYW4gb2JqZWN0IGxpdGVyYWwuJylcblx0fVxufVxuXG5mdW5jdGlvbiByZXZlYWwodGFyZ2V0LCBvcHRpb25zLCBzeW5jaW5nKSB7XG5cdHZhciB0aGlzJDEgPSB0aGlzO1xuXHRpZiAoIG9wdGlvbnMgPT09IHZvaWQgMCApIG9wdGlvbnMgPSB7fTtcblx0aWYgKCBzeW5jaW5nID09PSB2b2lkIDAgKSBzeW5jaW5nID0gZmFsc2U7XG5cblx0dmFyIGNvbnRhaW5lckJ1ZmZlciA9IFtdO1xuXHR2YXIgc2VxdWVuY2UkJDE7XG5cdHZhciBpbnRlcnZhbCA9IG9wdGlvbnMuaW50ZXJ2YWwgfHwgZGVmYXVsdHMuaW50ZXJ2YWw7XG5cblx0dHJ5IHtcblx0XHRpZiAoaW50ZXJ2YWwpIHtcblx0XHRcdHNlcXVlbmNlJCQxID0gbmV3IFNlcXVlbmNlKGludGVydmFsKTtcblx0XHR9XG5cblx0XHR2YXIgbm9kZXMgPSAkKHRhcmdldCk7XG5cdFx0aWYgKCFub2Rlcy5sZW5ndGgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCByZXZlYWwgdGFyZ2V0LicpXG5cdFx0fVxuXG5cdFx0dmFyIGVsZW1lbnRzID0gbm9kZXMucmVkdWNlKGZ1bmN0aW9uIChlbGVtZW50QnVmZmVyLCBlbGVtZW50Tm9kZSkge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSB7fTtcblx0XHRcdHZhciBleGlzdGluZ0lkID0gZWxlbWVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXNyLWlkJyk7XG5cblx0XHRcdGlmIChleGlzdGluZ0lkKSB7XG5cdFx0XHRcdGRlZXBBc3NpZ24oZWxlbWVudCwgdGhpcyQxLnN0b3JlLmVsZW1lbnRzW2V4aXN0aW5nSWRdKTtcblxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogSW4gb3JkZXIgdG8gcHJldmVudCBwcmV2aW91c2x5IGdlbmVyYXRlZCBzdHlsZXNcblx0XHRcdFx0ICogZnJvbSB0aHJvd2luZyBvZmYgdGhlIG5ldyBzdHlsZXMsIHRoZSBzdHlsZSB0YWdcblx0XHRcdFx0ICogaGFzIHRvIGJlIHJldmVydGVkIHRvIGl0cyBwcmUtcmV2ZWFsIHN0YXRlLlxuXHRcdFx0XHQgKi9cblx0XHRcdFx0ZWxlbWVudC5ub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBlbGVtZW50LnN0eWxlcy5pbmxpbmUuY29tcHV0ZWQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbWVudC5pZCA9IG5leHRVbmlxdWVJZCgpO1xuXHRcdFx0XHRlbGVtZW50Lm5vZGUgPSBlbGVtZW50Tm9kZTtcblx0XHRcdFx0ZWxlbWVudC5zZWVuID0gZmFsc2U7XG5cdFx0XHRcdGVsZW1lbnQucmV2ZWFsZWQgPSBmYWxzZTtcblx0XHRcdFx0ZWxlbWVudC52aXNpYmxlID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBjb25maWcgPSBkZWVwQXNzaWduKHt9LCBlbGVtZW50LmNvbmZpZyB8fCB0aGlzJDEuZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG5cdFx0XHRpZiAoKCFjb25maWcubW9iaWxlICYmIGlzTW9iaWxlKCkpIHx8ICghY29uZmlnLmRlc2t0b3AgJiYgIWlzTW9iaWxlKCkpKSB7XG5cdFx0XHRcdGlmIChleGlzdGluZ0lkKSB7XG5cdFx0XHRcdFx0Y2xlYW4uY2FsbCh0aGlzJDEsIGVsZW1lbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBlbGVtZW50QnVmZmVyIC8vIHNraXAgZWxlbWVudHMgdGhhdCBhcmUgZGlzYWJsZWRcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNvbnRhaW5lck5vZGUgPSAkKGNvbmZpZy5jb250YWluZXIpWzBdO1xuXHRcdFx0aWYgKCFjb250YWluZXJOb2RlKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb250YWluZXIuJylcblx0XHRcdH1cblx0XHRcdGlmICghY29udGFpbmVyTm9kZS5jb250YWlucyhlbGVtZW50Tm9kZSkpIHtcblx0XHRcdFx0cmV0dXJuIGVsZW1lbnRCdWZmZXIgLy8gc2tpcCBlbGVtZW50cyBmb3VuZCBvdXRzaWRlIHRoZSBjb250YWluZXJcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNvbnRhaW5lcklkO1xuXHRcdFx0e1xuXHRcdFx0XHRjb250YWluZXJJZCA9IGdldENvbnRhaW5lcklkKFxuXHRcdFx0XHRcdGNvbnRhaW5lck5vZGUsXG5cdFx0XHRcdFx0Y29udGFpbmVyQnVmZmVyLFxuXHRcdFx0XHRcdHRoaXMkMS5zdG9yZS5jb250YWluZXJzXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlmIChjb250YWluZXJJZCA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdGNvbnRhaW5lcklkID0gbmV4dFVuaXF1ZUlkKCk7XG5cdFx0XHRcdFx0Y29udGFpbmVyQnVmZmVyLnB1c2goeyBpZDogY29udGFpbmVySWQsIG5vZGU6IGNvbnRhaW5lck5vZGUgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZWxlbWVudC5jb25maWcgPSBjb25maWc7XG5cdFx0XHRlbGVtZW50LmNvbnRhaW5lcklkID0gY29udGFpbmVySWQ7XG5cdFx0XHRlbGVtZW50LnN0eWxlcyA9IHN0eWxlKGVsZW1lbnQpO1xuXG5cdFx0XHRpZiAoc2VxdWVuY2UkJDEpIHtcblx0XHRcdFx0ZWxlbWVudC5zZXF1ZW5jZSA9IHtcblx0XHRcdFx0XHRpZDogc2VxdWVuY2UkJDEuaWQsXG5cdFx0XHRcdFx0aW5kZXg6IHNlcXVlbmNlJCQxLm1lbWJlcnMubGVuZ3RoXG5cdFx0XHRcdH07XG5cdFx0XHRcdHNlcXVlbmNlJCQxLm1lbWJlcnMucHVzaChlbGVtZW50LmlkKTtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbWVudEJ1ZmZlci5wdXNoKGVsZW1lbnQpO1xuXHRcdFx0cmV0dXJuIGVsZW1lbnRCdWZmZXJcblx0XHR9LCBbXSk7XG5cblx0XHQvKipcblx0XHQgKiBNb2RpZnlpbmcgdGhlIERPTSB2aWEgc2V0QXR0cmlidXRlIG5lZWRzIHRvIGJlIGhhbmRsZWRcblx0XHQgKiBzZXBhcmF0ZWx5IGZyb20gcmVhZGluZyBjb21wdXRlZCBzdHlsZXMgaW4gdGhlIG1hcCBhYm92ZVxuXHRcdCAqIGZvciB0aGUgYnJvd3NlciB0byBiYXRjaCBET00gY2hhbmdlcyAobGltaXRpbmcgcmVmbG93cylcblx0XHQgKi9cblx0XHRlYWNoKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0dGhpcyQxLnN0b3JlLmVsZW1lbnRzW2VsZW1lbnQuaWRdID0gZWxlbWVudDtcblx0XHRcdGVsZW1lbnQubm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3ItaWQnLCBlbGVtZW50LmlkKTtcblx0XHR9KTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBsb2dnZXIuY2FsbCh0aGlzLCAnUmV2ZWFsIGZhaWxlZC4nLCBlLm1lc3NhZ2UpXG5cdH1cblxuXHQvKipcblx0ICogTm93IHRoYXQgZWxlbWVudCBzZXQtdXAgaXMgY29tcGxldGUuLi5cblx0ICogTGV04oCZcyBjb21taXQgYW55IGNvbnRhaW5lciBhbmQgc2VxdWVuY2UgZGF0YSB3ZSBoYXZlIHRvIHRoZSBzdG9yZS5cblx0ICovXG5cdGVhY2goY29udGFpbmVyQnVmZmVyLCBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG5cdFx0dGhpcyQxLnN0b3JlLmNvbnRhaW5lcnNbY29udGFpbmVyLmlkXSA9IHtcblx0XHRcdGlkOiBjb250YWluZXIuaWQsXG5cdFx0XHRub2RlOiBjb250YWluZXIubm9kZVxuXHRcdH07XG5cdH0pO1xuXHRpZiAoc2VxdWVuY2UkJDEpIHtcblx0XHR0aGlzLnN0b3JlLnNlcXVlbmNlc1tzZXF1ZW5jZSQkMS5pZF0gPSBzZXF1ZW5jZSQkMTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJZiByZXZlYWwgd2Fzbid0IGludm9rZWQgYnkgc3luYywgd2Ugd2FudCB0b1xuXHQgKiBtYWtlIHN1cmUgdG8gYWRkIHRoaXMgY2FsbCB0byB0aGUgaGlzdG9yeS5cblx0ICovXG5cdGlmIChzeW5jaW5nICE9PSB0cnVlKSB7XG5cdFx0dGhpcy5zdG9yZS5oaXN0b3J5LnB1c2goeyB0YXJnZXQ6IHRhcmdldCwgb3B0aW9uczogb3B0aW9ucyB9KTtcblxuXHRcdC8qKlxuXHRcdCAqIFB1c2ggaW5pdGlhbGl6YXRpb24gdG8gdGhlIGV2ZW50IHF1ZXVlLCBnaXZpbmdcblx0XHQgKiBtdWx0aXBsZSByZXZlYWwgY2FsbHMgdGltZSB0byBiZSBpbnRlcnByZXRlZC5cblx0XHQgKi9cblx0XHRpZiAodGhpcy5pbml0VGltZW91dCkge1xuXHRcdFx0d2luZG93LmNsZWFyVGltZW91dCh0aGlzLmluaXRUaW1lb3V0KTtcblx0XHR9XG5cdFx0dGhpcy5pbml0VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KGluaXRpYWxpemUuYmluZCh0aGlzKSwgMCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0Q29udGFpbmVySWQobm9kZSkge1xuXHR2YXIgY29sbGVjdGlvbnMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG5cdHdoaWxlICggbGVuLS0gPiAwICkgY29sbGVjdGlvbnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cblx0dmFyIGlkID0gbnVsbDtcblx0ZWFjaChjb2xsZWN0aW9ucywgZnVuY3Rpb24gKGNvbGxlY3Rpb24pIHtcblx0XHRlYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uIChjb250YWluZXIpIHtcblx0XHRcdGlmIChpZCA9PT0gbnVsbCAmJiBjb250YWluZXIubm9kZSA9PT0gbm9kZSkge1xuXHRcdFx0XHRpZCA9IGNvbnRhaW5lci5pZDtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cdHJldHVybiBpZFxufVxuXG4vKipcbiAqIFJlLXJ1bnMgdGhlIHJldmVhbCBtZXRob2QgZm9yIGVhY2ggcmVjb3JkIHN0b3JlZCBpbiBoaXN0b3J5LFxuICogZm9yIGNhcHR1cmluZyBuZXcgY29udGVudCBhc3luY2hyb25vdXNseSBsb2FkZWQgaW50byB0aGUgRE9NLlxuICovXG5mdW5jdGlvbiBzeW5jKCkge1xuXHR2YXIgdGhpcyQxID0gdGhpcztcblxuXHRlYWNoKHRoaXMuc3RvcmUuaGlzdG9yeSwgZnVuY3Rpb24gKHJlY29yZCkge1xuXHRcdHJldmVhbC5jYWxsKHRoaXMkMSwgcmVjb3JkLnRhcmdldCwgcmVjb3JkLm9wdGlvbnMsIHRydWUpO1xuXHR9KTtcblxuXHRpbml0aWFsaXplLmNhbGwodGhpcyk7XG59XG5cbnZhciBwb2x5ZmlsbCA9IGZ1bmN0aW9uICh4KSB7IHJldHVybiAoeCA+IDApIC0gKHggPCAwKSB8fCAreDsgfTtcbnZhciBtYXRoU2lnbiA9IE1hdGguc2lnbiB8fCBwb2x5ZmlsbDtcblxuZnVuY3Rpb24gZ2V0R2VvbWV0cnkodGFyZ2V0LCBpc0NvbnRhaW5lcikge1xuXHQvKipcblx0ICogV2Ugd2FudCB0byBpZ25vcmUgcGFkZGluZyBhbmQgc2Nyb2xsYmFycyBmb3IgY29udGFpbmVyIGVsZW1lbnRzLlxuXHQgKiBNb3JlIGluZm9ybWF0aW9uIGhlcmU6IGh0dHBzOi8vZ29vLmdsL3ZPWnBielxuXHQgKi9cblx0dmFyIGhlaWdodCA9IGlzQ29udGFpbmVyID8gdGFyZ2V0Lm5vZGUuY2xpZW50SGVpZ2h0IDogdGFyZ2V0Lm5vZGUub2Zmc2V0SGVpZ2h0O1xuXHR2YXIgd2lkdGggPSBpc0NvbnRhaW5lciA/IHRhcmdldC5ub2RlLmNsaWVudFdpZHRoIDogdGFyZ2V0Lm5vZGUub2Zmc2V0V2lkdGg7XG5cblx0dmFyIG9mZnNldFRvcCA9IDA7XG5cdHZhciBvZmZzZXRMZWZ0ID0gMDtcblx0dmFyIG5vZGUgPSB0YXJnZXQubm9kZTtcblxuXHRkbyB7XG5cdFx0aWYgKCFpc05hTihub2RlLm9mZnNldFRvcCkpIHtcblx0XHRcdG9mZnNldFRvcCArPSBub2RlLm9mZnNldFRvcDtcblx0XHR9XG5cdFx0aWYgKCFpc05hTihub2RlLm9mZnNldExlZnQpKSB7XG5cdFx0XHRvZmZzZXRMZWZ0ICs9IG5vZGUub2Zmc2V0TGVmdDtcblx0XHR9XG5cdFx0bm9kZSA9IG5vZGUub2Zmc2V0UGFyZW50O1xuXHR9IHdoaWxlIChub2RlKVxuXG5cdHJldHVybiB7XG5cdFx0Ym91bmRzOiB7XG5cdFx0XHR0b3A6IG9mZnNldFRvcCxcblx0XHRcdHJpZ2h0OiBvZmZzZXRMZWZ0ICsgd2lkdGgsXG5cdFx0XHRib3R0b206IG9mZnNldFRvcCArIGhlaWdodCxcblx0XHRcdGxlZnQ6IG9mZnNldExlZnRcblx0XHR9LFxuXHRcdGhlaWdodDogaGVpZ2h0LFxuXHRcdHdpZHRoOiB3aWR0aFxuXHR9XG59XG5cbmZ1bmN0aW9uIGdldFNjcm9sbGVkKGNvbnRhaW5lcikge1xuXHR2YXIgdG9wLCBsZWZ0O1xuXHRpZiAoY29udGFpbmVyLm5vZGUgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuXHRcdHRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblx0XHRsZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0O1xuXHR9IGVsc2Uge1xuXHRcdHRvcCA9IGNvbnRhaW5lci5ub2RlLnNjcm9sbFRvcDtcblx0XHRsZWZ0ID0gY29udGFpbmVyLm5vZGUuc2Nyb2xsTGVmdDtcblx0fVxuXHRyZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9XG59XG5cbmZ1bmN0aW9uIGlzRWxlbWVudFZpc2libGUoZWxlbWVudCkge1xuXHRpZiAoIGVsZW1lbnQgPT09IHZvaWQgMCApIGVsZW1lbnQgPSB7fTtcblxuXHR2YXIgY29udGFpbmVyID0gdGhpcy5zdG9yZS5jb250YWluZXJzW2VsZW1lbnQuY29udGFpbmVySWRdO1xuXHRpZiAoIWNvbnRhaW5lcikgeyByZXR1cm4gfVxuXG5cdHZhciB2aWV3RmFjdG9yID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgZWxlbWVudC5jb25maWcudmlld0ZhY3RvcikpO1xuXHR2YXIgdmlld09mZnNldCA9IGVsZW1lbnQuY29uZmlnLnZpZXdPZmZzZXQ7XG5cblx0dmFyIGVsZW1lbnRCb3VuZHMgPSB7XG5cdFx0dG9wOiBlbGVtZW50Lmdlb21ldHJ5LmJvdW5kcy50b3AgKyBlbGVtZW50Lmdlb21ldHJ5LmhlaWdodCAqIHZpZXdGYWN0b3IsXG5cdFx0cmlnaHQ6IGVsZW1lbnQuZ2VvbWV0cnkuYm91bmRzLnJpZ2h0IC0gZWxlbWVudC5nZW9tZXRyeS53aWR0aCAqIHZpZXdGYWN0b3IsXG5cdFx0Ym90dG9tOiBlbGVtZW50Lmdlb21ldHJ5LmJvdW5kcy5ib3R0b20gLSBlbGVtZW50Lmdlb21ldHJ5LmhlaWdodCAqIHZpZXdGYWN0b3IsXG5cdFx0bGVmdDogZWxlbWVudC5nZW9tZXRyeS5ib3VuZHMubGVmdCArIGVsZW1lbnQuZ2VvbWV0cnkud2lkdGggKiB2aWV3RmFjdG9yXG5cdH07XG5cblx0dmFyIGNvbnRhaW5lckJvdW5kcyA9IHtcblx0XHR0b3A6IGNvbnRhaW5lci5nZW9tZXRyeS5ib3VuZHMudG9wICsgY29udGFpbmVyLnNjcm9sbC50b3AgKyB2aWV3T2Zmc2V0LnRvcCxcblx0XHRyaWdodDogY29udGFpbmVyLmdlb21ldHJ5LmJvdW5kcy5yaWdodCArIGNvbnRhaW5lci5zY3JvbGwubGVmdCAtIHZpZXdPZmZzZXQucmlnaHQsXG5cdFx0Ym90dG9tOlxuXHRcdFx0Y29udGFpbmVyLmdlb21ldHJ5LmJvdW5kcy5ib3R0b20gKyBjb250YWluZXIuc2Nyb2xsLnRvcCAtIHZpZXdPZmZzZXQuYm90dG9tLFxuXHRcdGxlZnQ6IGNvbnRhaW5lci5nZW9tZXRyeS5ib3VuZHMubGVmdCArIGNvbnRhaW5lci5zY3JvbGwubGVmdCArIHZpZXdPZmZzZXQubGVmdFxuXHR9O1xuXG5cdHJldHVybiAoXG5cdFx0KGVsZW1lbnRCb3VuZHMudG9wIDwgY29udGFpbmVyQm91bmRzLmJvdHRvbSAmJlxuXHRcdFx0ZWxlbWVudEJvdW5kcy5yaWdodCA+IGNvbnRhaW5lckJvdW5kcy5sZWZ0ICYmXG5cdFx0XHRlbGVtZW50Qm91bmRzLmJvdHRvbSA+IGNvbnRhaW5lckJvdW5kcy50b3AgJiZcblx0XHRcdGVsZW1lbnRCb3VuZHMubGVmdCA8IGNvbnRhaW5lckJvdW5kcy5yaWdodCkgfHxcblx0XHRlbGVtZW50LnN0eWxlcy5wb3NpdGlvbiA9PT0gJ2ZpeGVkJ1xuXHQpXG59XG5cbmZ1bmN0aW9uIGRlbGVnYXRlKFxuXHRldmVudCxcblx0ZWxlbWVudHNcbikge1xuXHR2YXIgdGhpcyQxID0gdGhpcztcblx0aWYgKCBldmVudCA9PT0gdm9pZCAwICkgZXZlbnQgPSB7IHR5cGU6ICdpbml0JyB9O1xuXHRpZiAoIGVsZW1lbnRzID09PSB2b2lkIDAgKSBlbGVtZW50cyA9IHRoaXMuc3RvcmUuZWxlbWVudHM7XG5cblx0cmFmKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgc3RhbGUgPSBldmVudC50eXBlID09PSAnaW5pdCcgfHwgZXZlbnQudHlwZSA9PT0gJ3Jlc2l6ZSc7XG5cblx0XHRlYWNoKHRoaXMkMS5zdG9yZS5jb250YWluZXJzLCBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG5cdFx0XHRpZiAoc3RhbGUpIHtcblx0XHRcdFx0Y29udGFpbmVyLmdlb21ldHJ5ID0gZ2V0R2VvbWV0cnkuY2FsbCh0aGlzJDEsIGNvbnRhaW5lciwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgc2Nyb2xsID0gZ2V0U2Nyb2xsZWQuY2FsbCh0aGlzJDEsIGNvbnRhaW5lcik7XG5cdFx0XHRpZiAoY29udGFpbmVyLnNjcm9sbCkge1xuXHRcdFx0XHRjb250YWluZXIuZGlyZWN0aW9uID0ge1xuXHRcdFx0XHRcdHg6IG1hdGhTaWduKHNjcm9sbC5sZWZ0IC0gY29udGFpbmVyLnNjcm9sbC5sZWZ0KSxcblx0XHRcdFx0XHR5OiBtYXRoU2lnbihzY3JvbGwudG9wIC0gY29udGFpbmVyLnNjcm9sbC50b3ApXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRjb250YWluZXIuc2Nyb2xsID0gc2Nyb2xsO1xuXHRcdH0pO1xuXG5cdFx0LyoqXG5cdFx0ICogRHVlIHRvIGhvdyB0aGUgc2VxdWVuY2VyIGlzIGltcGxlbWVudGVkLCBpdOKAmXNcblx0XHQgKiBpbXBvcnRhbnQgdGhhdCB3ZSB1cGRhdGUgdGhlIHN0YXRlIG9mIGFsbFxuXHRcdCAqIGVsZW1lbnRzLCBiZWZvcmUgYW55IGFuaW1hdGlvbiBsb2dpYyBpc1xuXHRcdCAqIGV2YWx1YXRlZCAoaW4gdGhlIHNlY29uZCBsb29wIGJlbG93KS5cblx0XHQgKi9cblx0XHRlYWNoKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0aWYgKHN0YWxlIHx8IGVsZW1lbnQuZ2VvbWV0cnkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRlbGVtZW50Lmdlb21ldHJ5ID0gZ2V0R2VvbWV0cnkuY2FsbCh0aGlzJDEsIGVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdFx0ZWxlbWVudC52aXNpYmxlID0gaXNFbGVtZW50VmlzaWJsZS5jYWxsKHRoaXMkMSwgZWxlbWVudCk7XG5cdFx0fSk7XG5cblx0XHRlYWNoKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0aWYgKGVsZW1lbnQuc2VxdWVuY2UpIHtcblx0XHRcdFx0c2VxdWVuY2UuY2FsbCh0aGlzJDEsIGVsZW1lbnQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YW5pbWF0ZS5jYWxsKHRoaXMkMSwgZWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzJDEucHJpc3RpbmUgPSBmYWxzZTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGlzVHJhbnNmb3JtU3VwcG9ydGVkKCkge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cdHJldHVybiAndHJhbnNmb3JtJyBpbiBzdHlsZSB8fCAnV2Via2l0VHJhbnNmb3JtJyBpbiBzdHlsZVxufVxuXG5mdW5jdGlvbiBpc1RyYW5zaXRpb25TdXBwb3J0ZWQoKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblx0cmV0dXJuICd0cmFuc2l0aW9uJyBpbiBzdHlsZSB8fCAnV2Via2l0VHJhbnNpdGlvbicgaW4gc3R5bGVcbn1cblxudmFyIHZlcnNpb24gPSBcIjQuMC43XCI7XG5cbnZhciBib3VuZERlbGVnYXRlO1xudmFyIGJvdW5kRGVzdHJveTtcbnZhciBib3VuZFJldmVhbDtcbnZhciBib3VuZENsZWFuO1xudmFyIGJvdW5kU3luYztcbnZhciBjb25maWc7XG52YXIgZGVidWc7XG52YXIgaW5zdGFuY2U7XG5cbmZ1bmN0aW9uIFNjcm9sbFJldmVhbChvcHRpb25zKSB7XG5cdGlmICggb3B0aW9ucyA9PT0gdm9pZCAwICkgb3B0aW9ucyA9IHt9O1xuXG5cdHZhciBpbnZva2VkV2l0aG91dE5ldyA9XG5cdFx0dHlwZW9mIHRoaXMgPT09ICd1bmRlZmluZWQnIHx8XG5cdFx0T2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpICE9PSBTY3JvbGxSZXZlYWwucHJvdG90eXBlO1xuXG5cdGlmIChpbnZva2VkV2l0aG91dE5ldykge1xuXHRcdHJldHVybiBuZXcgU2Nyb2xsUmV2ZWFsKG9wdGlvbnMpXG5cdH1cblxuXHRpZiAoIVNjcm9sbFJldmVhbC5pc1N1cHBvcnRlZCgpKSB7XG5cdFx0bG9nZ2VyLmNhbGwodGhpcywgJ0luc3RhbnRpYXRpb24gZmFpbGVkLicsICdUaGlzIGJyb3dzZXIgaXMgbm90IHN1cHBvcnRlZC4nKTtcblx0XHRyZXR1cm4gbW91bnQuZmFpbHVyZSgpXG5cdH1cblxuXHR2YXIgYnVmZmVyO1xuXHR0cnkge1xuXHRcdGJ1ZmZlciA9IGNvbmZpZ1xuXHRcdFx0PyBkZWVwQXNzaWduKHt9LCBjb25maWcsIG9wdGlvbnMpXG5cdFx0XHQ6IGRlZXBBc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGxvZ2dlci5jYWxsKHRoaXMsICdJbnZhbGlkIGNvbmZpZ3VyYXRpb24uJywgZS5tZXNzYWdlKTtcblx0XHRyZXR1cm4gbW91bnQuZmFpbHVyZSgpXG5cdH1cblxuXHR0cnkge1xuXHRcdHZhciBjb250YWluZXIgPSAkKGJ1ZmZlci5jb250YWluZXIpWzBdO1xuXHRcdGlmICghY29udGFpbmVyKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29udGFpbmVyLicpXG5cdFx0fVxuXHR9IGNhdGNoIChlKSB7XG5cdFx0bG9nZ2VyLmNhbGwodGhpcywgZS5tZXNzYWdlKTtcblx0XHRyZXR1cm4gbW91bnQuZmFpbHVyZSgpXG5cdH1cblxuXHRjb25maWcgPSBidWZmZXI7XG5cblx0aWYgKCghY29uZmlnLm1vYmlsZSAmJiBpc01vYmlsZSgpKSB8fCAoIWNvbmZpZy5kZXNrdG9wICYmICFpc01vYmlsZSgpKSkge1xuXHRcdGxvZ2dlci5jYWxsKFxuXHRcdFx0dGhpcyxcblx0XHRcdCdUaGlzIGRldmljZSBpcyBkaXNhYmxlZC4nLFxuXHRcdFx0KFwiZGVza3RvcDogXCIgKyAoY29uZmlnLmRlc2t0b3ApKSxcblx0XHRcdChcIm1vYmlsZTogXCIgKyAoY29uZmlnLm1vYmlsZSkpXG5cdFx0KTtcblx0XHRyZXR1cm4gbW91bnQuZmFpbHVyZSgpXG5cdH1cblxuXHRtb3VudC5zdWNjZXNzKCk7XG5cblx0dGhpcy5zdG9yZSA9IHtcblx0XHRjb250YWluZXJzOiB7fSxcblx0XHRlbGVtZW50czoge30sXG5cdFx0aGlzdG9yeTogW10sXG5cdFx0c2VxdWVuY2VzOiB7fVxuXHR9O1xuXG5cdHRoaXMucHJpc3RpbmUgPSB0cnVlO1xuXG5cdGJvdW5kRGVsZWdhdGUgPSBib3VuZERlbGVnYXRlIHx8IGRlbGVnYXRlLmJpbmQodGhpcyk7XG5cdGJvdW5kRGVzdHJveSA9IGJvdW5kRGVzdHJveSB8fCBkZXN0cm95LmJpbmQodGhpcyk7XG5cdGJvdW5kUmV2ZWFsID0gYm91bmRSZXZlYWwgfHwgcmV2ZWFsLmJpbmQodGhpcyk7XG5cdGJvdW5kQ2xlYW4gPSBib3VuZENsZWFuIHx8IGNsZWFuLmJpbmQodGhpcyk7XG5cdGJvdW5kU3luYyA9IGJvdW5kU3luYyB8fCBzeW5jLmJpbmQodGhpcyk7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdkZWxlZ2F0ZScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBib3VuZERlbGVnYXRlOyB9IH0pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2Rlc3Ryb3knLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYm91bmREZXN0cm95OyB9IH0pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3JldmVhbCcsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBib3VuZFJldmVhbDsgfSB9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjbGVhbicsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBib3VuZENsZWFuOyB9IH0pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3N5bmMnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYm91bmRTeW5jOyB9IH0pO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGVmYXVsdHMnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29uZmlnOyB9IH0pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3ZlcnNpb24nLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdmVyc2lvbjsgfSB9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdub29wJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9IH0pO1xuXG5cdHJldHVybiBpbnN0YW5jZSA/IGluc3RhbmNlIDogKGluc3RhbmNlID0gdGhpcylcbn1cblxuU2Nyb2xsUmV2ZWFsLmlzU3VwcG9ydGVkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXNUcmFuc2Zvcm1TdXBwb3J0ZWQoKSAmJiBpc1RyYW5zaXRpb25TdXBwb3J0ZWQoKTsgfTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFNjcm9sbFJldmVhbCwgJ2RlYnVnJywge1xuXHRnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRlYnVnIHx8IGZhbHNlOyB9LFxuXHRzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gKGRlYnVnID0gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgPyB2YWx1ZSA6IGRlYnVnKTsgfVxufSk7XG5cblNjcm9sbFJldmVhbCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxSZXZlYWw7XG4iLCIvKiEgQGxpY2Vuc2UgVGVhbGlnaHQgdjAuMy42XG5cblx0Q29weXJpZ2h0IDIwMTggRmlzc3Npb24gTExDLlxuXG5cdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0U09GVFdBUkUuXG5cbiovXG5pbXBvcnQgaXNEb21Ob2RlIGZyb20gJ2lzLWRvbS1ub2RlJztcbmltcG9ydCBpc0RvbU5vZGVMaXN0IGZyb20gJ2lzLWRvbS1ub2RlLWxpc3QnO1xuXG5mdW5jdGlvbiB0ZWFsaWdodCh0YXJnZXQsIGNvbnRleHQpIHtcbiAgaWYgKCBjb250ZXh0ID09PSB2b2lkIDAgKSBjb250ZXh0ID0gZG9jdW1lbnQ7XG5cbiAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEFycmF5KSB7IHJldHVybiB0YXJnZXQuZmlsdGVyKGlzRG9tTm9kZSk7IH1cbiAgaWYgKGlzRG9tTm9kZSh0YXJnZXQpKSB7IHJldHVybiBbdGFyZ2V0XTsgfVxuICBpZiAoaXNEb21Ob2RlTGlzdCh0YXJnZXQpKSB7IHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0YXJnZXQpOyB9XG4gIGlmICh0eXBlb2YgdGFyZ2V0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBxdWVyeSA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCh0YXJnZXQpO1xuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHF1ZXJ5KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0ZWFsaWdodDtcbiJdLCJzb3VyY2VSb290IjoiIn0=
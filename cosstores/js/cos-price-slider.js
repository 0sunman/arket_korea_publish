
/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */


/*

   작성자 : UX파트 (2021.03.16)
   설명 : 코스에서 받은 코드를 options을 이용하여 제어할 수 있도록 수정한 버젼입니다.
   문제가 많이 발생할 수 있으므로 문제 발생시 UX파트로 문의 바랍니다.


*/
/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */  /*test*/

var _typeof26 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof25 = typeof Symbol === "function" && _typeof26(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof26(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof26(obj);
};

var _typeof24 = typeof Symbol === "function" && _typeof25(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof25(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof25(obj);
};

var _typeof23 = typeof Symbol === "function" && _typeof24(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof24(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof24(obj);
};

var _typeof22 = typeof Symbol === "function" && _typeof23(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof23(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof23(obj);
};

var _typeof21 = typeof Symbol === "function" && _typeof22(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof22(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof22(obj);
};

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

var _typeof20 = typeof Symbol === "function" && _typeof21(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof21(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof21(obj);
};

var _typeof19 = typeof Symbol === "function" && _typeof20(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof20(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof20(obj);
};

var _typeof18 = typeof Symbol === "function" && _typeof19(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof19(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof19(obj);
};

var _typeof17 = typeof Symbol === "function" && _typeof18(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof18(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof18(obj);
};

var _typeof16 = typeof Symbol === "function" && _typeof17(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof17(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof17(obj);
};

if ("document" in window.self) {

    // Full polyfill for browsers with no classList support
    // Including IE < Edge missing SVGElement.classList
    if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

        (function (view) {

            "use strict";

            if (!('Element' in view)) return;

            var classListProp = "classList",
                protoProp = "prototype",
                elemCtrProto = view.Element[protoProp],
                objCtr = Object,
                strTrim = String[protoProp].trim || function () {
                    return this.replace(/^\s+|\s+$/g, "");
                },
                arrIndexOf = Array[protoProp].indexOf || function (item) {
                    var i = 0,
                        len = this.length;
                    for (; i < len; i++) {
                        if (i in this && this[i] === item) {
                            return i;
                        }
                    }
                    return -1;
                }
                // Vendors: please allow content code to instantiate DOMExceptions


                ,
                DOMEx = function DOMEx(type, message) {
                    this.name = type;
                    this.code = DOMException[type];
                    this.message = message;
                },
                checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
                    if (token === "") {
                        throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
                    }
                    if (/\s/.test(token)) {
                        throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
                    }
                    return arrIndexOf.call(classList, token);
                },
                ClassList = function ClassList(elem) {
                    var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
                        classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
                        i = 0,
                        len = classes.length;
                    for (; i < len; i++) {
                        this.push(classes[i]);
                    }
                    this._updateClassName = function () {
                        elem.setAttribute("class", this.toString());
                    };
                },
                classListProto = ClassList[protoProp] = [],
                classListGetter = function classListGetter() {
                    return new ClassList(this);
                };
            // Most DOMException implementations don't allow calling DOMException's toString()
            // on non-DOMExceptions. Error's toString() is sufficient here.
            DOMEx[protoProp] = Error[protoProp];
            classListProto.item = function (i) {
                return this[i] || null;
            };
            classListProto.contains = function (token) {
                token += "";
                return checkTokenAndGetIndex(this, token) !== -1;
            };
            classListProto.add = function () {
                var tokens = arguments,
                    i = 0,
                    l = tokens.length,
                    token,
                    updated = false;
                do {
                    token = tokens[i] + "";
                    if (checkTokenAndGetIndex(this, token) === -1) {
                        this.push(token);
                        updated = true;
                    }
                } while (++i < l);

                if (updated) {
                    this._updateClassName();
                }
            };
            classListProto.remove = function () {
                var tokens = arguments,
                    i = 0,
                    l = tokens.length,
                    token,
                    updated = false,
                    index;
                do {
                    token = tokens[i] + "";
                    index = checkTokenAndGetIndex(this, token);
                    while (index !== -1) {
                        this.splice(index, 1);
                        updated = true;
                        index = checkTokenAndGetIndex(this, token);
                    }
                } while (++i < l);

                if (updated) {
                    this._updateClassName();
                }
            };
            classListProto.toggle = function (token, force) {
                token += "";

                var result = this.contains(token),
                    method = result ? force !== true && "remove" : force !== false && "add";

                if (method) {
                    this[method](token);
                }

                if (force === true || force === false) {
                    return force;
                } else {
                    return !result;
                }
            };
            classListProto.toString = function () {
                return this.join(" ");
            };

            if (objCtr.defineProperty) {
                var classListPropDesc = {
                    get: classListGetter,
                    enumerable: true,
                    configurable: true
                };
                try {
                    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                } catch (ex) {
                    // IE 8 doesn't support enumerable:true
                    // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
                    // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
                    if (ex.number === undefined || ex.number === -0x7FF5EC54) {
                        classListPropDesc.enumerable = false;
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    }
                }
            } else if (objCtr[protoProp].__defineGetter__) {
                elemCtrProto.__defineGetter__(classListProp, classListGetter);
            }
        })(window.self);
    }

    // There is full or partial native classList support, so just check if we need
    // to normalize the add/remove and toggle APIs.

    (function () {
        "use strict";

        var testElement = document.createElement("_");

        testElement.classList.add("c1", "c2");

        // Polyfill for IE 10/11 and Firefox <26, where classList.add and
        // classList.remove exist but support only one argument at a time.
        if (!testElement.classList.contains("c2")) {
            var createMethod = function createMethod(method) {
                var original = DOMTokenList.prototype[method];

                DOMTokenList.prototype[method] = function (token) {
                    var i,
                        len = arguments.length;

                    for (i = 0; i < len; i++) {
                        token = arguments[i];
                        original.call(this, token);
                    }
                };
            };
            createMethod('add');
            createMethod('remove');
        }

        testElement.classList.toggle("c3", false);

        // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
        // support the second argument.
        if (testElement.classList.contains("c3")) {
            var _toggle = DOMTokenList.prototype.toggle;

            DOMTokenList.prototype.toggle = function (token, force) {
                if (1 in arguments && !this.contains(token) === !force) {
                    return force;
                } else {
                    return _toggle.call(this, token);
                }
            };
        }

        testElement = null;
    })();
}

var _typeof15 = typeof Symbol === "function" && _typeof16(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof16(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof16(obj);
};

var _typeof14 = typeof Symbol === "function" && _typeof15(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof15(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof15(obj);
};

var _typeof13 = typeof Symbol === "function" && _typeof14(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof14(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof14(obj);
};

var _typeof12 = typeof Symbol === "function" && _typeof13(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof13(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof13(obj);
};

var _typeof11 = typeof Symbol === "function" && _typeof12(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof12(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof12(obj);
};

var _typeof10 = typeof Symbol === "function" && _typeof11(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof11(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof11(obj);
};

var _typeof9 = typeof Symbol === "function" && _typeof10(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof10(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof10(obj);
};

var _typeof8 = typeof Symbol === "function" && _typeof9(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof9(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof9(obj);
};

var _typeof7 = typeof Symbol === "function" && _typeof8(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof8(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof8(obj);
};

var _typeof6 = typeof Symbol === "function" && _typeof7(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof7(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof7(obj);
};

var _typeof5 = typeof Symbol === "function" && _typeof6(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof6(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof6(obj);
};

var _typeof4 = typeof Symbol === "function" && _typeof5(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof5(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof5(obj);
};

var _typeof3 = typeof Symbol === "function" && _typeof4(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof4(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof4(obj);
};

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

(function (factory) {

    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define([], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {

        // Node/CommonJS
        module.exports = factory();
    } else {

        // Browser globals
        window.wNumb = factory();
    }
})(function () {

    'use strict';

    var FormatOptions = ['decimals', 'thousand', 'mark', 'prefix', 'suffix', 'encoder', 'decoder', 'negativeBefore', 'negative', 'edit', 'undo'];

    // General

    // Reverse a string
    function strReverse(a) {
        return a.split('').reverse().join('');
    }

    // Check if a string starts with a specified prefix.
    function strStartsWith(input, match) {
        return input.substring(0, match.length) === match;
    }

    // Check is a string ends in a specified suffix.
    function strEndsWith(input, match) {
        return input.slice(-1 * match.length) === match;
    }

    // Throw an error if formatting options are incompatible.
    function throwEqualError(F, a, b) {
        if ((F[a] || F[b]) && F[a] === F[b]) {
            throw new Error(a);
        }
    }

    // Check if a number is finite and not NaN
    function isValidNumber(input) {
        return typeof input === 'number' && isFinite(input);
    }

    // Provide rounding-accurate toFixed method.
    // Borrowed: http://stackoverflow.com/a/21323330/775265
    function toFixed(value, exp) {
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + exp : exp)));
        value = value.toString().split('e');
        return (+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp))).toFixed(exp);
    }

    // Formatting

    // Accept a number as input, output formatted string.
    function formatTo(decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input) {

        var originalInput = input,
            inputIsNegative,
            inputPieces,
            inputBase,
            inputDecimals = '',
            output = '';

        // Apply user encoder to the input.
        // Expected outcome: number.
        if (encoder) {
            input = encoder(input);
        }

        // Stop if no valid number was provided, the number is infinite or NaN.
        if (!isValidNumber(input)) {
            return false;
        }

        // Rounding away decimals might cause a value of -0
        // when using very small ranges. Remove those cases.
        if (decimals !== false && parseFloat(input.toFixed(decimals)) === 0) {
            input = 0;
        }

        // Formatting is done on absolute numbers,
        // decorated by an optional negative symbol.
        if (input < 0) {
            inputIsNegative = true;
            input = Math.abs(input);
        }

        // Reduce the number of decimals to the specified option.
        if (decimals !== false) {
            input = toFixed(input, decimals);
        }

        // Transform the number into a string, so it can be split.
        input = input.toString();

        // Break the number on the decimal separator.
        if (input.indexOf('.') !== -1) {
            inputPieces = input.split('.');

            inputBase = inputPieces[0];

            if (mark) {
                inputDecimals = mark + inputPieces[1];
            }
        } else {

            // If it isn't split, the entire number will do.
            inputBase = input;
        }

        // Group numbers in sets of three.
        if (thousand) {
            inputBase = strReverse(inputBase).match(/.{1,3}/g);
            inputBase = strReverse(inputBase.join(strReverse(thousand)));
        }

        // If the number is negative, prefix with negation symbol.
        if (inputIsNegative && negativeBefore) {
            output += negativeBefore;
        }

        // Prefix the number
        if (prefix) {
            output += prefix;
        }

        // Normal negative option comes after the prefix. Defaults to '-'.
        if (inputIsNegative && negative) {
            output += negative;
        }

        // Append the actual number.
        output += inputBase;
        output += inputDecimals;

        // Apply the suffix.
        if (suffix) {
            output += suffix;
        }

        // Run the output through a user-specified post-formatter.
        if (edit) {
            output = edit(output, originalInput);
        }

        // All done.
        return output;
    }

    // Accept a sting as input, output decoded number.
    function formatFrom(decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input) {

        var originalInput = input,
            inputIsNegative,
            output = '';

        // User defined pre-decoder. Result must be a non empty string.
        if (undo) {
            input = undo(input);
        }

        // Test the input. Can't be empty.
        if (!input || typeof input !== 'string') {
            return false;
        }

        // If the string starts with the negativeBefore value: remove it.
        // Remember is was there, the number is negative.
        if (negativeBefore && strStartsWith(input, negativeBefore)) {
            input = input.replace(negativeBefore, '');
            inputIsNegative = true;
        }

        // Repeat the same procedure for the prefix.
        if (prefix && strStartsWith(input, prefix)) {
            input = input.replace(prefix, '');
        }

        // And again for negative.
        if (negative && strStartsWith(input, negative)) {
            input = input.replace(negative, '');
            inputIsNegative = true;
        }

        // Remove the suffix.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
        if (suffix && strEndsWith(input, suffix)) {
            input = input.slice(0, -1 * suffix.length);
        }

        // Remove the thousand grouping.
        if (thousand) {
            input = input.split(thousand).join('');
        }

        // Set the decimal separator back to period.
        if (mark) {
            input = input.replace(mark, '.');
        }

        // Prepend the negative symbol.
        if (inputIsNegative) {
            output += '-';
        }

        // Add the number
        output += input;

        // Trim all non-numeric characters (allow '.' and '-');
        output = output.replace(/[^0-9\.\-.]/g, '');

        // The value contains no parse-able number.
        if (output === '') {
            return false;
        }

        // Covert to number.
        output = Number(output);

        // Run the user-specified post-decoder.
        if (decoder) {
            output = decoder(output);
        }

        // Check is the output is valid, otherwise: return false.
        if (!isValidNumber(output)) {
            return false;
        }

        return output;
    }

    // Framework

    // Validate formatting options
    function validate(inputOptions) {

        var i,
            optionName,
            optionValue,
            filteredOptions = {};

        if (inputOptions['suffix'] === undefined) {
            inputOptions['suffix'] = inputOptions['postfix'];
        }

        for (i = 0; i < FormatOptions.length; i += 1) {

            optionName = FormatOptions[i];
            optionValue = inputOptions[optionName];

            if (optionValue === undefined) {

                // Only default if negativeBefore isn't set.
                if (optionName === 'negative' && !filteredOptions.negativeBefore) {
                    filteredOptions[optionName] = '-';
                    // Don't set a default for mark when 'thousand' is set.
                } else if (optionName === 'mark' && filteredOptions.thousand !== '.') {
                    filteredOptions[optionName] = '.';
                } else {
                    filteredOptions[optionName] = false;
                }

                // Floating points in JS are stable up to 7 decimals.
            } else if (optionName === 'decimals') {
                if (optionValue >= 0 && optionValue < 8) {
                    filteredOptions[optionName] = optionValue;
                } else {
                    throw new Error(optionName);
                }

                // These options, when provided, must be functions.
            } else if (optionName === 'encoder' || optionName === 'decoder' || optionName === 'edit' || optionName === 'undo') {
                if (typeof optionValue === 'function') {
                    filteredOptions[optionName] = optionValue;
                } else {
                    throw new Error(optionName);
                }

                // Other options are strings.
            } else {

                if (typeof optionValue === 'string') {
                    filteredOptions[optionName] = optionValue;
                } else {
                    throw new Error(optionName);
                }
            }
        }

        // Some values can't be extracted from a
        // string if certain combinations are present.
        throwEqualError(filteredOptions, 'mark', 'thousand');
        throwEqualError(filteredOptions, 'prefix', 'negative');
        throwEqualError(filteredOptions, 'prefix', 'negativeBefore');

        return filteredOptions;
    }

    // Pass all options as function arguments
    function passAll(options, method, input) {
        var i,
            args = [];

        // Add all options in order of FormatOptions
        for (i = 0; i < FormatOptions.length; i += 1) {
            args.push(options[FormatOptions[i]]);
        }

        // Append the input, then call the method, presenting all
        // options as arguments.
        args.push(input);
        return method.apply('', args);
    }

    function wNumb(options) {

        if (!(this instanceof wNumb)) {
            return new wNumb(options);
        }

        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== "object") {
            return;
        }

        options = validate(options);

        // Call 'formatTo' with proper arguments.
        this.to = function (input) {
            return passAll(options, formatTo, input);
        };

        // Call 'formatFrom' with proper arguments.
        this.from = function (input) {
            return passAll(options, formatFrom, input);
        };
    }

    return wNumb;
});

/*! nouislider - 14.0.2 - 6/28/2019 */
!function (t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ? module.exports = t() : window.noUiSlider = t();
}(function () {
    "use strict";

    var lt = "14.0.2";

    function ut(t) {
        t.parentElement.removeChild(t);
    }

    function s(t) {
        return null != t;
    }

    function ct(t) {
        t.preventDefault();
    }

    function i(t) {
        return "number" == typeof t && !isNaN(t) && isFinite(t);
    }

    function pt(t, e, r) {
        0 < r && (ht(t, e), setTimeout(function () {
            mt(t, e);
        }, r));
    }

    function ft(t) {
        return Math.max(Math.min(t, 100), 0);
    }

    function dt(t) {
        return Array.isArray(t) ? t : [t];
    }

    function e(t) {
        var e = (t = String(t)).split(".");
        return 1 < e.length ? e[1].length : 0;
    }

    function ht(t, e) {
        t.classList ? t.classList.add(e) : t.className += " " + e;
    }

    function mt(t, e) {
        t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }

    function gt(t) {
        var e = void 0 !== window.pageXOffset,
            r = "CSS1Compat" === (t.compatMode || "");
        return {
            x: e ? window.pageXOffset : r ? t.documentElement.scrollLeft : t.body.scrollLeft,
            y: e ? window.pageYOffset : r ? t.documentElement.scrollTop : t.body.scrollTop
        };
    }

    function c(t, e) {
        return 100 / (e - t);
    }

    function p(t, e) {
        return 100 * e / (t[1] - t[0]);
    }

    function f(t, e) {
        for (var r = 1; t >= e[r];) {
            r += 1;
        }
        return r;
    }

    function r(t, e, r) {
        if (r >= t.slice(-1)[0]) return 100;
        var n,
            i,
            o = f(r, t),
            a = t[o - 1],
            s = t[o],
            l = e[o - 1],
            u = e[o];
        return l + (i = r, p(n = [a, s], n[0] < 0 ? i + Math.abs(n[0]) : i - n[0]) / c(l, u));
    }

    function n(t, e, r, n) {
        if (100 === n) return n;
        var i,
            o,
            a = f(n, t),
            s = t[a - 1],
            l = t[a];
        return r ? (l - s) / 2 < n - s ? l : s : e[a - 1] ? t[a - 1] + (i = n - t[a - 1], o = e[a - 1], Math.round(i / o) * o) : n;
    }

    function o(t, e, r) {
        var n;
        if ("number" == typeof e && (e = [e]), !Array.isArray(e)) throw new Error("noUiSlider (" + lt + "): 'range' contains invalid value.");
        if (!i(n = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t)) || !i(e[0])) throw new Error("noUiSlider (" + lt + "): 'range' value isn't numeric.");
        r.xPct.push(n), r.xVal.push(e[0]), n ? r.xSteps.push(!isNaN(e[1]) && e[1]) : isNaN(e[1]) || (r.xSteps[0] = e[1]), r.xHighestCompleteStep.push(0);
    }

    function a(t, e, r) {
        if (e) if (r.xVal[t] !== r.xVal[t + 1]) {
            r.xSteps[t] = p([r.xVal[t], r.xVal[t + 1]], e) / c(r.xPct[t], r.xPct[t + 1]);
            var n = (r.xVal[t + 1] - r.xVal[t]) / r.xNumSteps[t],
                i = Math.ceil(Number(n.toFixed(3)) - 1),
                o = r.xVal[t] + r.xNumSteps[t] * i;
            r.xHighestCompleteStep[t] = o;
        } else r.xSteps[t] = r.xHighestCompleteStep[t] = r.xVal[t];
    }

    function l(t, e, r) {
        var n;
        this.xPct = [], this.xVal = [], this.xSteps = [r || !1], this.xNumSteps = [!1], this.xHighestCompleteStep = [], this.snap = e;
        var i = [];
        for (n in t) {
            t.hasOwnProperty(n) && i.push([t[n], n]);
        }
        for (i.length && "object" == _typeof(i[0][0]) ? i.sort(function (t, e) {
            return t[0][0] - e[0][0];
        }) : i.sort(function (t, e) {
            return t[0] - e[0];
        }), n = 0; n < i.length; n++) {
            o(i[n][1], i[n][0], this);
        }
        for (this.xNumSteps = this.xSteps.slice(0), n = 0; n < this.xNumSteps.length; n++) {
            a(n, this.xNumSteps[n], this);
        }
    }

    l.prototype.getMargin = function (t) {
        var e = this.xNumSteps[0];
        if (e && t / e % 1 != 0) throw new Error("noUiSlider (" + lt + "): 'limit', 'margin' and 'padding' must be divisible by step.");
        return 2 === this.xPct.length && p(this.xVal, t);
    }, l.prototype.toStepping = function (t) {
        return t = r(this.xVal, this.xPct, t);
    }, l.prototype.fromStepping = function (t) {
        return function (t, e, r) {
            if (100 <= r) return t.slice(-1)[0];
            var n,
                i = f(r, e),
                o = t[i - 1],
                a = t[i],
                s = e[i - 1],
                l = e[i];
            return n = [o, a], (r - s) * c(s, l) * (n[1] - n[0]) / 100 + n[0];
        }(this.xVal, this.xPct, t);
    }, l.prototype.getStep = function (t) {
        return t = n(this.xPct, this.xSteps, this.snap, t);
    }, l.prototype.getDefaultStep = function (t, e, r) {
        var n = f(t, this.xPct);
        return (100 === t || e && t === this.xPct[n - 1]) && (n = Math.max(n - 1, 1)), (this.xVal[n] - this.xVal[n - 1]) / r;
    }, l.prototype.getNearbySteps = function (t) {
        var e = f(t, this.xPct);
        return {
            stepBefore: {
                startValue: this.xVal[e - 2],
                step: this.xNumSteps[e - 2],
                highestStep: this.xHighestCompleteStep[e - 2]
            },
            thisStep: {
                startValue: this.xVal[e - 1],
                step: this.xNumSteps[e - 1],
                highestStep: this.xHighestCompleteStep[e - 1]
            },
            stepAfter: { startValue: this.xVal[e], step: this.xNumSteps[e], highestStep: this.xHighestCompleteStep[e] }
        };
    }, l.prototype.countStepDecimals = function () {
        var t = this.xNumSteps.map(e);
        return Math.max.apply(null, t);
    }, l.prototype.convert = function (t) {
        return this.getStep(this.toStepping(t));
    };
    var u = {
        to: function to(t) {
            return void 0 !== t && t.toFixed(2);
        }, from: Number
    };

    function d(t) {
        if ("object" == _typeof(e = t) && "function" == typeof e.to && "function" == typeof e.from) return !0;
        var e;
        throw new Error("noUiSlider (" + lt + "): 'format' requires 'to' and 'from' methods.");
    }

    function h(t, e) {
        if (!i(e)) throw new Error("noUiSlider (" + lt + "): 'step' is not numeric.");
        t.singleStep = e;
    }

    function m(t, e) {
        if ("object" != (typeof e === 'undefined' ? 'undefined' : _typeof(e)) || Array.isArray(e)) throw new Error("noUiSlider (" + lt + "): 'range' is not an object.");
        if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider (" + lt + "): Missing 'min' or 'max' in 'range'.");
        if (e.min === e.max) throw new Error("noUiSlider (" + lt + "): 'range' 'min' and 'max' cannot be equal.");
        t.spectrum = new l(e, t.snap, t.singleStep);
    }

    function g(t, e) {
        if (e = dt(e), !Array.isArray(e) || !e.length) throw new Error("noUiSlider (" + lt + "): 'start' option is incorrect.");
        t.handles = e.length, t.start = e;
    }

    function v(t, e) {
        if ("boolean" != typeof (t.snap = e)) throw new Error("noUiSlider (" + lt + "): 'snap' option must be a boolean.");
    }

    function b(t, e) {
        if ("boolean" != typeof (t.animate = e)) throw new Error("noUiSlider (" + lt + "): 'animate' option must be a boolean.");
    }

    function S(t, e) {
        if ("number" != typeof (t.animationDuration = e)) throw new Error("noUiSlider (" + lt + "): 'animationDuration' option must be a number.");
    }

    function x(t, e) {
        var r,
            n = [!1];
        if ("lower" === e ? e = [!0, !1] : "upper" === e && (e = [!1, !0]), !0 === e || !1 === e) {
            for (r = 1; r < t.handles; r++) {
                n.push(e);
            }
            n.push(!1);
        } else {
            if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider (" + lt + "): 'connect' option doesn't match handle count.");
            n = e;
        }
        t.connect = n;
    }

    function w(t, e) {
        switch (e) {
            case "horizontal":
                t.ort = 0;
                break;
            case "vertical":
                t.ort = 1;
                break;
            default:
                throw new Error("noUiSlider (" + lt + "): 'orientation' option is invalid.");
        }
    }

    function y(t, e) {
        if (!i(e)) throw new Error("noUiSlider (" + lt + "): 'margin' option must be numeric.");
        if (0 !== e && (t.margin = t.spectrum.getMargin(e), !t.margin)) throw new Error("noUiSlider (" + lt + "): 'margin' option is only supported on linear sliders.");
    }

    function E(t, e) {
        if (!i(e)) throw new Error("noUiSlider (" + lt + "): 'limit' option must be numeric.");
        if (t.limit = t.spectrum.getMargin(e), !t.limit || t.handles < 2) throw new Error("noUiSlider (" + lt + "): 'limit' option is only supported on linear sliders with 2 or more handles.");
    }

    function C(t, e) {
        if (!i(e) && !Array.isArray(e)) throw new Error("noUiSlider (" + lt + "): 'padding' option must be numeric or array of exactly 2 numbers.");
        if (Array.isArray(e) && 2 !== e.length && !i(e[0]) && !i(e[1])) throw new Error("noUiSlider (" + lt + "): 'padding' option must be numeric or array of exactly 2 numbers.");
        if (0 !== e) {
            if (Array.isArray(e) || (e = [e, e]), !(t.padding = [t.spectrum.getMargin(e[0]), t.spectrum.getMargin(e[1])]) === t.padding[0] || !1 === t.padding[1]) throw new Error("noUiSlider (" + lt + "): 'padding' option is only supported on linear sliders.");
            if (t.padding[0] < 0 || t.padding[1] < 0) throw new Error("noUiSlider (" + lt + "): 'padding' option must be a positive number(s).");
            if (100 < t.padding[0] + t.padding[1]) throw new Error("noUiSlider (" + lt + "): 'padding' option must not exceed 100% of the range.");
        }
    }

    function N(t, e) {
        switch (e) {
            case "ltr":
                t.dir = 0;
                break;
            case "rtl":
                t.dir = 1;
                break;
            default:
                throw new Error("noUiSlider (" + lt + "): 'direction' option was not recognized.");
        }
    }

    function U(t, e) {
        if ("string" != typeof e) throw new Error("noUiSlider (" + lt + "): 'behaviour' must be a string containing options.");
        var r = 0 <= e.indexOf("tap"),
            n = 0 <= e.indexOf("drag"),
            i = 0 <= e.indexOf("fixed"),
            o = 0 <= e.indexOf("snap"),
            a = 0 <= e.indexOf("hover"),
            s = 0 <= e.indexOf("unconstrained");
        if (i) {
            if (2 !== t.handles) throw new Error("noUiSlider (" + lt + "): 'fixed' behaviour must be used with 2 handles");
            y(t, t.start[1] - t.start[0]);
        }
        if (s && (t.margin || t.limit)) throw new Error("noUiSlider (" + lt + "): 'unconstrained' behaviour cannot be used with margin or limit");
        t.events = { tap: r || o, drag: n, fixed: i, snap: o, hover: a, unconstrained: s };
    }

    function k(t, e) {
        if (!1 !== e) if (!0 === e) {
            t.tooltips = [];
            for (var r = 0; r < t.handles; r++) {
                t.tooltips.push(!0);
            }
        } else {
            if (t.tooltips = dt(e), t.tooltips.length !== t.handles) throw new Error("noUiSlider (" + lt + "): must pass a formatter for all handles.");
            t.tooltips.forEach(function (t) {
                if ("boolean" != typeof t && ("object" != (typeof t === 'undefined' ? 'undefined' : _typeof(t)) || "function" != typeof t.to)) throw new Error("noUiSlider (" + lt + "): 'tooltips' must be passed a formatter or 'false'.");
            });
        }
    }

    function P(t, e) {
        d(t.ariaFormat = e);
    }

    function A(t, e) {
        d(t.format = e);
    }

    function V(t, e) {
        if ("boolean" != typeof (t.keyboardSupport = e)) throw new Error("noUiSlider (" + lt + "): 'keyboardSupport' option must be a boolean.");
    }

    function M(t, e) {
        t.documentElement = e;
    }

    function O(t, e) {
        if ("string" != typeof e && !1 !== e) throw new Error("noUiSlider (" + lt + "): 'cssPrefix' must be a string or `false`.");
        t.cssPrefix = e;
    }

    function L(t, e) {
        if ("object" != (typeof e === 'undefined' ? 'undefined' : _typeof(e))) throw new Error("noUiSlider (" + lt + "): 'cssClasses' must be an object.");
        if ("string" == typeof t.cssPrefix) for (var r in t.cssClasses = {}, e) {
            e.hasOwnProperty(r) && (t.cssClasses[r] = t.cssPrefix + e[r]);
        } else t.cssClasses = e;
    }

    function vt(e) {
        var r = { margin: 0, limit: 0, padding: 0, animate: !0, animationDuration: 300, ariaFormat: u, format: u },
            n = {
                step: { r: !1, t: h },
                start: { r: !0, t: g },
                connect: { r: !0, t: x },
                direction: { r: !0, t: N },
                snap: { r: !1, t: v },
                animate: { r: !1, t: b },
                animationDuration: { r: !1, t: S },
                range: { r: !0, t: m },
                orientation: { r: !1, t: w },
                margin: { r: !1, t: y },
                limit: { r: !1, t: E },
                padding: { r: !1, t: C },
                behaviour: { r: !0, t: U },
                ariaFormat: { r: !1, t: P },
                format: { r: !1, t: A },
                tooltips: { r: !1, t: k },
                keyboardSupport: { r: !0, t: V },
                documentElement: { r: !1, t: M },
                cssPrefix: { r: !0, t: O },
                cssClasses: { r: !0, t: L }
            },
            i = {
                connect: !1,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                keyboardSupport: !0,
                cssPrefix: "noUi-",
                cssClasses: {
                    target: "target",
                    base: "base",
                    origin: "origin",
                    handle: "handle",
                    handleLower: "handle-lower",
                    handleUpper: "handle-upper",
                    touchArea: "touch-area",
                    horizontal: "horizontal",
                    vertical: "vertical",
                    background: "background",
                    connect: "connect",
                    connects: "connects",
                    ltr: "ltr",
                    rtl: "rtl",
                    draggable: "draggable",
                    drag: "state-drag",
                    tap: "state-tap",
                    active: "active",
                    tooltip: "tooltip",
                    pips: "pips",
                    pipsHorizontal: "pips-horizontal",
                    pipsVertical: "pips-vertical",
                    marker: "marker",
                    markerHorizontal: "marker-horizontal",
                    markerVertical: "marker-vertical",
                    markerNormal: "marker-normal",
                    markerLarge: "marker-large",
                    markerSub: "marker-sub",
                    value: "value",
                    valueHorizontal: "value-horizontal",
                    valueVertical: "value-vertical",
                    valueNormal: "value-normal",
                    valueLarge: "value-large",
                    valueSub: "value-sub"
                }
            };
        e.format && !e.ariaFormat && (e.ariaFormat = e.format), Object.keys(n).forEach(function (t) {
            if (!s(e[t]) && void 0 === i[t]) {
                if (n[t].r) throw new Error("noUiSlider (" + lt + "): '" + t + "' is required.");
                return !0;
            }
            n[t].t(r, s(e[t]) ? e[t] : i[t]);
        }), r.pips = e.pips;
        var t = document.createElement("div"),
            o = void 0 !== t.style.msTransform,
            a = void 0 !== t.style.transform;
        r.transformRule = a ? "transform" : o ? "msTransform" : "webkitTransform";
        return r.style = [["left", "top"], ["right", "bottom"]][r.dir][r.ort], r;
    }

    function z(t, f, o) {
        var l,
            u,
            a,
            c,
            i,
            s,
            e,
            p,
            d = window.navigator.pointerEnabled ? {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled ? {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            } : { start: "mousedown touchstart", move: "mousemove touchmove", end: "mouseup touchend" },
            h = window.CSS && CSS.supports && CSS.supports("touch-action", "none") && function () {
                var t = !1;
                try {
                    var e = Object.defineProperty({}, "passive", {
                        get: function get() {
                            t = !0;
                        }
                    });
                    window.addEventListener("test", null, e);
                } catch (t) {}
                return t;
            }(),
            y = t,
            E = f.spectrum,
            m = [],
            g = [],
            v = [],
            b = 0,
            S = {},
            x = t.ownerDocument,
            w = f.documentElement || x.documentElement,
            C = x.body,
            N = -1,
            U = 0,
            k = 1,
            P = 2,
            A = "rtl" === x.dir || 1 === f.ort ? 0 : 100;

        function V(t, e) {
            var r = x.createElement("div");
            return e && ht(r, e), t.appendChild(r), r;
        }

        function M(t, e) {
            var r = V(t, f.cssClasses.origin),
                n = V(r, f.cssClasses.handle);
            return V(n, f.cssClasses.touchArea), n.setAttribute("data-handle", e), f.keyboardSupport && (n.setAttribute("tabindex", "0"), n.addEventListener("keydown", function (t) {
                return function (t, e) {
                    if (L() || z(e)) return !1;
                    var r = ["Left", "Right"],
                        n = ["Down", "Up"];
                    f.dir && !f.ort ? r.reverse() : f.ort && !f.dir && n.reverse();
                    var i = t.key.replace("Arrow", ""),
                        o = i === n[0] || i === r[0],
                        a = i === n[1] || i === r[1];
                    if (!o && !a) return !0;
                    t.preventDefault();
                    var s = o ? 0 : 1,
                        l = st(e)[s];
                    if (null === l) return !1;
                    !1 === l && (l = E.getDefaultStep(g[e], o, 10));
                    return l = Math.max(l, 1e-7), l *= o ? -1 : 1, rt(e, E.toStepping(m[e] + l), !0, !0), J("slide", e), J("update", e), J("change", e), J("set", e), !1;
                }(t, e);
            })), n.setAttribute("role", "slider"), n.setAttribute("aria-orientation", f.ort ? "vertical" : "horizontal"), 0 === e ? ht(n, f.cssClasses.handleLower) : e === f.handles - 1 && ht(n, f.cssClasses.handleUpper), r;
        }

        function O(t, e) {
            return !!e && V(t, f.cssClasses.connect);
        }

        function r(t, e) {
            return !!f.tooltips[e] && V(t.firstChild, f.cssClasses.tooltip);
        }

        function L() {
            return y.hasAttribute("disabled");
        }

        function z(t) {
            return u[t].hasAttribute("disabled");
        }

        function j() {
            i && (G("update.tooltips"), i.forEach(function (t) {
                t && ut(t);
            }), i = null);
        }

        function H() {
            j(), i = u.map(r), $("update.tooltips", function (t, e, r) {
                if (i[e]) {
                    var n = t[e];
                    !0 !== f.tooltips[e] && (n = f.tooltips[e].to(r[e])), i[e].innerHTML = n;
                }
            });
        }

        function F(e, i, o) {
            var a = x.createElement("div"),
                s = [];
            s[U] = f.cssClasses.valueNormal, s[k] = f.cssClasses.valueLarge, s[P] = f.cssClasses.valueSub;
            var l = [];
            l[U] = f.cssClasses.markerNormal, l[k] = f.cssClasses.markerLarge, l[P] = f.cssClasses.markerSub;
            var u = [f.cssClasses.valueHorizontal, f.cssClasses.valueVertical],
                c = [f.cssClasses.markerHorizontal, f.cssClasses.markerVertical];

            function p(t, e) {
                var r = e === f.cssClasses.value,
                    n = r ? s : l;
                return e + " " + (r ? u : c)[f.ort] + " " + n[t];
            }

            return ht(a, f.cssClasses.pips), ht(a, 0 === f.ort ? f.cssClasses.pipsHorizontal : f.cssClasses.pipsVertical), Object.keys(e).forEach(function (t) {
                !function (t, e, r) {
                    if ((r = i ? i(e, r) : r) !== N) {
                        var n = V(a, !1);
                        n.className = p(r, f.cssClasses.marker), n.style[f.style] = t + "%", U < r && ((n = V(a, !1)).className = p(r, f.cssClasses.value), n.setAttribute("data-value", e), n.style[f.style] = t + "%", n.innerHTML = o.to(e));
                    }
                }(t, e[t][0], e[t][1]);
            }), a;
        }

        function D() {
            c && (ut(c), c = null);
        }

        function T(t) {
            D();
            var m,
                g,
                v,
                b,
                e,
                r,
                S,
                x,
                w,
                n = t.mode,
                i = t.density || 1,
                o = t.filter || !1,
                a = function (t, e, r) {
                    if ("range" === t || "steps" === t) return E.xVal;
                    if ("count" === t) {
                        if (e < 2) throw new Error("noUiSlider (" + lt + "): 'values' (>= 2) required for mode 'count'.");
                        var n = e - 1,
                            i = 100 / n;
                        for (e = []; n--;) {
                            e[n] = n * i;
                        }
                        e.push(100), t = "positions";
                    }
                    return "positions" === t ? e.map(function (t) {
                        return E.fromStepping(r ? E.getStep(t) : t);
                    }) : "values" === t ? r ? e.map(function (t) {
                        return E.fromStepping(E.getStep(E.toStepping(t)));
                    }) : e : void 0;
                }(n, t.values || !1, t.stepped || !1),
                s = (m = i, g = n, v = a, b = {}, e = E.xVal[0], r = E.xVal[E.xVal.length - 1], x = S = !1, w = 0, (v = v.slice().sort(function (t, e) {
                    return t - e;
                }).filter(function (t) {
                    return !this[t] && (this[t] = !0);
                }, {}))[0] !== e && (v.unshift(e), S = !0), v[v.length - 1] !== r && (v.push(r), x = !0), v.forEach(function (t, e) {
                    var r,
                        n,
                        i,
                        o,
                        a,
                        s,
                        l,
                        u,
                        c,
                        p,
                        f = t,
                        d = v[e + 1],
                        h = "steps" === g;
                    if (h && (r = E.xNumSteps[e]), r || (r = d - f), !1 !== f && void 0 !== d) for (r = Math.max(r, 1e-7), n = f; n <= d; n = (n + r).toFixed(7) / 1) {
                        for (u = (a = (o = E.toStepping(n)) - w) / m, p = a / (c = Math.round(u)), i = 1; i <= c; i += 1) {
                            b[(s = w + i * p).toFixed(5)] = [E.fromStepping(s), 0];
                        }
                        l = -1 < v.indexOf(n) ? k : h ? P : U, !e && S && (l = 0), n === d && x || (b[o.toFixed(5)] = [n, l]), w = o;
                    }
                }), b),
                l = t.format || { to: Math.round };
            return c = y.appendChild(F(s, o, l));
        }

        function R() {
            var t = l.getBoundingClientRect(),
                e = "offset" + ["Width", "Height"][f.ort];
            return 0 === f.ort ? t.width || l[e] : t.height || l[e];
        }

        function B(n, i, o, a) {
            var e = function e(t) {
                    return !!(t = function (t, e, r) {
                        var n,
                            i,
                            o = 0 === t.type.indexOf("touch"),
                            a = 0 === t.type.indexOf("mouse"),
                            s = 0 === t.type.indexOf("pointer");
                        0 === t.type.indexOf("MSPointer") && (s = !0);
                        if (o) {
                            var l = function l(t) {
                                return t.target === r || r.contains(t.target);
                            };
                            if ("touchstart" === t.type) {
                                var u = Array.prototype.filter.call(t.touches, l);
                                if (1 < u.length) return !1;
                                n = u[0].pageX, i = u[0].pageY;
                            } else {
                                var c = Array.prototype.find.call(t.changedTouches, l);
                                if (!c) return !1;
                                n = c.pageX, i = c.pageY;
                            }
                        }
                        e = e || gt(x), (a || s) && (n = t.clientX + e.x, i = t.clientY + e.y);
                        return t.pageOffset = e, t.points = [n, i], t.cursor = a || s, t;
                    }(t, a.pageOffset, a.target || i)) && !(L() && !a.doNotReject) && (e = y, r = f.cssClasses.tap, !((e.classList ? e.classList.contains(r) : new RegExp("\\b" + r + "\\b").test(e.className)) && !a.doNotReject) && !(n === d.start && void 0 !== t.buttons && 1 < t.buttons) && (!a.hover || !t.buttons) && (h || t.preventDefault(), t.calcPoint = t.points[f.ort], void o(t, a)));
                    var e, r;
                },
                r = [];
            return n.split(" ").forEach(function (t) {
                i.addEventListener(t, e, !!h && { passive: !0 }), r.push([t, e]);
            }), r;
        }

        function q(t) {
            var e,
                r,
                n,
                i,
                o,
                a,
                s = 100 * (t - (e = l, r = f.ort, n = e.getBoundingClientRect(), i = e.ownerDocument, o = i.documentElement, a = gt(i), /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (a.x = 0), r ? n.top + a.y - o.clientTop : n.left + a.x - o.clientLeft)) / R();
            return s = ft(s), f.dir ? 100 - s : s;
        }

        function X(t, e) {
            "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && _(t, e);
        }

        function Y(t, e) {
            if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return _(t, e);
            var r = (f.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
            Z(0 < r, 100 * r / e.baseSize, e.locations, e.handleNumbers);
        }

        function _(t, e) {
            e.handle && (mt(e.handle, f.cssClasses.active), b -= 1), e.listeners.forEach(function (t) {
                w.removeEventListener(t[0], t[1]);
            }), 0 === b && (mt(y, f.cssClasses.drag), et(), t.cursor && (C.style.cursor = "", C.removeEventListener("selectstart", ct))), e.handleNumbers.forEach(function (t) {
                J("change", t), J("set", t), J("end", t);
            });
        }

        function I(t, e) {
            if (e.handleNumbers.some(z)) return !1;
            var r;
            1 === e.handleNumbers.length && (r = u[e.handleNumbers[0]].children[0], b += 1, ht(r, f.cssClasses.active));
            t.stopPropagation();
            var n = [],
                i = B(d.move, w, Y, {
                    target: t.target,
                    handle: r,
                    listeners: n,
                    startCalcPoint: t.calcPoint,
                    baseSize: R(),
                    pageOffset: t.pageOffset,
                    handleNumbers: e.handleNumbers,
                    buttonsProperty: t.buttons,
                    locations: g.slice()
                }),
                o = B(d.end, w, _, {
                    target: t.target,
                    handle: r,
                    listeners: n,
                    doNotReject: !0,
                    handleNumbers: e.handleNumbers
                }),
                a = B("mouseout", w, X, {
                    target: t.target,
                    handle: r,
                    listeners: n,
                    doNotReject: !0,
                    handleNumbers: e.handleNumbers
                });
            n.push.apply(n, i.concat(o, a)), t.cursor && (C.style.cursor = getComputedStyle(t.target).cursor, 1 < u.length && ht(y, f.cssClasses.drag), C.addEventListener("selectstart", ct, !1)), e.handleNumbers.forEach(function (t) {
                J("start", t);
            });
        }

        function n(t) {
            t.stopPropagation();
            var i,
                o,
                a,
                e = q(t.calcPoint),
                r = (i = e, a = !(o = 100), u.forEach(function (t, e) {
                    if (!z(e)) {
                        var r = g[e],
                            n = Math.abs(r - i);
                        (n < o || n <= o && r < i || 100 === n && 100 === o) && (a = e, o = n);
                    }
                }), a);
            if (!1 === r) return !1;
            f.events.snap || pt(y, f.cssClasses.tap, f.animationDuration), rt(r, e, !0, !0), et(), J("slide", r, !0), J("update", r, !0), J("change", r, !0), J("set", r, !0), f.events.snap && I(t, { handleNumbers: [r] });
        }

        function W(t) {
            var e = q(t.calcPoint),
                r = E.getStep(e),
                n = E.fromStepping(r);
            Object.keys(S).forEach(function (t) {
                "hover" === t.split(".")[0] && S[t].forEach(function (t) {
                    t.call(s, n);
                });
            });
        }

        function $(t, e) {
            S[t] = S[t] || [], S[t].push(e), "update" === t.split(".")[0] && u.forEach(function (t, e) {
                J("update", e);
            });
        }

        function G(t) {
            var n = t && t.split(".")[0],
                i = n && t.substring(n.length);
            Object.keys(S).forEach(function (t) {
                var e = t.split(".")[0],
                    r = t.substring(e.length);
                n && n !== e || i && i !== r || delete S[t];
            });
        }

        function J(r, n, i) {
            Object.keys(S).forEach(function (t) {
                var e = t.split(".")[0];
                r === e && S[t].forEach(function (t) {
                    t.call(s, m.map(f.format.to), n, m.slice(), i || !1, g.slice());
                });
            });
        }

        function K(t, e, r, n, i, o) {
            return 1 < u.length && !f.events.unconstrained && (n && 0 < e && (r = Math.max(r, t[e - 1] + f.margin)), i && e < u.length - 1 && (r = Math.min(r, t[e + 1] - f.margin))), 1 < u.length && f.limit && (n && 0 < e && (r = Math.min(r, t[e - 1] + f.limit)), i && e < u.length - 1 && (r = Math.max(r, t[e + 1] - f.limit))), f.padding && (0 === e && (r = Math.max(r, f.padding[0])), e === u.length - 1 && (r = Math.min(r, 100 - f.padding[1]))), !((r = ft(r = E.getStep(r))) === t[e] && !o) && r;
        }

        function Q(t, e) {
            var r = f.ort;
            return (r ? e : t) + ", " + (r ? t : e);
        }

        function Z(t, n, r, e) {
            var i = r.slice(),
                o = [!t, t],
                a = [t, !t];
            e = e.slice(), t && e.reverse(), 1 < e.length ? e.forEach(function (t, e) {
                var r = K(i, t, i[t] + n, o[e], a[e], !1);
                !1 === r ? n = 0 : (n = r - i[t], i[t] = r);
            }) : o = a = [!0];
            var s = !1;
            e.forEach(function (t, e) {
                s = rt(t, r[t] + n, o[e], a[e]) || s;
            }), s && e.forEach(function (t) {
                J("update", t), J("slide", t);
            });
        }

        function tt(t, e) {
            return f.dir ? 100 - t - e : t;
        }

        function et() {
            v.forEach(function (t) {
                var e = 50 < g[t] ? -1 : 1,
                    r = 3 + (u.length + e * t);
                u[t].style.zIndex = r;
            });
        }

        function rt(t, e, r, n) {
            return !1 !== (e = K(g, t, e, r, n, !1)) && (function (t, e) {
                g[t] = e, m[t] = E.fromStepping(e);
                var r = "translate(" + Q(10 * (tt(e, 0) - A) + "%", "0") + ")";
                u[t].style[f.transformRule] = r, nt(t), nt(t + 1);
            }(t, e), !0);
        }

        function nt(t) {
            if (a[t]) {
                var e = 0,
                    r = 100;
                0 !== t && (e = g[t - 1]), t !== a.length - 1 && (r = g[t]);
                var n = r - e,
                    i = "translate(" + Q(tt(e, n) + "%", "0") + ")",
                    o = "scale(" + Q(n / 100, "1") + ")";
                a[t].style[f.transformRule] = i + " " + o;
            }
        }

        function it(t, e) {
            return null === t || !1 === t || void 0 === t ? g[e] : ("number" == typeof t && (t = String(t)), t = f.format.from(t), !1 === (t = E.toStepping(t)) || isNaN(t) ? g[e] : t);
        }

        function ot(t, e) {
            var r = dt(t),
                n = void 0 === g[0];
            e = void 0 === e || !!e, f.animate && !n && pt(y, f.cssClasses.tap, f.animationDuration), v.forEach(function (t) {
                rt(t, it(r[t], t), !0, !1);
            }), v.forEach(function (t) {
                rt(t, g[t], !0, !0);
            }), et(), v.forEach(function (t) {
                J("update", t), null !== r[t] && e && J("set", t);
            });
        }

        function at() {
            var t = m.map(f.format.to);
            return 1 === t.length ? t[0] : t;
        }

        function st(t) {
            var e = g[t],
                r = E.getNearbySteps(e),
                n = m[t],
                i = r.thisStep.step,
                o = null;
            if (f.snap) return [n - r.stepBefore.startValue || null, r.stepAfter.startValue - n || null];
            !1 !== i && n + i > r.stepAfter.startValue && (i = r.stepAfter.startValue - n), o = n > r.thisStep.startValue ? r.thisStep.step : !1 !== r.stepBefore.step && n - r.stepBefore.highestStep, 100 === e ? i = null : 0 === e && (o = null);
            var a = E.countStepDecimals();
            return null !== i && !1 !== i && (i = Number(i.toFixed(a))), null !== o && !1 !== o && (o = Number(o.toFixed(a))), [o, i];
        }

        return ht(e = y, f.cssClasses.target), 0 === f.dir ? ht(e, f.cssClasses.ltr) : ht(e, f.cssClasses.rtl), 0 === f.ort ? ht(e, f.cssClasses.horizontal) : ht(e, f.cssClasses.vertical), l = V(e, f.cssClasses.base), function (t, e) {
            var r = V(e, f.cssClasses.connects);
            u = [], (a = []).push(O(r, t[0]));
            for (var n = 0; n < f.handles; n++) {
                u.push(M(e, n)), v[n] = n, a.push(O(r, t[n + 1]));
            }
        }(f.connect, l), (p = f.events).fixed || u.forEach(function (t, e) {
            B(d.start, t.children[0], I, { handleNumbers: [e] });
        }), p.tap && B(d.start, l, n, {}), p.hover && B(d.move, l, W, { hover: !0 }), p.drag && a.forEach(function (t, e) {
            if (!1 !== t && 0 !== e && e !== a.length - 1) {
                var r = u[e - 1],
                    n = u[e],
                    i = [t];
                ht(t, f.cssClasses.draggable), p.fixed && (i.push(r.children[0]), i.push(n.children[0])), i.forEach(function (t) {
                    B(d.start, t, I, { handles: [r, n], handleNumbers: [e - 1, e] });
                });
            }
        }), ot(f.start), f.pips && T(f.pips), f.tooltips && H(), $("update", function (t, e, a, r, s) {
            v.forEach(function (t) {
                var e = u[t],
                    r = K(g, t, 0, !0, !0, !0),
                    n = K(g, t, 100, !0, !0, !0),
                    i = s[t],
                    o = f.ariaFormat.to(a[t]);
                r = E.fromStepping(r).toFixed(1), n = E.fromStepping(n).toFixed(1), i = E.fromStepping(i).toFixed(1), e.children[0].setAttribute("aria-valuemin", r), e.children[0].setAttribute("aria-valuemax", n), e.children[0].setAttribute("aria-valuenow", i), e.children[0].setAttribute("aria-valuetext", o);
            });
        }), s = {
            destroy: function destroy() {
                for (var t in f.cssClasses) {
                    f.cssClasses.hasOwnProperty(t) && mt(y, f.cssClasses[t]);
                }
                for (; y.firstChild;) {
                    y.removeChild(y.firstChild);
                }
                delete y.noUiSlider;
            }, steps: function steps() {
                return v.map(st);
            }, on: $, off: G, get: at, set: ot, setHandle: function setHandle(t, e, r) {
                if (!(0 <= (t = Number(t)) && t < v.length)) throw new Error("noUiSlider (" + lt + "): invalid handle number, got: " + t);
                rt(t, it(e, t), !0, !0), J("update", t), r && J("set", t);
            }, reset: function reset(t) {
                ot(f.start, t);
            }, __moveHandles: function __moveHandles(t, e, r) {
                Z(t, e, g, r);
            }, options: o, updateOptions: function updateOptions(e, t) {
                var r = at(),
                    n = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"];
                n.forEach(function (t) {
                    void 0 !== e[t] && (o[t] = e[t]);
                });
                var i = vt(o);
                n.forEach(function (t) {
                    void 0 !== e[t] && (f[t] = i[t]);
                }), E = i.spectrum, f.margin = i.margin, f.limit = i.limit, f.padding = i.padding, f.pips ? T(f.pips) : D(), f.tooltips ? H() : j(), g = [], ot(e.start || r, t);
            }, target: y, removePips: D, removeTooltips: j, pips: T
        };
    }

    return {
        __spectrum: l, version: lt, create: function create(t, e) {
            if (!t || !t.nodeName) throw new Error("noUiSlider (" + lt + "): create requires a single element, got: " + t);
            if (t.noUiSlider) throw new Error("noUiSlider (" + lt + "): Slider was already initialized.");
            var r = z(t, vt(e), e);
            return t.noUiSlider = r;
        }
    };
});

if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {}
            ;
        } while (i < 0 && (el = el.parentElement));
        return el;
    };
}

var priceFilterWidget = function () {

    var $elements = {};
    var localeData = {
        en_eur: {
            currency: { code: "KRW", symbol: "원", position: "prefix" },
            sliderStep: 10,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 250,
            sliderLabel: "가격"
        },
        en_eur: {
            currency: { code: "EUR", symbol: "â‚¬", position: "prefix" },
            sliderStep: 10,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 250,
            sliderLabel: "Price"
        },
        en_gbp: {
            currency: { code: "GBP", symbol: "Â£", position: "prefix" },
            sliderStep: 10,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 200,
            sliderLabel: "Price"
        },
        en_usd: {
            currency: { code: "USD", symbol: "$", position: "prefix" },
            sliderStep: 15,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 300,
            sliderLabel: "Price"
        },
        en_sek: {
            currency: { code: "SEK", symbol: " SEK", position: "suffix" },
            sliderStep: 100,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 2500,
            sliderLabel: "Price"
        },
        en_dkk: {
            currency: { code: "DKK", symbol: " DKK", position: "suffix" },
            sliderStep: 100,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 2000,
            sliderLabel: "Price"
        },
        en_nok: {
            currency: { code: "NOK", symbol: " NOK", position: "suffix" },
            sliderStep: 100,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 2500,
            sliderLabel: "Price"
        },
        en_ch: {
            currency: { code: "CHF", symbol: " CHF", position: "prefix" },
            sliderStep: 10,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 270,
            sliderLabel: "Price"
        },
        en_de: {
            currency: { code: "EUR", symbol: "â‚¬", position: "prefix" },
            sliderStep: 10,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 250,
            sliderLabel: "Price"
        },
        de_ch: {
            currency: { code: "CHF", symbol: " CHF", position: "prefix" },
            sliderStep: 10,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 270,
            sliderLabel: "Preis"
        },
        de_de: {
            currency: { code: "EUR", symbol: "â‚¬", position: "prefix" },
            sliderStep: 10,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 250,
            sliderLabel: "Preis"
        },
        fr_ch: {
            currency: { code: "CHF", symbol: " CHF", position: "prefix" },
            sliderStep: 10,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 270,
            sliderLabel: "Prix"
        },
        default: {
            currency: { code: "", symbol: "원", position: "suffix" },
            sliderStep: 10,
            minFilterRangeValue: 0,
            maxFilterRangeValue: 1000,
            sliderLabel: "가격"
        }
    };

    var getCurrentLocale = function getCurrentLocale() {
        var acceptedLocales = ["kr_krw","en_eur", "en_gbp", "en_usd", "en_sek", "en_dkk", "en_nok", "en_ch", "en_de", "de_ch", "de_de", "fr_ch"];
        for (var i = 0; i < acceptedLocales.length; i++) {
            if (window.location.pathname.indexOf(acceptedLocales[i]) !== -1) {
                return acceptedLocales[i];
                break;
            }
        }
        return false;
    };

    var locale = function () {
        var currentLocale = getCurrentLocale();
        if (localeData[currentLocale]) {
            return localeData[currentLocale];
        } else {
            return localeData.default;
        }
    }();

    var getElement = function getElement(selector) {
        if (!$elements[selector]) {
            $elements[selector] = document.querySelectorAll(selector);
        }
        return $elements[selector];
    };

    //console.dir(getElement("#productPerPage"));

    var setURLParameter = function setURLParameter(param, paramVal) {
        var url = window.location.href;
        var newAdditionalURL = "";
        var tempArray = url.split("?");
        var baseURL = tempArray[0];
        var additionalURL = tempArray[1];
        var temp = "";
        if (additionalURL) {
            tempArray = additionalURL.split("&");
            for (var i = 0; i < tempArray.length; i++) {
                if (tempArray[i].split('=')[0] != param) {
                    newAdditionalURL += temp + tempArray[i];
                    temp = "&";
                }
            }
        }
        var rows_txt = temp + "" + param + "=" + paramVal;
        window.history.pushState(null, null, baseURL + "?" + newAdditionalURL + rows_txt);
    };

    var getURLParameter = function getURLParameter(param) {
        param = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + param + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    var getwNumbCurrencyFormatting = function getwNumbCurrencyFormatting() {
        return wNumb(_defineProperty({
            decimals: 0
        }, locale.currency.position, locale.currency.symbol));
    };

    var filterProducts = function filterProducts(min, max) {
        if (max == locale.maxFilterRangeValue) {
            max = Infinity;
        }
        var $products = document.querySelectorAll(".productlisting .o-product");
        //var $firstProductContainer = getElement(".o-category-listing")[0];
        for (var i = 0; i < $products.length; i++) {
            var productPrice = $products[i].querySelector(".price").innerText;
            var $product = $products[i].closest(".column");
            if (Math.floor(productPrice) >= Math.floor(min) && Math.floor(productPrice) <= Math.floor(max)) {
                $product.style.display = "inline-block";
            } else {
                $product.style.display = "none";
            }
            //$firstProductContainer.appendChild($product);
            //window.scrollTo(0,document.body.scrollHeight);
            //$product.scrollIntoView();
        }
    };

    var setDirtyState = function setDirtyState() {
        var $filter = getElement(".o-product-filter")[0];
        var $filterClearBtn = getElement(".o-product-filter a.js-clear")[0];
        $filter.classList.add("has-applied-filters");
        $filterClearBtn.classList.add("is-disabled");
        $filterClearBtn.setAttribute("disabled", "disabled");
    };

    var slider = function slider() { 
        var $sliderContainer,
            $sliderContainerFilterlist,
            sliderInstance,
            sliderInstance2,
            sliderValues,
            sliderStep = locale.sliderStep;
        var sliderRange = function () {
            var urlParam = getURLParameter("price").split("<");
            var range;
            if (urlParam.length == 2) {
                range = {
                    min: parseInt(urlParam[0]),
                    max: parseInt(urlParam[1])
                };
            } else {
                range = {
                    min: locale.minFilterRangeValue,
                    max: locale.maxFilterRangeValue
                };
            }
            return range;
        }();
        var mountElement = function mountElement(options) {
            var $sliderWrapper = document.createElement("div");
            $sliderWrapper.className = "priceFilterWidget--outer";
            $sliderContainer = document.createElement("div");
            $sliderContainer.className = "priceFilterWidget";
            var $sliderLabel = document.createElement("span");
            $sliderLabel.className = "priceFilterWidget--label";
            $sliderLabel.innerHTML = locale.sliderLabel;
            $sliderWrapper.appendChild($sliderLabel);
            $sliderWrapper.appendChild($sliderContainer);
            getElement(options.selector)[0].parentNode.appendChild($sliderWrapper); // 수정
            var $sliderWrapperFilterlist = $sliderWrapper.cloneNode(true);
            $sliderContainerFilterlist = $sliderWrapperFilterlist.querySelector(".priceFilterWidget");
           // getElement(".filters-content")[0].appendChild($sliderWrapperFilterlist);
        };
        var createInstance = function createInstance(options) {
            if(!options){
                console.log("에러발생 : options 값이 존재하지 않습니다.")
                return false;
            }

            if (sliderRange.min !== locale.minFilterRangeValue || sliderRange.max !== locale.maxFilterRangeValue) {
                filterProducts(sliderRange.min, sliderRange.max);
                setTimeout(function () {
                    setDirtyState();
                }, 50);
            }
            var currencyFormatting = getwNumbCurrencyFormatting();
            var sliderInstanceSettings = {
                animate: false,
                animationDuration: 100,
                start: [
                    (options.startPosMin) ? options.startPosMin : sliderRange.min,                      // options 추가 #1
                    (options.startPosMax) ? options.startPosMax : sliderRange.max                       // options 추가 #2
                ],
                step: options.sliderStep,
                margin: options.sliderStep,
                connect: true,
                tooltips: [currencyFormatting, currencyFormatting],
                range: {
                    min: (options.priceMin) ? options.priceMin : locale.minFilterRangeValue, // options 추가 #3
                    max: (options.priceMax) ? options.priceMax : locale.maxFilterRangeValue // options 추가 #4
                }
            };
            sliderInstance = noUiSlider.create($sliderContainer, sliderInstanceSettings);
            sliderInstance2 = noUiSlider.create($sliderContainerFilterlist, sliderInstanceSettings);
            sliderInstance.on("change", options.onCustomChange.bind(this)); // bind 추가
            sliderInstance2.on("change", options.onCustomChange.bind(this)); // bind 추가
            sliderInstance.on("update", options.onCustomUpdate.bind(this)); // bind 추가
            sliderInstance2.on("update", options.onCustomUpdate.bind(this)); // bind 추가
        };
        var stepsBetween = function(instance) {
            var min = instance.get()[0];
            var max = instance.get()[1];
            var steps = instance.options.step;
            return (max/steps) - (min/steps);
        };
        var spaceTooltips = function (instance) {
            var transformValues = [-100, 0];
            var $minTooltip = getElement(".noUi-handle-lower .noUi-tooltip");
            var $maxTooltip = getElement(".noUi-handle-upper .noUi-tooltip");
            if (stepsBetween(instance) <= ($maxTooltip[0].innerText.length - 2) && stepsBetween(instance) !== 0) {
                for (var i = 0; i < $minTooltip.length; i++) {
                    $minTooltip[i].style.transform = "translate(" + transformValues[0] + "%, 0)";
                    $maxTooltip[i].style.transform = "translate(" + transformValues[1] + "%, 0)";
                    //$maxTooltip[i].style.opacity = "1";
                }
            } else if (stepsBetween(instance) == 0) {
                for (var i = 0; i < $minTooltip.length; i++) {
                    $minTooltip[i].setAttribute("style", "");
                    $maxTooltip[i].setAttribute("style", "");
                    //$maxTooltip[i].style.opacity = "0";
                }
            }
            else {
                for (var i = 0; i < $minTooltip.length; i++) {
                    $minTooltip[i].setAttribute("style", "");
                    $maxTooltip[i].setAttribute("style", "");
                }
            }
        };
        var onUpdate = function onUpdate(values) {
            if (values[1] == locale.maxFilterRangeValue) {
                var $toolTips = getElement(".noUi-handle-upper .noUi-tooltip");
                for (var i = 0; i < $toolTips.length; i++) {
                    if ($toolTips[i].innerHTML[$toolTips[i].innerHTML.length - 1] == "+") {
                        continue;
                    } else {
                        $toolTips[i].innerHTML += "+";
                    }
                }
            }
            spaceTooltips(this);
        };
        var trackTimeout;
        var onChange = function onChange(values) {
            console.log(options);
            clearInterval(trackTimeout);
            sliderValues = {
                min: values ? values[0] : sliderInstance.get()[0],
                max: values ? values[1] : sliderInstance.get()[1]
            };
            filterProducts(sliderValues.min, sliderValues.max);
            setDirtyState();
            setURLParameter("price", Math.floor(sliderValues.min) + "<" + Math.floor(sliderValues.max));
            syncAll();
            trackTimeout = setTimeout(function () {
                track([Math.floor(sliderValues.min), Math.floor(sliderValues.max)].join("-"));
            }, 5000);
        };
        var track = function track(action) {
            if (typeof utag !== 'undefined' && (typeof utag === "undefined" ? "undefined" : _typeof22(utag)) === 'object' && typeof utag.link === 'function') {
                utag.link({
                    'event_category': "COS-Festive_Campaign-Price Range Filter",
                    'event_action': action
                });
            }
        };
        var syncAll = function sync() {
            sliderInstance.set([sliderValues.min, sliderValues.max]);
            sliderInstance2.set([sliderValues.min, sliderValues.max]);
        };
        var reset = function reset() {
            sliderInstance.set([locale.minFilterRangeValue, locale.maxFilterRangeValue]);
            sliderInstance2.set([locale.minFilterRangeValue, locale.maxFilterRangeValue]);
        };
        var init = function init(options) {
            mountElement(options);
            createInstance(options);
        };
        return {
            init: init,
            reset: reset,
            update: onChange
        };
    }();

    var onXHRLoad = function () {
        var send = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function () {
            this.addEventListener("load", function () {
                if (this.responseURL.indexOf("quality") !== -1 || this.responseURL.indexOf("sizes") !== -1 || this.responseURL.indexOf("theme") !== -1 || this.responseURL.indexOf("sort") !== -1 || this.responseURL.indexOf("start") !== -1) {
                    slider.update();
                }
            });
            return send.apply(this, arguments);
        };
    }();

    var onClick = function () {
        document.addEventListener("click", function (event) {
            if (event.target.classList.contains("js-clear")) {
                slider.reset();
            }
        });
    }();

    var onDocumentReady = function onDocumentReady(fn) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    };

    var init = function init(options) {
        onDocumentReady((function () {
            slider.init(options);
        }).bind(this));// 바인드추가
    };

    return {
        init: init
    };
}();

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
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/babel-loader/lib/index.js?!./node_modules/eslint-loader/index.js?!./app/transforms/jsfuck.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/eslint-loader/index.js?!./app/transforms/jsfuck.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/eslint-loader??ref--6!./app/transforms/jsfuck.js ***!
  \*****************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /home/thom/website/src/sites/paste.kirjava.xyz/app/transforms/jsfuck.js: Unexpected token (2:1)\n\n\u001b[0m \u001b[90m 1 | \u001b[39m\u001b[36mimport\u001b[39m { \u001b[33mJSFuck\u001b[39m } from \u001b[32m'jsfuck'\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 2 | \u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m   | \u001b[39m \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 3 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 4 | \u001b[39mself\u001b[33m.\u001b[39monmessage \u001b[33m=\u001b[39m ({ data\u001b[33m:\u001b[39m { code\u001b[33m,\u001b[39m shouldEval } }) \u001b[33m=>\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m 5 | \u001b[39m    self\u001b[33m.\u001b[39mpostMessage({ code\u001b[33m:\u001b[39m \u001b[33mJSFuck\u001b[39m\u001b[33m.\u001b[39mencode(code\u001b[33m,\u001b[39m shouldEval) })\u001b[33m;\u001b[39m\u001b[0m\n    at _class.raise (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:4028:15)\n    at _class.unexpected (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:5343:16)\n    at _class.jsxParseIdentifier (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:3504:14)\n    at _class.jsxParseNamespacedName (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:3514:23)\n    at _class.jsxParseElementName (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:3525:23)\n    at _class.jsxParseOpeningElementAt (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:3610:24)\n    at _class.jsxParseElementAt (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:3643:33)\n    at _class.jsxParseElement (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:3712:19)\n    at _class.parseExprAtom (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:3719:21)\n    at _class.parseExprSubscripts (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:6019:21)\n    at _class.parseMaybeUnary (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:5998:21)\n    at _class.parseExprOps (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:5907:21)\n    at _class.parseMaybeConditional (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:5879:21)\n    at _class.parseMaybeAssign (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:5826:21)\n    at _class.parseExpression (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:5779:21)\n    at _class.parseStatementContent (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:7391:21)\n    at _class.parseStatement (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:7277:17)\n    at _class.parseBlockOrModuleBlockBody (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:7829:23)\n    at _class.parseBlockBody (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:7816:10)\n    at _class.parseTopLevel (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:7242:10)\n    at _class.parse (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:8642:17)\n    at parse (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:10648:38)\n    at parser (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\n    at normalizeFile (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\n    at runSync (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/core/lib/transformation/index.js:44:43)\n    at runAsync (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/core/lib/transformation/index.js:35:14)\n    at process.nextTick (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/core/lib/transform.js:34:34)\n    at process.internalTickCallback (internal/process/next_tick.js:70:11)");

/***/ })

/******/ });
//# sourceMappingURL=17460700ebbca39daf3f.worker.js.map
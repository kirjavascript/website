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
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/babel-loader/lib/index.js?!./node_modules/eslint-loader/index.js?!./app/transforms/packer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/eslint-loader/index.js?!./app/transforms/packer.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/eslint-loader??ref--6!./app/transforms/packer.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /home/thom/website/src/sites/paste.kirjava.xyz/app/transforms/packer.js: 'with' in strict mode (2338:0)\n\n\u001b[0m \u001b[90m 2336 | \u001b[39mbase2\u001b[33m.\u001b[39maddPackage(\u001b[32m\"code\"\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 2337 | \u001b[39mbase2\u001b[33m.\u001b[39mcode\u001b[33m.\u001b[39maddName(\u001b[32m\"Colorizer\"\u001b[39m\u001b[33m,\u001b[39m \u001b[33mColorizer\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 2338 | \u001b[39m\u001b[36mwith\u001b[39m(base2\u001b[33m.\u001b[39mcode\u001b[33m.\u001b[39m\u001b[33mColorizer\u001b[39m) addScheme(\u001b[32m\"xml\"\u001b[39m\u001b[33m,\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m      | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 2339 | \u001b[39m    attribute\u001b[33m:\u001b[39m \u001b[35m/(\\w+)=(\"[^\"]*\"|'[^']*')/\u001b[39m\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 2340 | \u001b[39m    cdata\u001b[33m:\u001b[39m \u001b[35m/<!\\[CDATA\\[([^\\]]|\\][^\\]]|\\]\\][^>])*\\]\\]>/\u001b[39m\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 2341 | \u001b[39m    comment\u001b[33m:\u001b[39m \u001b[35m/<!\\s*(--([^-]|[\\r\\n]|-[^-])*--\\s*)>/\u001b[39m\u001b[33m,\u001b[39m\u001b[0m\n    at _class.raise (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:4028:15)\n    at _class.parseWithStatement (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:7744:12)\n    at _class.parseStatementContent (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:7333:21)\n    at _class.parseStatement (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:7277:17)\n    at _class.parseBlockOrModuleBlockBody (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:7829:23)\n    at _class.parseBlockBody (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:7816:10)\n    at _class.parseTopLevel (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:7242:10)\n    at _class.parse (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:8642:17)\n    at parse (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/parser/lib/index.js:10648:38)\n    at parser (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\n    at normalizeFile (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\n    at runSync (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/core/lib/transformation/index.js:44:43)\n    at runAsync (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/core/lib/transformation/index.js:35:14)\n    at process.nextTick (/home/thom/website/src/sites/paste.kirjava.xyz/node_modules/@babel/core/lib/transform.js:34:34)\n    at process.internalTickCallback (internal/process/next_tick.js:70:11)");

/***/ })

/******/ });
//# sourceMappingURL=a939176a44aaca280fcd.worker.js.map
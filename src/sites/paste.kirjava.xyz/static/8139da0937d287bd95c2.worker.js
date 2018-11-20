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
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/babel-loader/lib/index.js?!./node_modules/eslint-loader/index.js?!./app/transforms/jscrush.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/eslint-loader/index.js?!./app/transforms/jscrush.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/eslint-loader??ref--6!./app/transforms/jscrush.js ***!
  \******************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jscrush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jscrush */ "./node_modules/jscrush/jscrush.js");
/* harmony import */ var jscrush__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jscrush__WEBPACK_IMPORTED_MODULE_0__);


self.onmessage = function (_ref) {
  var code = _ref.data.code;
  self.postMessage({
    code: jscrush__WEBPACK_IMPORTED_MODULE_0___default()(code)
  });
};

/***/ }),

/***/ "./node_modules/jscrush/jscrush.js":
/*!*****************************************!*\
  !*** ./node_modules/jscrush/jscrush.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (data) {
    Q=[];
    for (i=1000;--i;i-10&&i-13&&i-34&&i-39&&i-92&&Q.push(String.fromCharCode(i)));

        i=s=data.replace(/([\r\n]|^)\s*\/\/.*|[\r\n]+\s*/g,'').replace(/\\/g,'\\\\'),X=B=s.length/2,O=m='';
        for(S=encodeURI(i).replace(/%../g,'i').length;;m=c+m){
            for(M=N=e=c=0,i=Q.length;!c&&--i;!~s.indexOf(Q[i])&&(c=Q[i]));
            if(!c)break;
            if(O){
                o={};
                for(x in O)
                    for(j=s.indexOf(x),o[x]=0;~j;o[x]++)j=s.indexOf(x,j+x.length);
                O=o;
            }else for(O=o={},t=1;X;t++)
                    for(X=i=0;++i<s.length-t;)
                        if(!o[x=s.substr(j=i,t)])
                            if(~(j=s.indexOf(x,j+t)))
                                for(X=t,o[x]=1;~j;o[x]++)j=s.indexOf(x,j+t);
            for(x in O) {
                j=encodeURI(x).replace(/%../g,'i').length;
                if(j=(R=O[x])*j-j-(R+1)*encodeURI(c).replace(/%../g,'i').length)
                    (j>M||j==M&&R>N)&&(M=j,N=R,e=x);
                if(j<1)
                    delete O[x]
            }
            o={};
            for(x in O)
                o[x.split(e).join(c)]=1;
            O=o;
            if(!e)break;
            s=s.split(e).join(c)+c+e
        }
        c=s.split('"').length<s.split("'").length?(B='"',/"/g):(B="'",/'/g);
        return '_='+B+s.replace(c,'\\'+B)+B+';for(Y in $='+B+m+B+')with(_.split($[Y]))_=join(pop());eval(_)';

};


/***/ })

/******/ });
//# sourceMappingURL=8139da0937d287bd95c2.worker.js.map
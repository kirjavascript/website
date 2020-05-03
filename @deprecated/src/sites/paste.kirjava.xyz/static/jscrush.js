(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["jscrush"],{

/***/ "./node_modules/worker-loader/dist/cjs.js?inline!./app/transforms/jscrush.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/worker-loader/dist/cjs.js?inline!./app/transforms/jscrush.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return __webpack_require__(/*! !./node_modules/worker-loader/dist/workers/InlineWorker.js */ "./node_modules/worker-loader/dist/workers/InlineWorker.js")("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./node_modules/babel-loader/lib/index.js?!./node_modules/eslint-loader/index.js?!./app/transforms/jscrush.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./node_modules/babel-loader/lib/index.js?!./node_modules/eslint-loader/index.js?!./app/transforms/jscrush.js\":\n/*!******************************************************************************************************************!*\\\n  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/eslint-loader??ref--6!./app/transforms/jscrush.js ***!\n  \\******************************************************************************************************************/\n/*! no exports provided */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jscrush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jscrush */ \"./node_modules/jscrush/jscrush.js\");\n/* harmony import */ var jscrush__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jscrush__WEBPACK_IMPORTED_MODULE_0__);\n\n\nself.onmessage = function (_ref) {\n  var code = _ref.data.code;\n  self.postMessage({\n    code: jscrush__WEBPACK_IMPORTED_MODULE_0___default()(code)\n  });\n};\n\n/***/ }),\n\n/***/ \"./node_modules/jscrush/jscrush.js\":\n/*!*****************************************!*\\\n  !*** ./node_modules/jscrush/jscrush.js ***!\n  \\*****************************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\nmodule.exports = function (data) {\n    Q=[];\n    for (i=1000;--i;i-10&&i-13&&i-34&&i-39&&i-92&&Q.push(String.fromCharCode(i)));\n\n        i=s=data.replace(/([\\r\\n]|^)\\s*\\/\\/.*|[\\r\\n]+\\s*/g,'').replace(/\\\\/g,'\\\\\\\\'),X=B=s.length/2,O=m='';\n        for(S=encodeURI(i).replace(/%../g,'i').length;;m=c+m){\n            for(M=N=e=c=0,i=Q.length;!c&&--i;!~s.indexOf(Q[i])&&(c=Q[i]));\n            if(!c)break;\n            if(O){\n                o={};\n                for(x in O)\n                    for(j=s.indexOf(x),o[x]=0;~j;o[x]++)j=s.indexOf(x,j+x.length);\n                O=o;\n            }else for(O=o={},t=1;X;t++)\n                    for(X=i=0;++i<s.length-t;)\n                        if(!o[x=s.substr(j=i,t)])\n                            if(~(j=s.indexOf(x,j+t)))\n                                for(X=t,o[x]=1;~j;o[x]++)j=s.indexOf(x,j+t);\n            for(x in O) {\n                j=encodeURI(x).replace(/%../g,'i').length;\n                if(j=(R=O[x])*j-j-(R+1)*encodeURI(c).replace(/%../g,'i').length)\n                    (j>M||j==M&&R>N)&&(M=j,N=R,e=x);\n                if(j<1)\n                    delete O[x]\n            }\n            o={};\n            for(x in O)\n                o[x.split(e).join(c)]=1;\n            O=o;\n            if(!e)break;\n            s=s.split(e).join(c)+c+e\n        }\n        c=s.split('\"').length<s.split(\"'\").length?(B='\"',/\"/g):(B=\"'\",/'/g);\n        return '_='+B+s.replace(c,'\\\\'+B)+B+';for(Y in $='+B+m+B+')with(_.split($[Y]))_=join(pop());eval(_)';\n\n};\n\n\n/***/ })\n\n/******/ });\n//# sourceMappingURL=8139da0937d287bd95c2.worker.js.map", __webpack_require__.p + "8139da0937d287bd95c2.worker.js");
};

/***/ }),

/***/ "./node_modules/worker-loader/dist/workers/InlineWorker.js":
/*!*****************************************************************!*\
  !*** ./node_modules/worker-loader/dist/workers/InlineWorker.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

var URL = window.URL || window.webkitURL;

module.exports = function (content, url) {
  try {
    try {
      var blob;

      try {
        // BlobBuilder = Deprecated, but widely implemented
        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

        blob = new BlobBuilder();

        blob.append(content);

        blob = blob.getBlob();
      } catch (e) {
        // The proposed API
        blob = new Blob([content]);
      }

      return new Worker(URL.createObjectURL(blob));
    } catch (e) {
      return new Worker('data:application/javascript,' + encodeURIComponent(content));
    }
  } catch (e) {
    if (!url) {
      throw Error('Inline worker is not supported');
    }

    return new Worker(url);
  }
};

/***/ })

}]);
//# sourceMappingURL=jscrush.js.map
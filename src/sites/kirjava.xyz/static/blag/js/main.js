/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(12);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.respond = respond;

	__webpack_require__(2);

	var _util = __webpack_require__(3);

	var _post = __webpack_require__(7);

	var _thom = __webpack_require__(9);

	var _thom2 = _interopRequireDefault(_thom);

	var _menu = __webpack_require__(10);

	var _menu2 = _interopRequireDefault(_menu);

	var _social = __webpack_require__(11);

	var _social2 = _interopRequireDefault(_social);

	var _config = __webpack_require__(4);

	var vars = _interopRequireWildcard(_config);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function respond() {
	    var sp = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	    // set root font size for rems
	    d3.select("html").transition().duration(sp).style('font-size', (0, _util.x)(12.4) + "px");
	}

	window.addEventListener("load", function (e) {

	    (0, _post.loadPosts)(function (e, d) {

	        vars.posts = d;

	        // setup svg and set viewbox based on w/h/margins
	        vars.svg = d3.select("body").append("svg").attr("width", vars.c.w).attr("height", vars.c.h).attr("viewBox", [0, 0, vars.c.w, vars.c.h].join(" "));

	        // foreignObject container
	        vars.foreignObjects = d3.select('body').append('div').classed('foreignObjects', true);

	        // order defines order of containers
	        (0, _thom2.default)();
	        (0, _menu2.default)();
	        (0, _social2.default)();
	        (0, _post.getPost)(0, true);
	    });
	});

	window.addEventListener("resize", function (e) {
	    // let newSize = {w:getW(),h:getH()};
	    // let change = {w:vars.c.w-newSize.w,h:vars.c.h-newSize.h};
	    // c = newSize;
	    vars.c = { w: (0, _util.getW)(), h: (0, _util.getH)() };
	    _util.y.range([0, vars.c.h]);
	    _util.x.range([0, vars.c.w]);

	    // used to fix the date text, may break stuff
	    vars.force.stop();

	    // logo
	    d3.select("#thom").transition().duration(vars.sp).attr({
	        width: (0, _util.x)(350) });

	    // menu
	    d3.selectAll("tspan").transition().duration(vars.sp).attr("x", function (d, i) {
	        return (0, _util.x)(650) + i * (0, _util.x)(200);
	    }).attr("y", (0, _util.y)(160)).style("font-size", (0, _util.x)(24.8) + "px");

	    vars.svg.selectAll(".d3on").transition().duration(vars.sp).attr({ transform: function transform(d) {
	            return "scale(" + (d.scale ? d.scale : 1) + "),translate(" + [(0, _util.x)(d.x), (0, _util.y)(d.type == "date" ? 0 : d.y)] + "),rotate(" + (d.rotate ? d.rotate : 0) + ")";
	        },
	        "y": function y(d) {
	            return d.type == "date" ? (0, _util.x)(310) / 2 : 0;
	        }
	    }).attr({
	        width: function width(d) {
	            return (0, _util.x)(d.size ? d.size[0] : 0);
	        },
	        height: function height(d) {
	            return (0, _util.y)(d.size ? d.size[1] : 0);
	        },
	        r: function r(d) {
	            return d.size ? d.size : 0;
	        }
	    });

	    vars.foreignObjects.selectAll(".d3on").transition().duration(vars.sp).style({
	        width: function width(d) {
	            return (0, _util.x)(d.size[0]) + 'px';
	        },
	        height: function height(d) {
	            return d.size[1] == "auto" ? 'auto' : (0, _util.y)(d.size[1]) + 'px';
	        }
	    }).styleTween('transform', function (d) {
	        var bbox = d3.select(this).node().getBoundingClientRect();
	        var xTween = d3.interpolate(bbox.x, (0, _util.x)(d.x));
	        var yTween = d3.interpolate(bbox.y, (0, _util.y)(d.y));
	        return function (t) {
	            return 'translate(' + xTween(t) + 'px,' + yTween(t) + 'px)';
	        };
	    });

	    respond(vars.sp);

	    vars.svg.attr("width", vars.c.w).attr("height", vars.c.h).attr("viewBox", [0, 0, vars.c.w, vars.c.h].join(" "));

	    (0, _social.rGoo)(vars.sp);
	});

	document.addEventListener('keydown', function (e) {
	    if (vars.interrupt == true) return;
	    if (e.keyCode == 39 && vars.postNum < vars.posts.length - 1) {
	        (0, _post.getPost)(++vars.postNum);
	    } else if (e.keyCode == 37 && vars.postNum > 0) {
	        (0, _post.getPost)(--vars.postNum);
	    }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	(function (a, e, f, g, b, c, d) {
	  a.GoogleAnalyticsObject = b;a[b] = a[b] || function () {
	    (a[b].q = a[b].q || []).push(arguments);
	  };a[b].l = 1 * new Date();c = e.createElement(f);d = e.getElementsByTagName(f)[0];c.async = 1;c.src = g;d.parentNode.insertBefore(c, d);
	})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");ga("create", "UA-60292308-2", "auto");ga("send", "pageview");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.rnd = exports.y = exports.x = undefined;
	exports.getW = getW;
	exports.getH = getH;
	exports.titleObject = titleObject;
	exports.noCache = noCache;
	exports.shuffle = shuffle;

	var _config = __webpack_require__(4);

	// UI stuff

	var x = exports.x = d3.scale.linear().domain([0, 1200]).range([0, _config.c.w]);

	var y = exports.y = d3.scale.linear().domain([0, 800]).range([0, _config.c.h]);

	function getW() {
	    var d = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	    var e = arguments.length <= 1 || arguments[1] === undefined ? 'documentElement' : arguments[1];

	    if (self.innerHeight) return self.innerWidth;
	    if (d[e] && d[e].clientHeight) return d[e].clientWidth;
	    if (d.body) return d.body.clientWidth;
	}

	function getH() {
	    var a = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	    var b = arguments.length <= 1 || arguments[1] === undefined ? "documentElement" : arguments[1];

	    if (self.innerHeight) return self.innerHeight;
	    if (a[b] && a[b].clientHeight) return a[b].clientHeight;
	    if (a.body) return a.body.clientHeight;
	}

	function titleObject(txt, x, y) {
	    return {
	        "shape": "text",
	        "text": txt,
	        "size": "4",
	        "attr": {
	            "stroke": "#000",
	            "stroke-width": "4px"
	        },
	        "foci": {
	            "x": x,
	            "y": y
	        }
	    };
	}

	// ES5 pythag polyfill

	Math.hypot = Math.hypot || function (x, y) {
	    return Math.sqrt(x * x + y * y);
	};

	// random string

	function noCache() {
	    return "?" + Math.random().toString(36).substring(5);
	}

	// misc

	var rnd = exports.rnd = function rnd(qty) {
	    return qty * Math.random() | 0;
	};

	function shuffle(array) {
	    var currentIndex = array.length,
	        temporaryValue,
	        randomIndex;

	    // While there remain elements to shuffle...
	    while (0 !== currentIndex) {

	        // Pick a remaining element...
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;

	        // And swap it with the current element.
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }

	    return array;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.interrupt = exports.force = exports.postNum = exports.posts = exports.sp = exports.foreignObjects = exports.svg = exports.c = undefined;

	var _object = __webpack_require__(5);

	var _util = __webpack_require__(3);

	var c = exports.c = { w: (0, _util.getW)(), h: (0, _util.getH)() };
	var svg = exports.svg = void 0;
	var foreignObjects = exports.foreignObjects = void 0;
	var sp = exports.sp = 500;

	var posts = exports.posts = void 0;

	var postNum = exports.postNum = 0;

	var force = exports.force = (0, _object.getForce)();

	var interrupt = exports.interrupt = false;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.d3on = d3on;
	exports.getForce = getForce;

	var _config = __webpack_require__(4);

	var vars = _interopRequireWildcard(_config);

	var _util = __webpack_require__(3);

	var _index = __webpack_require__(1);

	var _parseHTML = __webpack_require__(6);

	var _parseHTML2 = _interopRequireDefault(_parseHTML);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function d3on(src) {
	    var removeflag = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var datamod = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];


	    if (vars.interrupt == true) return;

	    if (removeflag == null) {
	        vars.svg.selectAll(".d3on").transition().duration(vars.sp / 2).attr({ transform: function transform(d) {
	                return "scale(" + (d.scale ? d.scale : 1) + "),translate(" + [(0, _util.x)((0, _util.rnd)(1280)), (0, _util.y)((0, _util.rnd)(800))] + "),rotate(" + (d.rotate ? d.rotate : 0) + ")";
	            }
	        }).style("opacity", 0.5).remove();

	        vars.foreignObjects.selectAll(".d3on, script").remove();
	    }

	    function load(data) {
	        vars.interrupt = true;
	        data = datamod ? datamod((0, _util.shuffle)(data)) : (0, _util.shuffle)(data);
	        var cont = vars.svg.append("g");
	        var nodes = [];
	        ~function stagger() {
	            nodes.push(data.shift());
	            render(nodes, cont);
	            if (data.length) setTimeout(stagger, 30);else vars.interrupt = false;
	        }();
	    }

	    if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) == "object") {
	        load(src);
	    } else {
	        d3.json("json/" + src, function (e, data) {
	            load(data);
	        });
	    }

	    function render(data, parent) {

	        // check if UID already exists

	        data = data.filter(function (d) {
	            return !document.getElementById('uid-' + d.uid);
	        });

	        var selector = removeflag ? '.d3on-dyn' : '.d3on';

	        // SVG stuff

	        var obj = parent.selectAll(selector).data(data.filter(function (d) {
	            return d.shape != "foreignObject";
	        }));

	        var objGroup = obj.enter();

	        objGroup.append(function (d) {
	            return document.createElementNS(d3.ns.prefix.svg, d.shape);
	        }).classed("d3on", true).call(setAttr, 'SVG');
	        //.call(vars.force.drag)

	        // non-SVG stuff

	        var fObj = vars.foreignObjects.selectAll(selector).data(data.filter(function (d) {
	            return d.shape == "foreignObject";
	        }));

	        var fObjGroup = fObj.enter();

	        fObjGroup.append('div').classed("d3on", true).call(setAttr, 'foreignObject');

	        vars.force.nodes(data).charge(-4600).start();

	        vars.force.on("tick", function (e) {
	            var k = .5 * e.alpha;
	            data.forEach(function (o) {
	                if (o.foci) o.y += (o.foci.y - o.y) * k, o.x += (o.foci.x - o.x) * k;
	            });

	            vars.svg.selectAll('.d3on').attr('transform', function (d) {
	                return "scale(" + (d.scale ? d.scale : 1) + ")," + "rotate(" + (d.rotate ? d.rotate : 0) + ")," + "translate(" + [(0, _util.x)(d.x), (0, _util.y)(d.y)] + ")";
	            });

	            vars.svg.select('#post-date').attr('transform', function (d) {
	                return "translate(" + [(0, _util.x)(d.x), 0] + ")";
	            }).attr("y", (0, _util.x)(310) / 2);

	            vars.foreignObjects.selectAll('.d3on').style("transform", function (d) {
	                return 'translate(' + (0, _util.x)(d.x) + 'px, ' + (0, _util.y)(d.y) + 'px)';
	            });
	        });
	        (0, _index.respond)();
	    }

	    function setAttr(selection, type) {
	        if (type == "SVG") {
	            selection.attr({
	                width: function width(d) {
	                    return (0, _util.x)(d.size ? d.size[0] : 0);
	                },
	                height: function height(d) {
	                    return (0, _util.y)(d.size ? d.size[1] : 0);
	                },
	                r: function r(d) {
	                    return d.size ? d.size : 0;
	                }
	            });
	        } else if (type == 'foreignObject') {
	            selection.style({
	                width: function width(d) {
	                    return (0, _util.x)(d.size[0]) + 'px';
	                },
	                height: function height(d) {
	                    return d.size[1] == "auto" ? 'auto' : (0, _util.y)(d.size[1]) + 'px';
	                }
	            });
	        }

	        selection.each(function (d, i) {
	            var self = d3.select(this);

	            if (d.style) for (var p in d.style) {
	                d.style.hasOwnProperty(p) && self.style(p, d.style[p]);
	            }if (d.attr) for (var p in d.attr) {
	                d.attr.hasOwnProperty(p) && self.attr(p, d.attr[p]);
	            }if (d.uid) self.attr("id", 'uid-' + d.uid);

	            if (d.text) self.attr('font-size', d.size + "rem").text(d.text);
	            if (d.children) render(d.children, self);
	            if (d.html) {
	                var html = _typeof(d.html) == "object" ? d.html.join("") : d.html;
	                self.html(html);
	                (0, _parseHTML2.default)(self);
	            }
	            if (d.ajax) {
	                d3.text(d.ajax, function (e, d) {
	                    self.html(d);
	                    (0, _parseHTML2.default)(self);
	                });
	            }
	            if (d.path) self.attr("d", function (d) {
	                return d.path;
	            });

	            //self.attr("transform","scale(0)");
	        });
	    }
	}

	function getForce() {
	    return d3.layout.force().friction(0.4) // 0.7
	    .linkDistance(200).gravity(0.5).size([1200, 800]);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (obj) {

	    obj.selectAll('script').each(function () {
	        var self = d3.select(this);
	        var src = self.attr('src');

	        // inline
	        if (!src) {
	            src = "data:application/javascript;base64," + btoa(self.html());
	        }

	        vars.foreignObjects.append('script').attr('src', src).node().async = true;
	    });

	    obj.selectAll('[data-getpost]').each(function () {
	        var self = d3.select(this);
	        self.on('click', function (d) {
	            return (0, _post.getPost)(self.attr('data-getpost'));
	        });
	    });

	    obj.selectAll('[data-popup]').each(function () {
	        var self = d3.select(this);
	        self.on('click', function (d) {
	            return (0, _object.d3on)(self.attr('data-popup'), true);
	        });
	    });

	    obj.selectAll('[data-close]').on('click', function () {
	        d3.select(this.parentNode.parentNode).transition().style('opacity', 0).remove();
	    });
	};

	var _config = __webpack_require__(4);

	var vars = _interopRequireWildcard(_config);

	var _object = __webpack_require__(5);

	var _post = __webpack_require__(7);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.loadPosts = loadPosts;
	exports.getPost = getPost;

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(4);

	var vars = _interopRequireWildcard(_config);

	var _archive = __webpack_require__(8);

	var _archive2 = _interopRequireDefault(_archive);

	var _object = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function loadPosts(callback) {
	    d3.json("json/posts.json" + (0, _util.noCache)(), callback);
	}

	function getPost() {
	    var num = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var init = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];


	    if (init && location.search.indexOf("?") != ~0) {
	        var loc = location.search.replace(/( |-|_|\.|\,|%20)/g, " ").toLowerCase();
	        var hit = false;

	        for (var i = 0; i < vars.posts.length; i++) {
	            if ("?" + vars.posts[i].title.toLowerCase() == loc) {
	                post(i);
	                hit = !hit;
	                break;
	            }
	        }
	        if (!hit) (0, _archive2.default)();
	    } else {
	        post(num);
	    }
	}

	function post(num) {
	    vars.postNum = num;
	    var data = vars.posts[num];

	    (0, _object.d3on)(data.json, null, function (d) {
	        document.title = data.title;

	        // add tags
	        d.push({
	            "shape": "foreignObject",
	            "size": [600, "auto"],
	            "html": ["<p class=\"tags\">", "<a href=\"?" + encodeURIComponent(data.title.toLowerCase().replace(/ /g, '-')) + "\">permalink</a>", "&emsp;tags; " + data.tags + "</p>"],
	            "foci": {
	                "x": -500,
	                "y": 1075
	            }
	        });

	        // add date
	        d.push({
	            "shape": "text",
	            "type": "date",
	            "text": data.date,
	            "attr": {
	                id: "post-date"
	            },
	            "size": "2",
	            "foci": {
	                "x": -150,
	                "y": 40
	            }
	        });

	        return d;
	    });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {

	    var c10 = d3.scale.category10();
	    var c20 = d3.scale.category20();
	    var c20b = d3.scale.category20b();
	    var c20c = d3.scale.category20c();

	    d3.json("json/posts.json" + (0, _util.noCache)(), function (e, d) {
	        var shapes = [(0, _util.titleObject)("archive", 1250, -200)];

	        d.forEach(function (o, i) {

	            var inline = "style=\"background:" + c10(i) + "\"";
	            shapes.push({
	                "shape": "foreignObject",
	                "size": [(0, _util.x)(600), "auto"],
	                "html": ['<div class="archive" data-getpost="' + i + '" >', "<div class='wrap' " + inline + ">", "<span class='title'>" + o.title + "</span>", "<span class='date'>(" + o.date + ")</span>", "</div>", "</div>"],
	                "foci": {
	                    "x": 300,
	                    "y": 200 + i * 75
	                }
	            });
	        });

	        (0, _object.d3on)(shapes);
	    });
	};

	var _util = __webpack_require__(3);

	var _object = __webpack_require__(5);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {

	    d3.xml("svg/thom.svg", "image/svg+xml", function (xml) {
	        document.body.appendChild(xml.documentElement);

	        var lineLength = function lineLength() {
	            return this.getTotalLength();
	        };

	        d3.select("#thom").attr({
	            width: (0, _util.x)(350),
	            zIndex: 100
	        }).selectAll(".scrawl").attr({
	            "stroke-dasharray": lineLength,
	            "stroke-dashoffset": lineLength
	        }).each(function (e, i) {
	            d3.select(this).transition().delay([0, 167, 490.75, 641.5, 1056][i]).duration([286, 500, 301, 539, 290][i]).attr("stroke-dashoffset", 0);
	        });
	    });
	};

	var _util = __webpack_require__(3);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {

	    var interrupt = false;

	    var items = [{
	        name: "about",
	        colour: "#B44642",
	        click: function click() {
	            document.title = "about";
	            (0, _object.d3on)("about.json");
	        }
	    }, {
	        name: "archive",
	        colour: "#46B482",
	        click: function click() {
	            document.title = "archive";
	            (0, _archive2.default)();
	        }
	    }, {
	        name: "controls",
	        colour: "#4682B4",
	        click: function click() {
	            document.title = "controls";
	            (0, _object.d3on)("controls.json");
	        }
	    }];

	    var m = vars.svg.append('g');

	    // items

	    var itemAttr = function itemAttr($) {
	        return {
	            x: function x(d, i) {
	                return (0, _util.x)(650) + i * (0, _util.x)(200);
	            },
	            y: (0, _util.y)(160),
	            "font-size": "2rem",
	            class: "menu"
	        };
	    };

	    var nav = m.append("text").selectAll(".menu").data(items);

	    var navGroup = nav.enter().append("tspan").attr(itemAttr()).text(function (d) {
	        return d.name;
	    }).on('click', function (d) {
	        typeof d.click == "function" && d.click();
	    }).on("mouseenter", mmouseenter).on("mouseleave", mmouseleave);

	    function mmouseenter(d) {
	        interrupt = true;
	        d3.select(this).transition().duration(200).style("font-size", (0, _util.x)(36) + "px").style("fill", d.colour).ease("elastic");
	    }

	    function mmouseleave(d) {
	        interrupt = false;
	        d3.select(this).transition().duration(200).style("font-size", (0, _util.x)(24) + "px").style("fill", '#7A7A7A').ease("elastic");
	    }
	};

	var _config = __webpack_require__(4);

	var vars = _interopRequireWildcard(_config);

	var _util = __webpack_require__(3);

	var _object = __webpack_require__(5);

	var _archive = __webpack_require__(8);

	var _archive2 = _interopRequireDefault(_archive);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.rGoo = rGoo;

	exports.default = function () {

	    var items = [{
	        name: "youtube",
	        colour: '#b31217',
	        path: "M400 224c144 0 201 2 224 25 17 17 26 52.125 26 151s-9 134-26 151c-23 23-80 25-224 25s-201-2-224-25c-17-17-26-52.125-26-151s9-134 26-151c23-23 80-25 224-25zm-52 100v141l135-70z",
	        click: youtube
	    }, {
	        name: "blocks",
	        colour: '#FA0',
	        path: "M140 482V320c0-9 5-15 10-18l238-158c8-5 16-5 24 0l238 158c6.24 3.743 10 12 10 19v158c0 9-5 15-10 19L412 656c-8 5-17 5-24 0L150 497c-9-6-10-11-10-15zm282-278v104l97 65 78-52zm-44 104V204L203 321l78 52zm-193 54v75l56-37zm193 234V492l-97-65-78 52zm22-143l79-53-79-53-79 53zm22 143l175-117-78-52-97 64v105zm193-159v-75l-56 38z",
	        click: blocks
	    }, {
	        name: "twitter",
	        colour: '#00aced',
	        path: "M679 239s-21 34-55 57c7 156-107 329-314 329-103 0-169-50-169-50s81 17 163-45c-83-5-103-77-103-77s23 6 50-2c-93-23-89-110-89-110s23 14 50 14c-84-65-34-148-34-148s76 107 228 116c-22-121 117-177 188-101 37-6 71-27 71-27s-12 41-49 61c30-2 63-17 63-17z",
	        click: twitter
	    }, {
	        name: "github",
	        colour: 'purple',
	        path: "M400 139c144 0 260 116 260 260 0 115-75 213-178 247-9 3-17-2-17-13v-71c0-35-18-48-18-48 57-6 119-28 119-128 0-44-27-70-27-70s14-29-2-69c0 0-22-7-72 27-42-12-88-12-130 0-50-34-72-27-72-27-16 40-2 69-2 69s-27 26-27 70c0 100 62 122 119 128 0 0-14 10-17 35-15 7-53 18-76-22 0 0-13-25-39-27 0 0-26 0-2 16 0 0 17 8 29 38 0 0 16 51 88 35v44c0 11-9 16-18 13-103-34-178-132-178-247 0-144 116-260 260-260z",
	        click: github
	    }];

	    var s = vars.svg.append("g").attr({ transform: "scale(0.5)" });

	    var goo = s.append("g").attr('id', 'goo');

	    rGoo(0);

	    var filter = gooey(goo);

	    goo.on("mousemove", function () {
	        circleFollow(this, items);
	    });

	    goo.append("circle").attr("class", "gooCircle").attr("r", 0).attr("cx", 157).attr("cy", -50).style("fill", "#EEE").append("text").attr({ fontSize: "14px", x: 20, y: 20 }).style("fill", "red");

	    goo.selectAll(".socialCircle").data(items).enter().append("circle").attr("class", "socialCircle").attr("cx", function (d, i) {
	        return -(i - 0.3) * 157;
	    }).attr("cy", 50).attr("r", 50).style("fill", function (d) {
	        return d.colour;
	    }).on('click', function (d) {
	        typeof d.click == "function" && d.click();
	    });

	    var social = goo.append("g").attr("transform", "scale(0.12)").selectAll(".social").data(items);

	    var sGroup = social.enter().append("path").attr("d", function (d) {
	        return d.path;
	    }).attr("class", "socialIcon").style("fill", "#FFF").attr("transform", function (d, i) {
	        return "translate(" + [-i * 1310, 20] + ")";
	    }).on('click', function (d) {
	        typeof d.click == "function" && d.click();
	    });
	};

	var _config = __webpack_require__(4);

	var vars = _interopRequireWildcard(_config);

	var _util = __webpack_require__(3);

	var _object = __webpack_require__(5);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function rGoo(sp) {
	    d3.select('#goo').transition().duration(sp).attr({
	        transform: function transform(d, i) {
	            return 'translate(' + [(0, _util.x)(1180 * 2) - (i + 1) * 157, (0, _util.y)(800 * 2) - 157] + ')';
	        }
	    });
	};

	;

	var checkStationary = null;

	var calcHype = function calcHype(x1, x2, y1, y2) {
	    return Math.hypot(x1 - x2, y1 - y2);
	};

	function circleFollow(self, items) {
	    var circle = d3.selectAll(".gooCircle");

	    var x = d3.mouse(self)[0];
	    var y = d3.mouse(self)[1];

	    circle.attr("cx", x).attr("cy", y);

	    // get distances for all icons
	    var hypz = [];
	    d3.selectAll(".socialCircle").each(function (d, i) {
	        var self = d3.select(this);
	        var x1 = self.attr("cx");
	        var y1 = self.attr("cy");

	        hypz.push(calcHype(x, x1, y, y1));
	    });

	    // get nearest icon
	    var near = hypz.reduce(function (a, b) {
	        return Math.min(a, b);
	    });

	    if (near > 90) {
	        // check distance
	        circle.transition().duration(70).attr("r", 0);
	    } else {
	        // set radius :3
	        circle.attr("r", 50 - (near < 1 ? 1 : near) / 4);

	        // set colour
	        circle.transition().duration(100).style("fill", items[hypz.indexOf(near)].colour);

	        // force circle to shrink if not moved for {{time}}
	        clearInterval(checkStationary);
	        checkStationary = setTimeout(function () {
	            circle.transition().duration(500).attr("r", 0);
	        }, 500);
	    }
	}

	function gooey(container) {
	    var defs = container.style("filter", "url(#gooey)").append('defs');
	    var filter = defs.append('filter').attr('id', 'gooey');
	    filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', '10').attr('result', 'blur');
	    filter.append('feColorMatrix').attr('in', 'blur').attr('mode', 'matrix').attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7').attr('result', 'gooey');
	    filter.append('feBlend').attr('in', 'SourceGraphic').attr('in2', 'gooey');
	    return filter;
	}

	// APIs //

	function github() {
	    d3.json('https://api.github.com/users/snkenjoi/repos', function (e, data) {
	        var gitShapes = [(0, _util.titleObject)("github repos", 1050, -160)];
	        data.forEach(function (o, i) {
	            gitShapes.push({
	                "shape": "foreignObject",
	                "size": [(0, _util.x)(250), "auto"],
	                "style": {
	                    //"background-color": "purple",
	                },
	                "html": ["<a class=\"noUnderline\" target=\"_blank\" href=" + o.html_url + ">", "<div class=\"socialBox\">", "<span>" + o.name + "</span>", "<div>(" + o.language + ")</div>", "</div>", "</a>"],
	                "foci": {
	                    "x": i % 2 == 0 ? -250 : 650,
	                    "y": 200 + 60 * i / 2
	                }
	            });
	        });
	        (0, _object.d3on)(gitShapes);

	        document.title = "github";
	    });
	}

	function blocks() {
	    d3.json('https://api.github.com/users/snkenjoi/gists', function (e, data) {
	        var blox = [(0, _util.titleObject)("bl.ocks", 1250, -160)];
	        data.forEach(function (o, i) {
	            blox.push({
	                "shape": "foreignObject",
	                "size": [(0, _util.x)(250), "auto"],
	                "html": ["<a target=\"_blank\" style=\"text-decoration:none\" href=\"http://bl.ocks.org/" + o.id + "\">", "<div class=\"socialBox blox\">", "" + o.description + "", "</div>", "</a>"],
	                "foci": {
	                    "x": i % 2 == 0 ? -250 : 650,
	                    "y": 200 + 60 * i / 2
	                }
	            });
	        });
	        (0, _object.d3on)(blox);

	        document.title = "bl.ocks";
	    });
	}

	function twitter() {
	    (0, _object.d3on)([(0, _util.titleObject)("tweets", 1200, -160), {
	        "shape": "foreignObject",
	        "size": [500, "auto"],
	        "style": {},
	        "html": '<div class="post"><p>Twitter changed their API so I have to just give you a measly <a href="https://twitter.com/purpleisntblue" target="_blank">link</a> :(</p></div>',
	        "foci": {
	            "x": 100,
	            "y": 300
	        }
	    }]);

	    document.title = "tweets";

	    // var m = document.createElement("script");
	    //     m.type = "text/javascript";
	    //     m.src =
	    //         "https://cdn.syndication.twimg.com/widgets/timelines/654442445963440128?&lang=en"+ "&callback=twitterCallback&suppress_response_codes=true&rnd=" + Math.random();
	    // document.getElementsByTagName("body")[0].appendChild(m);
	}

	function twitterCallback(data) {
	    var tShapes = [(0, _util.titleObject)("tweets", 1200, -160)];
	    var c = document.createElement("div");
	    c.innerHTML = data.body;

	    var msgs = c.getElementsByClassName("e-entry-title");
	    var urls = c.getElementsByClassName("permalink");
	    var nick = c.getElementsByClassName("p-nickname")[0].innerHTML;
	    var dates = c.getElementsByClassName("dt-updated");
	    var dump = [];

	    for (var i = 0; i < msgs.length; i++) {
	        dump.push({
	            tweet: msgs[i].innerHTML,
	            url: urls[i].getAttribute("href"),
	            date: dates[i].getAttribute("aria-label")
	        });
	    }

	    dump.forEach(function (o, i) {
	        tShapes.push({
	            "shape": "foreignObject",
	            "size": [(0, _util.x)(600), (0, _util.y)(200)],
	            "html": ["<a target=\"_blank\" style=\"text-decoration:none\" href=" + o.url + ">", "<div class=\"socialBox tShapes\">", "" + o.tweet + "", "<div>" + o.date + "</div>", "</div>", "</a>"],
	            "foci": {
	                "x": 600,
	                "y": 0 + 0 * i
	            }
	        });
	    });

	    console.log(tShapes);
	    (0, _object.d3on)(tShapes);
	}

	function youtube() {
	    d3.json("https://www.googleapis.com/youtube/v3/search?key=AIzaSyBadqgPm8xQrJHJGh7LL5BOzoV1LYwc6cY&channelId=UCnmMB5r3-dXMx0cX3vdb2aQ&part=snippet,id&order=date&maxResults=11", function (e, data) {
	        var yShapes = [(0, _util.titleObject)("youtube", 1200, -160)];
	        data.items.forEach(function (o, i) {
	            yShapes.push({
	                "shape": "foreignObject",
	                "size": [(0, _util.x)(300), "auto"],
	                "html": ["<a target=\"_blank\" href=https://www.youtube.com/watch?v=" + o['id']['videoId'] + ">", "<img src=\"http://img.youtube.com/vi/" + o['id']['videoId'] + "/0.jpg\" style=\"width:300px;height:230px\">", "</a>"],
	                "foci": {
	                    "x": -500 + 400 * (i / 2),
	                    "y": 100 + (i % 2 == 0 ? 460 : 0)
	                }
	            });
	        });
	        (0, _object.d3on)(yShapes);

	        document.title = "youtube";
	    });
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
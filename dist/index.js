'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var entry = {};

function time(name) {
    if (!entry[name]) {
        entry[name] = [];
    }
    entry[name][0] = performance.now();
}

function timeEnd(name) {
    if (!entry[name]) {
        entry[name] = [];
    }
    entry[name][1] = performance.now();
}

function log() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultLog;

    var names = Object.keys(entry);

    for (var i = 0; i < names.length; i++) {
        var name = names[i];

        var _entry$name = _slicedToArray(entry[name], 2),
            _entry$name$ = _entry$name[0],
            startTime = _entry$name$ === undefined ? 0 : _entry$name$,
            endTime = _entry$name[1];

        // only log those have endTime


        if (endTime) {
            var duration = endTime - startTime;
            callback(name, duration);
        }
    }
}

function defaultLog(name, duration) {
    console.log('%c' + name + ': ' + duration + 'ms', 'color:blue;');
}

function measureCRP() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultLog;

    var timing = performance.timing;
    // dom 构建所用的时间
    var interactive = timing.domInteractive - timing.domLoading;
    // dom 和 cssom 构建所用的时间
    var dcl = timing.domContentLoadedEventStart - timing.domLoading;
    // 这个页面加载完（包括图片下载完毕）的时间
    var complete = timing.domComplete - timing.domLoading;

    var CRP = [{
        name: 'interactive',
        duration: interactive
    }, {
        name: 'domContentLoaded',
        duration: dcl
    }, {
        name: 'complete',
        duration: complete
    }];

    for (var i = 0; i < CRP.length; i++) {
        var crp = CRP[i];
        callback(crp.name, crp.duration);
    }
}

function block(millisecond) {
    if (millisecond <= 0) return;

    var now = performance.now();
    var end = now + millisecond;

    while (now <= end) {
        now = performance.now();
    }
}

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
})(undefined, function () {

    var method = {
        time: time,
        timeEnd: timeEnd,
        log: log,
        measureCRP: measureCRP,
        block: block
    };

    return method;
});
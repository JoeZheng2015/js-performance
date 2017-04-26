(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['js-performance'] = factory());
}(this, (function () { 'use strict';

let entry = {};

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

function log(callback = defaultLog) {
    const names = Object.keys(entry);

    for(let i = 0; i < names.length; i++) {
        const name = names[i];
        const [startTime = 0, endTime] = entry[name];

        // only log those have endTime
        if (endTime) {
            const duration = endTime - startTime;
            callback(name, duration);
        }
    }
}

function defaultLog(name, duration) {
    console.log(`%c${name}: ${duration}ms`, 'color:blue;');
}

function measureCRP(callback = defaultLog) {
    const timing = performance.timing;
    // dom 构建所用的时间
    const interactive = timing.domInteractive - timing.domLoading;
    // dom 和 cssom 构建所用的时间
    const dcl = timing.domContentLoadedEventStart - timing.domLoading;
    // 这个页面加载完（包括图片下载完毕）的时间
    const complete = timing.domComplete - timing.domLoading;

    const CRP = [
        {
            name: 'interactive',
            duration: interactive,
        },
        {
            name: 'domContentLoaded',
            duration: dcl,
        },
        {
            name: 'complete',
            duration: complete,
        }
    ];

    for (let i = 0; i < CRP.length; i++) {
        const crp = CRP[i];
        callback(crp.name, crp.duration);
    }  
}

function block(millisecond) {
    if (millisecond <= 0) return

    var now = performance.now();
    const end = now + millisecond;

    while(now <= end) {
        now = performance.now();
    }
}

var index = {
    time,
    timeEnd,
    log,
    measureCRP,
    block,
};

return index;

})));

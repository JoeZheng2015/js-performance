let entry = {}

function time(name) {
    if (!entry[name]) {
        entry[name] = []
    }
    entry[name][0] = performance.now()
}

function timeEnd(name) {
    if (!entry[name]) {
        entry[name] = []
    }
    entry[name][1] = performance.now()
}

function log(callback = defaultLog) {
    const names = Object.keys(entry)

    for(let i = 0; i < names.length; i++) {
        const name = names[i]
        const [startTime = 0, endTime] = entry[name]

        // only log those have endTime
        if (endTime) {
            const duration = endTime - startTime
            callback(name, duration)
        }
    }
}

function defaultLog(name, duration) {
    console.log(`${name}: ${duration}ms`)
}

function measureCRP() {
    const timing = performance.timing
    // dom 构建所用的时间
    const interactive = timing.domInteractive - timing.domLoading
    // dom 和 cssom 构建所用的时间
    const dcl = timing.domContentLoadedEventStart - timing.domLoading
    // 这个页面加载完（包括图片下载完毕）的时间
    const complete = timing.domComplete - timing.domLoading

    return  {
        interactive,
        dcl,
        complete,
    }
}

function block(millisecond) {
    if (millisecond <= 0) return

    var now = performance.now()
    const end = now + millisecond

    while(now <= end) {
        now = performance.now()
    }
}

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {

    const method = {
        time,
        timeEnd,
        log,
        measureCRP,
        block,
    }

    return method;
}));

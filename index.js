let entry = {}

function start(name) {
    entry[name] = [performance.now()]
}

function end(name) {
    entry[name][1] = performance.now()
}

function measure(callback = defaultLog) {
    const names = Object.keys(entry)

    for(let i = 0; i < names.length; i++) {
        const name = names[i]
        const [startTime, endTime = performance.now()] = entry[name]
        const duration = endTime - startTime
        callback(name, duration)
    }
}

function defaultLog(name, duration) {
    console.log(`${name}: ${duration}ms`)
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
        start,
        end,
        measure,
    }

    return method;
}));

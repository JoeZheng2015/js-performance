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
    let entry = {}

    function mark(name) {
        if (entry[name]) {
            entry[name][1] = performance.now()
        }
        else {
            entry[name] = [performance.now()]
        }
    }

    function log(callback) {
        const names = Object.keys(entry)

        for(let i = 0; i < names.length; i++) {
            const name = names[i]
            const [startTime, endTime = performance.now()] = entry[name]
            const elapse = endTime - startTime
            callback(name, elapse)
        }
    }

    const factory = {
        mark,
        log,
    }
    return factory;
}));

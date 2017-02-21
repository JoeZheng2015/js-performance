# js-performance

A simple javascript utility to measure performance

## Reason
Using `console.time` and `console.timeEnd` is tedious and may introduce extra time by invoking console.

## Usage
The js-performance only provide three methods:
- start to mark the start point
- end to mark the end point
- measure to log all mark message together

``` javascript
import {start, end, measure} from 'js-performance'

start('test')
doWork(5000)
end('test')

measure() // test: 5000ms
```

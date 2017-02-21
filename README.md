# js-performance

A simple javascript utility to measure performance

## Reason
Using `console.time` and `console.timeEnd` is tedious and may introduce extra time by invoking console.

## Usage
The js-performance only provide three methods:
- time to mark the start point
- timeEnd to mark the end point
- measure to log all mark message together

``` javascript
import {time, timeEnd, measure} from 'js-performance'

time('test')
doWork(5000)
timeEnd('test')

measure() // test: 5000ms
```

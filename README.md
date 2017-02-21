# js-performance

A simple javascript utility to measure performance

## Reason
Using `console.time` and `console.timeEnd` is tedious and may introduce extra time by invoking console.

## Usage
The js-performance only provide two methods:
- mark to mark the point
- measure to log all mark message together

``` javascript
import {mark, log} from 'js-performance'

mark('test')
doWork(5000)
mark('test')

measure() // test: 5000ms
```

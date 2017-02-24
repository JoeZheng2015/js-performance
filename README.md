# js-performance

A simple javascript utility to measure performance

## Reason
Using `console.time` and `console.timeEnd` is tedious and may introduce extra time by invoking console.

## Usage
- time to mark the start point
- timeEnd to mark the end point
- log to log all mark message together
- block to block js thread

``` javascript
import {time, timeEnd, log, block} from 'js-performance'

time('test')
block(5000)
timeEnd('test')

log() // test: 5000ms
```

- measureCRP to measure the CRP time including interactive, domContentLoaded and complete

``` javascript
import {measureCRP} from 'js-performance'

measureCRP() // log your CRP time
```

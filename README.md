# Motion Canvas Graphing

[![npm](https://img.shields.io/npm/v/%40hhenrichsen%2Fmotion-canvas-graphing?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@hhenrichsen/motion-canvas-graphing)
[![GitHub](https://img.shields.io/github/v/tag/hhenrichsen/motion-canvas-graphing?style=for-the-badge&logo=github&label=GitHub) ](https://github.com/hhenrichsen/motion-canvas-graphing)
[![Static Badge](https://img.shields.io/badge/Donate-Kofi?style=for-the-badge&label=KoFi&color=%23FF5722)](https://ko-fi.com/hhenrichsen)

<!-- prettier-ignore -->
> **Warning**<br>
This library is deprecated in favor of [canvas-commons](https://github.com/hhenrichsen/canvas-commons), and has been merged into that library as of 0.9.0.

A library to help you make graphs in motion canvas.

If you use this in your videos, I would appreciate credit via a link to this
repo, or a mention by name. I would also love to see them; feel free to show me
on the motion canvas discord (I'm `@Hunter` on there).

If you want to support the development of this and other libraries, feel free to
donate on [Ko-fi](https://ko-fi.com/hhenrichsen).

## Demo

![](https://github.com/hhenrichsen/motion-canvas-graphing/releases/download/latest/output-big.gif)

Code for this GIF can be found
[here](https://github.com/hhenrichsen/motion-canvas-graphing/blob/main/test/src/scenes/test.tsx)

### Simple Example

```tsx
import {Plot, LinePlot, ScatterPlot} from '@hhenrichsen/motion-canvas-graphing';
import {makeScene2D} from '@motion-canvas/2d';
import {createRef, linear, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const random = useRandom();
  const plot = createRef<Plot>();
  const scatter = createRef<ScatterPlot>();
  view.add(
    <Plot
      size={500}
      ref={plot}
      labelX="Time"
      labelY="Errors"
      labelSize={10}
      opacity={0}
    >
      <ScatterPlot
        pointRadius={5}
        pointColor={'red'}
        ref={scatter}
        end={0}
        data={range(0, 26).map(i => [i * 4, random.nextInt(0, 100)])}
      />
    </Plot>,
  );

  yield* plot().opacity(1, 2);
  yield* waitFor(2);
  yield scatter().end(1, 3, linear);
  yield* waitFor(2);
  yield* plot().opacity(0, 2);

  const plot2 = createRef<Plot>();
  const line2 = createRef<LinePlot>();
  view.add(
    <Plot
      clip
      size={500}
      ref={plot2}
      labelSize={0}
      minX={-10}
      maxX={10}
      minY={-2}
      maxY={50}
      opacity={0}
      ticks={[4, 4]}
      offset={[-1, 0]}
    >
      <LinePlot lineWidth={4} stroke={'red'} ref={line2} />
    </Plot>,
  );

  line2().data(plot2().makeGraphData(0.1, x => Math.pow(x, 2)));
  yield* plot2().opacity(1, 2);
  yield* waitFor(2);
  yield* line2().end(1, 1);

  yield* waitFor(5);
});
```

## Using this library

### From git

1. Clone this repo.
1. Run `npm install <path to this repo>` in your motion canvas project

### From npm

1. Run `npm install @hhenrichsen/motion-canvas-graphing`

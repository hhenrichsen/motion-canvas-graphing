# My First Motion Canvas Component Library

## Demo

![](https://github.com/hhenrichsen/motion-canvas-graphing/releases/download/latest/output-big.gif)

```tsx
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {waitFor} from '@motion-canvas/core/lib/flow';
import {Plot} from '@components/Plot';
import {createRef, linear, range, useRandom} from '@motion-canvas/core';
import {ScatterPlot} from '@components/ScatterPlot';
import {LinePlot} from '@components/LinePlot';

export default makeScene2D(function* (view) {
  const random = useRandom();

  const plot = createRef<Plot>();
  view.add(
    <LinePlot
      size={500}
      ref={plot}
      xAxisLabel="Time"
      yAxisLabel="Beans"
      labelSize={10}
      graphWidth={4}
      graphColor={'red'}
      data={range(0, 26).map(i => [i * 4, random.nextInt(0, 100)])}
    />,
  );

  yield* plot().ticks(20, 3);
  yield* plot().size(1000, 2);
  yield* plot().labelSize(30, 2);
  yield* plot().min(-100, 2);
  yield* plot().opacity(0, 2);
  plot().remove();

  const plot2 = createRef<LinePlot>();
  view.add(
    <LinePlot
      size={500}
      ref={plot2}
      labelSize={0}
      graphWidth={4}
      graphColor={'red'}
      min={[-Math.PI * 2, -2]}
      end={0}
      max={[Math.PI * 2, 2]}
      xLabelFormatter={x => `${Math.round(x / Math.PI)}π`}
      ticks={[4, 4]}
    />,
  );

  plot2().data(plot2().makeGraphData(0.1, x => Math.sin(x)));

  yield* plot2().end(1, 1);
  yield* waitFor(3);

  yield* plot2().opacity(0, 2);

  const plot3 = createRef<ScatterPlot>();
  view.add(
    <ScatterPlot
      size={500}
      ref={plot3}
      xAxisLabel="Time"
      yAxisLabel="Errors"
      labelSize={10}
      pointRadius={5}
      pointColor={'red'}
      end={0}
      data={range(0, 26).map(i => [i * 4, random.nextInt(0, 100)])}
    />,
  );

  yield* plot3().end(1, 3, linear);

  yield* waitFor(5);
});
```

## Using this library

### From git

1. Clone this repo.
1. Run `npm install <path to this repo>` in your motion canvas project
1. Set your `vite.config.ts` to look like this:

```ts
export default defineConfig({
  plugins: [motionCanvas()],
  resolve: {
    alias: {
      '@motion-canvas/core': path.resolve('./node_modules/@motion-canvas/core'),
      '@motion-canvas/2d': path.resolve('./node_modules/@motion-canvas/2d'),
    },
  },
});
```

### From npm

1. Run `npm install @hhenrichsen/motion-canvas-graphing`
1. Set your `vite.config.ts` to look like this:

```ts
export default defineConfig({
  plugins: [motionCanvas()],
  resolve: {
    alias: {
      '@motion-canvas/core': path.resolve('./node_modules/@motion-canvas/core'),
      '@motion-canvas/2d': path.resolve('./node_modules/@motion-canvas/2d'),
    },
  },
});
```

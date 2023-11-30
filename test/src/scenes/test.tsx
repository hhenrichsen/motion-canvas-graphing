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
      labelX="Time"
      labelY="Beans"
      labelSize={10}
      graphWidth={4}
      graphColor={'red'}
      opacity={0}
      data={range(0, 26).map(i => [i * 4, random.nextInt(0, 100)])}
    />,
  );

  yield* plot().opacity(1, 2);
  yield* waitFor(2);

  yield* plot().ticks(20, 3);
  yield* plot().tickLabelSize(20, 2);
  yield* plot().size(800, 2);
  yield* plot().labelSize(30, 2);
  yield* plot().min(-100, 2);
  yield* plot().opacity(0, 2);
  plot().remove();

  const plot2 = createRef<LinePlot>();
  view.add(
    <LinePlot
      clip
      size={500}
      ref={plot2}
      labelSize={0}
      graphWidth={4}
      graphColor={'red'}
      min={[-Math.PI * 2, -2]}
      end={0}
      max={[Math.PI * 2, 2]}
      labelFormatterX={x => `${Math.round(x / Math.PI)}π`}
      ticks={[4, 4]}
      opacity={0}
    />,
  );

  plot2().data(plot2().makeGraphData(0.1, x => Math.sin(x)));

  yield* plot2().opacity(1, 2);
  yield* waitFor(2);
  yield* plot2().end(1, 1);
  yield* waitFor(3);

  yield* plot2().opacity(0, 2);

  const plot3 = createRef<ScatterPlot>();
  view.add(
    <ScatterPlot
      size={500}
      ref={plot3}
      labelX="Time"
      labelY="Errors"
      labelSize={10}
      pointRadius={5}
      pointColor={'red'}
      opacity={0}
      end={0}
      data={range(0, 26).map(i => [i * 4, random.nextInt(0, 100)])}
    />,
  );

  yield* plot3().opacity(1, 2);
  yield* waitFor(2);
  yield* plot3().end(1, 3, linear);
  yield* waitFor(2);
  yield* plot3().opacity(0, 2);

  const plot4 = createRef<LinePlot>();
  view.add(
    <LinePlot
      clip
      size={500}
      ref={plot4}
      labelSize={0}
      graphWidth={4}
      graphColor={'red'}
      minX={-10}
      maxX={10}
      minY={-2}
      maxY={50}
      end={0}
      opacity={0}
      ticks={[4, 4]}
    />,
  );

  plot4().data(plot4().makeGraphData(0.1, x => Math.pow(x, 2)));
  yield* plot4().opacity(1, 2);
  yield* waitFor(2);
  yield* plot4().end(1, 1);

  yield* waitFor(5);
});

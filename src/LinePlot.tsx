import {
  initial,
  signal,
  resolveCanvasStyle,
  canvasStyleSignal,
  CanvasStyleSignal,
  PossibleCanvasStyle,
  computed,
} from '@motion-canvas/2d';
import {SimpleSignal, range} from '@motion-canvas/core';
import {Plot, PlotProps} from './Plot';

export interface LinePlotProps extends PlotProps {
  graphWidth?: number;
  graphColor?: PossibleCanvasStyle;
  data?: [number, number][];
  end?: number;
}

export class LinePlot extends Plot {
  @initial(1)
  @signal()
  public declare readonly graphWidth: SimpleSignal<number, this>;

  @initial('white')
  @canvasStyleSignal()
  public declare readonly graphColor: CanvasStyleSignal<this>;

  @signal()
  public declare readonly data: SimpleSignal<[number, number][], this>;

  @initial(1)
  @signal()
  public declare readonly end: SimpleSignal<number, this>;

  @computed()
  private lastIndex() {
    return Math.floor(
      this.data().length * Math.min(Math.max(0, this.end()), 1) - 1,
    );
  }

  public constructor(props?: LinePlotProps) {
    super(props);
  }

  protected drawShape(context: CanvasRenderingContext2D): void {
    super.drawShape(context);

    context.strokeStyle = resolveCanvasStyle(this.graphColor(), context);
    context.lineWidth = this.graphWidth();

    const data = this.data();
    for (let i = 0; i < this.lastIndex(); i++) {
      if (this.clip()) {
        context.clip(this.getPath());
      }
      const baseCoord = this.getPointFromPlotSpace(data[i]);
      const baseNextCoord = this.getPointFromPlotSpace(data[i + 1]);
      const dir = baseCoord.sub(baseNextCoord).normalized;
      const coord = baseCoord.add(dir.mul(this.graphWidth() / 2));
      const nextCoord = baseNextCoord.sub(dir.mul(this.graphWidth() / 2));

      context.beginPath();
      context.moveTo(coord.x, coord.y);
      context.lineTo(nextCoord.x, nextCoord.y);
      context.stroke();
    }
  }

  public makeGraphData(
    resolution: number,
    f: (x: number) => number,
  ): [number, number][] {
    return range(this.min().x, this.max().x + resolution, resolution).map(x => [
      x,
      f(x),
    ]);
  }
}

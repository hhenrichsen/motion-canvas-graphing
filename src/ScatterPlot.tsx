import {
  initial,
  signal,
  resolveCanvasStyle,
  canvasStyleSignal,
  CanvasStyleSignal,
  PossibleCanvasStyle,
  computed,
} from '@motion-canvas/2d';
import {SimpleSignal} from '@motion-canvas/core';
import {Plot, PlotProps} from './Plot';

export interface ScatterPlotProps extends PlotProps {
  pointRadius?: number;
  pointColor?: PossibleCanvasStyle;
  data?: [number, number][];
  end?: number;
}

export class ScatterPlot extends Plot {
  @initial(5)
  @signal()
  public declare readonly pointRadius: SimpleSignal<number, this>;

  @initial('white')
  @canvasStyleSignal()
  public declare readonly pointColor: CanvasStyleSignal<this>;

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

  @computed()
  private pointProgress() {
    return (
      Math.min(Math.max(this.end(), 0), 1) * this.data().length -
      this.lastIndex()
    );
  }

  public constructor(props?: ScatterPlotProps) {
    super({
      ...props,
    });
  }

  protected draw(context: CanvasRenderingContext2D): void {
    super.draw(context);

    context.save();
    context.fillStyle = resolveCanvasStyle(this.pointColor(), context);

    const data = this.data();
    data.slice(0, this.lastIndex() + 1).forEach((point, i) => {
      const coord = this.getPointFromPlotSpace(point);
      context.beginPath();
      context.arc(
        coord.x,
        coord.y,
        this.pointRadius() * (i < this.lastIndex() ? 1 : this.pointProgress()),
        0,
        Math.PI * 2,
      );
      context.fill();
    });

    context.restore();
  }
}

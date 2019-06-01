export default class Wave {

  private static nextId: number;

  private static getNextId(): number {
    if (!Wave.nextId) {
      Wave.nextId = 1;
    }
    return Wave.nextId++;
  }

  private _id: number;
  private _originX: number;
  private _originY: number;
  private _frequency: number;
  private _amplitude: number;
  private _resolution: number;
  private _halfRectification: boolean;
  private _phase: number;
  private _onChange?: () => void;

  constructor(
    originX: number,
    originY: number,
    frequency: number,
    amplitude: number,
    resolutionAsPointsPerCircleUnit: number,
    halfRectification?: boolean,
    phase?: number,
    onChange?: () => void,
  ) {
    this._id = Wave.getNextId();
    this._originX = originX;
    this._originY = originY;
    this._frequency = frequency;
    this._amplitude = amplitude;
    this._resolution = resolutionAsPointsPerCircleUnit;
    this._halfRectification = halfRectification || false;
    this._phase = phase || (Math.PI / 2);
    this._onChange = onChange;
  }

  get id(): number {
    return this._id;
  }

  get originX(): number {
    return this._originX;
  }

  set originX(originX: number) {
    this._originX = originX;
    this._fireChange();
  }

  get originY(): number {
    return this._originY;
  }

  set originY(originY: number) {
    this._originY = originY;
    this._fireChange();
  }

  get amplitude(): number {
    return this._amplitude;
  }

  set amplitude(amplitude: number) {
    this._amplitude = amplitude;
    this._fireChange();
  }

  get frequency(): number {
    return this._frequency;
  }

  set frequency(frequency: number) {
    this._frequency = frequency;
    this._fireChange();
  }

  get halfRectification(): boolean {
    return this._halfRectification;
  }

  set halfRectification(on: boolean) {
    this._halfRectification = on;
  }

  get phase(): number {
    return this._phase;
  }

  set phase(phase: number) {
    this._phase = phase;
    this._fireChange();
  }

  private _fireChange() {
    if (this._onChange) {
      this._onChange();
    }
  }

  public getHeightAtPoint(pointX: number, pointY: number): number {
    const distanceX = pointX - this._originX;
    const distanceY = pointY - this._originY;
    const distance = Math.sqrt((distanceX ** 2) + (distanceY ** 2));
    const time = (distance / this._resolution);
    const height = this._amplitude * Math.sin(((2 * Math.PI) * this._frequency * time) + this._phase);
    if (this._halfRectification) {
      return (height >= 0) ? height : 0;
    } else {
      return height;
    }
  }

  public setOrigin(originX: number, originY: number) {
    const changed = this._originX !== originX || this._originY !== originY;
    this._originX = originX;
    this._originY = originY;
    if (changed) {
      this._fireChange();
    }
  }
}

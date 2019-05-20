import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { PositionGizmo } from '@babylonjs/core/Gizmos';
import { Observable } from '@babylonjs/core/Misc';

export default class WaveOrigin {
  private _linePoints: Vector3[];
  private _lineMesh: Mesh;
  private _sphereMesh: Mesh;
  private _isDisposed: boolean;
  private _positionGizmo: PositionGizmo | null;
  private _observable: any;

  constructor(x: number, y: number, scene: Scene, positionGizmo: PositionGizmo | null) {
    this._isDisposed = false;
    // Create line at 0,0
    this._linePoints = [
      new Vector3(x, y, -100),
      new Vector3(x, y, 100),
    ];
    this._lineMesh = MeshBuilder.CreateLines('centerLine', { points: this._linePoints, updatable: false }, scene);
    this._sphereMesh = MeshBuilder.CreateSphere('sphere', { diameter: 10 }, scene);
    this._sphereMesh.position.x = x;
    this._sphereMesh.position.y = y;
    this._sphereMesh.position.z = 100;
    // this._sphereMesh.setMaterialByID('white');
    this._sphereMesh.setMaterialByID('brightblue');


    this._positionGizmo = positionGizmo;
    if (positionGizmo) {
      this._observable = positionGizmo.onDragEndObservable.add(
        (): void => {
          console.log(this._sphereMesh);
          debugger;
        },
      );
    }
  }

  get isDisposed() {
    return this._isDisposed;
  }

  get sphereMesh() {
    return this._sphereMesh;
  }

  public dispose() {
    this._lineMesh.dispose();
    this._sphereMesh.dispose();
    if (this._observable && this._positionGizmo) {
      this._positionGizmo.onDragEndObservable.remove(this._observable);
      this._positionGizmo.dispose();
    }
    this._isDisposed = true;
  }
}

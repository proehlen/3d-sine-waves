import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { PositionGizmo, GizmoManager } from '@babylonjs/core/Gizmos';
import { Observable } from '@babylonjs/core/Misc';
import Wave from '../api/Wave';

export default class WaveOrigin {
  private _wave: Wave;
  private _linePoints: Vector3[];
  private _lineMesh: Mesh;
  private _sphereMesh: Mesh;
  private _isDisposed: boolean;
  private _positionGizmo: PositionGizmo | null;
  private _observable: any;
  private _gizmoManager: GizmoManager;
  private _isSelected: boolean

  constructor(
    wave: Wave,
    scene: Scene,
    gizmoManager: GizmoManager,
  ) {
    this._wave = wave;
    this._isDisposed = false;
    this._isSelected = false;
    this._gizmoManager = gizmoManager;
    this._sphereMesh = MeshBuilder.CreateSphere(
      `waveOrigin-${wave.id}`,
      { diameter: 10 },
      scene
    );
    this._sphereMesh.position.x = wave.originX;
    this._sphereMesh.position.y = wave.originY;
    this._sphereMesh.position.z = 100;
    this._sphereMesh.setMaterialByID('brightblue');

    // Create line at 0,0
    this._linePoints = [
      new Vector3(0, 0, -200),
      new Vector3(0, 0, 0),
    ];
    this._lineMesh = MeshBuilder.CreateLines('centerLine', { points: this._linePoints, updatable: false }, scene);
    this._lineMesh.parent = this._sphereMesh;

    this.isSelected = true;
    this._positionGizmo = this._gizmoManager.gizmos.positionGizmo;
    if (this._positionGizmo) {
      this._observable = this._positionGizmo.onDragEndObservable.add(
        (): void => {
          const {x, y} = this._sphereMesh.position;
          this._wave.setOrigin(x, y);
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
      this.isSelected = false;
    }
    this._isDisposed = true;
  }

  set isSelected (selected: boolean) {
    if (selected) {
      this._gizmoManager.attachToMesh(this._sphereMesh);
    } else {
      this._gizmoManager.attachToMesh(null);
    }
    this._isSelected = selected;
  }
}

import core from '@babylonjs/core';

import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { GizmoManager } from '@babylonjs/core/Gizmos';
import { init as initMaterials } from './materials';

// import '@babylonjs/core/Debug/debugLayer';
// import '@babylonjs/inspector';
import Wave from '../api/Wave';
import WaveOrigin from './WaveOrigin';

// import '@babylonjs/materials/simple/'

// import '@babylonjs/materials/';

// Required side effects to populate the Create methods on the mesh class. Without this,
// the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';


const ribbonName = 'ribbon';

export default class WavesUi {
  private _engine: Engine;
  private _scene: Scene;
  private _pathArray: Vector3[][];
  private _ribbon: Mesh;
  private _waveOrigins: WaveOrigin[];
  private _gizmoManager: GizmoManager;
  private _waves: Wave[];
  private _resolution: number; // Resolution as points per circle unit


  constructor(canvas: HTMLCanvasElement, resolution: number) {
    this._resolution = resolution;

    // Associate a Babylon Engine to it.
    this._engine = new Engine(canvas);

    // Create our first scene.
    this._scene = new Scene(this._engine);
    // this._scene.debugLayer.show();

    // Create materials
    initMaterials(this._scene);

    // Create gizmo manager
    this._gizmoManager = new GizmoManager(this._scene);
    this._gizmoManager.positionGizmoEnabled = true;
    if (this._gizmoManager.gizmos.positionGizmo) {
      this._gizmoManager.gizmos.positionGizmo.zGizmo.dispose();
    }

    // This creates and positions a free camera (non-mesh)
    // const camera = new UniversalCamera('camera1', new Vector3(0, 5, -10), this._scene);
    const camera = new ArcRotateCamera('camera1', 1.57, 2.17, (resolution * 2) * 1.5, new Vector3(0, 0, 0), this._scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), this._scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Array of paths to construct ribbon
    this._pathArray = [];
    const maxOffsetFromCenter = resolution;
    for (let x = -maxOffsetFromCenter; x <= maxOffsetFromCenter; x++) {
      const column = [];
      for (let y = -maxOffsetFromCenter; y <= maxOffsetFromCenter; y++) {
        // const z = wave.getHeightAtPoint({ x, y });
        // console.log(z);
        column.push(new Vector3(x, y, 0));
      }
      this._pathArray.push(column);
    }

    // Line meshes with gizmos for wave origins
    this._waveOrigins = [];

    // Create ribbon with updatable parameter set to true for later changes
    this._ribbon = MeshBuilder.CreateRibbon(
      ribbonName, {pathArray: this._pathArray, sideOrientation: Mesh.DOUBLESIDE, updatable: true}, this._scene);

    // Render every frame
    this._engine.runRenderLoop(() => {
        this._scene.render();
    });

    // Init waves with single random wave
    this._waves = [];
    this._addWave();
  }

  private _addWave() {
    const wave = new Wave(
      Math.round(this._resolution * Math.random()),
      Math.round(this._resolution * Math.random()),
      3,
      18,
      this._resolution,
      Math.PI / 2,
    );
    this._waves.push(wave);
    this.update();
  }

  public update() {
    // Update z axis of all points to reflect current waves
    for (const row of this._pathArray) {
      for (const cell of row) {
        let z = 0;
        for (const wave of this._waves) {
          z += wave.getHeightAtPoint(cell.x, cell.y);
        }
        cell.z = z;
      }
    }
    this._ribbon = MeshBuilder.CreateRibbon(ribbonName, { pathArray: this._pathArray, instance: this._ribbon });

    // Show wave origins
    this._waveOrigins.forEach((waveOrigin) => waveOrigin.dispose());
    this._waveOrigins = this._waves
      .map((wave) => new WaveOrigin(wave.originX, wave.originY, this._scene, this._gizmoManager.gizmos.positionGizmo));

    this._gizmoManager.attachableMeshes = this
      ._waveOrigins
      .map((waveOrigin) => waveOrigin.sphereMesh);
  }

  public destroy(): void {
    this._engine.stopRenderLoop();
    this._scene.dispose();
    this._engine.dispose();
  }
}

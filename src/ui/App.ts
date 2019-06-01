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

import Gui from './Gui';
import Wave from '../api/Wave';
import WaveOrigin from './WaveOrigin';

// Required side effects to populate the Create methods on the mesh class. Without this,
// the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { PointerEventTypes } from '@babylonjs/core';


const ribbonName = 'ribbon';

export default class App {
  private _engine: Engine;
  private _scene: Scene;
  private _pathArray: Vector3[][];
  private _ribbon: Mesh;
  private _waveOrigins: Map<Wave, WaveOrigin>;
  private _gizmoManager: GizmoManager;
  private _waves: Map<number, Wave>;
  private _resolution: number; // Resolution as points per circle unit
  private _gui: Gui;

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
    this._gizmoManager.usePointerToAttachGizmos = false;
    if (this._gizmoManager.gizmos.positionGizmo) {
      this._gizmoManager.gizmos.positionGizmo.zGizmo.dispose();
    }

    // This creates and positions a free camera (non-mesh)
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
        column.push(new Vector3(x, y, 0));
      }
      this._pathArray.push(column);
    }

    // Line meshes with gizmos for wave origins
    this._waveOrigins = new Map();

    // Create ribbon with updatable parameter set to true for later changes
    this._ribbon = MeshBuilder.CreateRibbon(
      ribbonName, {pathArray: this._pathArray, sideOrientation: Mesh.DOUBLESIDE, updatable: true}, this._scene);

    // Set up GUI
    this._gui = new Gui(
      () => this._addWave(),
      (wave: Wave) => this._removeWave(wave)
    );

    // On wave origin select, set selected wave
    this._scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
        const { pickInfo } = pointerInfo;
        if(pickInfo && pickInfo.hit && pickInfo.pickedMesh) {
          const [maybeWaveOrigin, maybeWaveId] = pickInfo.pickedMesh.id.split('-');
          if (maybeWaveOrigin === 'waveOrigin') {
            const wave = this._waves.get(Number(maybeWaveId));
            if (wave) {
              this._gui.selectedWave = wave;

              const waveOrigin = this._waveOrigins.get(wave);
              if (waveOrigin) {
                waveOrigin.isSelected = true;
              }
            }
          }
        }
      }
    });

    // Render every frame
    this._engine.runRenderLoop(() => {
        this._scene.render();
    });

    // Init waves with single random wave
    this._waves = new Map();
    this._addWave();

  }

  private _addWave() {
    const randomOriginXorY = (): number => {
      return Math.round((this._resolution * 2) * Math.random() - this._resolution);
    };
    const wave = new Wave(
      randomOriginXorY(),
      randomOriginXorY(),
      Math.round(Math.random() * 4 + 1),
      10,
      this._resolution,
      false,
      Math.PI / 2,
      this.update.bind(this),
    );
    this._waves.set(wave.id, wave);
    const waveOrigin = new WaveOrigin(
      wave,
      this._scene,
      this._gizmoManager,
    );
    this._waveOrigins.set(wave, waveOrigin);
    this._gui.selectedWave = wave;
    this.update();
  }

  _removeWave(wave: Wave) {
    this._gui.selectedWave = undefined;
    const waveOrigin = this._waveOrigins.get(wave);
    if (waveOrigin) {
      waveOrigin.dispose();
    }
    this._waveOrigins.delete(wave);
    this._waves.delete(wave.id);
    this.update();
  }

  public update() {
    // Update z axis of all points to reflect current waves
    for (const row of this._pathArray) {
      for (const cell of row) {
        let z = 0;
        for (const wave of this._waves.values()) {
          z += wave.getHeightAtPoint(cell.x, cell.y);
        }
        cell.z = z;
      }
    }
    this._ribbon = MeshBuilder.CreateRibbon(ribbonName, { pathArray: this._pathArray, instance: this._ribbon });

    this._gui.update();
  }

  public destroy(): void {
    this._engine.stopRenderLoop();
    this._scene.dispose();
    this._engine.dispose();
  }
}

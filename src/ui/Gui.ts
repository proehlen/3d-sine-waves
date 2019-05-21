import * as GUI from '@babylonjs/gui';

// import from '@babylonjs/core/shaders/';

export default class Gui {
  private _onAdd: () => void;

  constructor(onAdd: () => void) {
    debugger;
    this._onAdd = onAdd;
    // GUI
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

    const containerWave = new GUI.Container('containerWave');
    containerWave.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    containerWave.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    containerWave.background = "white";
    // containerWave.heightInPixels = 400;
    // containerWave.widthInPixels = 200;
    containerWave.adaptWidthToChildren = true;
    containerWave.adaptHeightToChildren = true;
    containerWave.paddingLeftInPixels = 10;
    containerWave.paddingTopInPixels = 10;
    advancedTexture.addControl(containerWave);  

    const buttonAddWave = GUI.Button.CreateSimpleButton("buttonAddWave", "Add");
    buttonAddWave.width = "150px"
    buttonAddWave.height = "40px";
    buttonAddWave.color = "white";
    buttonAddWave.cornerRadius = 4;
    buttonAddWave.background = "green";
    buttonAddWave.onPointerUpObservable.add(() => {
      debugger;
      this._onAdd();
    });
    containerWave.addControl(buttonAddWave);  
  }
}
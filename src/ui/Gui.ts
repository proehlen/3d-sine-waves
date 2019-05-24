import Wave from '@/api/Wave';
import SelectedWave from './SelectedWave';
import { Container, AdvancedDynamicTexture, Control, Button } from '@babylonjs/gui';

// import from '@babylonjs/core/shaders/';

export default class Gui {
  private _onAdd: () => void;

  private _selectedWave: SelectedWave;

  constructor(onAdd: () => void) {
    this._onAdd = onAdd;
    // GUI
    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');

    const toolbar = new Container('toolbarWave');
    toolbar.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    toolbar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    toolbar.background = "white";
    toolbar.adaptWidthToChildren = true;
    toolbar.adaptHeightToChildren = true;
    toolbar.paddingLeftInPixels = 10;
    toolbar.paddingTopInPixels = 10;

    const buttonAddWave = Button.CreateSimpleButton("buttonAddWave", "Add");
    buttonAddWave.width = "150px"
    buttonAddWave.height = "40px";
    buttonAddWave.color = "white";
    buttonAddWave.cornerRadius = 4;
    buttonAddWave.background = "green";
    buttonAddWave.onPointerUpObservable.add(() => {
      this._onAdd();
    });
    toolbar.addControl(buttonAddWave);  


    advancedTexture.addControl(toolbar);  

    this._selectedWave = new SelectedWave(advancedTexture);
  }

  set selectedWave(wave: Wave) {
    this._selectedWave.wave = wave;
  }

  public update() {
    this._selectedWave.update();
  }
}
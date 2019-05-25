import Wave from '@/api/Wave';
import SelectedWave from './SelectedWave';
import { Container, AdvancedDynamicTexture, Control, Button } from '@babylonjs/gui';

const elementWidth = 160;

export default class Gui {
  private _selectedWave: SelectedWave;

  constructor(onAdd: () => void, onRemove: (wave: Wave) => void) {
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
    buttonAddWave.widthInPixels = elementWidth;
    buttonAddWave.height = "40px";
    buttonAddWave.color = "white";
    buttonAddWave.cornerRadius = 4;
    buttonAddWave.background = "green";
    buttonAddWave.onPointerUpObservable.add(() => {
      onAdd();
    });
    toolbar.addControl(buttonAddWave);  


    advancedTexture.addControl(toolbar);  

    this._selectedWave = new SelectedWave(
      advancedTexture,
      (wave: Wave) => {
        onRemove(wave);
      },
      elementWidth,
    );
  }

  set selectedWave(wave: Wave) {
    this._selectedWave.wave = wave;
  }

  public update() {
    this._selectedWave.update();
  }
}
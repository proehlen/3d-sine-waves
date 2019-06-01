import { Container, AdvancedDynamicTexture, Control, Button } from '@babylonjs/gui';

import Wave from '@/api/Wave';
import SelectedWave from './SelectedWave';
import Settings from './Settings';


const elementWidth = 160;

export default class Gui {
  private _selectedWave: SelectedWave;

  constructor(onAdd: () => void, onRemove: (wave: Wave) => void, onClose: (wave: Wave) => void) {
    // GUI
    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
    const mainContainer = new Container('mainContainer');
    const mainContainerPadding = '3%';
    mainContainer.width = '100%';
    mainContainer.height = '100%';
    mainContainer.paddingLeft = mainContainerPadding;
    mainContainer.paddingRight = mainContainerPadding;
    mainContainer.paddingTop = mainContainerPadding;
    mainContainer.paddingBottom = mainContainerPadding;
    advancedTexture.addControl(mainContainer);

    const toolbar = new Container('toolbarWave');
    toolbar.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    toolbar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    toolbar.background = 'white';
    toolbar.adaptWidthToChildren = true;
    toolbar.adaptHeightToChildren = true;
    toolbar.paddingLeftInPixels = 10;
    toolbar.paddingTopInPixels = 10;

    const buttonAddWave = Button.CreateSimpleButton('buttonAddWave', 'Add');
    buttonAddWave.widthInPixels = elementWidth;
    buttonAddWave.height = '40px';
    buttonAddWave.color = 'white';
    buttonAddWave.cornerRadius = 4;
    buttonAddWave.thickness = 0;
    buttonAddWave.background = 'green';
    buttonAddWave.onPointerUpObservable.add(() => {
      onAdd();
    });
    toolbar.addControl(buttonAddWave);  


    mainContainer.addControl(toolbar);  

    this._selectedWave = new SelectedWave(
      mainContainer,
      (wave: Wave) => {
        onRemove(wave);
      },
      (wave: Wave) => {
        onClose(wave);
      },
      elementWidth,
    );

    new Settings(
      mainContainer,
      elementWidth,
    );

    const buttonGithub = Button.CreateImageOnlyButton('buttonGithub', 'assets/GitHubLogo.png');
    buttonGithub.widthInPixels = 32;
    buttonGithub.heightInPixels = 32;
    buttonGithub.thickness = 0;
    buttonGithub.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    buttonGithub.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    buttonGithub.onPointerUpObservable.add(() => {
      window.open('https://github.com/proehlen/3d-sine-waves', '_new');
    });
    mainContainer.addControl(buttonGithub);
  }

  set selectedWave(wave: Wave | undefined) {
    this._selectedWave.wave = wave;
  }

  public update() {
    this._selectedWave.update();
  }
}
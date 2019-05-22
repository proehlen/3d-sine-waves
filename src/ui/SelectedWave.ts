import { Container, Control, TextBlock, AdvancedDynamicTexture, StackPanel } from '@babylonjs/gui';
import Wave from '@/api/Wave';

export default class SelectedWave {
  private _wave?: Wave;
  private _waveIdText: TextBlock;

  constructor(parent: AdvancedDynamicTexture) {
    const container = new Container();
    container.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    container.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    container.background = "white";
    container.widthInPixels = 150;
    container.heightInPixels = 150;
    // container.adaptWidthToChildren = true;
    // container.adaptHeightToChildren = true;
    container.paddingLeftInPixels = 10;
    container.paddingBottomInPixels = 10;

    const stack = new StackPanel();
    stack.isVertical = true;

    this._waveIdText = new TextBlock('selectedWaveId', 'Wave');
    this._waveIdText.color = "black";
    this._waveIdText.heightInPixels = 20;
    stack.addControl(this._waveIdText);


    container.addControl(stack);
    parent.addControl(container);
  }

  set wave(wave: Wave) {
    this._wave = wave;
    this._waveIdText.text = `Wave ${wave.id}`;
    // TODO update
  }
}
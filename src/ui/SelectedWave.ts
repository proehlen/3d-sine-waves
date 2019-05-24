import { Container, Control, TextBlock, AdvancedDynamicTexture, StackPanel, InputText } from '@babylonjs/gui';
import Wave from '@/api/Wave';
import InputNumberWithLabel from './InputNumberWithLabel';

export default class SelectedWave {
  private _wave?: Wave;
  private _waveIdText: TextBlock;
  private _originXInput: InputNumberWithLabel;
  private _originYInput: InputNumberWithLabel;

  constructor(parent: AdvancedDynamicTexture) {
    const container = new Container();
    container.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    container.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    container.background = "white";
    container.widthInPixels = 150;
    container.heightInPixels = 350;
    // container.adaptWidthToChildren = true;
    // container.adaptHeightToChildren = true;
    container.paddingLeftInPixels = 10;
    container.paddingBottomInPixels = 10;

    const stack = new StackPanel();
    stack.isVertical = true;

    this._waveIdText = new TextBlock('selectedWaveId', 'Wave');
    this._waveIdText.color = "black";
    this._waveIdText.heightInPixels = 24;
    this._waveIdText.fontWeight = "Bold";
    stack.addControl(this._waveIdText);

    // Origin X/Y
    this._originXInput = new InputNumberWithLabel('Origin X', stack);
    this._originYInput = new InputNumberWithLabel('Origin Y', stack);

    container.addControl(stack);
    parent.addControl(container);
  }

  set wave(wave: Wave) {
    this._wave = wave;
    this.update();
  }

  public update() {
    if (this._wave) {
      this._waveIdText.text = `Wave ${this._wave.id}`;
      this._originXInput.value = this._wave.originX;
      this._originYInput.value = this._wave.originY;
    }
  }
}
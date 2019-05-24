import { Container, Control, TextBlock, AdvancedDynamicTexture, StackPanel, InputText } from '@babylonjs/gui';
import Wave from '@/api/Wave';
import InputNumberWithLabel from './InputNumberWithLabel';

export default class SelectedWave {
  private _wave?: Wave;
  private _waveIdText: TextBlock;
  private _frequency: InputNumberWithLabel;
  private _amplitude: InputNumberWithLabel;
  private _phase: InputNumberWithLabel;
  private _originX: InputNumberWithLabel;
  private _originY: InputNumberWithLabel;

  constructor(parent: AdvancedDynamicTexture) {
    const container = new Container();
    container.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    container.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    container.background = "white";
    container.widthInPixels = 150;
    container.heightInPixels = 370;
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

    // Frequency
    this._frequency = new InputNumberWithLabel('Frequency', stack, (frequency) => {
      if (this._wave) {
        this._wave.frequency = frequency;
      }
    });

    // Amplitude
    this._amplitude = new InputNumberWithLabel('Amplitude', stack, (amplitude) => {
      if (this._wave) {
        this._wave.amplitude = amplitude;
      }
    });

    // Phase
    this._phase = new InputNumberWithLabel('Phase', stack, (phase) => {
      if (this._wave) {
        this._wave.phase = phase;
      }
    });

    // Origin X/Y
    this._originX = new InputNumberWithLabel('Origin X', stack, (originX) => {
      if (this._wave) {
        this._wave.originX = originX;
      }
    });
    this._originY = new InputNumberWithLabel('Origin Y', stack, (originY) => {
      if (this._wave) {
        this._wave.originY = originY;
      }
    });

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
      this._frequency.value = this._wave.frequency;
      this._amplitude.value = this._wave.amplitude;
      this._phase.value = this._wave.phase;
      this._originX.value = this._wave.originX;
      this._originY.value = this._wave.originY;
    }
  }
}
import { Container, Control, TextBlock, AdvancedDynamicTexture, StackPanel, InputText, Button } from '@babylonjs/gui';
import Wave from '@/api/Wave';
import InputNumberWithLabel from './InputNumberWithLabel';

const panelHeight = 400;

export default class SelectedWave {
  private _container: Container;
  private _wave?: Wave;
  private _waveIdText: TextBlock;
  private _frequency: InputNumberWithLabel;
  private _amplitude: InputNumberWithLabel;
  private _phase: InputNumberWithLabel;
  private _originX: InputNumberWithLabel;
  private _originY: InputNumberWithLabel;

  constructor(parent: AdvancedDynamicTexture, onRemove: (wave: Wave) => void, elementWidth: number) {
    const panelWidth = elementWidth + 20;
    this._container = new Container();
    this._container.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    this._container.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this._container.background = "white";
    this._container.widthInPixels = panelWidth;
    this._container.heightInPixels = panelHeight;
    this._container.paddingLeftInPixels = 10;
    this._container.paddingBottomInPixels = 10;

    const stack = new StackPanel();
    stack.isVertical = true;

    this._waveIdText = new TextBlock('selectedWaveId', 'Wave');
    this._waveIdText.color = "black";
    this._waveIdText.heightInPixels = 24;
    this._waveIdText.fontWeight = "Bold";
    stack.addControl(this._waveIdText);

    // Frequency
    this._frequency = new InputNumberWithLabel(
      'Frequency',
      stack,
      (frequency) => {
        if (this._wave) {
          this._wave.frequency = frequency;
        }
      },
      elementWidth,
    );

    // Amplitude
    this._amplitude = new InputNumberWithLabel(
      'Amplitude',
      stack,
      (amplitude) => {
        if (this._wave) {
          this._wave.amplitude = amplitude;
        }
      },
      elementWidth,
    );

    // Phase
    this._phase = new InputNumberWithLabel(
      'Phase',
      stack,
      (phase) => {
        if (this._wave) {
          this._wave.phase = phase;
        }
      },
      elementWidth,
    );

    // Origin X/Y
    this._originX = new InputNumberWithLabel(
      'Origin X',
      stack,
      (originX) => {
        if (this._wave) {
          this._wave.originX = originX;
        }
      },
      elementWidth,
    );
    this._originY = new InputNumberWithLabel(
      'Origin Y',
      stack,
      (originY) => {
        if (this._wave) {
          this._wave.originY = originY;
        }
      },
      elementWidth,
    );

    // Remove button
    const buttonRemoveWave = Button.CreateSimpleButton("buttonRemoveWave", "Remove");
    buttonRemoveWave.paddingTopInPixels = 8;
    buttonRemoveWave.widthInPixels = elementWidth;
    buttonRemoveWave.height = "40px";
    buttonRemoveWave.background = "darkred";
    buttonRemoveWave.color = "white";
    buttonRemoveWave.cornerRadius = 4;
    buttonRemoveWave.onPointerUpObservable.add(() => {
      if (this._wave) {
        onRemove(this._wave);
      }
    });
    stack.addControl(buttonRemoveWave);  

    this._container.addControl(stack);
    parent.addControl(this._container);
  }

  set wave(wave: Wave | undefined) {
    this._wave = wave;
    if (this._wave) {
      this._container.isVisible = true;
      this.update();
    } else {
      this._container.isVisible = false;
    }
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
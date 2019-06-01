import { Container, Control, TextBlock, StackPanel, InputText, Button } from '@babylonjs/gui';
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

  constructor(parent: Container, onRemove: (wave: Wave) => void, onClose: (wave: Wave) => void, elementWidth: number) {
    const panelWidth = elementWidth + 20;
    this._container = new Container();
    this._container.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    this._container.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this._container.background = 'white';
    this._container.widthInPixels = panelWidth;
    this._container.heightInPixels = panelHeight;
    this._container.paddingLeftInPixels = 10;
    this._container.paddingBottomInPixels = 10;

    const vPanel = new StackPanel();
    vPanel.isVertical = true;


    const hStack = new Container();
    hStack.heightInPixels = 24;

    this._waveIdText = new TextBlock('selectedWaveId', 'Wave');
    this._waveIdText.color = 'black';
    this._waveIdText.heightInPixels = 24;
    this._waveIdText.fontWeight = 'Bold';
    this._waveIdText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this._waveIdText.paddingLeftInPixels = 10;
    hStack.addControl(this._waveIdText);

    // Close button
    const buttonClose = Button.CreateSimpleButton('buttonClose', 'X');
    buttonClose.widthInPixels = 34;
    buttonClose.fontSize = 14;
    buttonClose.background = '#FAFAFA';
    buttonClose.thickness = 1;
    buttonClose.color = "darkgrey";
    if (buttonClose.textBlock) {
      buttonClose.textBlock.color = "black";
    }
    buttonClose.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    buttonClose.paddingRightInPixels = 10;
    buttonClose.onPointerUpObservable.add(() => {
      if (this._wave) {
        onClose(this._wave);
      }
    });
    hStack.addControl(buttonClose);  

    vPanel.addControl(hStack);

    // Frequency
    this._frequency = new InputNumberWithLabel(
      'Frequency',
      vPanel,
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
      vPanel,
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
      vPanel,
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
      vPanel,
      (originX) => {
        if (this._wave) {
          this._wave.originX = originX;
        }
      },
      elementWidth,
    );
    this._originY = new InputNumberWithLabel(
      'Origin Y',
      vPanel,
      (originY) => {
        if (this._wave) {
          this._wave.originY = originY;
        }
      },
      elementWidth,
    );

    // Remove button
    const buttonRemoveWave = Button.CreateSimpleButton('buttonRemoveWave', 'Remove');
    buttonRemoveWave.paddingTopInPixels = 8;
    buttonRemoveWave.widthInPixels = elementWidth;
    buttonRemoveWave.height = '40px';
    buttonRemoveWave.background = 'darkred';
    buttonRemoveWave.color = 'white';
    buttonRemoveWave.cornerRadius = 4;
    buttonRemoveWave.onPointerUpObservable.add(() => {
      if (this._wave) {
        onRemove(this._wave);
      }
    });
    vPanel.addControl(buttonRemoveWave);  

    this._container.addControl(vPanel);
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
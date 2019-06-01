import { TextBlock, Container, InputText, Control, StackPanel, Button } from '@babylonjs/gui';

export default class InputNumberWithLabel {
  _inputText: InputText;

  constructor(
    label: string,
    container: Container,
    onChange: (value: number) => void,
    widthInPixels: number = 130,
    unit?: string,
    step: number = 1,
    color: string = 'black',
    background: string = 'white',
    focusedBackground: string = 'lightblue',
  ) {
    const textBlock = new TextBlock(undefined, `${label}:`);
    textBlock.color = color;
    textBlock.paddingTopInPixels = 10;
    textBlock.paddingBottomInPixels = 5;
    textBlock.heightInPixels = 40;
    container.addControl(textBlock);

    let unitText: TextBlock | undefined;
    if (unit) {
      unitText = new TextBlock(undefined, unit);
      unitText.widthInPixels = 25;
    }

    this._inputText = new InputText();
    this._inputText.color = color;
    this._inputText.background = background;
    this._inputText.heightInPixels = 34;
    this._inputText.widthInPixels = widthInPixels - 20;
    if (unitText) {
      this._inputText.widthInPixels -= unitText.widthInPixels;
    }
    this._inputText.focusedBackground = focusedBackground;
    this._inputText.onFocusSelectAll = true;
    this._inputText.onKeyboardEventProcessedObservable.add(
      (eventData: KeyboardEvent) => {
        if (eventData.key === 'Enter') {
          onChange(Number(this._inputText.text));
        }
      },
    );
    this._inputText.onBlurObservable.add((eventData: InputText) => onChange(Number(eventData.text)));

    // Increase button
    const buttonIncrease = Button.CreateSimpleButton('buttonIncrease', '+');
    buttonIncrease.widthInPixels = 17;
    buttonIncrease.heightInPixels = 17;
    buttonIncrease.fontSize = 12;
    buttonIncrease.fontWeight = 'bold';
    buttonIncrease.background = '#FAFAFA';
    buttonIncrease.thickness = 1;
    buttonIncrease.color = "darkgrey";
    if (buttonIncrease.textBlock) {
      buttonIncrease.textBlock.color = "black";
    }
    buttonIncrease.onPointerUpObservable.add(() => {
      onChange(Number(this._inputText.text) + step);
    });

    // Decrease button
    const buttonDecrease = Button.CreateSimpleButton('buttonDecrease', '-');
    buttonDecrease.widthInPixels = 17;
    buttonDecrease.heightInPixels = 17;
    buttonDecrease.fontSize = 12;
    buttonDecrease.fontWeight = 'bold';
    buttonDecrease.background = '#FAFAFA';
    buttonDecrease.thickness = 1;
    buttonDecrease.color = "darkgrey";
    if (buttonDecrease.textBlock) {
      buttonDecrease.textBlock.color = "black";
    }
    buttonDecrease.onPointerUpObservable.add(() => {
      onChange(Number(this._inputText.text) - step);
    });


    const verticalStack = new StackPanel();
    verticalStack.isVertical = true;
    verticalStack.widthInPixels = 20;
    verticalStack.addControl(buttonIncrease);
    verticalStack.addControl(buttonDecrease);

    const horizontalStack = new StackPanel();
    horizontalStack.isVertical = false;
    horizontalStack.heightInPixels = 34;
    horizontalStack.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    horizontalStack.addControl(this._inputText);
    horizontalStack.addControl(verticalStack);
    if (unitText) {
      horizontalStack.addControl(unitText);
    }

    container.addControl(horizontalStack);
  }

  get value() {
    return Number(this._inputText.text);
  }

  set value(value: number) {
    this._inputText.text = value.toString();
  }
}
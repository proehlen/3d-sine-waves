import { TextBlock, Container, InputText, Control } from '@babylonjs/gui';

export default class InputNumberWithLabel {
  _inputText: InputText;

  constructor(
    label: string,
    container: Container,
    onChange: (value: number) => void,
    widthInPixels: number = 130,
    color: string = "black",
    background: string = "white",
    focusedBackground: string = "lightblue",
  ) {
    const textBlock = new TextBlock(undefined, `${label}:`);
    container.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    textBlock.color = color;
    textBlock.paddingTopInPixels = 5;
    textBlock.heightInPixels = 30;
    container.addControl(textBlock);
    this._inputText = new InputText();
    this._inputText.color = color;
    textBlock.paddingTopInPixels = 3;
    textBlock.paddingBottomInPixels = 3;
    this._inputText.background = background;
    this._inputText.heightInPixels = 31;
    this._inputText.widthInPixels = widthInPixels;
    this._inputText.focusedBackground = focusedBackground;
    this._inputText.onKeyboardEventProcessedObservable.add(
      (eventData: KeyboardEvent) => {
        if (eventData.key === 'Enter') {
          onChange(Number(this._inputText.text));
        }
      },
    );
    this._inputText.onBlurObservable.add((eventData: InputText) => onChange(Number(eventData.text)));
    container.addControl(this._inputText);
  }

  get value() {
    return Number(this._inputText.text);
  }

  set value(value: number) {
    this._inputText.text = value.toFixed(3);
  }
}
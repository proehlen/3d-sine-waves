import { Container, StackPanel, Control, Button } from '@babylonjs/gui';

export default class Settings {
  _container: Container;

  constructor(parent: Container, elementWidth: number) {
    const panelWidth = elementWidth + 20;
    const panelHeight = elementWidth + 300;
    this._container = new Container();
    this._container.isVisible = false;
    this._container.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    this._container.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    this._container.widthInPixels = panelWidth;

    // Show settings button
    const buttonSettings = Button.CreateSimpleButton('buttonSettings', '\u2699');
    buttonSettings.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    buttonSettings.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    buttonSettings.paddingTopInPixels = 8;
    buttonSettings.widthInPixels = 40;
    buttonSettings.fontSize = 28;
    buttonSettings.heightInPixels = 40;
    buttonSettings.background = '#007acc';
    buttonSettings.color = 'white';
    buttonSettings.cornerRadius = 4;
    buttonSettings.thickness = 0;
    buttonSettings.onPointerUpObservable.add(() => {
      alert('Settings panel under construction.');
    });
    this._container.addControl(buttonSettings);  

    const stack = new StackPanel();
    stack.isVertical = true;
    stack.isVisible = false;

    parent.addControl(this._container);
  }
}
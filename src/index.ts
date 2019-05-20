function component() {
  const element = document.createElement('div');
  const hello: string = 'Hello';
  const typescript: string = 'Typescript';
  element.innerHTML = [hello, typescript].join(' ');

  return element;
}

document.body.appendChild(component());
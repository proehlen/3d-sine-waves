require('./style.css');
import WavesUi from './ui/WavesUi';

const canvas = document.createElement('canvas');
canvas.setAttribute("id", "renderCanvas");
document.body.appendChild(canvas);

new WavesUi(canvas, 200);
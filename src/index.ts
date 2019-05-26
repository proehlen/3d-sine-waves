import './style.css';
import WavesUi from './ui/App';

// Create canvas and start app
const canvas = document.createElement('canvas');
canvas.setAttribute("id", "renderCanvas");
document.body.appendChild(canvas);
new WavesUi(canvas, 200);

// Remove loading message
const loading = document.getElementById("loading-text");
if (loading !== null) {
  const parent = loading.parentNode;
  if (parent) {
    parent.removeChild(loading);
  }
}

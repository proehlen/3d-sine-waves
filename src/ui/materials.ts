import { Scene } from '@babylonjs/core/scene';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
// import { Color3 } from '@babylonjs/core/Maths/math';

const materials: Map<string, StandardMaterial> = new Map();
export default materials;

const materialData = [{
  name: 'white',
  r: 1,
  g: 1,
  b: 1,
}, {
  name: 'brightblue',
  r: 0.5,
  g: 0.5,
  b: 1,
}];

export function init(scene: Scene) {
  materialData.forEach((data) => {
    const material = new StandardMaterial(data.name, scene);
    material.emissiveColor.set(data.r, data.g, data.b);
    materials.set(data.name, material);
  });
}

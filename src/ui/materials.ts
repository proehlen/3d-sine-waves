import { Scene } from '@babylonjs/core/scene';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
// import { Color3 } from '@babylonjs/core/Maths/math';

const materials: Map<string, StandardMaterial> = new Map();
export default materials;

const materialData = [{
  name: 'white',
  emissive: {
    r: 1,
    g: 1,
    b: 1,
  },
  specular: {
    r: 1,
    g: 1,
    b: 1,
  },
}, {
  name: 'waves',
  emissive: {
    r: 0.25,
    g: 0.25,
    b: 0.25,
  },
  specular: {
    r: 0.3,
    g: 0.3,
    b: 0.3,
  },
}, {
  name: 'brightblue',
  emissive: {
    r: 0.5,
    g: 0.5,
    b: 1,
  },
  specular: {
    r: 1,
    g: 1,
    b: 1,
  },
}];

export function init(scene: Scene) {
  materialData.forEach((data) => {
    const material = new StandardMaterial(data.name, scene);
    material.emissiveColor.set(data.emissive.r, data.emissive.g, data.emissive.b);
    material.specularColor.set(data.specular.r, data.specular.g, data.specular.b);
    materials.set(data.name, material);
  });
}

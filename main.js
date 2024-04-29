import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 1.0;
const far = 1000.0;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light.position.set(20, 100, 10);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.bias = -0.001;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500.0;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500.0;
light.shadow.camera.left = 100;
light.shadow.camera.right = -100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;
scene.add(light);

// light = new THREE.AmbientLight(0x101010);
// scene.add(light);

const controls = new OrbitControls(
    camera, renderer.domElement);
  controls.target.set(0, 20, 0);
  controls.update();


const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    './resources/posx.jpg',
    './resources/negx.jpg',
    './resources/posy.jpg',
    './resources/negy.jpg',
    './resources/posz.jpg',
    './resources/negz.jpg',
]);
scene.background = texture;


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 10, 10),
    new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
      }));
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
    }));
box.position.set(0, 1, 0);
box.castShadow = true;
box.receiveShadow = true;
scene.add(box);

const fbxloader = new FBXLoader();
fbxloader.load('./resources/walls.fbx', (fbx) => {
    fbx.traverse((child) => {
        if (child.isMesh) {
            // Load and assign texture files to the materials
   //         const textureLoader = new THREE.TextureLoader();
   //         const texture1 = textureLoader.load('path/to/texture1.jpg');
    //        const texture2 = textureLoader.load('path/to/texture2.jpg');

            // Example of assigning different textures to different parts of the model
            // if (child.name === 'part1') {
            //     child.material.map = texture1;
            // } else if (child.name === 'part2') {
            //     child.material.map = texture2;
            // }

            // child.material.needsUpdate = true;
        }
    });

    // Add the model to the scene after assigning textures
    scene.add(fbx);
});

for (let x = -8; x < 8; x++) {
for (let y = -8; y < 8; y++) {
    const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({
        color: 0x808080,
    }));
    box.position.set(Math.random() + x * 5, Math.random() * 4.0 + 2.0, Math.random() + y * 5);
    box.castShadow = true;
    box.receiveShadow = true;
    scene.add(box);
}
}  
//

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xff000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();
// 1st intro article -> render a 3D scene

import * as THREE from 'three';

// create a scene
const scene = new THREE.Scene();

// create camera
const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// set camera position
camera.position.z = 2;

// create light source & add to scence
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

// create geometry for mesh objects
const boxWidth = 0.5;
const boxHeight = 0.5;
const boxDepth = 0.5;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

// function to create mesh objects & add to scene
function makeCube(geometry, color, x) {
	const material = new THREE.MeshPhongMaterial({ color });

	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	cube.position.x = x;

	return cube;
}

//  create 3 cubes
const cubes = [
	makeCube(geometry, 0x44aa88, 0),
	makeCube(geometry, 0x8844aa, -2),
	makeCube(geometry, 0xaa8844, 2)
];

// render cubes scene using camera, and animates
function render(time) {
	time *= 0.001; //convert ms to seconds

	cubes.forEach((cube, idx) => {
		const speed = 1 + idx * 0.1;
		const rot = time * speed;
		cube.rotation.x = rot;
		cube.rotation.y = rot;
	});

	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

// create renderer for all related functions
let renderer;

// export function to render any element in svelte page
export function createScene(el) {
	renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
	requestAnimationFrame(render);
}

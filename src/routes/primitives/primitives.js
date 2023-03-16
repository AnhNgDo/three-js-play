import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// create camera
const fov = 40;
const aspect = 2;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 120;

// create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// add light sources to scene
{
	const color = 0xffffff;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);
}
{
	const color = 0xffffff;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(1, -2, -4);
	scene.add(light);
}

// add new object to scene
const objects = [];
const spread = 15;

function addObject(x, y, obj) {
	obj.position.x = x * spread;
	obj.position.y = y * spread;

	scene.add(obj);
	objects.push(obj);
}

// create material with random color (hue)
function createMaterial() {
	const material = new THREE.MeshPhongMaterial({
		side: THREE.DoubleSide
	});

	const hue = Math.random();
	const saturation = 1;
	const luminance = 0.5;
	material.color.setHSL(hue, saturation, luminance);

	return material;
}

// create objet by adding geometry to material & add object to scene
function addSolidGeometry(x, y, geometry) {
	const mesh = new THREE.Mesh(geometry, createMaterial());
	addObject(x, y, mesh);
}

// box - Note use of block scope
{
	const width = 8;
	const height = 8;
	const depth = 8;
	addSolidGeometry(0, 0, new THREE.BoxGeometry(width, height, depth));
}

// flat circle
{
	const radius = 6;
	const segments = 24;
	const thetaStart = (Math.PI * 1) / 3; //60 degree angle
	const thetaLength = (Math.PI * 5) / 3;
	addSolidGeometry(1.5, 0, new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength));
}

// cone
{
	const radius = 6;
	const height = 8;
	const radialSegments = 16;
	addSolidGeometry(-1.5, 0, new THREE.ConeGeometry(radius, height, radialSegments));
}

// cylinder
{
	const radiusTop = 4;
	const radiusBottom = 6;
	const height = 8;
	const radialSegments = 12;
	addSolidGeometry(
		3,
		0,
		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
	);
}

// Dodecahedron (12 sides)
{
	const radius = 5;
	const detail = 0;
	addSolidGeometry(-3, 0, new THREE.DodecahedronGeometry(radius, detail));
}

// render scence
let renderer;

// responsive render sizing
function resizeRender(renderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	//  note -> this based on difference between canvas's number of logical pixels and the space it occupies
	// ref: https://stackoverflow.com/questions/66835903/what-is-the-difference-between-canvas-width-and-canvas-clientwidth
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
		renderer.setSize(width, height, false);
	}
	return needResize;
}

// render scene
function renderScene(time) {
	time *= 0.001; //covert time unit to s

	// reponsive camera aspect
	if (resizeRender(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

	// add different rotations to obj in objects[]
	objects.forEach((obj, idx) => {
		const speed = 0.1 + idx * 0.5;
		const rot = time * speed;
		obj.rotation.x = rot;
		obj.rotation.y = rot;
	});

	renderer.render(scene, camera); //render scene using camera

	requestAnimationFrame(renderScene); // continous animate with call back fn
}

// export function to render in svelte page
export function createScene(el) {
	renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
	requestAnimationFrame(renderScene);
}

import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// create camera
const fov = 60;
const aspect = 1;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 120;

// create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

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
		side: THREE.DoubleSide // needed to for 2D shapes (draw both side)
	});

	const hue = Math.random();
	const saturation = 0.8;
	const luminance = 0.5;
	material.color.setHSL(hue, saturation, luminance);

	return material;
}

// create solid object (geometry + material) & add object to scene
function addSolidGeometry(x, y, geometry) {
	const mesh = new THREE.Mesh(geometry, createMaterial());
	addObject(x, y, mesh);
}

// create line object (geo + mat) & add to scene
function addLineGeomentry(x, y, geometry) {
	const material = new THREE.LineBasicMaterial({ color: 0x000000 });
	const mesh = new THREE.LineSegments(geometry, material);
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

// 3d shape from extruded 2d shape, with optional bevelling
{
	const shape = new THREE.Shape();
	const x = 0;
	const y = 0;
	shape.moveTo(x + 2.5, y + 2.5);
	shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
	shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
	shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
	shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
	shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
	shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

	const extrudeSettings = {
		steps: 2,
		depth: 2,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelSegments: 2
	};

	addSolidGeometry(-1.5, -1.5, new THREE.ExtrudeGeometry(shape, extrudeSettings));
}

// IcosahedronGeometry (20 slides)
{
	const radius = 7;
	const detail = 0;
	addSolidGeometry(0, -1.5, new THREE.IcosahedronGeometry(radius, detail));
}

// 2D plane
{
	const width = 8;
	const height = 8;
	addSolidGeometry(1.5, -1.5, new THREE.PlaneGeometry(width, height));
}

// donut (torus)
{
	const radius = 5;
	const tubeRadius = 2;
	const radialSegments = 5;
	const tubularSegments = 48;
	addSolidGeometry(
		0,
		-3,
		new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments)
	);
}

// wireframe
{
	const size = 8;
	const widthSegments = 2;
	const heightSegments = 2;
	const depthSegments = 2;
	addLineGeomentry(
		0,
		1.5,
		new THREE.WireframeGeometry(
			new THREE.BoxGeometry(size, size, size, widthSegments, heightSegments, depthSegments)
		)
	);
}

// torus knot
{
	const radius = 3.5;
	const tubeRadius = 1.5;
	const radialSegments = 8;
	const tubularSegments = 64;
	const p = 2;
	const q = 3;
	addSolidGeometry(
		-1.5,
		1.5,
		new THREE.TorusKnotGeometry(radius, tubeRadius, tubularSegments, radialSegments, p, q)
	);
}

// sphere
{
	const radius = 7;
	const widthSegments = 12;
	const heightSegments = 8;
	addSolidGeometry(1.5, 1.5, new THREE.SphereGeometry(radius, widthSegments, heightSegments));
}

// 3D text - note 'Promise' pattern
{
	const loader = new FontLoader();
	// promisify font loading
	function loadFont(url) {
		return new Promise((resolve, reject) => {
			loader.load(url, resolve, undefined, reject);
		});
	}
	// create 3d font object & add to scene
	async function drawText() {
		const font = await loadFont(
			'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json'
		);
		const text = 'Playground';
		const geometry = new TextGeometry(text, {
			font: font,
			size: 5.0,
			height: 0.2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.5,
			bevelSize: 0.3,
			bevelSegments: 5
		});
		const mesh = new THREE.Mesh(geometry, createMaterial());

		// make text rotate around its center
		geometry.computeBoundingBox();
		geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);

		const parent = new THREE.Object3D();
		parent.add(mesh);

		addObject(0, 3, parent);
	}

	drawText();
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
		const speed = 0.1 + idx * 0.2;
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

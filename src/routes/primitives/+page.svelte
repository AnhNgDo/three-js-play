<script>
	import { onMount } from 'svelte';
	import { createScene } from './primitives.js';

	let el;
	onMount(() => {
		createScene(el);
	});
</script>

<svelte:head>
	<title>Three.js Primitives | Sveltekit Playground AD</title>
	<meta name="description" content="Three.js primitives" />
</svelte:head>

<div>
	<canvas bind:this={el} />
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
		display: block;
	}

	div {
		border: 1px solid black;
	}
</style>

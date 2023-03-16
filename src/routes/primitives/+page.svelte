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

<canvas bind:this={el} />

<style>
	canvas {
		width: 100%;
		display: block;
	}
</style>

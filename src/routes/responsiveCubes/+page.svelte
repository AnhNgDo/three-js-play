<script>
	import { onMount } from 'svelte';
	import { createScene } from '$lib/responsive.js';

	let el;
	onMount(() => {
		createScene(el);
	});
</script>

<svelte:head>
	<title>Three.js Sveltekit Playground for AD</title>
	<meta name="description" content="Three.js fundamentals + responsive design" />
</svelte:head>

<canvas bind:this={el} />

<style>
	canvas {
		width: 100%;
		display: block;
	}
</style>

<script>
	import { onMount } from 'svelte';
	import { createScene } from '$lib/fundamental.js';

	let el;
	onMount(() => {
		createScene(el);
	});
</script>

<svelte:head>
	<title>Three.js Sveltekit Playground for AD</title>
	<meta name="description" content="Three.js example app built with Svelte" />
</svelte:head>

<canvas height="1500" width="2000" bind:this={el} />

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	canvas {
		height: 100vh;
		width: 100vw;
	}
</style>

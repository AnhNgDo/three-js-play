<nav>
	<a href="/">Home</a>
	<a href="/responsiveCubes">Responsive</a>
	<a href="/primitives">primitives</a>
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		display: flex;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
		gap: 1rem;
	}
</style>

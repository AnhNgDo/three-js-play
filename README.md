# Three.js playground

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## create app

```bash
# create a new project in my-app
npm create svelte@latest my-app

# add three.js
npm add three
```

## Set up

- create threejs script in $lib (e.g. fundamental.js)
- update +page.svelte to run render script
- IMPORTANT! -> turn off ssr (in +page.js) if use window object in .js files

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: { 
    adapter: adapter(),
    prerender: {
      entries: ['*'],
      handleUnseenRoutes: 'ignore',
    },
    paths: {}
  }
};

export default config;

import preprocess from "svelte-preprocess";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
//import preprocessReact from "svelte-preprocess-react/preprocessReact";
//import preprocess from 'svelte-preprocess';

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    /*preprocessReact({
    preprocess: preprocess({ sourceMap: true }),
  }),*/
    vitePreprocess(),
    preprocess({
      postcss: true,
    }),
  ],
};

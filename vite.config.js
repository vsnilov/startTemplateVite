const path = require("path");

import { defineConfig } from "vite";
import pugPlugin from "vite-plugin-pug";
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import ViteRequireContext from '@originjs/vite-plugin-require-context';

import storePug from './src/templates/store.json';
export default defineConfig({
  base: './',
  plugins: [
    ViteRequireContext(),
    pugPlugin({ pretty: true }, storePug),
    createSvgSpritePlugin({
      symbolId: 'icon-[name]',
      svgo: require(path.resolve(__dirname, 'svgo.config.js')),
    }),
  ],
  build: {
    //minify: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});

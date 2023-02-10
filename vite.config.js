const path = require("path");

import { defineConfig } from "vite";
import pugPlugin from "vite-plugin-pug";
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import ViteRequireContext from '@originjs/vite-plugin-require-context';
import viteImagemin from 'vite-plugin-imagemin';
import vue from '@vitejs/plugin-vue';

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
    vue(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 0,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  resolve: { alias: { 'vue': 'vue/dist/vue.esm-bundler.js' } },
  build: {
    //minify: false,
    rollupOptions: {
      input: {
        main: "./index.html",
        nav: "./nav.html",
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});

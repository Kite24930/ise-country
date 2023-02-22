const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                signup: resolve(__dirname, 'signup/index.html'),
                apply: resolve(__dirname, 'apply/index.html'),
                mypage: resolve(__dirname, 'mypage/index.html'),
            },
            output: {
                entryFileNames: `assets/[name]/bundle.js`
            }
        }
    }
})
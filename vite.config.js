import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    build: {
        outDir: 'docs',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                register: resolve(__dirname, 'src/pages/register/index.html'),
                login: resolve(__dirname, 'src/pages/login/index.html'),
                productList: resolve(__dirname, 'src/pages/product-list/index.html'),
                productDetail: resolve(__dirname, 'src/pages/ProductDetail/index.html'),
                cart: resolve(__dirname, 'src/pages/cart/index.html'),
            },
        },
    },
});

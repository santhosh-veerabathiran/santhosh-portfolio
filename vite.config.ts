import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

const trailingSlash = (): Plugin => {
	const redirect = (server: { middlewares: { use: (handler: (req: any, res: any, next: () => void) => void) => void } }) => {
		server.middlewares.use((req, res, next) => {
			const match = /^\/minato($|\?)/.exec(req.url ?? '');
			if (match) {
				res.statusCode = 302;
				res.setHeader('Location', (req.url as string).replace('/minato', '/minato/'));
				res.end();
				return;
			}
			next();
		});
	};

	return {
		name: 'template-trailing-slash',
		configureServer: redirect,
		configurePreviewServer: redirect,
	};
};

export default defineConfig({
	plugins: [react(), trailingSlash()],
	build: {
		rollupOptions: {
			input: {
				main: 'index.html',
				minato: 'minato/index.html',
			},
		},
	},
});

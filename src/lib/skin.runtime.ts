import type { SkinDefinition } from './skin.types';

const setVars = (root: HTMLElement, group?: Record<string, string>) => {
	if (!group) {
		return;
	}
	Object.keys(group).forEach((key) => {
		root.style.setProperty(`--${key}`, group[key]);
	});
};

const loadFont = (href: string) => {
	['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach((origin) => {
		const preconnect = document.createElement('link');
		preconnect.rel = 'preconnect';
		preconnect.href = origin;
		if (origin.includes('gstatic')) {
			preconnect.crossOrigin = 'anonymous';
		}
		document.head.appendChild(preconnect);
	});

	const stylesheet = document.createElement('link');
	stylesheet.rel = 'stylesheet';
	stylesheet.href = href;
	document.head.appendChild(stylesheet);
};

export const applySkin = (id: string, skin: SkinDefinition) => {
	const root = document.documentElement;

	setVars(root, skin.colors);
	setVars(root, skin.palette);
	setVars(root, skin.fonts);

	if (skin.fontImport) {
		loadFont(skin.fontImport);
	}

	const { background, motion } = skin;
	if (background.pattern) {
		root.setAttribute('data-pattern', background.pattern);
	}
	if (background.gridSize) {
		root.style.setProperty('--grid-size', background.gridSize);
	}
	if (background.image) {
		root.style.setProperty('--bg-image', background.image);
		root.setAttribute('data-bg', 'image');
	}

	root.style.setProperty('--net-speed', String(motion.speed ?? 1));
	root.setAttribute('data-hover', motion.hover ?? 'link');
	root.setAttribute('data-animation', background.animation ?? 'network');
	root.setAttribute('data-orbs', background.orbs === false ? 'off' : 'on');
	root.setAttribute('data-aurora', background.aurora === true ? 'on' : 'off');
	root.setAttribute('data-active-theme', id);
};

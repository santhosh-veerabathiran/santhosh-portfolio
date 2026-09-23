import { defaultHead, type HeadConfig } from '../content/seo';
import type { SkinDefinition } from './skin.types';

const setMeta = (name: string, content: string) => {
	let meta = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
	if (!meta) {
		meta = document.createElement('meta');
		meta.name = name;
		document.head.appendChild(meta);
	}
	meta.content = content;
};

const themedFavicon = (skin: SkinDefinition) => {
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='${skin.colors.accent}'/><text x='50' y='73' font-family='-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif' font-size='64' font-weight='700' text-anchor='middle' fill='${skin.colors.bg}'>S</text></svg>`;
	return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const applyHead = (skin: SkinDefinition, overrides?: Partial<HeadConfig>) => {
	const head: HeadConfig = { ...defaultHead, ...overrides };

	document.title = head.title;
	setMeta('description', head.description);
	setMeta('theme-color', head.themeColor ?? skin.colors.accent);

	const favicon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
	if (favicon) {
		favicon.href = themedFavicon(skin);
	}

	let jsonLd = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
	if (!jsonLd) {
		jsonLd = document.createElement('script');
		jsonLd.type = 'application/ld+json';
		document.head.appendChild(jsonLd);
	}
	jsonLd.textContent = JSON.stringify(head.jsonLd);
};

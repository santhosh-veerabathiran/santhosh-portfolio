import type { Project } from './types';

export const projects: Project[] = [
	{
		icon: 'ic-broadcast',
		accentVar: 'var(--c-cyan)',
		title: 'TrafficTap',
		tag: 'Personal · in progress',
		description:
			'A cross-platform local HTTP(S) debugging proxy — pick the domains you care about, route traffic through it, and read every request and response back in a live web UI, with capture, filtering, analytics and themes. Runs as a background service on macOS, Linux and Windows with per-platform system-proxy and certificate-trust integrations.',
		chips: ['TypeScript', 'Node.js', 'Express', 'WebSockets', 'React', 'Vite', 'Tailwind CSS'],
		github: 'https://github.com/santhosh-veerabathiran/traffic-tap',
	},
	{
		icon: 'ic-chart',
		accentVar: 'var(--c-violet)',
		title: 'CodePulse',
		tag: 'Personal · in progress',
		description:
			'A fully client-side git-contribution analytics dashboard that parses repository exports in the browser and computes commit, code-line and quality metrics — with a runtime theming engine driven by a single JSON contract and a hand-built SVG chart toolkit (no charting libraries).',
		chips: ['Angular 19', 'Signals', 'TypeScript', 'SVG', 'SCSS'],
	},
	{
		icon: 'ic-home',
		accentVar: 'var(--c-amber)',
		title: 'Home Service Management System',
		tag: 'Personal',
		description:
			'A three-sided home-services marketplace with customer, professional and admin portals — a searchable service catalog, quantity-based booking with overlap prevention and rescheduling, OTP email auth, online payments with printable receipts, map-based addresses, reviews and favourites, backed by a Redis read-through cache.',
		chips: ['Laravel 13', 'Tailwind CSS', 'Alpine.js', 'MySQL', 'Redis'],
		github: 'https://github.com/santhosh-veerabathiran/home-service-management-system',
	},
];

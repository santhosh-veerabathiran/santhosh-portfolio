import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
	{
		icon: 'ic-code',
		title: 'Languages',
		chips: [
			{ label: 'TypeScript', icon: 'si-typescript', color: '#3178c6', fill: true },
			{ label: 'JavaScript', icon: 'si-javascript', color: '#f7df1e', fill: true },
			{ label: 'PHP', icon: 'si-php', color: '#9aa0da', fill: true },
			{ label: 'SQL', icon: 'ic-database' },
		],
	},
	{
		icon: 'ic-server',
		title: 'Backend & Runtime',
		chips: [
			{ label: 'Node.js', icon: 'si-nodedotjs', color: '#6cc24a', fill: true },
			{ label: 'Bun', icon: 'si-bun', color: '#e8d9b5', fill: true },
			{ label: 'NestJS', icon: 'si-nestjs', color: '#e0234e', fill: true },
			{ label: 'Fastify', icon: 'si-fastify', color: '#c7d2de', fill: true },
			{ label: 'Elysia', icon: 'ic-leaf' },
			{ label: 'Nx monorepo', icon: 'si-nx', color: '#8fb5ff', fill: true },
		],
	},
	{
		icon: 'ic-layout',
		title: 'Frontend',
		chips: [
			{ label: 'Angular (Signals)', icon: 'si-angular', color: '#e23237', fill: true },
			{ label: 'RxJS', icon: 'si-reactivex', color: '#e0509e', fill: true },
			{ label: 'React', icon: 'si-react', color: '#61dafb' },
			{ label: 'HTML', icon: 'si-html5', color: '#e34f26', fill: true },
			{ label: 'CSS', icon: 'si-css', color: '#a970d6', fill: true },
			{ label: 'SVG', icon: 'si-svg', color: '#ffb13b', fill: true },
			{ label: 'Dexie / IndexedDB', icon: 'ic-database' },
			{ label: 'Tailwind', icon: 'si-tailwindcss', color: '#22c7e0', fill: true },
			{ label: 'SCSS', icon: 'si-sass', color: '#e68cb8', fill: true },
		],
	},
	{
		icon: 'ic-database',
		title: 'Databases & Search',
		chips: [
			{ label: 'PostgreSQL', icon: 'si-postgresql', color: '#5a82e8', fill: true },
			{ label: 'MySQL', icon: 'si-mysql', color: '#7ba7cc', fill: true },
			{ label: 'TypeORM', icon: 'si-typeorm', color: '#fe4a48', fill: true },
			{ label: 'Prisma / Drizzle', icon: 'si-prisma', color: '#9aaac4', fill: true },
			{ label: 'Typesense', icon: 'ic-search' },
			{ label: 'ClickHouse / QuestDB', icon: 'si-clickhouse', color: '#ffcc01', fill: true },
		],
	},
	{
		icon: 'ic-broadcast',
		title: 'Messaging & Cache',
		chips: [
			{ label: 'RabbitMQ', icon: 'si-rabbitmq', color: '#ff6a1a', fill: true },
			{ label: 'Redis', icon: 'si-redis', color: '#ff5a4d', fill: true },
			{ label: 'Event-driven / pub-sub', icon: 'ic-broadcast' },
		],
	},
	{
		icon: 'ic-sparkles',
		title: 'AI',
		chips: [
			{ label: 'Google Gemini', icon: 'si-googlegemini', color: '#a48bd0', fill: true },
			{ label: 'Claude', icon: 'si-claude', color: '#d97757', fill: true },
			{ label: 'Structured output', icon: 'ic-braces' },
			{ label: 'Search grounding', icon: 'ic-search' },
			{ label: 'Stagehand agent', icon: 'ic-cpu' },
		],
	},
	{
		icon: 'ic-plug',
		title: 'Integrations',
		chips: [
			{ label: 'REST · SOAP/XML', icon: 'ic-code' },
			{ label: 'OAuth2 / JWT', icon: 'ic-shield' },
			{ label: 'ISO-20022', icon: 'ic-card' },
			{ label: 'SFTP / FTP', icon: 'ic-server' },
			{ label: 'GCS · KMS', icon: 'ic-shield' },
			{ label: 'Fiserv', icon: 'ic-card' },
			{ label: 'Worldline', icon: 'ic-card' },
			{ label: 'Klarna', icon: 'ic-card' },
			{ label: 'nShift', icon: 'ic-broadcast' },
			{ label: 'Creditsafe', icon: 'ic-shield' },
		],
	},
	{
		icon: 'ic-check',
		title: 'Practices',
		chips: [
			{ label: 'SDK / client design', icon: 'ic-plug' },
			{ label: 'Jest / Supertest', icon: 'si-jest', color: '#e0566a', fill: true },
			{ label: 'Cypress', icon: 'si-cypress', color: '#69d3a7', fill: true },
			{ label: 'Schema validation', icon: 'ic-check' },
			{ label: 'Retry & backoff', icon: 'ic-bolt' },
			{ label: 'Observability', icon: 'ic-chart' },
		],
	},
];

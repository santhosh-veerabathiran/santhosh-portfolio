import { heroSocials, profile } from './profile';

export interface HeadConfig {
	title: string;
	description: string;
	themeColor?: string;
	jsonLd: Record<string, unknown>;
}

export const siteUrl = 'https://portfolio.santhosh-veerabathiran.com/';

const profileLinks = heroSocials
	.filter((social) => {
		return social.href.startsWith('http') && !social.href.includes('wa.me');
	})
	.map((social) => {
		return social.href;
	});

export const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: `${profile.name.first} ${profile.name.last}`,
	url: siteUrl,
	image: `${siteUrl}assets/images/avatars/avatar-3.jpg`,
	jobTitle: 'Full Stack Software Engineer',
	worksFor: { '@type': 'Organization', name: 'Surfboard Payments' },
	email: `mailto:${profile.email}`,
	knowsAbout: [
		'Payments',
		'Fintech',
		'NestJS',
		'Angular',
		'React',
		'TypeScript',
		'Node.js',
		'KYC/AML',
		'Search infrastructure',
		'Logistics integrations',
		'AI tooling',
	],
	sameAs: profileLinks,
};

export const defaultHead: HeadConfig = {
	title: 'Santhosh Veerabathiran — Full Stack Software Engineer',
	description: 'Santhosh Veerabathiran — Full Stack Software Engineer specialising in fintech and payments.',
	jsonLd: personJsonLd,
};

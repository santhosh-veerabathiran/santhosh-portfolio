import type { Fact, SocialLink, Stat } from './types';

export const profile = {
	name: { first: 'Santhosh', last: 'Veerabathiran' },
	eyebrow: 'Full Stack Software Engineer · Fintech & Payments',
	hi: "Hi, I'm",
	typedPre: 'I build ',
	typedWords: [
		'payment engines.',
		'settlement systems.',
		'KYC & AML tooling.',
		'payment-integrity sweeps.',
		'logistics integrations.',
		'search infrastructure.',
		'production AI tooling.',
	],
	sub: 'Payments & acquiring infrastructure — settlements, KYC/AML, search and AI — designed and shipped end to end.',
	resumeHref: '/assets/resumes/santhosh-resume.pdf',
	avatars: ['/assets/images/avatars/avatar-1.jpg', '/assets/images/avatars/avatar-2.jpg', '/assets/images/avatars/avatar-3.jpg'],
	email: 'santhosh20020923@gmail.com',
	phone: '+91 90259 28985',
	phoneHref: 'tel:+919025928985',
	employmentStart: { year: 2024, monthIndex: 1 },
};

export const heroSocials: SocialLink[] = [
	{ label: 'Email', href: 'mailto:santhosh20020923@gmail.com', icon: 'ic-mail' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/santhosh-veerabathiran', icon: 'ic-linkedin', fill: true },
	{ label: 'GitHub', href: 'https://github.com/santhosh-veerabathiran', icon: 'ic-github', fill: true },
	{ label: 'X', href: 'https://x.com/santhosh_2392', icon: 'si-x', fill: true },
	{ label: 'Instagram', href: 'https://www.instagram.com/santhosh_veerabathiran', icon: 'si-instagram', fill: true },
	{ label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100040684967820', icon: 'si-facebook', fill: true },
	{ label: 'WhatsApp', href: 'https://wa.me/919025928985', icon: 'si-whatsapp', fill: true },
	{ label: 'Phone', href: 'tel:+919025928985', icon: 'ic-phone' },
];

export const stats: Stat[] = [
	{ icon: 'ic-commit', count: 1550, suffix: '+', label: 'Commits Shipped' },
	{ icon: 'ic-server', count: 80, suffix: '+', label: 'Microservices' },
	{ icon: 'ic-cpu', count: 25, suffix: '+', label: 'Technologies' },
];

export const bioHtml: string[] = [
	`I'm a full-stack software developer on a <b>Swedish payments &amp; acquiring platform</b>, where I've contributed <b>1,550+ commits</b> across <b>80+ backend microservices</b> and the Angular operations console.`,
	`My work spans the whole product: an <span class="hl">event-driven settlement engine</span>, an hourly <span class="hl">payment-integrity sweeper</span>, an <span class="hl">AML transaction-monitoring rule engine</span>, a from-scratch <span class="hl">Creditsafe credit-data SDK</span>, the platform's global search and logistics services, and its production <span class="hl">AI features</span> — plus the shared AI toolkit that gives every model call retries, quota gating and usage tracking. On the front end, I rebuilt the console's list, ticketing and alert-review experiences in Angular (Signals).`,
	`I care about clean architecture, reliability, and shipping things end to end — from data model to deployed UI.`,
];

export const facts: Fact[] = [
	{ icon: 'ic-user', term: 'Role', detailHtml: 'Full Stack Software Engineer' },
	{ icon: 'ic-target', term: 'Focus', detailHtml: 'Payments · KYC/AML · Search · AI · Logistics' },
	{ icon: 'ic-layers', term: 'Stack', detailHtml: 'NestJS · TypeScript · Angular · PostgreSQL' },
	{ icon: 'ic-pin', term: 'Location', detailHtml: 'Chengalpattu, Tamil Nadu, India' },
	{
		icon: 'ic-cap',
		term: 'Education',
		detailHtml: 'MCA — Computer Applications <span class="sub">· CGPA 8.98</span><br />B.Sc. Mathematics <span class="sub">· CGPA 8.03</span>',
	},
	{ icon: 'ic-dot', term: 'Status', detailHtml: 'Open to opportunities', live: true },
];

export const contact = {
	label: 'Contact',
	headingHtml: `Let's build <span class="hl">something</span>.`,
	text: "I'm open to full-stack and backend engineering roles. The fastest way to reach me is email — I usually reply within a day.",
	links: heroSocials.filter((social) => {
		return !['Email', 'Phone'].includes(social.label);
	}),
};

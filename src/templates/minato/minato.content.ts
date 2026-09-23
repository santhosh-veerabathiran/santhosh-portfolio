export const minatoAssets = {
	gaze: { basePath: '/assets/minato/frames/gaze', count: 141 },
	flash: { basePath: '/assets/minato/frames/flash', count: 69 },
	rasengan: { basePath: '/assets/minato/frames/rasengan', count: 65 },
};

export const titleblock = {
	kicker: 'Full Stack Software Engineer · Fintech & Payments',
	first: 'Santhosh',
	last: 'Veerabathiran',
};

export interface MinatoPhase {
	title: string;
	period: string;
	text: string;
}

export const phases: MinatoPhase[] = [
	{ title: 'The Foundation', period: '2017 — 2023', text: 'B.Sc. Mathematics, then MCA — I learned to see the pattern before touching the keys.' },
	{
		title: 'The Beginning',
		period: 'February 2024',
		text: "I joined Surfboard Payments as an intern — and built the platform's global search service on my own.",
	},
	{ title: 'Going Full-Time', period: 'June 2024', text: 'Software Engineer across settlements, KYC/AML, credit data and production AI features.' },
	{ title: 'Shipping Fast', period: 'Today', text: '1,550+ commits across 80+ microservices and the Angular operations console — end to end.' },
];

export const dashCopy = {
	eyebrow: 'Velocity',
	title: 'Fast, End To End',
	text: 'From requirement to release — I design the data model, build the services, wire the UI and ship. The whole distance in one motion.',
};

export const rasCopy = {
	eyebrow: 'Skills',
	title: 'Held In The Hand',
	textHtml: 'A toolkit shaped over years of shipping — <b>sharpened every day</b>.',
};

export const rails = {
	left: 'Chengalpattu · Tamil Nadu · India — Payments · KYC/AML · Search · AI',
	right: 'Yellow Flash · Shipping Fast',
};

import type { Role, WorkCard } from './types';

export const job = {
	company: 'Surfboard Payments',
	location: 'Chennai, India',
	period: 'Feb 2024 – Present',
	contextHtml: `Payments &amp; acquiring platform — an Nx monorepo of NestJS/TypeScript microservices plus the Angular operations console. I joined as an <b>intern</b> building the Typesense global search service, then converted to a <b>full-time engineer</b> across the domains below.`,
};

export const roles: Role[] = [
	{ title: 'Software Engineer', period: 'Jun 2024 – Present', current: true },
	{ title: 'Software Engineer Intern', period: 'Feb 2024 – May 2024', current: false },
];

export const workCards: WorkCard[] = [
	{
		icon: 'ic-card',
		title: 'Payments, Settlements & Billing',
		bulletsHtml: [
			`Built an <b>event-driven settlement engine</b> computing merchant payouts from acquirer files — fees, commissions, VAT, adjustments and chargebacks — across four run cadences.`,
			`Generated <b>bank payout files</b>, incl. a DNB (NOK) ISO-20022-style XML with KID/OCR references and BBAN transfers, plus PDF/CSV reports.`,
			`Designed <b>billing-plan management</b> with currency-specific, per-payment-method fees wired into the payment-completion path.`,
			`Built an hourly <b>payment-integrity sweeper</b> — cross-checks over the payment estate with dry-run mode, typed error codes, re-checked resolution and mailed findings reports.`,
		],
	},
	{
		icon: 'ic-shield',
		title: 'KYC, Credit Data & AML',
		bulletsHtml: [
			`Designed and built a <b>from-scratch, typed Creditsafe SDK</b> — a fluent client over three transports (REST/JWT, OAuth2, SOAP) with auth, token store, XML→JSON parsing, typed errors and persistence — then <b>migrated every legacy consumer</b> and stored response onto it.`,
			`Implemented the <b>AML transaction-monitoring rule engine</b> — MCC/merchant overrides, currency-specific config and timezone-aware evaluation cadences with audit logging.`,
			`Extended <b>KYC/KYB onboarding</b> across Swedish and Finnish markets, with international corporate-id support.`,
		],
	},
	{
		icon: 'ic-search',
		title: 'Search, Data & Integrations',
		bulletsHtml: [
			`Sole builder and owner of the platform's <b>Typesense-backed global search service</b> (built during my internship) — faceted APIs, event-driven sync and maintenance crons.`,
			`Built an <b>AI-assisted AML alert-triage assistant</b> (Gemini) and an <b>autonomous merchant-onboarding browser agent</b> (Claude Sonnet + Stagehand).`,
			`Hardened the shared <b>AI toolkit</b> — automatic retries, a quota gate and centralized usage tracking behind every Gemini call across the platform.`,
			`Delivered integrations across <b>six payment providers</b> (Fiserv, BankAxept, AMEX, Klarna, Worldline, Northmill), <b>nShift logistics</b> — shipping and returns with cross-border routing — and analytics over ClickHouse.`,
		],
	},
	{
		icon: 'ic-layout',
		title: 'Frontend — Operations Console',
		bulletsHtml: [
			`Built a <b>support ticketing system</b> — shared inbox, assignee filters, group-by, @-mention picker and embedded ticket tabs.`,
			`<b>Rebuilt the console's list pages</b> with a new UI — filter panels, multi-sort and status cards on a reusable list-shell across 15 pages.`,
			`Built the <b>AI alert-review UI</b> and a human-readable rule-threshold editor, plus the activity feed, in Angular (Signals).`,
			`Extended the <b>partner portal</b> — server-side transaction filtering and shipment views with delivery details.`,
		],
	},
];

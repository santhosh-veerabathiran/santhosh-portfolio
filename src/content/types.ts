export interface IconRef {
	icon: string;
	color?: string;
	fill?: boolean;
}

export interface Chip extends IconRef {
	label: string;
}

export interface SocialLink extends IconRef {
	label: string;
	href: string;
}

export interface Stat {
	icon: string;
	count: number;
	prefix?: string;
	suffix?: string;
	label: string;
}

export interface Fact {
	icon: string;
	term: string;
	detailHtml: string;
	live?: boolean;
}

export interface WorkCard {
	icon: string;
	title: string;
	bulletsHtml: string[];
}

export interface Role {
	title: string;
	period: string;
	current: boolean;
}

export interface Project {
	icon: string;
	accentVar: string;
	title: string;
	tag: string;
	description: string;
	chips: string[];
	github?: string;
}

export interface SkillGroup {
	icon: string;
	title: string;
	chips: Chip[];
}

export enum HoverForce {
	Link = 'link',
	Repel = 'repel',
	Attract = 'attract',
	None = 'none',
}

export enum BackgroundAnimation {
	Network = 'network',
	Stars = 'stars',
	Embers = 'embers',
	Petals = 'petals',
	Waves = 'waves',
	None = 'none',
}

export interface SkinBackground {
	pattern: 'grid' | 'dots' | 'none';
	gridSize?: string;
	animation: BackgroundAnimation | `${BackgroundAnimation}`;
	orbs: boolean;
	aurora: boolean;
	image?: string;
}

export interface SkinMotion {
	speed: number;
	hover: HoverForce | `${HoverForce}`;
}

export interface SkinDefinition {
	name: string;
	colors: Record<string, string>;
	palette: Record<string, string>;
	fonts: Record<string, string>;
	fontImport?: string;
	background: SkinBackground;
	motion: SkinMotion;
}

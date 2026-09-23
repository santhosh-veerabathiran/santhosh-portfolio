import type { SkinDefinition } from '../../lib/skin.types';
import crimson from './skins/crimson.json';
import ember from './skins/ember.json';
import marine from './skins/marine.json';
import mono from './skins/mono.json';
import sunset from './skins/sunset.json';
import violet from './skins/violet.json';

export const skins: Record<string, SkinDefinition> = {
	marine: marine as SkinDefinition,
	sunset: sunset as SkinDefinition,
	violet: violet as SkinDefinition,
	mono: mono as SkinDefinition,
	crimson: crimson as SkinDefinition,
	ember: ember as SkinDefinition,
};

export const resolveSkin = () => {
	const requested = new URLSearchParams(location.search).get('theme');
	if (requested && skins[requested]) {
		return { id: requested, skin: skins[requested] };
	}

	const ids = Object.keys(skins);
	const id = ids[Math.floor(Math.random() * ids.length)];
	return { id, skin: skins[id] };
};

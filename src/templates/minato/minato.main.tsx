import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { applyHead } from '../../lib/head.runtime';
import { applySkin } from '../../lib/skin.runtime';
import type { SkinDefinition } from '../../lib/skin.types';
import '../classic/classic.css';
import MinatoLayout from './minato.layout';
import { minatoHead } from './minato.head';
import tokens from './minato.skin.json';

const skin = tokens as SkinDefinition;

applySkin('minato', skin);
applyHead(skin, minatoHead);

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<MinatoLayout />
	</StrictMode>,
);

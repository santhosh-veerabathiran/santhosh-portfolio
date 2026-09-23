import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { applyHead } from '../../lib/head.runtime';
import { applySkin } from '../../lib/skin.runtime';
import ClassicLayout from './classic.layout';
import { resolveSkin } from './skin.registry';
import './classic.css';

const { id, skin } = resolveSkin();

applySkin(id, skin);
applyHead(skin);

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<ClassicLayout skin={skin} />
	</StrictMode>,
);

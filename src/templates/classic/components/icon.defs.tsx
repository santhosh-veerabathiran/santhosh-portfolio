import symbols from '../icon.defs.svg?raw';

export const IconDefs = () => {
	return (
		<svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
			<defs dangerouslySetInnerHTML={{ __html: symbols }} />
		</svg>
	);
};

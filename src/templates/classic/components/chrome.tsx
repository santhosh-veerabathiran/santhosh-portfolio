import { useEffect, useRef, useState, type RefObject } from 'react';

import { useThemeBgParallax } from '../../../lib/pointer.hook';

export const ThemeBackground = () => {
	const layerRef = useRef<HTMLDivElement>(null);
	useThemeBgParallax(layerRef);
	return <div className="theme-bg" aria-hidden="true" ref={layerRef}></div>;
};

export const Spotlight = () => {
	return <div className="spotlight" id="spot"></div>;
};

export const ScrollProgress = ({ progressRef }: { progressRef: RefObject<HTMLDivElement | null> }) => {
	return <div className="progress" id="prog" ref={progressRef}></div>;
};

export const Preloader = ({ mark }: { mark: string }) => {
	const [done, setDone] = useState(false);

	useEffect(() => {
		let timer = 0;
		const finish = () => {
			timer = window.setTimeout(() => {
				setDone(true);
			}, 900);
		};
		if (document.readyState === 'complete') {
			finish();
		} else {
			addEventListener('load', finish, { once: true });
		}
		return () => {
			removeEventListener('load', finish);
			clearTimeout(timer);
		};
	}, []);

	return (
		<div className={done ? 'preloader done' : 'preloader'} id="pre">
			<div className="pre-mark">
				{mark}
				<span className="pre-bar"></span>
			</div>
		</div>
	);
};

import { useEffect, useRef, type RefObject } from 'react';

import { finePointer, reduceMotion } from '../../lib/media.hooks';
import { drawCoverFrame, fitCanvas, FrameSequence } from './frame.sequence';

interface ScrubOptions {
	basePath: string;
	count: number;
	onProgress?: (progress: number) => void;
}

export const useFrameScrub = (sectionRef: RefObject<HTMLElement | null>, canvasRef: RefObject<HTMLCanvasElement | null>, options: ScrubOptions) => {
	const onProgressRef = useRef(options.onProgress);
	onProgressRef.current = options.onProgress;

	useEffect(() => {
		const section = sectionRef.current;
		const canvas = canvasRef.current;
		if (!section || !canvas) {
			return;
		}

		const sequence = new FrameSequence(options.basePath, options.count);

		const render = () => {
			const rect = section.getBoundingClientRect();
			if (rect.bottom < 0 || rect.top > innerHeight) {
				return;
			}
			if (reduceMotion) {
				drawCoverFrame(canvas, sequence, 0.5);
				return;
			}
			const total = rect.height - innerHeight;
			const progress = Math.max(0, Math.min(total > 0 ? -rect.top / total : 0.5, 1));
			drawCoverFrame(canvas, sequence, progress);
			onProgressRef.current?.(progress);
		};

		sequence.load(render);

		const resize = () => {
			fitCanvas(canvas);
			render();
		};
		resize();

		let ticking = false;
		const onScroll = () => {
			if (ticking) {
				return;
			}
			ticking = true;
			requestAnimationFrame(() => {
				render();
				ticking = false;
			});
		};

		addEventListener('resize', resize, { passive: true });
		if (!reduceMotion) {
			addEventListener('scroll', onScroll, { passive: true });
		}
		return () => {
			removeEventListener('resize', resize);
			removeEventListener('scroll', onScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export const useRasSphere = (
	sectionRef: RefObject<HTMLElement | null>,
	canvasRef: RefObject<HTMLCanvasElement | null>,
	options: Omit<ScrubOptions, 'onProgress'>,
) => {
	useEffect(() => {
		const section = sectionRef.current;
		const canvas = canvasRef.current;
		if (!section || !canvas) {
			return;
		}

		const sequence = new FrameSequence(options.basePath, options.count);
		const manual = { progress: 0.5, until: 0 };

		const resize = () => {
			fitCanvas(canvas);
			drawCoverFrame(canvas, sequence, 0.5);
		};
		sequence.load(resize);
		resize();
		addEventListener('resize', resize, { passive: true });

		if (reduceMotion) {
			return () => {
				removeEventListener('resize', resize);
			};
		}

		const onPointerMove = (event: PointerEvent) => {
			manual.progress = event.clientX / innerWidth;
			manual.until = performance.now() + 2500;
		};
		if (finePointer) {
			section.addEventListener('pointermove', onPointerMove, { passive: true });
		}

		let frame = 0;
		const loop = (timestamp: number) => {
			const rect = section.getBoundingClientRect();
			if (rect.bottom > 0 && rect.top < innerHeight) {
				const auto = 0.5 + 0.45 * Math.sin(timestamp / 2400);
				const progress = timestamp < manual.until ? manual.progress : auto;
				drawCoverFrame(canvas, sequence, Math.max(0, Math.min(progress, 1)));
			}
			frame = requestAnimationFrame(loop);
		};
		frame = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(frame);
			removeEventListener('resize', resize);
			section.removeEventListener('pointermove', onPointerMove);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export const useLegacyReveal = (sectionId: string, revealRef: RefObject<HTMLDivElement | null>) => {
	useEffect(() => {
		const section = document.getElementById(sectionId);
		const reveal = revealRef.current;
		if (!section || !reveal || !finePointer || reduceMotion) {
			return;
		}

		const onPointerMove = (event: PointerEvent) => {
			const rect = section.getBoundingClientRect();
			reveal.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
			reveal.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
		};

		section.addEventListener('pointermove', onPointerMove, { passive: true });
		return () => {
			section.removeEventListener('pointermove', onPointerMove);
		};
	}, [sectionId, revealRef]);
};

export const useMinatoCursor = (cursorRef: RefObject<HTMLDivElement | null>) => {
	useEffect(() => {
		const cursor = cursorRef.current;
		if (!cursor || !finePointer || reduceMotion) {
			return;
		}

		const onPointerMove = (event: PointerEvent) => {
			cursor.style.opacity = '1';
			cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
		};
		const onPointerOver = (event: PointerEvent) => {
			if ((event.target as HTMLElement).closest('a, button')) {
				cursor.classList.add('hot');
			}
		};
		const onPointerOut = (event: PointerEvent) => {
			if ((event.target as HTMLElement).closest('a, button')) {
				cursor.classList.remove('hot');
			}
		};

		addEventListener('pointermove', onPointerMove, { passive: true });
		document.addEventListener('pointerover', onPointerOver, { passive: true });
		document.addEventListener('pointerout', onPointerOut, { passive: true });
		return () => {
			removeEventListener('pointermove', onPointerMove);
			document.removeEventListener('pointerover', onPointerOver);
			document.removeEventListener('pointerout', onPointerOut);
		};
	}, [cursorRef]);
};

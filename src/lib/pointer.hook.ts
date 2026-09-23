import { useEffect, type RefObject } from 'react';

import { finePointer, reduceMotion } from './media.hooks';

export const useScrollChrome = (navRef: RefObject<HTMLElement | null>, progressRef: RefObject<HTMLElement | null>) => {
	useEffect(() => {
		const onScroll = () => {
			navRef.current?.classList.toggle('scrolled', scrollY > 12);
			const root = document.documentElement;
			if (progressRef.current) {
				progressRef.current.style.width = `${(root.scrollTop / (root.scrollHeight - root.clientHeight)) * 100}%`;
			}
		};

		onScroll();
		addEventListener('scroll', onScroll, { passive: true });
		return () => {
			removeEventListener('scroll', onScroll);
		};
	}, [navRef, progressRef]);
};

export const usePointerEffects = (rootRef: RefObject<HTMLElement | null>) => {
	useEffect(() => {
		if (!finePointer || reduceMotion) {
			return;
		}

		const root = rootRef.current;
		if (!root) {
			return;
		}

		const spotlight = document.getElementById('spot');
		const onPointerMove = (event: PointerEvent) => {
			if (spotlight) {
				spotlight.style.opacity = '1';
				spotlight.style.left = `${event.clientX}px`;
				spotlight.style.top = `${event.clientY}px`;
			}
		};
		addEventListener('pointermove', onPointerMove);

		const cleanups: Array<() => void> = [
			() => {
				removeEventListener('pointermove', onPointerMove);
			},
		];

		root.querySelectorAll<HTMLElement>('.mag').forEach((button) => {
			const onMove = (event: PointerEvent) => {
				const rect = button.getBoundingClientRect();
				const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.18;
				const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.3;
				button.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
			};
			const onLeave = () => {
				button.style.transform = '';
			};
			button.addEventListener('pointermove', onMove);
			button.addEventListener('pointerleave', onLeave);
			cleanups.push(() => {
				button.removeEventListener('pointermove', onMove);
				button.removeEventListener('pointerleave', onLeave);
			});
		});

		root.querySelectorAll<HTMLElement>('.tilt').forEach((card) => {
			const beam = card.querySelector<HTMLElement>('.beam');
			const onMove = (event: PointerEvent) => {
				const rect = card.getBoundingClientRect();
				const x = event.clientX - rect.left;
				const y = event.clientY - rect.top;
				const rotateY = (x / rect.width - 0.5) * 6;
				const rotateX = (0.5 - y / rect.height) * 6;
				card.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-3px)`;
				if (beam) {
					beam.style.setProperty('--mx', `${x}px`);
					beam.style.setProperty('--my', `${y}px`);
				}
			};
			const onLeave = () => {
				card.style.transform = '';
			};
			card.addEventListener('pointermove', onMove);
			card.addEventListener('pointerleave', onLeave);
			cleanups.push(() => {
				card.removeEventListener('pointermove', onMove);
				card.removeEventListener('pointerleave', onLeave);
			});
		});

		return () => {
			cleanups.forEach((cleanup) => {
				cleanup();
			});
		};
	}, [rootRef]);
};

export const useThemeBgParallax = (layerRef: RefObject<HTMLElement | null>) => {
	useEffect(() => {
		const layer = layerRef.current;
		if (!layer || reduceMotion) {
			return;
		}

		let ticking = false;
		const update = () => {
			const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
			const progress = Math.min(scrollY / max, 1);
			layer.style.transform = `translate3d(0, ${progress * -110}px, 0) scale(1.08)`;
			ticking = false;
		};
		const onScroll = () => {
			if (ticking) {
				return;
			}
			ticking = true;
			requestAnimationFrame(update);
		};

		addEventListener('scroll', onScroll, { passive: true });
		update();
		return () => {
			removeEventListener('scroll', onScroll);
		};
	}, [layerRef]);
};

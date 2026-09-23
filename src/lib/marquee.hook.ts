import { useEffect, type RefObject } from 'react';

const BASE_DURATION = 32;

export const useSeamlessMarquees = (rootRef: RefObject<HTMLElement | null>) => {
	useEffect(() => {
		const root = rootRef.current;
		if (!root) {
			return;
		}

		const rows = Array.from(root.querySelectorAll<HTMLElement>('.marquee')).flatMap((marquee) => {
			const track = marquee.querySelector<HTMLElement>('.track');
			if (!track) {
				return [];
			}
			return [
				{
					marquee,
					track,
					unit: Array.from(track.children).map((node) => {
						return node.cloneNode(true);
					}),
				},
			];
		});

		const build = () => {
			rows.forEach(({ marquee, track, unit }) => {
				track.replaceChildren(
					...unit.map((node) => {
						return node.cloneNode(true);
					}),
				);
				const unitWidth = track.scrollWidth;
				while (track.scrollWidth < marquee.clientWidth && track.children.length < 400) {
					unit.forEach((node) => {
						track.appendChild(node.cloneNode(true));
					});
				}
				const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
				const runWidth = track.scrollWidth;
				Array.from(track.children).forEach((node) => {
					track.appendChild(node.cloneNode(true));
				});
				track.style.setProperty('--mq-end', `-${runWidth + gap}px`);
				track.style.animationDuration = `${(BASE_DURATION * (runWidth + gap)) / (unitWidth / 2)}s`;
			});
		};

		let frame = 0;
		const rebuild = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(build);
		};

		build();
		addEventListener('load', build);
		addEventListener('resize', rebuild, { passive: true });
		return () => {
			removeEventListener('load', build);
			removeEventListener('resize', rebuild);
			cancelAnimationFrame(frame);
		};
	}, [rootRef]);
};

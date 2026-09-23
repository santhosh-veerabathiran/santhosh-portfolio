import { useEffect, type RefObject } from 'react';

import { reduceMotion } from '../../../lib/media.hooks';
import type { SkinDefinition } from '../../../lib/skin.types';
import { renderers, type CanvasScene } from './canvas.renderers';

export const useHeroCanvas = (canvasRef: RefObject<HTMLCanvasElement | null>, heroRef: RefObject<HTMLElement | null>, skin: SkinDefinition) => {
	useEffect(() => {
		const canvas = canvasRef.current;
		const hero = heroRef.current;
		if (!canvas || !hero || reduceMotion) {
			return;
		}

		const render = renderers[skin.background.animation];
		if (!render) {
			return;
		}

		const styles = getComputedStyle(document.documentElement);
		const scene: CanvasScene = {
			context: canvas.getContext('2d') as CanvasRenderingContext2D,
			width: 0,
			height: 0,
			points: [],
			pointer: { x: -999, y: -999 },
			dotColor: styles.getPropertyValue('--accent').trim() || '#2dd4bf',
			linkColor: styles.getPropertyValue('--accent-2').trim() || '#5eead4',
			speed: skin.motion.speed ?? 1,
			hover: skin.motion.hover ?? 'link',
		};

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			const pixelRatio = Math.min(devicePixelRatio || 1, 2);
			scene.width = rect.width;
			scene.height = rect.height;
			canvas.width = scene.width * pixelRatio;
			canvas.height = scene.height * pixelRatio;
			scene.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

			const count = Math.min(64, Math.floor((scene.width * scene.height) / 20000));
			scene.points = Array.from({ length: count }, () => {
				return {
					x: Math.random() * scene.width,
					y: Math.random() * scene.height,
					vx: (Math.random() - 0.5) * 0.35,
					vy: (Math.random() - 0.5) * 0.35,
					radius: 0.6 + Math.random() * 1.6,
					phase: Math.random() * 6.283,
				};
			});
		};

		let frame = 0;
		const draw = (timestamp: number) => {
			render(scene, timestamp);
			frame = requestAnimationFrame(draw);
		};

		const onPointerMove = (event: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			scene.pointer.x = event.clientX - rect.left;
			scene.pointer.y = event.clientY - rect.top;
		};
		const onPointerLeave = () => {
			scene.pointer.x = -999;
			scene.pointer.y = -999;
		};
		const onVisibility = () => {
			cancelAnimationFrame(frame);
			if (!document.hidden) {
				frame = requestAnimationFrame(draw);
			}
		};

		hero.addEventListener('pointermove', onPointerMove);
		hero.addEventListener('pointerleave', onPointerLeave);
		addEventListener('resize', resize);
		document.addEventListener('visibilitychange', onVisibility);

		resize();
		frame = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(frame);
			hero.removeEventListener('pointermove', onPointerMove);
			hero.removeEventListener('pointerleave', onPointerLeave);
			removeEventListener('resize', resize);
			document.removeEventListener('visibilitychange', onVisibility);
		};
	}, [canvasRef, heroRef, skin]);
};

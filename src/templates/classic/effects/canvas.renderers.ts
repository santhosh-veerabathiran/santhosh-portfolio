import { BackgroundAnimation, HoverForce } from '../../../lib/skin.types';

export interface CanvasPoint {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
	phase: number;
}

export interface CanvasScene {
	context: CanvasRenderingContext2D;
	width: number;
	height: number;
	points: CanvasPoint[];
	pointer: { x: number; y: number };
	dotColor: string;
	linkColor: string;
	speed: number;
	hover: `${HoverForce}`;
}

const HOVER_RADIUS = 140;

const hoverForces: Partial<Record<`${HoverForce}`, (point: CanvasPoint, unitX: number, unitY: number, force: number) => void>> = {
	[HoverForce.Repel]: (point, unitX, unitY, force) => {
		point.x += unitX * force * 2.4;
		point.y += unitY * force * 2.4;
	},
	[HoverForce.Attract]: (point, unitX, unitY, force) => {
		point.x -= unitX * force * 1.8;
		point.y -= unitY * force * 1.8;
	},
};

const applyHover = (scene: CanvasScene, point: CanvasPoint, distance: number) => {
	const force = hoverForces[scene.hover];
	if (!force || distance === 0 || distance > HOVER_RADIUS) {
		return;
	}
	const strength = 1 - distance / HOVER_RADIUS;
	force(point, (point.x - scene.pointer.x) / distance, (point.y - scene.pointer.y) / distance, strength);
};

const drawNetwork = (scene: CanvasScene) => {
	const { context, points, pointer } = scene;
	context.clearRect(0, 0, scene.width, scene.height);

	for (let index = 0; index < points.length; index++) {
		const point = points[index];
		point.x += point.vx * scene.speed;
		point.y += point.vy * scene.speed;

		if (point.x < 0 || point.x > scene.width) {
			point.vx *= -1;
		}
		if (point.y < 0 || point.y > scene.height) {
			point.vy *= -1;
		}

		const distanceToPointer = Math.hypot(point.x - pointer.x, point.y - pointer.y);
		const near = distanceToPointer < HOVER_RADIUS;
		applyHover(scene, point, distanceToPointer);

		context.beginPath();
		context.arc(point.x, point.y, near ? 2.4 : 1.6, 0, 6.283);
		context.globalAlpha = near ? 0.9 : 0.45;
		context.fillStyle = near ? scene.linkColor : scene.dotColor;
		context.fill();

		for (let otherIndex = index + 1; otherIndex < points.length; otherIndex++) {
			const other = points[otherIndex];
			const distance = Math.hypot(point.x - other.x, point.y - other.y);
			if (distance < 128) {
				context.beginPath();
				context.moveTo(point.x, point.y);
				context.lineTo(other.x, other.y);
				context.globalAlpha = 0.16 * (1 - distance / 128);
				context.strokeStyle = scene.dotColor;
				context.lineWidth = 1;
				context.stroke();
			}
		}

		if (near && scene.hover === HoverForce.Link) {
			context.beginPath();
			context.moveTo(point.x, point.y);
			context.lineTo(pointer.x, pointer.y);
			context.globalAlpha = 0.4 * (1 - distanceToPointer / HOVER_RADIUS);
			context.strokeStyle = scene.linkColor;
			context.stroke();
		}
	}

	context.globalAlpha = 1;
};

const drawStars = (scene: CanvasScene, timestamp: number) => {
	const { context } = scene;
	context.clearRect(0, 0, scene.width, scene.height);

	for (const point of scene.points) {
		const distanceToPointer = Math.hypot(point.x - scene.pointer.x, point.y - scene.pointer.y);
		applyHover(scene, point, distanceToPointer);

		point.x = (point.x + point.vx * 0.4 * scene.speed + scene.width) % scene.width;
		point.y = (point.y + point.vy * 0.4 * scene.speed + scene.height) % scene.height;

		const near = distanceToPointer < 120;
		const twinkle = 0.5 + 0.5 * Math.sin(timestamp / 900 + point.phase);

		context.beginPath();
		context.arc(point.x, point.y, point.radius * (near ? 1.9 : 1), 0, 6.283);
		context.globalAlpha = 0.25 + 0.6 * twinkle;
		context.fillStyle = near ? scene.linkColor : scene.dotColor;
		context.fill();
	}

	context.globalAlpha = 1;
};

const drawEmbers = (scene: CanvasScene, timestamp: number) => {
	const { context } = scene;
	context.clearRect(0, 0, scene.width, scene.height);
	context.shadowColor = scene.dotColor;

	for (const point of scene.points) {
		const distanceToPointer = Math.hypot(point.x - scene.pointer.x, point.y - scene.pointer.y);
		applyHover(scene, point, distanceToPointer);

		point.y -= (0.3 + point.radius * 0.4) * scene.speed;
		point.x += Math.sin(timestamp / 600 + point.phase) * 0.3;
		if (point.y < -6) {
			point.y = scene.height + 6;
			point.x = Math.random() * scene.width;
		}

		const flicker = 0.35 + 0.65 * Math.abs(Math.sin(timestamp / 300 + point.phase));
		context.globalAlpha = flicker;
		context.shadowBlur = 8;
		context.fillStyle = point.phase > 3.14 ? scene.linkColor : scene.dotColor;
		context.beginPath();
		context.arc(point.x, point.y, point.radius * 1.25, 0, 6.283);
		context.fill();
	}

	context.shadowBlur = 0;
	context.globalAlpha = 1;
};

const drawPetals = (scene: CanvasScene, timestamp: number) => {
	const { context } = scene;
	context.clearRect(0, 0, scene.width, scene.height);

	for (const point of scene.points) {
		const distanceToPointer = Math.hypot(point.x - scene.pointer.x, point.y - scene.pointer.y);
		applyHover(scene, point, distanceToPointer);

		const sway = Math.sin(timestamp / 700 + point.phase) * 0.6;
		point.x += (sway + point.vx) * scene.speed;
		point.y += (0.4 + point.radius * 0.32) * scene.speed;
		if (point.y > scene.height + 10) {
			point.y = -10;
			point.x = Math.random() * scene.width;
		}

		context.save();
		context.translate(point.x, point.y);
		context.rotate(timestamp / 900 + point.phase);
		context.globalAlpha = 0.4 + 0.3 * (0.5 + 0.5 * Math.sin(timestamp / 800 + point.phase));
		context.fillStyle = point.phase > 3.14 ? scene.linkColor : scene.dotColor;
		context.beginPath();
		context.ellipse(0, 0, point.radius * 1.1, point.radius * 2.4, 0, 0, 6.283);
		context.fill();
		context.restore();
	}

	context.globalAlpha = 1;
};

const wavePointerLift = (scene: CanvasScene, x: number, baseY: number) => {
	const radius = 170;
	const distance = Math.hypot(x - scene.pointer.x, baseY - scene.pointer.y);
	if (distance > radius) {
		return 0;
	}
	return (1 - distance / radius) * 28;
};

const drawWaves = (scene: CanvasScene, timestamp: number) => {
	const { context, width, height } = scene;
	context.clearRect(0, 0, width, height);

	const spacing = 46;
	const lineCount = Math.ceil(height / spacing) + 1;
	const time = timestamp / 1000;

	for (let index = 0; index < lineCount; index++) {
		const baseY = index * spacing;
		const phase = index * 0.55;

		context.beginPath();
		for (let x = 0; x <= width; x += 12) {
			const primary = Math.sin(x / 220 + phase + time * scene.speed) * 10;
			const secondary = Math.sin(x / 90 - time * scene.speed * 0.6 + phase) * 4;
			const y = baseY + primary + secondary - wavePointerLift(scene, x, baseY);
			if (x === 0) {
				context.moveTo(x, y);
			} else {
				context.lineTo(x, y);
			}
		}

		context.globalAlpha = 0.16 + 0.08 * Math.sin(time * 0.5 + phase);
		context.strokeStyle = scene.dotColor;
		context.lineWidth = 1;
		context.stroke();
	}

	context.globalAlpha = 1;
};

export const renderers: Partial<Record<`${BackgroundAnimation}`, (scene: CanvasScene, timestamp: number) => void>> = {
	[BackgroundAnimation.Network]: (scene) => {
		drawNetwork(scene);
	},
	[BackgroundAnimation.Stars]: drawStars,
	[BackgroundAnimation.Embers]: drawEmbers,
	[BackgroundAnimation.Petals]: drawPetals,
	[BackgroundAnimation.Waves]: drawWaves,
};

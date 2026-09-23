import { useRef } from 'react';

import { Ic } from '../../classic/components/icon';
import { dashCopy, minatoAssets, phases, rasCopy, titleblock } from '../minato.content';
import { useFrameScrub, useRasSphere } from '../minato.hooks';

const PHASE_BANDS: Array<[number, number]> = [
	[0.16, 0.36],
	[0.36, 0.58],
	[0.58, 0.8],
	[0.8, 1.01],
];

export const MtOpen = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const titleblockRef = useRef<HTMLDivElement>(null);
	const phaseRefs = useRef<Array<HTMLDivElement | null>>([]);

	useFrameScrub(sectionRef, canvasRef, {
		...minatoAssets.gaze,
		onProgress: (progress) => {
			if (titleblockRef.current) {
				titleblockRef.current.style.opacity = `${Math.max(0, 1 - progress / 0.14)}`;
			}
			phaseRefs.current.forEach((phase, index) => {
				if (!phase) {
					return;
				}
				const [bandStart, bandEnd] = PHASE_BANDS[index];
				const inside = progress >= bandStart && progress < bandEnd;
				const edge = Math.min(Math.abs(progress - bandStart), Math.abs(progress - bandEnd));
				const strength = inside ? Math.min(edge / 0.05, 1) : 0;
				phase.style.opacity = `${strength}`;
				phase.style.transform = `translateY(${(1 - strength) * 24}px)`;
			});
		},
	});

	return (
		<section className="mt-act mt-open" ref={sectionRef}>
			<div className="mt-sticky">
				<canvas className="mt-canvas" ref={canvasRef}></canvas>
				<div className="mt-wash"></div>
				<div className="mt-titleblock" ref={titleblockRef}>
					<p className="mt-kicker">{titleblock.kicker}</p>
					<div className="mt-name">
						{titleblock.first} <span>{titleblock.last}</span>
					</div>
				</div>
				{phases.map((phase, index) => {
					return (
						<div
							key={phase.title}
							className="mt-phase"
							ref={(element) => {
								phaseRefs.current[index] = element;
							}}
						>
							<h2>{phase.title}</h2>
							<p className="mt-phase-en">{phase.period}</p>
							<p className="mt-phase-sub">{phase.text}</p>
						</div>
					);
				})}
				<div className="mt-hint">
					<span>Scroll</span>
				</div>
			</div>
		</section>
	);
};

export const MtDash = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useFrameScrub(sectionRef, canvasRef, minatoAssets.flash);

	return (
		<section className="mt-act mt-dash" ref={sectionRef}>
			<div className="mt-sticky">
				<canvas className="mt-canvas" ref={canvasRef}></canvas>
				<div className="mt-copy">
					<span className="mt-eyebrow">
						<Ic icon="ic-bolt" /> {dashCopy.eyebrow}
					</span>
					<h2>{dashCopy.title}</h2>
					<p>{dashCopy.text}</p>
				</div>
			</div>
		</section>
	);
};

export const MtRas = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useRasSphere(sectionRef, canvasRef, minatoAssets.rasengan);

	return (
		<section className="mt-act mt-ras" ref={sectionRef}>
			<div className="mt-sticky">
				<canvas className="mt-canvas" ref={canvasRef}></canvas>
				<div className="mt-copy">
					<span className="mt-eyebrow">
						<Ic icon="ic-cpu" /> {rasCopy.eyebrow}
					</span>
					<h2>{rasCopy.title}</h2>
					<p dangerouslySetInnerHTML={{ __html: rasCopy.textHtml }} />
				</div>
			</div>
		</section>
	);
};

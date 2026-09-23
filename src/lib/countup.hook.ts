import { useEffect, useRef, useState } from 'react';

import { reduceMotion } from './media.hooks';

export const useCountUp = (target: number) => {
	const ref = useRef<HTMLDivElement>(null);
	const [value, setValue] = useState(reduceMotion ? target : 0);
	const [done, setDone] = useState(reduceMotion);

	useEffect(() => {
		if (reduceMotion || !ref.current) {
			return;
		}

		let frame = 0;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}
					observer.unobserve(entry.target);

					const duration = 1400;
					let started: number | undefined;
					const step = (timestamp: number) => {
						started ??= timestamp;
						const progress = Math.max(0, Math.min((timestamp - started) / duration, 1));
						const eased = 1 - Math.pow(1 - progress, 3);
						setValue(Math.round(target * eased));
						if (progress < 1) {
							frame = requestAnimationFrame(step);
						} else {
							setDone(true);
						}
					};
					frame = requestAnimationFrame(step);
				});
			},
			{ threshold: 0.6 },
		);

		observer.observe(ref.current);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	}, [target]);

	return { ref, value, done };
};

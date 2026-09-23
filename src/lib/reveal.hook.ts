import { useEffect, type RefObject } from 'react';

export const useRevealObserver = (rootRef: RefObject<HTMLElement | null>) => {
	useEffect(() => {
		const root = rootRef.current;
		if (!root) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('in');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
		);

		root.querySelectorAll('.reveal').forEach((element) => {
			observer.observe(element);
		});
		return () => {
			observer.disconnect();
		};
	}, [rootRef]);
};

export const useActiveSection = (ids: string[], onChange: (id: string) => void) => {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						onChange(entry.target.id);
					}
				});
			},
			{ threshold: 0.55 },
		);

		ids.forEach((id) => {
			const section = document.getElementById(id);
			if (section) {
				observer.observe(section);
			}
		});
		return () => {
			observer.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

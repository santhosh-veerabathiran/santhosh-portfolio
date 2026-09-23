import { useEffect, useState } from 'react';

import { reduceMotion } from './media.hooks';

export const useTypewriter = (words: string[]) => {
	const [text, setText] = useState(reduceMotion ? words[0] : '');

	useEffect(() => {
		if (reduceMotion) {
			return;
		}

		let wordIndex = 0;
		let charIndex = 0;
		let deleting = false;
		let timer = 0;

		const type = () => {
			const word = words[wordIndex];
			charIndex += deleting ? -1 : 1;
			setText(word.slice(0, charIndex));

			let delay = deleting ? 40 : 75;
			if (!deleting && charIndex === word.length) {
				delay = 1500;
				deleting = true;
			} else if (deleting && charIndex === 0) {
				deleting = false;
				wordIndex = (wordIndex + 1) % words.length;
				delay = 300;
			}

			timer = window.setTimeout(type, delay);
		};

		timer = window.setTimeout(type, 1600);
		return () => {
			clearTimeout(timer);
		};
	}, [words]);

	return text;
};

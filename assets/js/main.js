class FrameSequence {
	images = [];
	loaded = 0;

	constructor(basePath, count) {
		this.basePath = basePath;
		this.count = count;
	}

	load() {
		for (let index = 1; index <= this.count; index++) {
			const image = new Image();
			image.src = `${this.basePath}/${String(index).padStart(3, '0')}.jpg`;
			this.images.push(image);
		}
	}

	frameAt(progress) {
		const index = Math.round(progress * (this.count - 1));
		return this.images[Math.max(0, Math.min(index, this.count - 1))];
	}
}

class Portfolio {
	reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

	words = ['payment engines.', 'settlement systems.', 'KYC & AML tooling.', 'search infrastructure.', 'production AI features.'];
	typedElement;
	wordIndex = 0;
	charIndex = 0;
	deleting = false;

	canvas;
	context;
	points = [];
	pointer = { x: -999, y: -999 };
	width = 0;
	height = 0;
	frameId = 0;
	mode = 'network';
	dotColor = '#2dd4bf';
	linkColor = '#5eead4';
	speed = 1;
	hover = 'link';
	hoverRadius = 140;
	hoverForces = {
		repel: (point, unitX, unitY, force) => {
			point.x += unitX * force * 2.4;
			point.y += unitY * force * 2.4;
		},
		attract: (point, unitX, unitY, force) => {
			point.x -= unitX * force * 1.8;
			point.y -= unitY * force * 1.8;
		},
	};
	renderers = {
		network: () => {
			this.drawNetwork();
		},
		stars: (timestamp) => {
			this.drawStars(timestamp);
		},
		embers: (timestamp) => {
			this.drawEmbers(timestamp);
		},
		petals: (timestamp) => {
			this.drawPetals(timestamp);
		},
		waves: (timestamp) => {
			this.drawWaves(timestamp);
		},
	};
	parallaxTicking = false;
	marqueeFrame = 0;
	mtStarted = false;
	mtScrubs = [];
	mtTicking = false;

	employmentStart = new Date(2024, 1, 1);
	employmentQuit = null;

	constructor() {
		this.setupPreloader();
		this.setupNameReveal();
		this.setupTypewriter();
		this.setupNav();
		this.setupReveal();
		this.setupActiveNav();
		this.setupStats();
		this.setupTenure();
		this.setupParallax();
		this.setupMarquee();
		this.setupMinato();

		if (this.finePointer && !this.reduceMotion) {
			this.setupPointerEffects();
		}

		if (!this.reduceMotion) {
			this.setupCanvas();
		}
	}

	setupTenure() {
		const element = document.getElementById('tenure');
		if (!element) {
			return;
		}

		const end = this.employmentQuit ?? new Date();
		let months = (end.getFullYear() - this.employmentStart.getFullYear()) * 12 + (end.getMonth() - this.employmentStart.getMonth());
		if (end.getDate() < this.employmentStart.getDate()) {
			months -= 1;
		}
		months = Math.max(months, 0);

		const years = Math.floor(months / 12);
		const remainingMonths = months % 12;
		const parts = [];
		if (years > 0) {
			parts.push(`${years} yr${years === 1 ? '' : 's'}`);
		}
		if (remainingMonths > 0) {
			parts.push(`${remainingMonths} mo${remainingMonths === 1 ? '' : 's'}`);
		}
		element.textContent = parts.length ? parts.join(' ') : '0 mos';
	}

	setupPreloader() {
		window.addEventListener('load', () => {
			setTimeout(() => {
				document.getElementById('pre').classList.add('done');
			}, 900);
		});
	}

	setupNameReveal() {
		document.querySelectorAll('#name .ln').forEach((line, lineIndex) => {
			const text = line.getAttribute('data-t');
			line.textContent = '';

			text.split('').forEach((character, index) => {
				const span = document.createElement('span');
				span.className = 'ch';
				span.textContent = character;
				span.style.animationDelay = `${0.35 + lineIndex * 0.28 + index * 0.035}s`;
				line.appendChild(span);

				if (!this.reduceMotion) {
					requestAnimationFrame(() => {
						span.classList.add('up');
					});
				}
			});
		});
	}

	setupTypewriter() {
		this.typedElement = document.getElementById('tw');

		if (this.reduceMotion) {
			this.typedElement.textContent = this.words[0];
			return;
		}

		setTimeout(() => {
			this.type();
		}, 1600);
	}

	type() {
		const word = this.words[this.wordIndex];
		this.charIndex += this.deleting ? -1 : 1;
		this.typedElement.textContent = word.slice(0, this.charIndex);

		let delay = this.deleting ? 40 : 75;

		if (!this.deleting && this.charIndex === word.length) {
			delay = 1500;
			this.deleting = true;
		} else if (this.deleting && this.charIndex === 0) {
			this.deleting = false;
			this.wordIndex = (this.wordIndex + 1) % this.words.length;
			delay = 300;
		}

		setTimeout(() => {
			this.type();
		}, delay);
	}

	setupNav() {
		const navElement = document.getElementById('nav');
		const progressBar = document.getElementById('prog');

		const onScroll = () => {
			navElement.classList.toggle('scrolled', scrollY > 12);
			const root = document.documentElement;
			progressBar.style.width = `${(root.scrollTop / (root.scrollHeight - root.clientHeight)) * 100}%`;
		};

		onScroll();
		addEventListener('scroll', onScroll, { passive: true });

		const menuToggle = document.getElementById('navToggle');
		const navLinks = document.getElementById('navLinks');

		menuToggle.addEventListener('click', () => {
			navLinks.classList.toggle('open');
		});

		navLinks.addEventListener('click', (event) => {
			if (event.target.tagName === 'A') {
				navLinks.classList.remove('open');
			}
		});

		document.getElementById('totop').addEventListener('click', () => {
			scrollTo({ top: 0, behavior: this.reduceMotion ? 'auto' : 'smooth' });
		});
	}

	setupReveal() {
		const revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('in');
						revealObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
		);

		document.querySelectorAll('.reveal').forEach((element) => {
			revealObserver.observe(element);
		});
	}

	setupActiveNav() {
		const navLinksById = {};
		document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
			navLinksById[link.getAttribute('href').slice(1)] = link;
		});

		const sectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}

					Object.values(navLinksById).forEach((link) => {
						link.classList.remove('active');
					});

					if (navLinksById[entry.target.id]) {
						navLinksById[entry.target.id].classList.add('active');
					}
				});
			},
			{ threshold: 0.55 },
		);

		['about', 'work', 'projects', 'skills', 'contact'].forEach((id) => {
			const section = document.getElementById(id);
			if (section) {
				sectionObserver.observe(section);
			}
		});
	}

	setupStats() {
		const countObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}

					this.animateCount(entry.target);
					countObserver.unobserve(entry.target);
				});
			},
			{ threshold: 0.6 },
		);

		document.querySelectorAll('.num[data-count]').forEach((element) => {
			countObserver.observe(element);
		});
	}

	animateCount(element) {
		const target = Number(element.getAttribute('data-count'));
		const prefix = element.getAttribute('data-prefix') ?? '';
		const suffix = element.getAttribute('data-suffix') ?? '';

		if (this.reduceMotion) {
			element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
			return;
		}

		const duration = 1400;
		let start;

		const step = (timestamp) => {
			if (start === undefined) {
				start = timestamp;
			}

			const progress = Math.min((timestamp - start) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			const value = Math.round(target * eased).toLocaleString();
			const tail = progress === 1 ? `<span>${suffix}</span>` : suffix;
			element.innerHTML = `${prefix}${value}${tail}`;

			if (progress < 1) {
				requestAnimationFrame(step);
			}
		};

		requestAnimationFrame(step);
	}

	setupPointerEffects() {
		const spotlight = document.getElementById('spot');
		addEventListener('pointermove', (event) => {
			spotlight.style.opacity = '1';
			spotlight.style.left = `${event.clientX}px`;
			spotlight.style.top = `${event.clientY}px`;
		});

		document.querySelectorAll('.mag').forEach((button) => {
			button.addEventListener('pointermove', (event) => {
				const rect = button.getBoundingClientRect();
				const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.18;
				const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.3;
				button.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
			});

			button.addEventListener('pointerleave', () => {
				button.style.transform = '';
			});
		});

		document.querySelectorAll('.tilt').forEach((card) => {
			const beam = card.querySelector('.beam');

			card.addEventListener('pointermove', (event) => {
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
			});

			card.addEventListener('pointerleave', () => {
				card.style.transform = '';
			});
		});
	}

	setupCanvas() {
		this.canvas = document.getElementById('net');
		this.context = this.canvas.getContext('2d');

		this.readMode();
		this.readColors();
		this.readMotion();

		const heroElement = document.getElementById('home');

		heroElement.addEventListener('pointermove', (event) => {
			const rect = this.canvas.getBoundingClientRect();
			this.pointer.x = event.clientX - rect.left;
			this.pointer.y = event.clientY - rect.top;
		});

		heroElement.addEventListener('pointerleave', () => {
			this.pointer.x = -999;
			this.pointer.y = -999;
		});

		addEventListener('resize', () => {
			this.resizeCanvas();
		});

		document.addEventListener('visibilitychange', () => {
			if (document.hidden) {
				cancelAnimationFrame(this.frameId);
			} else if (this.mode !== 'none') {
				this.frameId = requestAnimationFrame((timestamp) => {
					this.drawFrame(timestamp);
				});
			}
		});

		this.observeTheme();
		this.resizeCanvas();
		this.drawFrame();
	}

	readMode() {
		this.mode = document.documentElement.getAttribute('data-animation') ?? 'network';
	}

	readColors() {
		const styles = getComputedStyle(document.documentElement);
		this.dotColor = styles.getPropertyValue('--accent').trim() || '#2dd4bf';
		this.linkColor = styles.getPropertyValue('--accent-2').trim() || '#5eead4';
	}

	readMotion() {
		this.speed = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--net-speed')) || 1;
		this.hover = document.documentElement.getAttribute('data-hover') ?? 'link';
	}

	applyHover(point, distance) {
		const force = this.hoverForces[this.hover];
		if (!force || distance === 0 || distance > this.hoverRadius) {
			return;
		}

		const strength = 1 - distance / this.hoverRadius;
		force(point, (point.x - this.pointer.x) / distance, (point.y - this.pointer.y) / distance, strength);
	}

	observeTheme() {
		const observer = new MutationObserver(() => {
			const wasStopped = this.mode === 'none';
			this.readMode();
			this.readColors();
			this.readMotion();
			this.resizeCanvas();

			if (wasStopped && this.mode !== 'none') {
				this.drawFrame();
			}
		});

		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-animation', 'data-active-theme'] });
	}

	resizeCanvas() {
		const rect = this.canvas.getBoundingClientRect();
		const pixelRatio = Math.min(devicePixelRatio || 1, 2);

		this.width = rect.width;
		this.height = rect.height;
		this.canvas.width = this.width * pixelRatio;
		this.canvas.height = this.height * pixelRatio;
		this.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

		const count = Math.min(64, Math.floor((this.width * this.height) / 20000));
		this.points = Array.from({ length: count }, () => {
			return {
				x: Math.random() * this.width,
				y: Math.random() * this.height,
				vx: (Math.random() - 0.5) * 0.35,
				vy: (Math.random() - 0.5) * 0.35,
				radius: 0.6 + Math.random() * 1.6,
				phase: Math.random() * 6.283,
			};
		});
	}

	drawFrame(timestamp = 0) {
		if (this.mode === 'none') {
			this.context.clearRect(0, 0, this.width, this.height);
			return;
		}

		const render = this.renderers[this.mode] ?? this.renderers.network;
		render(timestamp);

		this.frameId = requestAnimationFrame((next) => {
			this.drawFrame(next);
		});
	}

	drawNetwork() {
		const context = this.context;
		context.clearRect(0, 0, this.width, this.height);

		for (let index = 0; index < this.points.length; index++) {
			const point = this.points[index];
			point.x += point.vx * this.speed;
			point.y += point.vy * this.speed;

			if (point.x < 0 || point.x > this.width) {
				point.vx *= -1;
			}
			if (point.y < 0 || point.y > this.height) {
				point.vy *= -1;
			}

			const distanceToPointer = Math.hypot(point.x - this.pointer.x, point.y - this.pointer.y);
			const near = distanceToPointer < this.hoverRadius;
			this.applyHover(point, distanceToPointer);

			context.beginPath();
			context.arc(point.x, point.y, near ? 2.4 : 1.6, 0, 6.283);
			context.globalAlpha = near ? 0.9 : 0.45;
			context.fillStyle = near ? this.linkColor : this.dotColor;
			context.fill();

			for (let otherIndex = index + 1; otherIndex < this.points.length; otherIndex++) {
				const other = this.points[otherIndex];
				const distance = Math.hypot(point.x - other.x, point.y - other.y);

				if (distance < 128) {
					context.beginPath();
					context.moveTo(point.x, point.y);
					context.lineTo(other.x, other.y);
					context.globalAlpha = 0.16 * (1 - distance / 128);
					context.strokeStyle = this.dotColor;
					context.lineWidth = 1;
					context.stroke();
				}
			}

			if (near && this.hover === 'link') {
				context.beginPath();
				context.moveTo(point.x, point.y);
				context.lineTo(this.pointer.x, this.pointer.y);
				context.globalAlpha = 0.4 * (1 - distanceToPointer / this.hoverRadius);
				context.strokeStyle = this.linkColor;
				context.stroke();
			}
		}

		context.globalAlpha = 1;
	}

	drawStars(timestamp) {
		const context = this.context;
		context.clearRect(0, 0, this.width, this.height);

		for (const point of this.points) {
			const distanceToPointer = Math.hypot(point.x - this.pointer.x, point.y - this.pointer.y);
			this.applyHover(point, distanceToPointer);

			point.x = (point.x + point.vx * 0.4 * this.speed + this.width) % this.width;
			point.y = (point.y + point.vy * 0.4 * this.speed + this.height) % this.height;

			const near = distanceToPointer < 120;
			const twinkle = 0.5 + 0.5 * Math.sin(timestamp / 900 + point.phase);

			context.beginPath();
			context.arc(point.x, point.y, point.radius * (near ? 1.9 : 1), 0, 6.283);
			context.globalAlpha = 0.25 + 0.6 * twinkle;
			context.fillStyle = near ? this.linkColor : this.dotColor;
			context.fill();
		}

		context.globalAlpha = 1;
	}

	drawEmbers(timestamp) {
		const context = this.context;
		context.clearRect(0, 0, this.width, this.height);
		context.shadowColor = this.dotColor;

		for (const point of this.points) {
			const distanceToPointer = Math.hypot(point.x - this.pointer.x, point.y - this.pointer.y);
			this.applyHover(point, distanceToPointer);

			point.y -= (0.3 + point.radius * 0.4) * this.speed;
			point.x += Math.sin(timestamp / 600 + point.phase) * 0.3;
			if (point.y < -6) {
				point.y = this.height + 6;
				point.x = Math.random() * this.width;
			}

			const flicker = 0.35 + 0.65 * Math.abs(Math.sin(timestamp / 300 + point.phase));
			context.globalAlpha = flicker;
			context.shadowBlur = 8;
			context.fillStyle = point.phase > 3.14 ? this.linkColor : this.dotColor;
			context.beginPath();
			context.arc(point.x, point.y, point.radius * 1.25, 0, 6.283);
			context.fill();
		}

		context.shadowBlur = 0;
		context.globalAlpha = 1;
	}

	drawPetals(timestamp) {
		const context = this.context;
		context.clearRect(0, 0, this.width, this.height);

		for (const point of this.points) {
			const distanceToPointer = Math.hypot(point.x - this.pointer.x, point.y - this.pointer.y);
			this.applyHover(point, distanceToPointer);

			const sway = Math.sin(timestamp / 700 + point.phase) * 0.6;
			point.x += (sway + point.vx) * this.speed;
			point.y += (0.4 + point.radius * 0.32) * this.speed;
			if (point.y > this.height + 10) {
				point.y = -10;
				point.x = Math.random() * this.width;
			}

			context.save();
			context.translate(point.x, point.y);
			context.rotate(timestamp / 900 + point.phase);
			context.globalAlpha = 0.4 + 0.3 * (0.5 + 0.5 * Math.sin(timestamp / 800 + point.phase));
			context.fillStyle = point.phase > 3.14 ? this.linkColor : this.dotColor;
			context.beginPath();
			context.ellipse(0, 0, point.radius * 1.1, point.radius * 2.4, 0, 0, 6.283);
			context.fill();
			context.restore();
		}

		context.globalAlpha = 1;
	}

	drawWaves(timestamp) {
		const context = this.context;
		const { width, height } = this;
		context.clearRect(0, 0, width, height);

		const spacing = 46;
		const lineCount = Math.ceil(height / spacing) + 1;
		const time = timestamp / 1000;

		for (let index = 0; index < lineCount; index++) {
			const baseY = index * spacing;
			const phase = index * 0.55;

			context.beginPath();
			for (let x = 0; x <= width; x += 12) {
				const primary = Math.sin(x / 220 + phase + time * this.speed) * 10;
				const secondary = Math.sin(x / 90 - time * this.speed * 0.6 + phase) * 4;
				const y = baseY + primary + secondary - this.wavePointerLift(x, baseY);

				if (x === 0) {
					context.moveTo(x, y);
				} else {
					context.lineTo(x, y);
				}
			}

			context.globalAlpha = 0.16 + 0.08 * Math.sin(time * 0.5 + phase);
			context.strokeStyle = this.dotColor;
			context.lineWidth = 1;
			context.stroke();
		}

		context.globalAlpha = 1;
	}

	wavePointerLift(x, baseY) {
		const radius = 170;
		const distance = Math.hypot(x - this.pointer.x, baseY - this.pointer.y);
		if (distance > radius) {
			return 0;
		}

		return (1 - distance / radius) * 28;
	}

	setupParallax() {
		const layer = document.querySelector('.theme-bg');
		if (!layer || this.reduceMotion) {
			return;
		}

		const update = () => {
			const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
			const progress = Math.min(scrollY / max, 1);
			layer.style.transform = `translate3d(0, ${progress * -110}px, 0) scale(1.08)`;
			this.parallaxTicking = false;
		};

		addEventListener(
			'scroll',
			() => {
				if (this.parallaxTicking) {
					return;
				}
				this.parallaxTicking = true;
				requestAnimationFrame(update);
			},
			{ passive: true },
		);

		update();
	}

	setupMarquee() {
		const rows = [];
		document.querySelectorAll('.marquee').forEach((marquee) => {
			const track = marquee.querySelector('.track');
			if (!track) {
				return;
			}
			rows.push({
				marquee,
				track,
				unit: Array.from(track.children).map((node) => {
					return node.cloneNode(true);
				}),
			});
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
				track.style.animationDuration = `${(32 * (runWidth + gap)) / (unitWidth / 2)}s`;
			});
		};

		build();
		addEventListener('load', build);
		addEventListener(
			'resize',
			() => {
				cancelAnimationFrame(this.marqueeFrame);
				this.marqueeFrame = requestAnimationFrame(build);
			},
			{ passive: true },
		);
	}

	setupMinato() {
		const start = () => {
			if (document.documentElement.getAttribute('data-active-theme') !== 'minato' || this.mtStarted) {
				return false;
			}
			this.mtStarted = true;
			this.initMinato();
			return true;
		};

		if (start()) {
			return;
		}

		const observer = new MutationObserver(() => {
			if (start()) {
				observer.disconnect();
			}
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-active-theme'] });
	}

	initMinato() {
		this.mtScrubs = Array.from(document.querySelectorAll('.mt-act')).map((section) => {
			const canvas = section.querySelector('.mt-canvas');
			const sequence = new FrameSequence(section.getAttribute('data-frames'), Number(section.getAttribute('data-count')));
			sequence.load();
			sequence.images[0].onload = () => {
				this.mtRender();
			};
			return {
				section,
				canvas,
				context: canvas.getContext('2d'),
				sequence,
				phases: Array.from(section.querySelectorAll('.mt-phase')),
				titleblock: section.querySelector('.mt-titleblock'),
				isRas: section.classList.contains('mt-ras'),
			};
		});

		const resize = () => {
			this.mtScrubs.forEach(({ canvas }) => {
				const ratio = Math.min(devicePixelRatio || 1, 2);
				canvas.width = canvas.clientWidth * ratio;
				canvas.height = canvas.clientHeight * ratio;
				canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
			});
			this.mtRender();
		};

		addEventListener('resize', resize, { passive: true });
		addEventListener('load', resize);
		resize();

		if (this.reduceMotion) {
			return;
		}

		addEventListener(
			'scroll',
			() => {
				if (this.mtTicking) {
					return;
				}
				this.mtTicking = true;
				requestAnimationFrame(() => {
					this.mtRender();
					this.mtTicking = false;
				});
			},
			{ passive: true },
		);

		this.setupMinatoRas();
		this.setupMinatoLegacy();

		if (this.finePointer) {
			this.setupMinatoCursor();
		}
	}

	mtRender() {
		this.mtScrubs.forEach((scrub) => {
			const rect = scrub.section.getBoundingClientRect();
			if (rect.bottom < 0 || rect.top > innerHeight) {
				return;
			}

			if (scrub.isRas) {
				if (!scrub.rasDrawn) {
					scrub.rasDrawn = true;
					this.mtDrawFrame(scrub, 0.5);
				}
				return;
			}

			const total = rect.height - innerHeight;
			const progress = Math.max(0, Math.min(total > 0 ? -rect.top / total : 0.5, 1));
			this.mtDrawFrame(scrub, progress);
			this.mtUpdatePhases(scrub, progress);
		});
	}

	mtDrawFrame(scrub, progress) {
		const image = scrub.sequence.frameAt(this.reduceMotion ? 0.5 : progress);
		if (!image?.complete || !image.naturalWidth) {
			return;
		}

		const { canvas, context } = scrub;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
		const drawWidth = image.naturalWidth * scale;
		const drawHeight = image.naturalHeight * scale;

		context.clearRect(0, 0, width, height);
		context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
	}

	mtUpdatePhases(scrub, progress) {
		if (scrub.titleblock) {
			scrub.titleblock.style.opacity = `${Math.max(0, 1 - progress / 0.14)}`;
		}

		const bands = [
			[0.16, 0.36],
			[0.36, 0.58],
			[0.58, 0.8],
			[0.8, 1.01],
		];
		scrub.phases.forEach((phase, index) => {
			const [bandStart, bandEnd] = bands[index];
			const inside = progress >= bandStart && progress < bandEnd;
			const edge = Math.min(Math.abs(progress - bandStart), Math.abs(progress - bandEnd));
			const strength = inside ? Math.min(edge / 0.05, 1) : 0;
			phase.style.opacity = `${strength}`;
			phase.style.transform = `translateY(${(1 - strength) * 24}px)`;
		});
	}

	setupMinatoRas() {
		const scrub = this.mtScrubs.find((entry) => {
			return entry.isRas;
		});
		if (!scrub) {
			return;
		}

		const manual = { progress: 0.5, until: 0 };

		if (this.finePointer) {
			scrub.section.addEventListener(
				'pointermove',
				(event) => {
					manual.progress = event.clientX / innerWidth;
					manual.until = performance.now() + 2500;
				},
				{ passive: true },
			);
		}

		const loop = (timestamp) => {
			const rect = scrub.section.getBoundingClientRect();
			if (rect.bottom > 0 && rect.top < innerHeight) {
				const auto = 0.5 + 0.45 * Math.sin(timestamp / 2400);
				const progress = timestamp < manual.until ? manual.progress : auto;
				this.mtDrawFrame(scrub, Math.max(0, Math.min(progress, 1)));
			}
			requestAnimationFrame(loop);
		};

		requestAnimationFrame(loop);
	}

	setupMinatoLegacy() {
		const reveal = document.getElementById('mtLegacyReveal');
		const section = document.getElementById('contact');
		if (!reveal || !section || !this.finePointer) {
			return;
		}

		section.addEventListener(
			'pointermove',
			(event) => {
				const rect = section.getBoundingClientRect();
				reveal.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
				reveal.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
			},
			{ passive: true },
		);
	}

	setupMinatoCursor() {
		const cursor = document.getElementById('mtCursor');

		addEventListener('pointermove', (event) => {
			cursor.style.opacity = '1';
			cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
		});

		document.querySelectorAll('a, button').forEach((element) => {
			element.addEventListener('pointerenter', () => {
				cursor.classList.add('hot');
			});
			element.addEventListener('pointerleave', () => {
				cursor.classList.remove('hot');
			});
		});
	}
}

new Portfolio();

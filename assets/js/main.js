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

		if (this.mode === 'stars') {
			this.drawStars(timestamp);
		} else {
			this.drawNetwork();
		}

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
}

new Portfolio();

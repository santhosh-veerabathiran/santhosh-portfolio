class Theme {
	root = document.documentElement;
	name = new URLSearchParams(location.search).get('theme');

	constructor() {
		if (!this.name || !/^[a-z0-9-]+$/i.test(this.name)) {
			return;
		}

		this.load();
	}

	load() {
		fetch(`assets/themes/${this.name}.json`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`theme "${this.name}" not found`);
				}
				return response.json();
			})
			.then((theme) => {
				this.apply(theme);
			})
			.catch(() => {});
	}

	apply(theme) {
		this.setVars(theme.colors);
		this.setVars(theme.palette);
		this.setVars(theme.fonts);

		const background = theme.background ?? {};
		if (background.pattern) {
			this.root.setAttribute('data-pattern', background.pattern);
		}
		if (background.gridSize) {
			this.root.style.setProperty('--grid-size', background.gridSize);
		}

		const motion = theme.motion ?? {};
		this.root.style.setProperty('--net-speed', motion.speed ?? 1);
		this.root.setAttribute('data-hover', motion.hover ?? 'link');

		this.root.setAttribute('data-animation', background.animation ?? 'network');
		this.root.setAttribute('data-orbs', background.orbs === false ? 'off' : 'on');
		this.root.setAttribute('data-aurora', background.aurora === true ? 'on' : 'off');
		this.root.setAttribute('data-active-theme', this.name);
	}

	setVars(group) {
		if (!group) {
			return;
		}

		Object.keys(group).forEach((key) => {
			this.root.style.setProperty(`--${key}`, group[key]);
		});
	}
}

new Theme();

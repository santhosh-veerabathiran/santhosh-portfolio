export class FrameSequence {
	images: HTMLImageElement[] = [];

	constructor(
		private readonly basePath: string,
		readonly count: number,
	) {}

	load(onFirstFrame?: () => void) {
		for (let index = 1; index <= this.count; index++) {
			const image = new Image();
			image.src = `${this.basePath}/${String(index).padStart(3, '0')}.jpg`;
			if (index === 1 && onFirstFrame) {
				image.onload = onFirstFrame;
			}
			this.images.push(image);
		}
	}

	frameAt(progress: number) {
		const index = Math.round(progress * (this.count - 1));
		const target = Math.max(0, Math.min(index, this.count - 1));
		if (this.isReady(target)) {
			return this.images[target];
		}
		for (let offset = 1; offset < this.count; offset++) {
			if (this.isReady(target - offset)) {
				return this.images[target - offset];
			}
			if (this.isReady(target + offset)) {
				return this.images[target + offset];
			}
		}
		return this.images[target];
	}

	private isReady(index: number) {
		const image = this.images[index];
		return Boolean(image?.complete && image.naturalWidth);
	}
}

export const drawCoverFrame = (canvas: HTMLCanvasElement, sequence: FrameSequence, progress: number) => {
	const image = sequence.frameAt(progress);
	if (!image?.complete || !image.naturalWidth) {
		return;
	}

	const context = canvas.getContext('2d');
	if (!context) {
		return;
	}

	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
	const drawWidth = image.naturalWidth * scale;
	const drawHeight = image.naturalHeight * scale;

	context.clearRect(0, 0, width, height);
	context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
};

export const fitCanvas = (canvas: HTMLCanvasElement) => {
	const ratio = Math.min(devicePixelRatio || 1, 2);
	canvas.width = canvas.clientWidth * ratio;
	canvas.height = canvas.clientHeight * ratio;
	canvas.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0);
};

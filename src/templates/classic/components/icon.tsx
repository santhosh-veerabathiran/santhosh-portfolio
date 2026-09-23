interface IcProps {
	icon: string;
	color?: string;
	fill?: boolean;
	className?: string;
}

export const Ic = ({ icon, color, fill, className }: IcProps) => {
	const classes = ['ic', fill ? 'ic--fill' : '', className ?? ''].filter(Boolean).join(' ');
	return (
		<svg className={classes} style={color ? { color } : undefined}>
			<use href={`#${icon}`} />
		</svg>
	);
};

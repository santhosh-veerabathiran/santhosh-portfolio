import { useRef } from 'react';

import { heroSocials, profile, stats } from '../../../content/profile';
import type { Stat } from '../../../content/types';
import { useCountUp } from '../../../lib/countup.hook';
import { reduceMotion } from '../../../lib/media.hooks';
import { useTypewriter } from '../../../lib/typewriter.hook';
import { useHeroCanvas } from '../effects/hero.canvas.hook';
import type { SkinDefinition } from '../../../lib/skin.types';
import { Ic } from './icon';

const NameLine = ({ text, lineIndex }: { text: string; lineIndex: number }) => {
	return (
		<span className="ln">
			{text.split('').map((character, index) => {
				return (
					<span
						key={index}
						className={reduceMotion ? 'ch' : 'ch up'}
						style={{ animationDelay: `${0.35 + lineIndex * 0.28 + index * 0.035}s` }}
					>
						{character}
					</span>
				);
			})}
		</span>
	);
};

const StatBlock = ({ stat }: { stat: Stat }) => {
	const { ref, value, done } = useCountUp(stat.count);
	return (
		<div className="stat">
			<Ic icon={stat.icon} className="stat-ic" />
			<div className="num" ref={ref}>
				{stat.prefix}
				{value.toLocaleString()}
				{done ? <span>{stat.suffix}</span> : stat.suffix}
			</div>
			<div className="lbl">{stat.label}</div>
		</div>
	);
};

export const HeroSection = ({ skin }: { skin: SkinDefinition }) => {
	const heroRef = useRef<HTMLElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const typed = useTypewriter(profile.typedWords);

	useHeroCanvas(canvasRef, heroRef, skin);

	return (
		<header className="hero" id="home" ref={heroRef}>
			<canvas id="net" ref={canvasRef}></canvas>
			<div className="aurora"></div>
			<div className="orb a"></div>
			<div className="orb b"></div>
			<div className="hero-grid"></div>
			<div className="wrap hero-in">
				<p className="eyebrow">{profile.eyebrow}</p>
				<p className="hi">{profile.hi}</p>
				<h1 className="name" id="name" aria-label={`${profile.name.first} ${profile.name.last}`}>
					<NameLine text={profile.name.first} lineIndex={0} />
					<NameLine text={profile.name.last} lineIndex={1} />
				</h1>
				<p className="typed">
					<span className="pre">{profile.typedPre}</span>
					<span className="tw">{typed}</span>
					<span className="caret"></span>
				</p>
				<p className="sub">{profile.sub}</p>
				<div className="cta">
					<a className="btn btn-primary mag" href="#work">
						View My Work <Ic icon="ic-arrow-right" />
					</a>
					<a className="btn btn-ghost mag" href={profile.resumeHref} target="_blank" rel="noopener">
						Download Résumé <Ic icon="ic-download" />
					</a>
				</div>
				<div className="socials">
					{heroSocials.map((social) => {
						return (
							<a
								key={social.label}
								href={social.href}
								target={social.href.startsWith('http') ? '_blank' : undefined}
								rel="noopener"
								aria-label={social.label}
							>
								<Ic icon={social.icon} fill={social.fill} />
							</a>
						);
					})}
				</div>
				<div className="stats">
					{stats.map((stat) => {
						return <StatBlock key={stat.label} stat={stat} />;
					})}
				</div>
			</div>
			<div className="scrollcue">
				<span className="rail"></span>Scroll
			</div>
		</header>
	);
};

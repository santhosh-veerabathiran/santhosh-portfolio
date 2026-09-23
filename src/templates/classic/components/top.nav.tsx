import { useRef, useState } from 'react';

import { profile } from '../../../content/profile';
import { useActiveSection } from '../../../lib/reveal.hook';
import { useScrollChrome } from '../../../lib/pointer.hook';
import { Ic } from './icon';
import { ScrollProgress } from './chrome';

const avatarSrc = profile.avatars[Math.floor(Math.random() * profile.avatars.length)];

const navLinks = [
	{ id: 'about', label: 'About', icon: 'ic-user' },
	{ id: 'work', label: 'Work', icon: 'ic-briefcase' },
	{ id: 'projects', label: 'Projects', icon: 'ic-sparkles' },
	{ id: 'skills', label: 'Skills', icon: 'ic-cpu' },
	{ id: 'contact', label: 'Contact', icon: 'ic-mail' },
];

export const TopNav = () => {
	const navRef = useRef<HTMLElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState('');

	useScrollChrome(navRef, progressRef);
	useActiveSection(
		navLinks.map((link) => {
			return link.id;
		}),
		setActive,
	);

	return (
		<>
			<ScrollProgress progressRef={progressRef} />
			<nav className="top" id="nav" ref={navRef}>
				<div className="wrap nav-in">
					<a href="#home" className="brand">
						<img className="avatar" src={avatarSrc} alt={`${profile.name.first} ${profile.name.last}`} /> {profile.name.first}{' '}
						{profile.name.last}
					</a>
					<div className={open ? 'nav-links open' : 'nav-links'} id="navLinks">
						{navLinks.map((link) => {
							return (
								<a
									key={link.id}
									href={`#${link.id}`}
									className={active === link.id ? 'active' : undefined}
									onClick={() => {
										setOpen(false);
									}}
								>
									<Ic icon={link.icon} /> {link.label}
								</a>
							);
						})}
						<a
							className="btn-resume"
							href={profile.resumeHref}
							target="_blank"
							rel="noopener"
							onClick={() => {
								setOpen(false);
							}}
						>
							Résumé <Ic icon="ic-external" />
						</a>
					</div>
					<button
						className="nav-toggle"
						aria-label="Toggle menu"
						onClick={() => {
							setOpen((value) => {
								return !value;
							});
						}}
					>
						☰
					</button>
				</div>
			</nav>
		</>
	);
};

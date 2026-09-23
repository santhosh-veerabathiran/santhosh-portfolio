import type { ReactNode } from 'react';

import { contact, profile } from '../../../content/profile';
import { reduceMotion } from '../../../lib/media.hooks';
import { Ic } from './icon';

export const ContactSection = ({ overlay }: { overlay?: ReactNode }) => {
	return (
		<section className="blk contact" id="contact">
			{overlay}
			<div className="wrap">
				<div className="sec-head reveal">
					<p className="sec-label">
						<Ic icon="ic-mail" /> {contact.label}
					</p>
				</div>
				<h2 className="reveal d1" dangerouslySetInnerHTML={{ __html: contact.headingHtml }} />
				<p className="reveal d2">{contact.text}</p>
				<div className="cta reveal d3">
					<a className="btn btn-primary mag" href={`mailto:${profile.email}`}>
						<Ic icon="ic-mail" /> Get In Touch
					</a>
					<a className="btn btn-ghost mag" href={profile.resumeHref} target="_blank" rel="noopener">
						Download Résumé <Ic icon="ic-download" />
					</a>
				</div>
				<div className="contact-primary reveal d3">
					<a className="cp-card" href={`mailto:${profile.email}`}>
						<span className="ic-wrap">
							<Ic icon="ic-mail" />
						</span>
						<span className="cp-text">
							<span className="cp-label">Email</span>
							<span className="cp-value">{profile.email}</span>
						</span>
					</a>
					<a className="cp-card" href={profile.phoneHref} style={{ ['--accent' as string]: 'var(--c-green)' }}>
						<span className="ic-wrap">
							<Ic icon="ic-phone" />
						</span>
						<span className="cp-text">
							<span className="cp-label">Phone</span>
							<span className="cp-value">{profile.phone}</span>
						</span>
					</a>
				</div>
				<div className="contact-links reveal d4">
					{contact.links.map((link) => {
						return (
							<a key={link.label} href={link.href} target="_blank" rel="noopener">
								<Ic icon={link.icon} fill={link.fill} /> {link.label}
							</a>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export const Footer = () => {
	return (
		<footer>
			<div className="wrap foot-in">
				<span>
					© 2026 {profile.name.first} {profile.name.last}
				</span>
				<span
					className="totop"
					id="totop"
					onClick={() => {
						scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
					}}
				>
					Back To Top <Ic icon="ic-arrow-up" />
				</span>
			</div>
		</footer>
	);
};

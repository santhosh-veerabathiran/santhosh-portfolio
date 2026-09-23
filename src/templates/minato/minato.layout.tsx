import { useRef } from 'react';

import { profile } from '../../content/profile';
import { usePointerEffects } from '../../lib/pointer.hook';
import { useRevealObserver } from '../../lib/reveal.hook';
import { AboutSection } from '../classic/components/about.section';
import { Preloader, Spotlight } from '../classic/components/chrome';
import { ContactSection, Footer } from '../classic/components/contact.section';
import { IconDefs } from '../classic/components/icon.defs';
import { ProjectsSection } from '../classic/components/projects.section';
import { SkillsSection } from '../classic/components/skills.section';
import { TopNav } from '../classic/components/top.nav';
import { WorkSection } from '../classic/components/work.section';
import { MtDash, MtOpen, MtRas } from './components/mt.acts';
import { rails } from './minato.content';
import { useLegacyReveal, useMinatoCursor } from './minato.hooks';
import './minato.css';

const LegacyOverlay = () => {
	const revealRef = useRef<HTMLDivElement>(null);
	useLegacyReveal('contact', revealRef);

	return (
		<>
			<div className="mt-legacy-plate" aria-hidden="true"></div>
			<div className="mt-legacy-reveal" aria-hidden="true" ref={revealRef}></div>
		</>
	);
};

const MinatoLayout = () => {
	const rootRef = useRef<HTMLDivElement>(null);
	const cursorRef = useRef<HTMLDivElement>(null);

	useRevealObserver(rootRef);
	usePointerEffects(rootRef);
	useMinatoCursor(cursorRef);

	return (
		<div ref={rootRef}>
			<IconDefs />
			<Spotlight />
			<Preloader mark={`${profile.name.first} ${profile.name.last}`} />
			<div className="mt-cursor" aria-hidden="true" ref={cursorRef}>
				<i></i>
				<b></b>
			</div>
			<div className="mt-rail mt-rail-left" aria-hidden="true">
				<span>{rails.left}</span>
			</div>
			<div className="mt-rail mt-rail-right" aria-hidden="true">
				<span>{rails.right}</span>
			</div>
			<TopNav />
			<MtOpen />
			<AboutSection />
			<MtDash />
			<WorkSection />
			<ProjectsSection />
			<MtRas />
			<SkillsSection />
			<ContactSection overlay={<LegacyOverlay />} />
			<Footer />
		</div>
	);
};

export default MinatoLayout;

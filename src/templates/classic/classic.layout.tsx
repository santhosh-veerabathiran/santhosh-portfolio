import { useRef } from 'react';

import { profile } from '../../content/profile';
import { useSeamlessMarquees } from '../../lib/marquee.hook';
import { usePointerEffects } from '../../lib/pointer.hook';
import { useRevealObserver } from '../../lib/reveal.hook';
import { AboutSection } from './components/about.section';
import { Preloader, Spotlight, ThemeBackground } from './components/chrome';
import { ContactSection, Footer } from './components/contact.section';
import { HeroSection } from './components/hero.section';
import { IconDefs } from './components/icon.defs';
import { MarqueeRows } from './components/marquee';
import { ProjectsSection } from './components/projects.section';
import { SkillsSection } from './components/skills.section';
import { TopNav } from './components/top.nav';
import { WorkSection } from './components/work.section';

import type { SkinDefinition } from '../../lib/skin.types';

const ClassicLayout = ({ skin }: { skin: SkinDefinition }) => {
	const rootRef = useRef<HTMLDivElement>(null);

	useRevealObserver(rootRef);
	useSeamlessMarquees(rootRef);
	usePointerEffects(rootRef);

	return (
		<div ref={rootRef}>
			<IconDefs />
			<ThemeBackground />
			<Spotlight />
			<Preloader mark={`${profile.name.first} ${profile.name.last}`} />
			<TopNav />
			<HeroSection skin={skin} />
			<MarqueeRows />
			<AboutSection />
			<WorkSection />
			<ProjectsSection />
			<SkillsSection />
			<ContactSection />
			<Footer />
		</div>
	);
};

export default ClassicLayout;

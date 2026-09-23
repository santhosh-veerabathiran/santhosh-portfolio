import { projects } from '../../../content/projects';
import { Ic } from './icon';

export const ProjectsSection = () => {
	return (
		<section className="blk" id="projects">
			<div className="wrap">
				<div className="sec-head reveal">
					<p className="sec-label">
						<Ic icon="ic-sparkles" /> Projects
					</p>
					<h2 className="sec-title">Things I've built on my own.</h2>
				</div>
				<div className="proj-cards">
					{projects.map((project, index) => {
						return (
							<div
								key={project.title}
								className={`proj-card tilt reveal d${index + 1}`}
								style={{ ['--accent' as string]: project.accentVar }}
							>
								<div className="beam"></div>
								<div className="proj-top">
									<span className="ic-wrap">
										<Ic icon={project.icon} />
									</span>
									<div>
										<h4>{project.title}</h4>
										<p className="proj-tag">{project.tag}</p>
									</div>
								</div>
								<p className="proj-desc">{project.description}</p>
								<div className="chips">
									{project.chips.map((chip) => {
										return (
											<span key={chip} className="chip">
												{chip}
											</span>
										);
									})}
								</div>
								{project.github && (
									<div className="proj-links">
										<a href={project.github} target="_blank" rel="noopener">
											<Ic icon="ic-github" fill /> View on GitHub
										</a>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

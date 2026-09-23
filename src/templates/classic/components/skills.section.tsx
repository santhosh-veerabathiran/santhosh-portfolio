import { skillGroups } from '../../../content/skills';
import { Ic } from './icon';

export const SkillsSection = () => {
	return (
		<section className="blk" id="skills">
			<div className="wrap">
				<div className="sec-head reveal">
					<p className="sec-label">
						<Ic icon="ic-cpu" /> Skills
					</p>
					<h2 className="sec-title">Tools I work with.</h2>
				</div>
				<div className="skill-cards">
					{skillGroups.map((group, index) => {
						return (
							<div key={group.title} className={`skill-card reveal d${(index % 3) + 1}`}>
								<div className="skill-head">
									<span className="ic-wrap">
										<Ic icon={group.icon} />
									</span>
									{group.title}
								</div>
								<div className="chips">
									{group.chips.map((chip) => {
										return (
											<span key={chip.label} className="chip">
												<Ic icon={chip.icon} color={chip.color} fill={chip.fill} /> {chip.label}
											</span>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

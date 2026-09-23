import { profile } from '../../../content/profile';
import { job, roles, workCards } from '../../../content/work';
import { tenureSince } from '../../../lib/tenure.hook';
import { Ic } from './icon';

export const WorkSection = () => {
	return (
		<section className="blk" id="work">
			<div className="wrap">
				<div className="sec-head reveal">
					<p className="sec-label">
						<Ic icon="ic-briefcase" /> Experience
					</p>
					<h2 className="sec-title">What I've built.</h2>
				</div>
				<div className="job-bar reveal">
					<h3>
						<span className="co">{job.company}</span> · {job.location}
					</h3>
					<span className="when">
						<strong>{job.period}</strong> · <span id="tenure">{tenureSince(profile.employmentStart)}</span>
					</span>
				</div>
				<div className="timeline reveal">
					{roles.map((role) => {
						return (
							<div key={role.title} className={role.current ? 'tl-item current' : 'tl-item'}>
								<span className="tl-dot"></span>
								<div className="tl-head">
									<span className="tl-role">{role.title}</span>
									<span className="tl-date">{role.period}</span>
								</div>
							</div>
						);
					})}
				</div>
				<p className="job-ctx reveal" dangerouslySetInnerHTML={{ __html: job.contextHtml }} />
				<div className="cards">
					{workCards.map((card, index) => {
						return (
							<div key={card.title} className={`card tilt reveal ${index % 2 === 0 ? 'd1' : 'd2'}`}>
								<div className="beam"></div>
								<div className="card-head">
									<span className="ic-wrap">
										<Ic icon={card.icon} />
									</span>
									<h4>{card.title}</h4>
								</div>
								<ul>
									{card.bulletsHtml.map((bullet, bulletIndex) => {
										return <li key={bulletIndex} dangerouslySetInnerHTML={{ __html: bullet }} />;
									})}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

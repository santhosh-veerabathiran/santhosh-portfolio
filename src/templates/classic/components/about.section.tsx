import { bioHtml, facts } from '../../../content/profile';
import { Ic } from './icon';

export const AboutSection = () => {
	return (
		<section className="blk" id="about">
			<div className="wrap">
				<div className="sec-head reveal">
					<p className="sec-label">
						<Ic icon="ic-user" /> About
					</p>
					<h2 className="sec-title">Engineer across the full stack.</h2>
				</div>
				<div className="about-grid">
					<div className="bio reveal d1">
						{bioHtml.map((paragraph, index) => {
							return <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />;
						})}
					</div>
					<div className="facts reveal d2">
						<dl>
							{facts.map((fact) => {
								return (
									<div key={fact.term}>
										<dt>
											<Ic icon={fact.icon} /> {fact.term}
										</dt>
										{fact.live ? (
											<dd>
												<span className="live">
													<span className="pulse"></span> {fact.detailHtml}
												</span>
											</dd>
										) : (
											<dd dangerouslySetInnerHTML={{ __html: fact.detailHtml }} />
										)}
									</div>
								);
							})}
						</dl>
					</div>
				</div>
			</div>
		</section>
	);
};

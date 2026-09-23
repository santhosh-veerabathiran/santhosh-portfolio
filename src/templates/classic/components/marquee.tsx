import { memo } from 'react';

import { marqueeRows } from '../../../content/marquee';
import { Ic } from './icon';

export const MarqueeRows = memo(() => {
	return (
		<>
			{marqueeRows.map((row, rowIndex) => {
				return (
					<div key={rowIndex} className={rowIndex === 1 ? 'marquee marquee--reverse' : 'marquee'} aria-hidden="true">
						<div className="track">
							{[...row, ...row].map((item, index) => {
								return (
									<span key={index} className="item">
										<Ic icon={item.icon} color={item.color} fill={item.fill} /> {item.label}
									</span>
								);
							})}
						</div>
					</div>
				);
			})}
		</>
	);
});

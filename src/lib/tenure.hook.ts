export const tenureSince = (start: { year: number; monthIndex: number }, quit?: Date) => {
	const end = quit ?? new Date();
	const months = Math.max((end.getFullYear() - start.year) * 12 + (end.getMonth() - start.monthIndex) + 1, 1);

	const years = Math.floor(months / 12);
	const remaining = months % 12;
	const parts: string[] = [];
	if (years > 0) {
		parts.push(`${years} yr${years === 1 ? '' : 's'}`);
	}
	if (remaining > 0) {
		parts.push(`${remaining} mo${remaining === 1 ? '' : 's'}`);
	}
	return parts.join(' ');
};

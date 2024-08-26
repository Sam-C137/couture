export function initials(name: string | undefined): unknown {
	if (!name) {
		return 'NU';
	}
	const firstName = name.split(' ')[0];
	const lastName = name.split(' ')[1];

	return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase() || ''}`;
}

export function initials(name: string | undefined): unknown {
	if (!name) {
		return 'NU';
	}
	const firstName = name.split(' ')[0];
	const lastName = name.split(' ')[1];

	return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase() || ''}`;
}

export function isHtmlElement(node: unknown): node is HTMLElement {
	return node instanceof HTMLElement;
}

export function screenSize(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
	const width = window.innerWidth;
	if (width < 576) {
		return 'xs';
	} else if (width < 768) {
		return 'sm';
	} else if (width < 992) {
		return 'md';
	} else if (width < 1200) {
		return 'lg';
	} else {
		return 'xl';
	}
}

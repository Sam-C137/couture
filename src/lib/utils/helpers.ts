export function isHtmlElement<T extends HTMLElement = HTMLElement>(node: unknown): node is T {
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

export function slugify(input: string): string {
	return input
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

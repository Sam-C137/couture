export function isHtmlElement<T extends HTMLElement = HTMLElement>(node: unknown): node is T {
	return node instanceof HTMLElement;
}

export function slugify(input: string): string {
	return input
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

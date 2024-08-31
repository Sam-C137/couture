export function clickOutside(node: HTMLElement, onClickOutside: () => void) {
	function handleClick(event: Event) {
		if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
			onClickOutside();
		}
	}

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

export function parseNumber(node: HTMLInputElement) {
	const handleInput = (event: Event) => {
		const value = (event.target as HTMLInputElement)?.value;
		if (value === '' || isNaN(Number(value))) {
			event.preventDefault();
			(event.target as HTMLInputElement).value = node.value;
		} else {
			node.value = value;
		}
	};

	node.addEventListener('input', handleInput);

	return {
		destroy() {
			node.removeEventListener('input', handleInput);
		}
	};
}

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

export function maxInputLength(node: HTMLInputElement, maxLength: number) {
	const handleInput = (event: Event) => {
		const value = (event.target as HTMLInputElement)?.value;
		if (value.length > maxLength) {
			event.preventDefault();
			(event.target as HTMLInputElement).value = value.slice(0, maxLength);
		}
	};

	node.addEventListener('input', handleInput);

	return {
		destroy() {
			node.removeEventListener('input', handleInput);
		}
	};
}

export function minInputLength(node: HTMLInputElement, minLength: number) {
	const handleInput = (event: Event) => {
		const value = (event.target as HTMLInputElement)?.value;
		if (value.length < minLength) {
			event.preventDefault();
			(event.target as HTMLInputElement).value = value.slice(0, minLength);
		}
	};

	node.addEventListener('input', handleInput);

	return {
		destroy() {
			node.removeEventListener('input', handleInput);
		}
	};
}

import { cubicOut } from 'svelte/easing';

export function moveDownOut(node: HTMLElement, { duration = 300, delay = 0, easing = cubicOut }) {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const height = parseFloat(style.height);
	const padding_top = parseFloat(style.paddingTop);
	const padding_bottom = parseFloat(style.paddingBottom);
	const margin_top = parseFloat(style.marginTop);
	const margin_bottom = parseFloat(style.marginBottom);
	const border_top_width = parseFloat(style.borderTopWidth);
	const border_bottom_width = parseFloat(style.borderBottomWidth);

	return {
		delay,
		duration,
		easing,
		css: (t: number) => `
      overflow: hidden;
      opacity: ${Math.min(t * 20, 1) * opacity};
      height: ${t * height}px;
      padding-top: ${t * padding_top}px;
      padding-bottom: ${t * padding_bottom}px;
      margin-top: ${t * margin_top}px;
      margin-bottom: ${t * margin_bottom}px;
      border-top-width: ${t * border_top_width}px;
      border-bottom-width: ${t * border_bottom_width}px;
      transform: scale(${0.95 + 0.05 * t});
    `
	};
}

export function shadcnDropdownTransition(
	node: HTMLElement,
	{ y = 5, duration = 300, easing = cubicOut }
) {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;

	return {
		duration,
		easing,
		css: (t: number, u: number) => `
      transform: ${transform} translate3d(0, ${u * y}px, 0) scale(${0.95 + 0.05 * t});
      opacity: ${t * opacity};
    `
	};
}

export function gpt1(node: HTMLElement, { delay = 0, duration = 400, easing = cubicOut }) {
	return {
		delay,
		duration,
		easing,
		css: (t: number) => `transform: scale(${t}); opacity: ${t}`
	};
}

export function gpt2(node: HTMLElement, { delay = 0, duration = 400, easing = cubicOut }) {
	return {
		delay,
		duration,
		easing,
		css: (t: number) => `transform: rotate(${t * 360}deg); opacity: ${t}`
	};
}

export function gpt3(node: HTMLElement, { delay = 0, duration = 400, easing = cubicOut }) {
	return {
		delay,
		duration,
		easing,
		css: (t: number) => `filter: blur(${(1 - t) * 10}px); opacity: ${t}`
	};
}

export function gpt4(node: HTMLElement, { delay = 0, duration = 400, easing = cubicOut }) {
	const height = getComputedStyle(node).height;
	return {
		delay,
		duration,
		easing,
		css: (t: number) => `height: ${t * parseFloat(height)}px; overflow: hidden; opacity: ${t}`
	};
}

export function gpt5(node: HTMLElement, { delay = 0, duration = 400, easing = cubicOut }) {
	return {
		delay,
		duration,
		easing,
		css: (t: number) => `transform: skew(${(1 - t) * 20}deg); opacity: ${t}`
	};
}

export function gpt6(node: HTMLElement, { delay = 0, duration = 400, easing = cubicOut }) {
	return {
		delay,
		duration,
		easing,
		css: (t: number) => `background-color: rgba(255, 0, 0, ${t}); opacity: ${t}`
	};
}

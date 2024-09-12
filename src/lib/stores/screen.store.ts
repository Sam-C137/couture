import { readable } from 'svelte/store';

function getScreenSize(width: number) {
	if (width < 576) return 'xs';
	if (width < 768) return 'sm';
	if (width < 992) return 'md';
	if (width < 1200) return 'lg';
	return 'xl';
}

export const screenSize = readable('xl', (set) => {
	if (typeof window === 'undefined') return;

	set(getScreenSize(window.innerWidth));

	const handleResize = () => set(getScreenSize(window.innerWidth));
	window.addEventListener('resize', handleResize);

	return () => window.removeEventListener('resize', handleResize);
});

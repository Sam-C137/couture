import type { HTMLAttributes } from 'svelte/elements';

export type InputProps = {
	id: string;
	name: string;
	label?: string;
	value?: string;
	floatLabel?: boolean;
	placeholder?: string;
	required?: boolean;
	type?: 'text' | 'number' | 'tel' | 'email' | 'password';
	error?: string | undefined;
	maxLength?: number | undefined;
	minLength?: number | undefined;
	disabled?: boolean;
	spellcheck?: boolean;
	autocomplete?: HTMLInputElement['autocomplete'];
	enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'search' | 'send';
} & HTMLAttributes<HTMLInputElement>;

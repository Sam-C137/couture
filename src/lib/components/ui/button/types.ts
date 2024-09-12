import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

type BaseAttributes = {
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'inverted';
	loading?: boolean;
	role?: string;
	disabled?: boolean;
};

export type ButtonElement = BaseAttributes & {
	type?: HTMLButtonAttributes['type'];
	href?: never;
} & HTMLAttributes<HTMLButtonElement>;

type AnchorElement = BaseAttributes & {
	type?: never;
	href?: HTMLAnchorAttributes['type'];
} & HTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = ButtonElement | AnchorElement;

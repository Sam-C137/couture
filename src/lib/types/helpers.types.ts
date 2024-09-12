export type Expand<T> = T extends object
	? T extends infer O
		? {
				[K in keyof O]: O[K];
			}
		: never
	: T;

export type DOMEl<T extends Element = HTMLDivElement> = Expand<{
	el?: T | undefined;
}>;

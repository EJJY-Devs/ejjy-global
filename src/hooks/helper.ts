export const wrapServiceWithCatch = (service: Promise<any>) => {
	return service.catch((e) => Promise.reject(e.errors));
};

export function convertParamsToArray<T extends Object>(
	params: T | undefined,
): any {
	if (params === undefined) {
		return [];
	}

	return Object.keys(params)
		.map((key: string) => {
			const typedKey = key as keyof T;
			return typedKey in params ? params[typedKey] : null;
		})
		.filter(Boolean);
}

export const ob_null = (ob: {[key: string]: string|number|null|undefined}) => {
	if (Object.keys(ob).length === 0) {
		return null;
	}
	return ob;
};
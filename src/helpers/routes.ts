type KeyStringObject = { [key: string]: string };

class RouteString {
	private value: string;
	private parent: string;

	constructor(value: string, parent = "") {
		this.value = value;
		this.parent = parent;
	}

	/**
	 * Set route value
	 */
	set(value: string) {
		this.value = value;
	}

	/**
	 * Access full route path
	 */
	path() {
		return this.parent ? `/${sanitize(this.parent)}/${sanitize(this.value)}` : this.value;
	}

	/**
	 * Access route value
	 */
	get() {
		return this.value;
	}
}

export default function registerRoute(ob: KeyStringObject = {}, parent = "") {
    const _ob = ob;
    return route.bind({_ob, parent});
}

function route(this: {_ob: KeyStringObject, parent: string}, name: string) {
    const str = new RouteString(name, this.parent);

    if(typeof this._ob !== 'undefined') {
        str.set(`/${sanitize(this._ob[name])}` ?? "");
    }
    return str;
}

function sanitize(str: string) {
	let str_ = str.trim();
	if (str_.startsWith('/')) {
		str_ = str_.slice(1);
	}
	return str_;
}
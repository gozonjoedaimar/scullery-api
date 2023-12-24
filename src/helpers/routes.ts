type KeyStringObject = { [key: string]: string };

class RouteString {
	private value: string;
	private parent: string;

	constructor(value: string, parent = "") {
		this.value = value;
		this.parent = parent;
	}

	set(value: string) {
		this.value = value;
	}

	get() {
		return this.parent ? `/${this.parent}/${this.value.slice(1)}` : this.value;
	}

	toString() {
		return this.value;
	}

	valueOf() {
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
        str.set(`/${this._ob[name]}` ?? "");
    }
    return str;
}
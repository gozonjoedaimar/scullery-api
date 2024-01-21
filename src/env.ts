let env = 'production';

// @ts-ignore
if (process[Symbol.for("ts-node.register.instance")]) {
    env = 'development';
}

export default env;
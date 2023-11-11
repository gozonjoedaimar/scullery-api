import { Express } from 'express';
import { GlobSync } from 'glob';
import { basename, dirname } from 'path';

// get route name from file name
function routeName(name: string) {
    // return subdir name
    if (name.endsWith('/')) {
        return basename(dirname(name + 'index'));
    }
    // else return file name without extension
    let split = name.split('.');
    if (split.length > 1) {
        split.pop();
    }
    return basename(split.join('.'));
}

export async function init(route: string, app: Express) {
    const dirRelPath = '.' + route;
    const matchSubdir  = dirRelPath + '/*/';
    const subDirMatch = new GlobSync(matchSubdir, { cwd: __dirname }).found;
    const indexMatch = new GlobSync( dirRelPath + '/*.{ts,js,tsx,jsx}', {cwd: __dirname} ).found;

    indexMatch.forEach((file) => {
        const name = routeName(file);
        const module = require(file);
        if (name === 'index') {
            app.use(route, module.default);
        }
        else {
            app.use(route + '/' + name, module.default);
        }
    });

    subDirMatch.forEach((dir) => {
        const name = routeName(dir);
        init(route + '/' + name, app);
    });
}
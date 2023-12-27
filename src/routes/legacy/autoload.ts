import { Express } from 'express';
import { GlobSync } from 'glob';
import { basename } from 'path';

// get route name from file name
function routeName(name: string) {
    // return subdir name
    if (name.endsWith('/')) {
        // remove last character
        const _path = name.slice(0, -1);
        // return basename
        return basename(_path);
    }
    // else return file name without extension
    const split = name.split('.');
    if (split.length > 1) {
        split.pop();
    }
    return basename(split.join('.'));
}

function getDirRelPath(route: string) {
    let _path = route;
    // 
    if (route.startsWith('/')) {
        // remove first character
        _path = route.slice(1);
    }
    return `./${_path}`;
}

export async function init(route: string, app: Express) {
    const dirRelPath = getDirRelPath(route);
    const matchSubdir  = `${dirRelPath}/*/`;
    const subDirMatch = new GlobSync(matchSubdir, { cwd: __dirname }).found;
    const indexMatch = new GlobSync( `${dirRelPath}/*.{ts,js,tsx,jsx}`, {cwd: __dirname} ).found;

    for ( const file of indexMatch ) {
        const name = routeName(file);
        const module = require(file);
        if (name === 'index') {
            app.use(route, module.default);
        }
        else {
            app.use(`${route}/${name}`, module.default);
        }
    };

    for ( const dir of subDirMatch ) {
        const name = routeName(dir);
        init(`${route}/${name}`, app);
    };
}
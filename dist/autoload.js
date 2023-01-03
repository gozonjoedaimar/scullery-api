"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
function getFiles(path) {
    // list api files
    let pathFiles = glob_1.default.sync(`./src${path}/**/*.ts`);
    // extract api path
    let files = pathFiles.map(f => {
        let file = f.split('/src/').join('/').split('.ts')[0];
        let pathObj = path_1.default.parse(file);
        let module = file.split(`${path}/`)[1];
        if (pathObj.name === 'index') {
            module = module.split('/index')[0];
        }
        return {
            file,
            name: pathObj.name,
            module
        };
    });
    // fix routing heirarchy by calling .reverse
    return files.reverse();
}
let loadRoutes = function (route, app, files) {
    files === null || files === void 0 ? void 0 : files.map(f => {
        app.use([route, f.module].join('/'), require(f.file).default);
    });
};
let init = function (route, app, files) {
    if (!files)
        files = getFiles(route);
    loadRoutes(route, app, files);
};
exports.init = init;

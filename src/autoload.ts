import { Express } from 'express';
import glob from 'glob';
import Path from 'path';


interface RouteFile {
  file: string;
  name: string;
  module: string;
}

interface LoadRoute {
  (
    route: string,
    app: Express,
    files?: RouteFile[]
  ):void;
}

function getFiles(path: string) {
  // list api files
  let pathFiles = glob.sync(`./src${path}/**/*.ts`);
  
  // extract api path
  let files: RouteFile[] = pathFiles.map(f => {
    let file = f.split('/src/').join('/').split('.ts')[0];
    let pathObj = Path.parse(file);
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

let loadRoutes: LoadRoute = function(route, app, files) {
  files?.map(
    f => {
      app.use(
        [route,f.module].join('/'),
        require(f.file).default
      );
    }
  );
}

export let init: LoadRoute = function(route, app):void {
  let files = getFiles(route);
  loadRoutes(route, app, files);
}
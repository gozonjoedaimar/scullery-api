import glob from 'glob';
import Path from 'path';

function getFiles(path: string): RouteFile[] {
  // list api files
  let pathFiles = glob.sync(`./src${path}/**/*.ts`);
  
  // extract api path
  let files = pathFiles.map(f => {
    let file = f.split('/src/').join('/').split('.ts')[0]; // trim path name
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

export let init: LoadRoute = function(route, app, files):void {
  if (!files) files = getFiles(route);
  loadRoutes(route, app, files);
}
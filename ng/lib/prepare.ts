import path from 'path';
import fs from 'fs-extra';
import stripJsonComments from 'strip-json-comments';

export default async function prepare(entry: string) {
  /**
   * Angular Json
   */
  const angular: Angular = await read('angular.json');

  const project = angular.projects[angular.defaultProject];

  const options = project.architect.build.options;

  const extStyle = project.schematics['@schematics/angular:component'].style;

  const main = path.resolve(entry);

  const index = (await getFile(main, 'html')) || options.index;

  const styles = [...options.styles];

  const style = await getFile(main, extStyle);

  if (style) {
    styles.push(style);
  }

  await output('angular.json', {
    ...angular,
    projects: {
      [angular.defaultProject]: {
        ...project,
        architect: {
          ...project.architect,
          build: {
            ...project.architect.build,
            options: {
              ...project.architect.build.options,
              main,
              index,
              styles,
            },
          },
        },
      },
    },
  } as Angular);

  /**
   * TsConfig
   */
  const tsApp: TSAppJSON = await readRaw(options.tsConfig);

  const [, polyfills] = tsApp.files;

  await output(options.tsConfig, {
    ...tsApp,
    files: [main, polyfills],
  } as TSAppJSON);

  /**
   * Restore Config
   */
  return async () => {
    await output('angular.json', angular);
    await output(options.tsConfig, tsApp);
  };
}

export async function getFile(entry: string, ext: string) {
  const file = entry.replace(/\.ts$/, '.' + ext);

  if (await fs.pathExists(file)) {
    return file;
  }

  return '';
}

export async function output(file: string, data: any) {
  return await fs.outputJSON(path.resolve(file), data, { spaces: 2 });
}

export async function readRaw(file: string) {
  const data = await fs.readFile(file, 'utf8');

  return JSON.parse(stripJsonComments(data));
}

export async function read(file: string) {
  return fs.readJSON(path.resolve(file));
}

/**
 * Types
 */
type TSAppJSON = typeof import('../app/tsconfig.app.json');

interface Angular extends Omit<AngularJSON, 'projects'> {
  projects: {
    [app: string]: App;
  };
}

type App = AngularJSON['projects']['app'];

type AngularJSON = typeof import('../angular.json');

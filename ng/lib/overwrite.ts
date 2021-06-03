import * as fs from 'fs-extra';
import stripJsonComments from 'strip-json-comments';
import { file } from './paths';

export async function overWrite(entry: string) {
  const angular = await fs.readJSON(file.angular.current);

  const tsConfig = await parseTsConfig();

  const [nextAngular, currentMain, nextMain] = await setAngular(angular, entry);

  const nextTsConfig = setTsConfig(tsConfig, currentMain, nextMain);

  await fs.outputJson(file.angular.current, nextAngular, { spaces: 2 });

  await fs.outputJson(file.tsConfig.current, nextTsConfig, { spaces: 2 });
}

function generateEntrys(target: string, extStyle: string) {
  let main = target;

  if (main.endsWith('.')) {
    main = main + 'dev.ts';
  }

  return {
    main,
    html: main.replace(/.ts$/, '.html'),
    style: main.replace(/.ts$/, `.${extStyle}`),
  };
}

export async function setAngular(angular: any, target: string) {
  const { defaultProject } = angular;

  const currentMain =
    angular.projects[defaultProject].architect.build.options.main;

  const extStyle =
    angular.projects[defaultProject].schematics['@schematics/angular:component']
      .style;

  let styles = angular.projects[defaultProject].architect.build.options.styles;

  const { main, html, style } = generateEntrys(target, extStyle);

  const existsFiles =
    (await fs.pathExists(main)) && (await fs.pathExists(html));

  if (!existsFiles) {
    throw new Error('not found entry files');
  }

  const existsStyle = await fs.pathExists(style);

  if (existsStyle) {
    styles = [style, ...styles];
  }

  const config = {
    ...angular,
    projects: {
      [defaultProject]: {
        ...angular.projects[defaultProject],
        architect: {
          ...angular.projects[defaultProject].architect,
          build: {
            ...angular.projects[defaultProject].architect.build,
            options: {
              ...angular.projects[defaultProject].architect.build.options,
              main,
              index: html,
              styles,
            },
          },
        },
      },
    },
  };

  return [config, currentMain, main] as const;
}

export function setTsConfig(tsConfig: any, main: string, entry: string) {
  const files = tsConfig.files.filter((file: string) => file !== main);

  return { ...tsConfig, files: [entry, ...files] };
}

export async function parseTsConfig() {
  const data = await fs.readFile(file.tsConfig.current, 'utf-8');

  const normalize = stripJsonComments(data);

  return JSON.parse(normalize);
}

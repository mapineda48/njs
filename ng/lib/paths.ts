import * as path from 'path';

export const root = path.resolve();
export const dirname = path.join(__dirname, '..');
export const backup = path.join(dirname, '.backup');

const createFile: CreateFile = (arg) => {
  const res: any = {};

  Object.entries(arg).forEach(([key, val]) => {
    res[key] = {
      name: val,
      current: path.resolve(val),
      backup: path.join(backup, val),
    };
  });

  return res;
};

export const file = createFile({
  angular: 'angular.json',
  tsConfig: 'tsconfig.app.json',
});

export const files = Object.values(file);

/**
 * types
 */

type CreateFile = <T extends { [K: string]: string }>(
  arg: T
) => {
  [K in keyof T]: {
    name: string;
    current: string;
    backup: string;
  };
};

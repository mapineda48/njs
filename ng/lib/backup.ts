import * as fs from 'fs-extra';
import { backup, files } from './paths';

export async function prepareBakup() {
  const promises = files.map(async ({ current, backup }) => {
    await fs.copy(current, backup, { overwrite: true });
  });

  await Promise.all(promises);

  return restoreBackup;
}

export async function restoreBackup() {
  const promises = files.map(async ({ current, backup }) => {
    try {
      await fs.copy(backup, current, { overwrite: true });
    } catch (error) {
      console.log(error);
    }
  });

  await Promise.all(promises);
}

export function restoreBackupSync() {
  if (!fs.existsSync(backup)) return;

  files.forEach(({ current, backup }) => {
    fs.copySync(backup, current, { overwrite: true });
  });
}

export function clearBackup() {
  fs.removeSync(backup);
}

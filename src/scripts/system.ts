import {exec} from 'node:child_process';

export async function changeSystemDate(date: Date) {
  const formattedDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;

  return new Promise((resolve, reject) => {
    exec(`date -s "${formattedDate}"`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      if (stderr) {
        resolve(stderr);
        return;
      }

      resolve(stdout);
    });
  });
}

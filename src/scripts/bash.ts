import {exec} from 'node:child_process';

export async function runCanvasAutoCommit(commits: number) {
  console.log('run bash bin/canvas-auto-commit.sh');

  return new Promise((resolve, reject) => {
    exec(`bash bin/canvas-auto-commit.sh ${commits}`, (error, stdout, stderr) => {
      console.log('run bash bin/canvas-auto-commit.sh done');

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

export async function runDockerInitialization() {
  return new Promise((resolve, reject) => {
    exec('bash bin/docker-initialization.sh', (error, stdout, stderr) => {
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


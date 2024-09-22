import {config} from '../config.js';
import {getNextDay} from './date.js';
import {generateMatrixFromString, getMatrixValueAtDate} from './matrix.js';
import {runDockerInitialization, runCanvasAutoCommit} from './scripts/bash.js';
import {changeSystemDate} from './scripts/system.js';

// This script will be run with `npm run setup`
// The purpose of this is to trick the datetime of the host machine to then create commits and push then to the canvas repo.
const startDate = new Date(config.patternStartDate);
let currentDate = new Date(startDate);
const endDate = new Date(config.now);
endDate.setUTCHours(12);
endDate.setUTCMinutes(0);
endDate.setUTCSeconds(0);
endDate.setUTCMilliseconds(0);

const matrix = generateMatrixFromString(config.patternToDraw);

await runDockerInitialization();

while (currentDate.getTime() < endDate.getTime()) {
  // Change host datetime
  await changeSystemDate(currentDate);
  console.log(currentDate);

  // Create the commits to the repo
  const boolean = getMatrixValueAtDate(startDate, currentDate, matrix);
  await (boolean ? runCanvasAutoCommit(100) : runCanvasAutoCommit(1));

  // Increment to next day
  currentDate = getNextDay(currentDate);
}

console.log('Done');

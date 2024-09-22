#!/usr/bin/env node
import {config} from '../config.js';
import {generateMatrixFromString, getMatrixValueAtDate, printMatrixToTerminal} from './matrix.js';
import {runCanvasAutoCommit} from './scripts/bash.js';

// This is triggered by the `npm run start` command.
// Its purpose it to know if we need to commit large amount of commits or not for the current day !
// In all cases we will generate commits. To normalize the appearance of the commit graph.
const matrix = generateMatrixFromString(config.patternToDraw);
const boolean = getMatrixValueAtDate(config.patternStartDate, config.now, matrix);
printMatrixToTerminal(matrix);

const result = await (boolean ? runCanvasAutoCommit(100) : runCanvasAutoCommit(1));

console.log(result);
console.log('Done');

import {config} from '../config.js';
import {generateMatrixFromString, printMatrixToTerminal} from './matrix.js';

const matrix = generateMatrixFromString(config.patternToDraw);
printMatrixToTerminal(matrix);

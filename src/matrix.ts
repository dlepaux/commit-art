import {alphabet} from './alphabet.js';
import {daysBetweenDates} from './date.js';
import {symbols} from './symbols.js';

export const square = '■';
export const space = ' ';

export function printMatrixToTerminal(matrix: number[][]) {
  const newMatrix: string[][] = [];

  for (const [index, row] of matrix.entries()) {
    const rowString: string[] = [];

    for (const cell of row) {
      rowString.push(cell ? square : space);
    }

    newMatrix.push(rowString);
    if (index === 0) {
      console.log('Note that github contribution board shows up to', 53, 'weeks !');
      console.log("You're using", rowString.length, 'weeks.');
    }

    console.log(...rowString);
  }
}

const spaceAlphabet = alphabet[' ']!;
const doubleSpaceAlphabet = alphabet['  ']!;

/**
 * Generates a matrix of characters, symbols, and pixel art from a given string.
 * Examples:
 * 'I ♥ GitHub'
 * 'DevTools'
 * 'Code,commit,repeat'
 *
 * @param inputString - The string to be transformed into a matrix.
 * @returns A matrix of numbers representing characters, symbols, and special pixel art.
 */
export function generateMatrixFromString(inputString: string): number[][] {
  const parsedSymbols: Array<number[][] | string> = [];

  // Replace recognized words with symbols, otherwise keep the word as is
  const wordsArray = inputString.split(' ');
  for (const [index, word] of wordsArray.entries()) {
    parsedSymbols[index] = symbols[word] ?? word;
  }

  // Insert spaces between words
  const symbolsWithSpaces: Array<number[][] | string> = [];
  for (const [index, symbol] of parsedSymbols.entries()) {
    symbolsWithSpaces.push(symbol);

    if (index !== parsedSymbols.length - 1) {
      symbolsWithSpaces.push(doubleSpaceAlphabet);
    }
  }

  // Add the individual chars
  const processedMatrix: number[][][] = [];
  for (const symbolOrWord of symbolsWithSpaces) {
    if (typeof symbolOrWord === 'string') {
      const charactersArray: string[] = [...symbolOrWord];
      for (const [index, char] of charactersArray.entries()) {
        if (alphabet[char]) {
          processedMatrix.push(alphabet[char]);
          if (index !== charactersArray.length - 1) {
            processedMatrix.push(spaceAlphabet);
          }
        }
      }
    } else {
      processedMatrix.push(symbolOrWord);
    }
  }

  // Merge all matrices together
  let finalMatrix: number[][] = [];
  for (const matrixChunk of processedMatrix) {
    finalMatrix = finalMatrix.length === 0 ? matrixChunk : merge(finalMatrix, matrixChunk);
  }

  return finalMatrix;
}

function merge(parentMatrix: number[][], childMatrix: number[][], space = 0, height = 7): number[][] {
  const [childFirstLine] = childMatrix;
  if (!childFirstLine) {
    throw new Error('Child matrix cant be empty');
  }

  const spaces = new Array(space).fill(0) as number[];
  const cols = childFirstLine.length;
  const offset = height - childMatrix.length;
  const hasOffset = offset !== 0;
  const full: number[][] = [];

  for (let i = 0; i < height; i++) {
    const parentLine = parentMatrix[i]!;
    const childLine = hasOffset && i < offset ? (new Array(cols).fill(0) as number[]) : childMatrix[i - offset]!;
    full.push([...parentLine, ...spaces, ...childLine]);
  }

  return full;
}

export function getMatrixValueAtDate(dateStart: Date, dateEnd: Date, matrix: number[][]) {
  const daysFromStart = daysBetweenDates(dateStart, dateEnd);

  // Now we need to compute the position of the current square
  const line = daysFromStart % 7;
  const column = Math.trunc(daysFromStart / 7);

  // Extract the value on the matrix
  const currentLine = matrix[line]!;
  const boolean = Boolean(currentLine[column]);

  return boolean;
}

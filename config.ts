type Config = {
  pathToRepository: string;
  patternStartDate: Date;
  now: Date;
  patternToDraw: string;
};

export const config: Config = {
  now: new Date(),
  // Relative path to the canvas repository
  pathToRepository: '../commit-art-canvas',
  // This date MUST be a Sunday (because github show it this way) and must be this format YYYY-MM-DD at 12:00 UTC
  patternStartDate: new Date('2023-09-17T12:00:00.000Z'),
  // The pattern you want to draw
  // Some examples:
  // patternToDraw: 'I ♥ DevTools',
  // patternToDraw: 'I ♥ Next.JS',
  // patternToDraw: 'I ♥ JavaScript',
  // patternToDraw: 'I ♥ TypeScript',
  // patternToDraw: 'Hire Me !',
  // patternToDraw: "I'm hiring !",
  // patternToDraw: "You're Awesome ♥",
  patternToDraw: 'BIRD CACTUS2-O DINO',
};

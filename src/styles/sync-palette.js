import fs from 'fs';

import getTheme from './theme.js';

console.log('Working on syncing MUI palette to Tailwind palette...');

const { palette: darkPalette } = getTheme('dark');
const { palette: lightPalette } = getTheme('light');

const defaultRootStyle = `
@import "tailwindcss";

:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@layer base {
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}`;

/**
 * @const
 */
const paletteKeys = [
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
  'text',
];

const cssVariables = paletteKeys.reduce((result, currentKey) => {
  if (currentKey in darkPalette && currentKey in lightPalette) {
    result += Object.entries(darkPalette[currentKey]).reduce(
      (res, [subKey, darkColor]) => {
        const lightColor = lightPalette[currentKey][subKey];

        if (lightColor && darkColor) {
          res += `--color-${currentKey}-${subKey}: light-dark(${lightColor}, ${darkColor});\n`;
        }

        return res;
      },
      '',
    );
  }

  return result;
}, '');

fs.writeFileSync(
  'src/styles/index.css',
  `${defaultRootStyle}

@theme{
${cssVariables}
}`,
);

console.log('Sync palettes successfully.');

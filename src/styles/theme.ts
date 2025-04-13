import { createTheme, PaletteMode } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    link: true;
  }
}

const getTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'link' },
            style: {
              color: 'inherit',
            },
          },
        ],
      },
    },
  });
};

export default getTheme;

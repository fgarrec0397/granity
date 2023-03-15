import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import theme from "../src/Theme/theme"
import { themes } from '@storybook/theming';


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
}

export const withMuiTheme = (Story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

export const decorators = [
  withMuiTheme,
];
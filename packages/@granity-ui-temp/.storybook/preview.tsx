import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from "../src/Themes/theme"
import { themes } from '@storybook/theming';
import GlobalStyles from "../src/Themes/globalStyle"

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

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {Story()}
    </ThemeProvider>
  ),
];
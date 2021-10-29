import { css } from "styled-components";

const greyPalette = {
  darker: "#0f1419",
  dark: "#657786",
  light: "#818f99",
  lighter: "#E1E8ED",
  lightest: "#F5F8FA",
};

const borderRadius = {
  small: "0.5em",
  main: "1em",
};

export default {
  colors: {
    primary: "#1DA1F2",
    secondary: "#14171A",
    error: "##f10000",
    background: "#fff",
    text: {
      light: greyPalette.light,
      darker: greyPalette.darker,
      main: greyPalette.dark,
    },
    disabled: {
      lighter: greyPalette.lighter,
      main: greyPalette.dark,
    },
    grey: greyPalette,
  },
  shadows: {
    small: "0px 2px 5px rgba(0, 0, 0, 0.15)",
    main: "0px 10px 35px rgba(0, 0, 0, 0.17)",
  },
  border: {
    main: `1px solid ${greyPalette.lighter}`,
  },
  borderRadius: {
    small: borderRadius.small,
    main: borderRadius.main,
  },
  text: {
    p: {
      css: css`
        font-size: 1rem;
        color: ${greyPalette.darker};
      `,
    },
    h1: {
      size: ["2rem", "2.25rem", "2.5rem", "2.75rem", "3rem"],
    },
    h2: {
      size: ["1.5rem", "1.75rem", "2rem", "2.25rem", "2.5rem"],
    },
    h3: {
      size: ["1rem", "1rem", "1.25rem", "1.75rem", "2rem"],
    },
  },
  spacing: {
    smallest: "0.25rem",
    smaller: "0.5rem",
    small: "0.75rem",
    main: "1rem",
    large: "1.5rem",
    larger: "2rem",
    xLarge: "3rem",
  },
  form: {
    input: {
      css: css`
        background-color: ${greyPalette.light};
        border-radius: ${borderRadius.small};
        border: none;
        width: 100%;
        padding: 1em;
        border: 2px solid ${greyPalette.light};
        font-family: "Roboto", sans-serif;

        &:focus {
          border-color: #c1c1c1;
          outline: 0;
        }

        &::placeholder {
          font-style: italic;
          font-weight: bold;
        }
      `,
    },
    label: {
      css: css`
        font-family: sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 1em;
        line-height: 147.2%;
      `,
    },
  },
  navbar: {
    height: "86px",
  },
  overlays: {
    light: "rgba(255, 255, 255, 0.6)",
  },
};

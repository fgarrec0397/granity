import { Html, RoundedBox } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { Input } from "antd";
import React, { FC } from "react";
import styled, { css } from "styled-components";
import Box from "./Box";
import StyledWrapper, { StyledWrapperProps } from "./StyledWrapper";
import Search from "../Icons/Search";
import Typography, { TypographyStyles } from "./Typography";
import { dotBeforeStyles } from "../theme/mixins";
import baseTheme from "../theme/baseTheme";
import Link, { LinkStyles } from "./Link";

interface Props {
  scale: Vector3;
  position: Vector3;
}

interface SuggestionsStyles {
  searchWrapper?: StyledWrapperProps;
  suggestionsWrapper?: StyledWrapperProps;
  suggestionsTitle?: TypographyStyles;
  newsWrapper?: StyledWrapperProps;
  newsItem?: StyledWrapperProps;
  newsCategoryWrapper?: StyledWrapperProps;
  newsCategory?: TypographyStyles;
  newsType?: TypographyStyles;
  newsTitle?: TypographyStyles;
  showMoreLink?: LinkStyles;
}

const styles: SuggestionsStyles = {
  searchWrapper: {
    css: css`
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.25em 1em;
      background-color: #eff3f4;
      border-radius: 2em;
    `,
  },
  suggestionsWrapper: {
    css: css`
      background-color: #f7f9f9;
      border-radius: 1em;
    `,
  },
  suggestionsTitle: {
    css: css`
      padding: 0.75rem 1rem 0.5rem;
      font-size: 20px;
      font-weight: bold;
      color: #0f1419;
    `,
  },
  newsItem: {
    css: css`
      padding: 0.75em 1em;
    `,
  },
  newsCategoryWrapper: {
    css: css`
      display: flex;
      align-items: center;
    `,
  },
  newsCategory: {
    css: css`
      font-size: 13px;
      color: rgb(83, 100, 113);
    `,
  },
  newsType: {
    css: css`
      font-size: 13px;
      color: rgb(83, 100, 113);
      ${dotBeforeStyles()}
    `,
  },
  newsTitle: {
    css: css`
      display: block;
      margin: 4px 0;
      font-size: 15px;
      font-weight: bold;
      line-height: 1.3;
    `,
  },
  showMoreLink: {
    css: css`
      color: ${baseTheme.colors.primary};
      font-size: 14px;
    `,
  },
};

const SearchInput = styled.input`
  width: 85%;
  background-color: #eff3f4;
  border: none;

  &:focus-visible {
    outline: none;
  }
`;

const elementsWidthPx = 269;

const Suggestions: FC<Props> = ({ scale, position }) => {
  return (
    <group position={position}>
      <Box
        position={[0, 0, 0]}
        scale={[0.75, 0.15, 0.5]}
        heightPx={51}
        widthPx={elementsWidthPx}
        padding=".4em 1em"
        text="2 Hello motha fuck***"
      >
        <StyledWrapper {...styles.searchWrapper}>
          <Search />
          <SearchInput type="search" placeholder="Search Twitter" />
        </StyledWrapper>
      </Box>
      <Box
        position={[0, -(1.1 / 2 + 0.15 / 2 + 0.025), 0]}
        scale={[0.75, 1.1, 0.5]}
        heightPx={396}
        widthPx={elementsWidthPx}
        padding=".4em 1em"
        styles={{
          display: "flex",
          alignItems: "center",
        }}
        text="2 Hello motha fuck***"
      >
        <StyledWrapper {...styles.suggestionsWrapper}>
          <Typography as="h2" {...styles.suggestionsTitle}>
            What's happening
          </Typography>
          <StyledWrapper {...styles.newsWrapper}>
            <StyledWrapper {...styles.newsItem}>
              <StyledWrapper {...styles.newsCategoryWrapper}>
                <Typography {...styles.newsCategory}>NHL</Typography>
                <Typography {...styles.newsType}>Trending</Typography>
              </StyledWrapper>
              <Typography {...styles.newsTitle}>Jack Campbell</Typography>
            </StyledWrapper>
            <StyledWrapper {...styles.newsItem}>
              <StyledWrapper {...styles.newsCategoryWrapper}>
                <Typography {...styles.newsCategory}>Video game</Typography>
                <Typography {...styles.newsType}>Trending</Typography>
              </StyledWrapper>
              <Typography {...styles.newsTitle}>
                Animal Crossing: New Horizons 2.0 is out now
              </Typography>
              <Typography {...styles.newsCategory}>1.2k Tweets</Typography>
            </StyledWrapper>
            <StyledWrapper {...styles.newsItem}>
              <StyledWrapper {...styles.newsCategoryWrapper}>
                <Typography {...styles.newsCategory}>Television</Typography>
                <Typography {...styles.newsType}>21 minutes ago</Typography>
              </StyledWrapper>
              <Typography {...styles.newsTitle}>
                Law & Order: Organized Crime airing on NBC
              </Typography>
            </StyledWrapper>
            <StyledWrapper {...styles.newsItem}>
              <Link to="/" {...styles.showMoreLink}>
                Show more
              </Link>
            </StyledWrapper>
          </StyledWrapper>
        </StyledWrapper>
      </Box>
      <Box
        position={[0, -(0.75 + 1.1 / 2 + 0.15 / 2 + 0.025 * 2), 0]} // fix this
        scale={[0.75, 0.75, 0.5]}
        heightPx={0}
        widthPx={elementsWidthPx}
        padding=".4em 1em"
        styles={{
          display: "flex",
          alignItems: "center",
        }}
        text="2 Hello motha fuck***"
      >
        {/* <StyledWrapper {...styles.suggestionsWrapper}>
          <Typography as="h2" {...styles.suggestionsTitle}>
            What's happening
          </Typography>
          <StyledWrapper {...styles.newsWrapper}>
            <StyledWrapper {...styles.newsItem}>
              <StyledWrapper {...styles.newsCategoryWrapper}>
                <Typography {...styles.newsCategory}>NHL</Typography>
                <Typography {...styles.newsType}>Trending</Typography>
              </StyledWrapper>
              <Typography {...styles.newsTitle}>Jack Campbell</Typography>
            </StyledWrapper>
            <StyledWrapper {...styles.newsItem}>
              <StyledWrapper {...styles.newsCategoryWrapper}>
                <Typography {...styles.newsCategory}>Video game</Typography>
                <Typography {...styles.newsType}>Trending</Typography>
              </StyledWrapper>
              <Typography {...styles.newsTitle}>
                Animal Crossing: New Horizons 2.0 is out now
              </Typography>
              <Typography {...styles.newsCategory}>1.2k Tweets</Typography>
            </StyledWrapper>
            <StyledWrapper {...styles.newsItem}>
              <StyledWrapper {...styles.newsCategoryWrapper}>
                <Typography {...styles.newsCategory}>Television</Typography>
                <Typography {...styles.newsType}>21 minutes ago</Typography>
              </StyledWrapper>
              <Typography {...styles.newsTitle}>
                Law & Order: Organized Crime airing on NBC
              </Typography>
            </StyledWrapper>
            <StyledWrapper {...styles.newsItem}>
              <Link to="/" {...styles.showMoreLink}>
                Show more
              </Link>
            </StyledWrapper>
          </StyledWrapper>
        </StyledWrapper> */}
      </Box>
    </group>
  );
};

export default Suggestions;

// <Box position={[1, 0, 0]} scale={scale} text="3 Hello motha fuck***" />

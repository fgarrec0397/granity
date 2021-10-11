import React, { FC } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";
import baseTheme from "../theme/baseTheme";

export interface LinkStyles {
  css?: FlattenSimpleInterpolation;
}

export interface LinkComponents {
  to?: string;
}

type Props = LinkStyles & LinkComponents;

const LinkComponent = styled.a<LinkStyles>`
  color: ${baseTheme.colors.text.darker};

  &:hover {
    color: ${baseTheme.colors.text.darker};
  }

  ${(props) => props.css}
`;

const Link: FC<Props> = ({ to, css, children }) => {
  return (
    <LinkComponent href={to} css={css}>
      {children}
    </LinkComponent>
  );
};

export default Link;

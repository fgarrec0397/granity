import React, { FC } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

interface Props {
  as?: string;
  css?: FlattenSimpleInterpolation;
}

const Wrapper: FC<Props> = ({ as = "div", css, children, ...props }) => {
  const AsComponent: any = as;
  return (
    <AsComponent css={css} {...props}>
      {children}
    </AsComponent>
  );
};

const StyledWrapper = styled(Wrapper)`
  ${(props) => props.css}
`;

export default StyledWrapper;

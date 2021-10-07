import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  to?: string;
}

const LinkComponent = styled.a``;

const Link: FC<Props> = ({ to, children }) => {
  return <LinkComponent href={to}>{children}</LinkComponent>;
};

export default Link;

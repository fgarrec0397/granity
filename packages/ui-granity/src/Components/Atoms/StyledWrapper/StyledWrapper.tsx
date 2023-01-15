import { HasChildren } from "helpers-granity";
import { FC } from "react";
import styled from "styled-components";

import { ThemedFlattenInterpolation } from "../../../Themes";

export interface StyledWrapperProps {
    css?: ThemedFlattenInterpolation;
}

type Props = StyledWrapperProps &
    HasChildren & {
        as?: string;
        onClick?: (event: MouseEvent) => void;
    };

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

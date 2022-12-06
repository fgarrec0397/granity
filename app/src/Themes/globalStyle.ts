import { createGlobalStyle } from "styled-components";

import resetSheet from "./resetSheet";
import { rootFontSize } from "./themesConstants";

export default createGlobalStyle`
	${resetSheet}

	@import url(${({ theme }) => theme.typography.fontFamilyURL});

	body {
		font-family: ${({ theme }) => theme.typography.fontFamily.main};
		font-size: ${rootFontSize}px;
		color: ${({ theme }) => theme.colors.common.text};
	}
`;

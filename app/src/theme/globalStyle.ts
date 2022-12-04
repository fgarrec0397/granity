import { rootFontSize } from "@themes/themesConstants";
import { createGlobalStyle } from "styled-components";

import baseTheme from "./baseTheme";
import resetSheet from "./resetSheet";

export default createGlobalStyle`
	${resetSheet}
	
	@import url('${({ theme }) => theme.typography.fontFamilyURL}');

	body {
		font-family: 'DM Sans', sans-serif;
		font-size: ${rootFontSize}px;
	}
`;

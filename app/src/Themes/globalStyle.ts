import { createGlobalStyle } from "styled-components";

import { scrollbarStyles } from "./mixins/scrollbar";
import resetSheet from "./resetSheet";
import { rootFontSize } from "./themesConstants";

export default createGlobalStyle`
	${resetSheet}

	@import url(${({ theme }) => theme.typography.fontFamilyURL});

	* {
    	box-sizing: border-box;
	}
	
	html,
	body,
	#root {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	body {
		font-family: ${({ theme }) => theme.typography.fontFamily.main};
		font-size: ${rootFontSize}px;
		color: ${({ theme }) => theme.colors.common.text};
		
		${scrollbarStyles()}
	}


`;

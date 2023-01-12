import { createGlobalStyle } from "styled-components";

import { scrollbarStyles } from "./mixins/scrollbar";
import resetSheet from "./resetSheet";
import { rootFontSize } from "./themesConstants";
import { getColor, getTypography } from "./utils";

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
		font-family: ${getTypography("fontFamily.main")};
		font-size: ${rootFontSize}px;
		color: ${getColor("common.text")};
		
		${scrollbarStyles()}
	}

	/* Variables */
	:root {
		--toastify-color-dark: ${getColor("common.backgroundDark")};
	}



`;

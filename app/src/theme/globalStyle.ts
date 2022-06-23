import { createGlobalStyle } from "styled-components";

import baseTheme from "./baseTheme";
import resetSheet from "./resetSheet";

export default createGlobalStyle`
	${resetSheet}

	body {
		color: ${baseTheme.colors.secondary};
	}

	h1 {
		font-weight: 900;
		font-size: 32px;
		line-height: 147.2%;

	}
`;

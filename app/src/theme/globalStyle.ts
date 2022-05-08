import { createGlobalStyle } from "styled-components";
import resetSheet from "./resetSheet";
import baseTheme from "./baseTheme";

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

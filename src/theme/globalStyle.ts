import { createGlobalStyle } from "styled-components";
import resetSheet from "./resetSheet";
import baseTheme from "./baseTheme";

export default createGlobalStyle`
	${resetSheet}

	@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700;800;900&family=Roboto:wght@400;700;900&display=swap');
	body {
		color: ${baseTheme.colors.secondary};
	}

	h1 {
		font-weight: 900;
		font-size: 32px;
		line-height: 147.2%;

	}
`;

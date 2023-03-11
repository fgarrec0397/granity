import { Box, BoxProps } from "@granity-ui/Components";
import { pxToRem } from "@granity-ui/Theme";
import Logo from "components/Logo";

type SideBarStyles = {
    wrapper?: BoxProps;
    logoWrapper?: BoxProps;
};

const styles: SideBarStyles = {
    wrapper: {
        sx: {
            backgroundColor: "red",
            padding: pxToRem(0, 30),
        },
    },
};

const SideBar = () => {
    return (
        <Box {...styles.wrapper}>
            <Logo />
        </Box>
    );
};

export default SideBar;

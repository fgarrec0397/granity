import { Box, BoxProps } from "@granity-ui/Components";

type AppBarStyles = {
    wrapper?: BoxProps;
    logoWrapper?: BoxProps;
};

const styles: AppBarStyles = {
    wrapper: {
        sx: {
            backgroundColor: "green",
        },
    },
};

const AppBar = () => {
    return <Box {...styles.wrapper}>App bar</Box>;
};

export default AppBar;

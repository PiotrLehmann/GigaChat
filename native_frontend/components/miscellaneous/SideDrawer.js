import { Box, Text, View } from "native-base";

export default SideDrawer = ({ display, w, backgroundColor, height }) => {
  return (
    <Box
      display={display}
      w={w}
      backgroundColor={backgroundColor}
      height={height}
    >
      <Text>SideDrawer</Text>
    </Box>
  );
};

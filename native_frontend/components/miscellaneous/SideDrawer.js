import { Box, Button, Center, SearchIcon, Text, Tooltip } from "native-base";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

export default SideDrawer = ({ display, w, backgroundColor, height }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  return (
    <>
      <Box
        style={styles.box}
        // display={display}
        // w={w}
        // backgroundColor={backgroundColor}
        height={height}
      >
        <Center>
          <Tooltip
            label="Click here to read more"
            // placement="bottom right"
            openDelay={500}
          >
            <Pressable style={styles.button}>
              <Text color="white">Search user</Text>
              <SearchIcon color="white" paddingRight={8} />
            </Pressable>
          </Tooltip>
        </Center>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 5,
    // borderColor: "white"
  },
  button: {
    backgroundColor: "#007FFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    display: "flex",
    flexDirection: "row",
  },
});

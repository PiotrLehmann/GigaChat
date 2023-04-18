import {
  Box,
  Button,
  Center,
  ChevronDownIcon,
  FavouriteIcon,
  HamburgerIcon,
  Menu,
  SearchIcon,
  Text,
  Tooltip,
} from "native-base";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import ProfileModal from "./ProfileModal";

export default SideDrawer = ({ display, w, backgroundColor, height }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Box
        style={styles.box}
        // display={display}
        // w={w}
        // backgroundColor={backgroundColor}
        height={height}
      >
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
        <Center>
          <Text>Gigachat</Text>
        </Center>
        <Box style={styles.menu}>
          <FavouriteIcon paddingRight={10} />
          <Menu
            w="190"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                  style={styles.menu}
                >
                  <Text>Settings</Text>
                  <ChevronDownIcon paddingRight={8} />
                </Pressable>
              );
            }}
          >
            <ProfileModal isModalVisible={isModalVisible}>
              <Menu.Item onPress={handleToggleModal}>My profile</Menu.Item>
            </ProfileModal>
            <Menu.Item>Logout</Menu.Item>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  menu: {
    display: "flex",
    flexDirection: "row",
  },
});

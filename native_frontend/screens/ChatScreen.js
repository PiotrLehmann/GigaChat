import { Text, View } from "native-base";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "native-base";
import SideDrawer from "../components/miscellaneous/SideDrawer";

export default ChatScreen = ({ navigation }) => {
  const { user } = ChatState();

  return (
    <View style={{ width: "100%" }}>
      {/* {user && <SideDrawer />} */}
      {/* <Box> */}
      {/* {user && <MyChats />} */}
      {/* {user && <ChatBox />} */}
      {/* </Box> */}
    </View>
  );
};

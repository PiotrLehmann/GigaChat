import { Text, View } from "native-base";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "native-base";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import { SafeAreaView } from "react-native-safe-area-context";

export default ChatScreen = ({ navigation }) => {
  const { user } = ChatState();

  return (
    <SafeAreaView>
      <View style={{ width: "100%" }}>
        {user && (
          <SideDrawer
            display="flex"
            w="100%"
            backgroundColor="blue"
            height="10%"
          />
        )}
        <Box display="flex" w="100%" backgroundColor="grey" height="90%">
          {user && <MyChats />}
        </Box>
      </View>
    </SafeAreaView>
  );
};

import { Center, Text, View } from "native-base";
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
        <Center>
          <Text fontSize="2xl" mt={30}>
            CHATS
          </Text>
          <MyChats />
        </Center>
      </View>
    </SafeAreaView>
  );
};

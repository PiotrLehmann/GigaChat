import {
  View,
  Text,
  Pressable,
  useToast,
  Box,
  Button,
  HStack,
  Spinner,
  Heading,
  ScrollView,
} from "native-base";
import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { getSender } from "../config/ChatLogics";

const MyChats = () => {
  let loggedUser = {};
  // let selectedChat = {};
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem(
            "LoggedUserToken"
          )}`,
        },
      };

      toast.show({
        description: "Chats loading..." + chats,
      });

      const { data } = await axios.get(
        "https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/chat/",
        config
      );

      // console.log("DATA: " + data);

      await setChats(data);
      toast.show({
        description: "Chats loaded: " + chats,
      });
      // await AsyncStorage.setItem("chats", JSON.stringify(data));
      // console.log("STRINGIFIED DATA: " + await AsyncStorage.getItem("chats"));
    } catch (error) {
      toast.show({
        description: "Failed to load the chats",
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      loggedUser = JSON.parse(await AsyncStorage.getItem("userInfo")); // there will be bugs if you use asyncstorage with useState().
      await fetchChats();
    }
    fetchData();
  }, []);

  const consoleChat = async () => {
    console.log("CHATS: " + chats[0]._id);
  };

  function logChats() {
    chats.map((chat) => console.log("CHAT ID " + chat._id));
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={3}
      background="white"
      width="100%"
      borderRadius="10px"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="28px">My Chats</Text>
        <Button
          onPress={() => {
            chats.map((chat) => console.log("CHAT ID " + chat._id));
          }}
        >
          New group chat
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        p={3}
        background="grey"
        width="100%"
        height="100%"
        borderRadius="10px"
      >
          {chats ? (
            chats.map((chat) => (
            <View>
            <Pressable
              onPress={() => (selectedChat = chat)}
              background={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
              color={selectedChat === chat ? "white" : "black"}
              py={5}
              px={3}
              margin="10px"
              borderRadius="10px"
              key={chat._id}
            >
              <Text fontSize="20px" fontWeight="bold">
                {/* TEXT */}
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName}
              </Text>
            </Pressable>
        </View>
          ))
          ) : (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
          )}
      </Box>
    </Box>
  );
};

export default MyChats;

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
  let chats = [];
  let selectedChat = {};
  // const [selectedChat, setSelectedChat] = useState();
  // const [chats, setChats] = useState();

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

      const { data } = await axios.get(
        "https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/chat/",
        config
      );

      console.log("DATA: " + data);

      await AsyncStorage.setItem("chats", JSON.stringify(data));
      console.log("STRINGIFIED DATA: " + await AsyncStorage.getItem("chats"));

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
      chats = JSON.parse(await AsyncStorage.getItem("chats")); // there will be bugs if you use asyncstorage with useState().
      console.log("NEWLY PARSED CHATS: " + chats);
      // console.log(JSON.parse(await AsyncStorage.getItem("userInfo"))._id);
      // console.log(loggedUser._id); // both work well. YOU CAN ASSIGN ASYNCSTORAGE ITEM TO A LET VARIABLE.
    }
    fetchData();
  }, []);

  const consoleChat = async () => {
    console.log("CHATS: " + chats[0]._id);
  }

  function logChats() {
    chats.map(chat => console.log("CHAT ID " + chat._id));
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
        <Button onPress={() => {chats.map(chat => console.log("CHAT ID " + chat._id))}}>New group chat</Button>
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
          <View>
            {chats.map((chat) => (
              // <Pressable
              //   onPress={() => (selectedChat = chat)}
              //   background={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
              //   color={selectedChat === chat ? "white" : "black"}
              //   py={2}
              //   px={3}
              //   borderRadius="10px"
              //   key={chat._id}
              // >
                <Text>
                  TEXT
                  {/* {!chat.isGroupChat ? (
                    getSender(loggedUser, chat.users)
                  ) : chat.chatName} */}
                </Text>
              // </Pressable>
            ))}
          </View>
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

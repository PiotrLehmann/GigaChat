import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Center,
  Box,
  Button,
  Spinner,
  Input,
  Icon,
  ArrowForwardIcon,
  useToast,
} from "native-base";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com";
let socket, selectedChatCompare;

export default OneChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

  const [selectedChat, setSelectedChat] = useState();
  const [loggedUserId, setLoggedUserId] = useState();
  const [username, setUsername] = useState();

  let token = "";

  const toast = useToast();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    token = await AsyncStorage.getItem("LoggedUserToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);

    const { data } = await axios.get(
      `https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/message/${
        JSON.parse(selectedChat)._id
      }`,
      config
    );

    setMessages(data);
    setLoading(false);

    socket.emit('join chat', JSON.parse(selectedChat)._id);
    try {
    } catch (error) {
      toast.show({
        description: error.message,
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoggedUserId(await AsyncStorage.getItem("LoggedUserId"));
      setSelectedChat(await AsyncStorage.getItem("selectedChat"));
      setUsername(getSender(loggedUserId, JSON.parse(selectedChat).users));
      await fetchMessages();
    }
    fetchData();
  }, [selectedChat]);

  // console.log(messages);
  console.log(loggedUserId);

  const sendMessage = async () => {
    token = await AsyncStorage.getItem("LoggedUserToken");
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          `https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/message`,
          {
            content: newMessage,
            chatId: JSON.parse(selectedChat)._id,
          },
          config
        );

        // console.log(data);

        setMessages([...messages, data]);
      } catch (error) {
        toast.show({
          description: error.message,
        });
      }
    }
  };

  useEffect(() => {
    async function setupSocket() {
      socket = io(ENDPOINT);
      socket.emit("setup", await AsyncStorage.getItem("LoggedUserId"));
      socket.on("connection", () => setSocketConnected(true));
    }
    setupSocket();
  }, []);

  const typingHandler = (value) => {
    setNewMessage(value);

    // Typing Indicator Logic
  };

  return (
    <SafeAreaView>
      <Box
        alignItems="center"
        flexDir="column"
        p={3}
        bg="white"
        height="15%"
        width="100%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="28px"
          pb={3}
          px={2}
          width="100%"
          display="flex"
          justifyContent={{ base: "space-between" }}
          alignItems="center"
        >
          {selectedChat ? username : <></>}
        </Text>

        {/* <Button onPress={() => console.log(JSON.parse(selectedChat)._id)}>
          Selected Chat Storage Console Test
        </Button> */}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        p={3}
        background="#F8E8E8"
        width="100%"
        height="85%"
        borderRadius="10px"
      >
        {loading ? (
          <Spinner size={60} alignSelf="center" marginBottom={60} />
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            // overflowY="none"
          >
            <ScrollableChat
              messages={messages}
              loggedUserId={loggedUserId}
              username={username}
            />
          </Box>
        )}

        <Input
          isRequired
          mt={3}
          placeholder="Start typing a message..."
          borderColor="black"
          placeholderTextColor="black"
          borderRadius={15}
          onChangeText={(value) => typingHandler(value)} // maybe onChangeText?
          value={newMessage}
          InputRightElement={
            <Button
              backgroundColor="black"
              size="xs"
              rounded="none"
              w="1/6"
              onPress={sendMessage}
            >
              <ArrowForwardIcon size={8} color="white" />
            </Button>
          }
        />
      </Box>
    </SafeAreaView>
  );
};

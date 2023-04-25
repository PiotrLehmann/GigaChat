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
} from "native-base";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import { SafeAreaView } from "react-native-safe-area-context";

export default OneChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();

  const [selectedChat, setSelectedChat] = useState();
  let loggedUser = {};

  useEffect(() => {
    async function fetchData() {
      loggedUser = JSON.parse(await AsyncStorage.getItem("userInfo")); // there will be bugs if you use asyncstorage with useState().
      setSelectedChat(await AsyncStorage.getItem("selectedChat"));
    }
    fetchData();
  }, []);

  const sendMessage = () => {};

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
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize={{ base: "28px", md: "30px" }}
          pb={3}
          px={2}
          width="100%"
          display="flex"
          justifyContent={{ base: "space-between" }}
          alignItems="center"
        >
          {selectedChat ? (
            getSender(loggedUser, JSON.parse(selectedChat).users)
          ) : (
            <></>
          )}
        </Text>

        <Button onPress={() => console.log(JSON.parse(selectedChat).chatName)}>
          Selected Chat Storage Console Test
        </Button>
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
          <Box>{/* Messages */}</Box>
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

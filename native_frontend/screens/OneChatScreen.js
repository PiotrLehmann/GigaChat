import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Center, Box, Button } from "native-base";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import { SafeAreaView } from "react-native-safe-area-context";

export default OneChatScreen = ({ navigation }) => {
  const [selectedChat, setSelectedChat] = useState();
  let loggedUser = {};


  useEffect(() => {
    async function fetchData() {
      loggedUser = JSON.parse(await AsyncStorage.getItem("userInfo")); // there will be bugs if you use asyncstorage with useState().
      setSelectedChat(await AsyncStorage.getItem("selectedChat"));
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView>


    <Box
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
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
        )
        }
      </Text>
    
      <Button onPress={() => console.log(JSON.parse(selectedChat).chatName)}>Selected Chat Storage Console Test</Button>
    </Box>
        </SafeAreaView>
  );
};

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Center,
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
  Input,
  Avatar,
} from "native-base";
import { getSender } from "../config/ChatLogics";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/Ionicons";

export default ChatScreen = ({ navigation }) => {
  let loggedUser = {};
  // let selectedChat = {};
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState();

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

      setLoading(true);
      toast.show({
        description: "Chats loading..." + chats,
      });

      const { data } = await axios.get(
        "https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/chat/",
        config
      );

      // console.log("DATA: " + data);

      await setChats(data);
      setLoading(false);
      toast.show({
        description: "Chats successfully loaded.",
      });
      // await AsyncStorage.setItem("chats", JSON.stringify(data));
      // console.log("STRINGIFIED DATA: " + await AsyncStorage.getItem("chats"));
    } catch (error) {
      toast.show({
        description: "Failed to load the chats",
      });
    }
  };

  const handleOpenChat = async (chat) => {
    setSelectedChat(chat); //may turn out useless later on
    await AsyncStorage.setItem("selectedChat", JSON.stringify(chat));
    navigation.navigate("OneChatScreen");
  };

  useEffect(() => {
    async function fetchData() {
      loggedUser = JSON.parse(await AsyncStorage.getItem("userInfo")); // there will be bugs if you use asyncstorage with useState().
      setLoggedUserId(await AsyncStorage.getItem("LoggedUserId"));

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
    <SafeAreaView>
      <View>
        <View
          height="10%"
          mx={7}
          display="flex"
          flexDir="row"
          alignItems="center"
        >
          <Icon name="chatbubble" size={40} />
          <Heading marginLeft={2} fontSize={40}>
            Chats
          </Heading>
        </View>
        <View
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-end"
          height="10%"
          mx={10}
        >
          <BlurView
            intensity={60}
            tint="dark"
            borderTopLeftRadius={25}
            borderTopRightRadius={25}
          >
            <Button
             navigation={navigation.openDrawer()}
              borderTopLeftRadius={25}
              borderTopRightRadius={25}
              zIndex="0"
              bg="transparent"
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <View display="flex" flexDir="row">
                <Icon name="add" size={35} />
                <Icon name="chatbubbles" size={35} />
              </View>
            </Button>
          </BlurView>
        </View>
        <View
          height="80%"
          display="flex"
          flexDir="column"
          justfiyItems="flex-end"
          overflow="hidden"
          borderTopLeftRadius="50"
          borderTopRightRadius="50"
        >
          <BlurView height="100%" intensity={20} tint="dark" overflow="hidden">
            <ScrollView>
              {!loading ? (
                chats.map((chat) => (
                  <Pressable
                    onPress={() => handleOpenChat(chat)}
                    p={3}
                    flexDir="row"
                    alignItems="center"
                    justifyContent="space-between"
                    borderRadius={10}
                    mx={3}
                    mt={1.5}
                    mb={1.5}
                    key={chat._id}
                  >
                    <View
                      display="flex"
                      flexDir="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <View>
                        <Avatar size="lg" backgroundColor="black">
                          {!chat.isGroupChat
                            ? getSender(loggedUserId, chat.users)
                                .charAt(0)
                                .toUpperCase()
                            : chat.chatName.charAt(0).toUpperCase()}
                        </Avatar>
                      </View>
                      <View ml={3}>
                        <Text fontSize="20px" fontWeight="bold">
                          {!chat.isGroupChat
                            ? getSender(loggedUserId, chat.users).slice(0, 20)
                            : chat.chatName.slice(0, 20)}
                        </Text>
                        {chat.latestMessage ? (
                          <Text fontSize="15">
                            {chat.latestMessage.content.length > 30
                              ? chat.latestMessage.sender.name +
                                ": " +
                                chat.latestMessage.content.substring(0, 31) +
                                "..."
                              : chat.latestMessage.sender.name +
                                ": " +
                                chat.latestMessage.content}
                          </Text>
                        ) : (
                          <></>
                        )}
                      </View>
                    </View>
                  </Pressable>
                ))
              ) : (
                <Spinner
                  marginTop={20}
                  size="lg"
                  color="black"
                  accessibilityLabel="Loading posts"
                ></Spinner>
              )}
            </ScrollView>
          </BlurView>
        </View>
      </View>
    </SafeAreaView>
  );
};

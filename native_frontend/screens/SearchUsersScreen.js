import {
  Button,
  Center,
  HStack,
  Input,
  Spinner,
  Text,
  View,
  useToast,
  Heading,
} from "native-base";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Box } from "native-base";
import MyChats from "../components/MyChats";
import { SafeAreaView } from "react-native-safe-area-context";
import UserListItem from "../components/UserAvatar/UserListItem";

export default SearchUsersScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false); // may turn out useless later
  const [searchResult, setSearchResult] = useState([]);

  let token = "";
  let chats = [];

  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
    }
    fetchData();
  }, []);

  const handleSearch = async () => {

    toast.show({
      description: "Loading users...",
    });

    token = await AsyncStorage.getItem("LoggedUserToken");
    if (!search) {
      toast.show({
        description: "Please enter something in the search field.",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    
      const { data } = await axios.get(
        `https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/user?search=${search}`,
        config
      );
      toast.show({
        description: "Users loaded!",
      });

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.show({
        description: error.message,
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      token = await AsyncStorage.getItem("LoggedUserToken");

      setLoadingChat(true); // may turn out useless later

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      toast.show({
        description: "Loading chat...",
      });
      const { data } = await axios.post(
        "https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/chat",
        { userId },
        config
      );
      toast.show({
        description: "Chat loaded!",
      });

      // appending a chat - does this work?
      chats = JSON.parse(await AsyncStorage.getItem("chats"));

      if (!chats.find((c) => c._id === data._id)) {
        chats = [data, ...chats];
        await AsyncStorage.setItem("chats", JSON.stringify(chats));
      }

      // HERE WE NEED TO CREATE SOME KIND OF NAVIGATION WHICH TAKES US TO THE SELECTED CHAT ITEM.
      // MAYBE WE COULD USE ASYNCSTORAGE TO STORE THE ACCESSED CHAT DATA? YES WE'RE DOING THIS. NO CHATPROVIDER
      await AsyncStorage.setItem("selectedChat", JSON.stringify(data));
      // console.log(JSON.parse(await AsyncStorage.getItem("selectedChat")));
      setLoadingChat(false); // may turn out useless later
      // TU BEDZIE NAWIGACJA DO TEGO CZATU POTEM
    } catch (error) {
      toast.show({
        description: "Error while fetching the chat.",
      });
    }
  };

  return (
    <SafeAreaView>
      <Center>
        <Text fontSize="2xl" mt={30}>
          USERS
        </Text>
      </Center>

      <Box display="flex" pb={2}>
        <Input
          placeholder="Search by name or email"
          mr={2}
          // value={search}
          onChangeText={(value) => setSearch(value)}
        />
        <Button onPress={handleSearch}>Go</Button>
      </Box>

      {loading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      ) : (
        searchResult?.map((user) => (
          <UserListItem
            key={user._id}
            user={user}
            handleFunction={() => accessChat(user._id)}
          />
        ))
      )}
    </SafeAreaView>
  );
};

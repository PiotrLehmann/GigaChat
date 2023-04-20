import { Button, Center, HStack, Input, Spinner, Text, View, useToast, Heading } from "native-base";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "native-base";
import MyChats from "../components/MyChats";
import { SafeAreaView } from "react-native-safe-area-context";
import UserListItem from "../components/UserAvatar/UserListItem";

export default SearchUsersScreen = ({ navigation }) => {
  const { user } = ChatState();

  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false); // may turn out useless later
  const [searchResult, setSearchResult] = useState([]);

  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      setToken(await AsyncStorage.getItem("LoggedUserToken"));
    }
    fetchData();
  }, []);

  const handleSearch = async () => {
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
      // toast.show({
      //   description: "Dayum sth was sent.",
      // });

      setLoading(false);
      setSearchResult(data);

    } catch (error) {
      toast.show({
        description: "Error :P Failed to load the chats.",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true); // may turn out useless later

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/chat",
        {userId},
        config
      );

      // HERE WE NEED TO CREATE SOME KIND OF NAVIGATION WHICH TAKES US TO THE SELECTED CHAT ITEM.
      // MAYBE WE COULD USE ASYNCSTORAGE TO STORE THE ACCESSED CHAT DATA?
      setLoadingChat(false); // may turn out useless later
    } catch (error) {
      
    }
  }

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
        <Button
        onPress={handleSearch}
        >
          Go
        </Button>
      </Box>

      {loading ? (
        <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
      ) : (
        searchResult?.map(user => (
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

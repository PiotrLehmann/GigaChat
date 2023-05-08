import {
  Button,
  Input,
  Spinner,
  View,
  useToast,
  Heading,
  ScrollView,
} from "native-base";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserListItem from "../components/UserAvatar/UserListItem";
import Icon from "react-native-vector-icons/Ionicons";
import { BlurView } from "expo-blur";

export default SearchUsersScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChatIndex, setLoadingChatIndex] = useState(10000);
  const [isChatLoading, setIsChatLoading] = useState(false); // may turn out useless later PIOTR: używam tego tylko są ciezary
  const [searchResult, setSearchResult] = useState([]);

  let token = "";
  let chats = [];

  const toast = useToast();

  useEffect(() => {
    async function fetchData() {}
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

  const accessChat = async (userId, i) => {
    try {
      token = await AsyncStorage.getItem("LoggedUserToken");
      setLoadingChatIndex(i); // may turn out useless later
      setIsChatLoading(true); // may turn out useless later

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

      // UWAGA TERAZ TUTAJ JEST NAWIGACJA, BO PO NASTEONYCH LINIJKACH WYWALA BŁĄD, ALE POTEM TRZEBA JĄ PRZENIEŚĆ NA SAM DÓŁ ZARAZ PRZED CATCHEM
      await AsyncStorage.setItem("selectedChat", JSON.stringify(data));
      navigation.navigate("OneChatScreen");
      setIsChatLoading(false);

      if (!chats.find((c) => c._id === data._id)) {
        chats = [data, ...chats];
        await AsyncStorage.setItem("chats", JSON.stringify(chats));
      }

      // HERE WE NEED TO CREATE SOME KIND OF NAVIGATION WHICH TAKES US TO THE SELECTED CHAT ITEM.
      // MAYBE WE COULD USE ASYNCSTORAGE TO STORE THE ACCESSED CHAT DATA? YES WE'RE DOING THIS. NO CHATPROVIDER
      // console.log(JSON.parse(await AsyncStorage.getItem("selectedChat")));
      setLoadingChatIndex(false); // may turn out useless later
      // KONCOWO TU POWINNA BYC NAWIGACJA, DOPIERO JAK SIE WSZYSTKO ZAŁADUJE
    } catch (error) {
      toast.show({
        description: "Error while fetching the chat.",
      });
    }
  };
  const show = true;

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
          <Icon name="search" size={40} />
          <Heading marginLeft={2} fontSize={40}>
            Search
          </Heading>
        </View>
        <View
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          height="10%"
          mx={7}
        >
          <Input
            placeholder="Search by name or email"
            onChangeText={(value) => setSearch(value)}
            py="2.5"
            borderColor="black"
            placeholderTextColor="black"
            borderRadius={15}
            InputRightElement={
              <Button
                backgroundColor="black"
                onPress={handleSearch}
                size="xs"
                rounded="none"
                w="1/6"
                h="full"
              >
                <Icon name="search" size={20} color="white" />
              </Button>
            }
          />
        </View>
        <View
          height="80%"
          display="flex"
          flexDir="column"
          justfiyItems="flex-end"
          borderTopLeftRadius="50"
          borderTopRightRadius="50"
          overflow="hidden"
        >
          <BlurView height="100%" intensity={20} tint="dark" overflow="hidden">
            <ScrollView>
              {loading ? (
                <Spinner
                  marginTop={20}
                  size="lg"
                  color="black"
                  accessibilityLabel="Loading posts"
                />
              ) : (
                searchResult?.map((user, i) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id, i)}
                    loadingChatIndex={loadingChatIndex}
                    index={i}
                    isChatLoading={isChatLoading}
                  />
                ))
              )}
            </ScrollView>
          </BlurView>
        </View>
      </View>
    </SafeAreaView>
  );
};

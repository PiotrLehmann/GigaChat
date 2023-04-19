import { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, Text, View, CloseIcon } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomDrawer = (props) => {
  [username, setUsername] = useState("");
  [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchData() {
      setUsername(await AsyncStorage.getItem("LoggedUserName"));
      setEmail(await AsyncStorage.getItem("LoggedUserEmail"));
    }
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View p={8} display="flex" justifyContent="center" alignItems="center">
          <Avatar size="xl" backgroundColor="black">
            {username.charAt(0)}
          </Avatar>
          <Text fontSize="20" fontWeight="bold">
            {username}
          </Text>
          <Text fontSize="15">{email}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View p={5} borderTopWidth={1} borderTopColor="#ccc">
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 5 }}>
          <View display="flex" flexDir="row" alignItems="center">
            <CloseIcon />
            <Text fontSize="15" ml={3}>
              Log out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

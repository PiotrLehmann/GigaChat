import { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, Text, View, CloseIcon, Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomDrawer = (props) => {
  [username, setUsername] = useState("");
  [email, setEmail] = useState("");
  [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    async function fetchData() {
      setUsername(await AsyncStorage.getItem("LoggedUserName"));
      setEmail(await AsyncStorage.getItem("LoggedUserEmail"));
      setUserInfo(JSON.parse(await AsyncStorage.getItem("userInfo")));
    }
    fetchData();
  }, []);

  const handleLogout = () => {};

  return (
    <View style={{ flex: 1 }} {...props}>
      <DrawerContentScrollView>
        <View p={8} display="flex" justifyContent="center" alignItems="center">
          <Avatar size="xl" backgroundColor="black">
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Text fontSize="20" fontWeight="bold">
            {username}
          </Text>
          <Text fontSize="15">{email}</Text>
          {/* <Text fontSize="15">{user}</Text> */}
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View p={5}>
        <TouchableOpacity
          // backgroundColor="rgba(0,0,0, 0.2)"
          onPress={() => {
            props.navigation.replace("LoginScreen");
          }}
        >
          <View
            w="100%"
            display="flex"
            flexDir="row"
            alignItems="center"
            justifyContent="center"
          >
            <View ml={0}>
              <Icon name="ios-lock-closed" size={30} />
            </View>
            <Text marginLeft={1} fontSize={17} fontWeight="bold">
              Log out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

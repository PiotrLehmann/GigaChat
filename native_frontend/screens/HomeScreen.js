import { Text, View } from "native-base";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const user = AsyncStorage.getItem("userInfo");

    // if (user) {
    //   history.push("/chats");
    // }
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

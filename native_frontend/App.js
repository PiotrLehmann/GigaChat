import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import ChatScreen from "./screens/ChatScreen";
import ChatProvider from "./Context/ChatProvider";
import AuthStack from "./navigation/AuthStack";
import AppStack from "./navigation/AppStack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <ChatProvider>
          {/* <AuthStack /> */}
          <AppStack />
        </ChatProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

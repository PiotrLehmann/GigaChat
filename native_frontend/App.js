import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import ChatProvider from "./Context/ChatProvider";
import AuthStack from "./navigation/AuthStack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <ChatProvider>
          <AuthStack />
        </ChatProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

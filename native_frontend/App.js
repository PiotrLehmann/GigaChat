import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import { NativeBaseProvider } from "native-base";
import SignUpScreen from "./screens/SignUpScreen";
import ChatScreen from "./screens/ChatScreen";
import ChatProvider from "./Context/ChatProvider";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      defaultScreenOptions={LoginScreen}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator
      defaultScreenOptions={ChatScreen}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function ChatNavigator() {
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  );
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <ChatProvider>
        {/* <RootNavigator /> */}
        <ChatNavigator />
      </ChatProvider>
    </NativeBaseProvider>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import AppStack from "../navigation/AppStack";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Authorization Stack Navigation */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      {/* App Drawer Navigation */}
      <Stack.Screen name="Chats" component={AppStack} />
      <Stack.Screen name="Search Users" component={AppStack} />
    </Stack.Navigator>
  );
};

export default AuthStack;

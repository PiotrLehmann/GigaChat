import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatScreen from "../screens/ChatScreen";
import SearchUsersScreen from "../screens/SearchUsersScreen";
import CustomDrawer from "../components/CustomDrawer";
import { View, Text, SearchIcon } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerInactiveBackgroundColor: "rgba(0,0,0, 0.2)",
        drawerActiveBackgroundColor: "rgba(0,0,0, 0.5)",
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "black",
        drawerLabelStyle: { marginLeft: -15, fontSize: 17 },
      }}
    >
      <Drawer.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          drawerIcon: (config) => <Icon name="chatbubble" size={30} />,
        }}
      />
      <Drawer.Screen
        name="Search Users"
        component={SearchUsersScreen}
        options={{
          drawerIcon: (config) => <Icon name="search" size={30} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;

import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const [refreshChats, setRefreshChats] = useState();

  // const navigation = useNavigation();

  useEffect(() => {
    const userInfo = AsyncStorage.getItem("userInfo");
    setUser(userInfo);
  }, []);

  return (
    <ChatContext.Provider
      value={{refreshChats, setRefreshChats}}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;

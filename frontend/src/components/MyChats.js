import React from "react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = () => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  return <div>MyChats</div>;
};

export default MyChats;

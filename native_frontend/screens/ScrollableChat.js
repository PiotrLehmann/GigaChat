import { Avatar, Box, ScrollView, Text } from "native-base";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ScrollableChat = ({ messages, loggedUserId, username }) => {
  return (
    <Box>
      <ScrollView>
        {messages &&
          messages.map((m, i) => (
            <Box display="flex" flexDirection="row" key={m._id}>
              {(isSameSender(messages, m, i, loggedUserId) ||
                isLastMessage(messages, i, loggedUserId)) && (
                <Avatar size="35px" backgroundColor="black">
                  {username.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <Box
                marginLeft={isSameSenderMargin(messages, m, i, loggedUserId)}
                marginTop={isSameUser(messages, m, i, loggedUserId) ? 1 : 5}
                borderRadius="20px"
                padding="5px 15px"
                maxWidth="80%"
                style={{
                  backgroundColor: `${
                    m.sender._id === loggedUserId ? "#BEE3F8" : "#B9F5D0"
                  }`,
                }}
              >
                <Text fontSize="15px">{m.content}</Text>
              </Box>
            </Box>
          ))}
      </ScrollView>
    </Box>
  );
};

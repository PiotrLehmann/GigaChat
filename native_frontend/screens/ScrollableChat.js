import { Avatar, View, ScrollView, Text } from "native-base";
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
    <View height="100%">
      <ScrollView
        ref={(ref) => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({ animated: true })
        }
      >
        {messages &&
          messages.map((m, i) => (
            <View
              display="flex"
              flexDirection="row"
              alignItems="center"
              key={m._id}
            >
              {(isSameSender(messages, m, i, loggedUserId) ||
                isLastMessage(messages, i, loggedUserId)) && (
                <Avatar mx={2} size={12} backgroundColor="black">
                  {username.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <View
                marginLeft={isSameSenderMargin(messages, m, i, loggedUserId)}
                marginTop={isSameUser(messages, m, i, loggedUserId) ? 2 : 5}
                borderTopRadius={20}
                borderBottomLeftRadius={m.sender._id === loggedUserId ? 20 : 0}
                borderBottomRightRadius={m.sender._id !== loggedUserId ? 20 : 0}
                padding={3}
                maxWidth="80%"
                style={{
                  backgroundColor: `${
                    m.sender._id === loggedUserId ? "white" : "black"
                  }`,
                }}
              >
                <Text
                  fontSize={15}
                  style={{
                    color: `${
                      m.sender._id === loggedUserId ? "black" : "white"
                    }`,
                  }}
                >
                  {m.content}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

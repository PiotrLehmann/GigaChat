import { Avatar, Box, Pressable, Text, Spinner, View } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

export default UserListItem = ({
  user,
  handleFunction,
  loadingChatIndex,
  index,
  isChatLoading,
}) => {
  return (
    <View
      p={3}
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      borderRadius={10}
      mx={3}
      mt={1.5}
      mb={1.5}
    >
      <Box
        display="flex"
        flexDir="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box>
          <Avatar size="lg" backgroundColor="black">
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
        <Box ml={3}>
          <Text fontSize="20" fontWeight="bold">
            {user.name.slice(0, 15)}
          </Text>
          <Text fontSize="15">{user.email.slice(0, 15)}</Text>
        </Box>
      </Box>
      {isChatLoading ? (
        loadingChatIndex === index ? (
          <Spinner size="lg" color="black" mr={6}></Spinner>
        ) : (
          <Pressable onPress={handleFunction} mr={6}>
            <Icon name="send" size={25} />
          </Pressable>
        )
      ) : (
        <Pressable onPress={handleFunction} mr={6}>
          <Icon name="send" size={25} />
        </Pressable>
      )}
    </View>
  );
};

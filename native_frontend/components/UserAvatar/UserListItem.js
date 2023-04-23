import { Avatar, Box, Pressable, Text, Spinner } from "native-base";

export default UserListItem = ({
  user,
  handleFunction,
  loadingChatIndex,
  index,
  isChatLoading,
}) => {
  return (
    <Pressable
      onPress={handleFunction}
      p={3}
      flexDir="row"
      justifyContent="space-between"
      borderRadius={10}
      bg="rgba(0,0,0, 0.1)"
      mx={3}
      mt={0}
      mb={3}
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
        ) : null
      ) : null}
    </Pressable>
  );
};

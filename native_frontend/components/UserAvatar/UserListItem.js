import { Avatar, Box, Pressable, Text } from "native-base";

export default UserListItem = ({user, handleFunction}) => {
    return (
        <Pressable 
        onPress={handleFunction}
        p={8} display="flex" justifyContent="center" alignItems="center">
          <Avatar size="xl" backgroundColor="black">
            {user.name.charAt(0)}
          </Avatar>
          <Text fontSize="20" fontWeight="bold">
            {user.name}
          </Text>
          <Text fontSize="15">{user.email}</Text>
        </Pressable>
    );
}
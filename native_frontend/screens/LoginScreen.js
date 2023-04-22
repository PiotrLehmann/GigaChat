import {
  Heading,
  Button,
  Center,
  Box,
  FormControl,
  Input,
  NativeBaseProvider,
  Text,
  Container,
  useToast,
  VStack,
} from "native-base";
import React, { useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

export default LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState();

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.show({
        description: "Please fill all the fields.",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/user/login",
        { email, password },
        config
      );

      toast.show({
        description: "Login successful.",
      });

      await AsyncStorage.setItem("userInfo", JSON.stringify(data));
      await AsyncStorage.setItem(
        "LoggedUserEmail",
        JSON.stringify(data.email).slice(1, -1)
      );
      await AsyncStorage.setItem(
        "LoggedUserName",
        JSON.stringify(data.name).slice(1, -1)
      );
      await AsyncStorage.setItem(
        "LoggedUserToken",
        JSON.stringify(data.token).slice(1, -1)
      );

      navigation.navigate("Chats");
    } catch (error) {
      console.log(error);
      toast.show({
        description: "Error occured",
      });
    }
  };

  return (
    <Center w="100%" flex={1}>
      <Heading fontSize={40}>LOGO</Heading>
      <Box safeArea p="2" py="8" w="90%" maxW="350" mt={10}>
        <VStack space={5}>
          <FormControl id="email">
            <Input
              placeholder="Email"
              onChangeText={(value) => setEmail(value)}
              w="100%"
              py="3"
              borderRadius={8}
            />
          </FormControl>
          <FormControl id="password">
            <Input
              type={show ? "text" : "password"}
              w="100%"
              py="3"
              borderRadius={8}
              onChangeText={(value) => setPassword(value)}
              InputRightElement={
                <Button
                  backgroundColor="black"
                  color="white"
                  onPress={handleClick}
                  size="xs"
                  rounded="none"
                  w="1/6"
                  h="full"
                >
                  {show ? (
                    <Icon name="eye" size={22} color="white" />
                  ) : (
                    <Icon name="eye-off" size={22} color="white" />
                  )}
                </Button>
              }
              placeholder="Password"
            />
          </FormControl>
          <Button
            backgroundColor="black"
            onPress={submitHandler}
            borderRadius={8}
            py="3"
          >
            Log in
          </Button>
          <Box
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "grey", fontWeight: "600", fontSize: 14 }}>
              Don't have an account?
            </Text>
            <Button
              style={{ backgroundColor: "transparent" }}
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              <Text style={{ color: "black", fontWeight: "600", fontSize: 14 }}>
                {" "}
                Sign Up
              </Text>
            </Button>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
};

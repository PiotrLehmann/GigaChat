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
} from "native-base";
import React, { useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

export default LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState();

  const handleClick = () => {
    setShow(!show);
  };

  const postAPI = () => {
    axios({
      method: "POST",
      url: "http://192.168.80.1:5000/api/user/login",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
      // localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigation.navigate("ChatScreen");
      // history.push("/chats");
    } catch (error) {
      console.log(error);
      toast.show({
        description: "Error occured",
      });
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#ffffff", "#ffffff"]} style={{ height: "100%" }}>
      <Center flex={1}>
        <Heading fontSize={40}>WELCOME TO</Heading>
        <Heading fontSize={40} mb={20}>
          GIGACHAT
        </Heading>
        <Heading size="xl" margin-top="0">
          Log in
        </Heading>
        <Container>
          <FormControl id="email" isRequired>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              placeholder="Email"
              onChangeText={(value) => setEmail(value)}
              w="100%"
              py="3"
            />
          </FormControl>

          <FormControl id="password" isRequired mt="3">
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type={show ? "text" : "password"}
              w="100%"
              py="3"
              onChangeText={(value) => setPassword(value)}
              InputRightElement={
                <Button
                  onPress={handleClick}
                  size="xs"
                  rounded="none"
                  w="1/6"
                  h="full"
                >
                  {show ? "Hide" : "Show"}
                </Button>
              }
              placeholder="Password"
            />
          </FormControl>
          <Box>
            <Button onPress={submitHandler}>Log in</Button>
          </Box>
          <Box
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "grey", fontWeight: "600", fontSize: 14 }}>
              Don't have an account?{" "}
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
        </Container>
      </Center>
    </LinearGradient>
  );
};

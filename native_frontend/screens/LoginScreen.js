import {
  Heading,
  Button,
  Center,
  Box,
  FormControl,
  Input,
  NativeBaseProvider,
  Container,
  useToast,
} from "native-base";
import React, { useState } from "react";
import axios from "axios";

export const LoginScreen = () => {
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
        "http://192.168.0.122:5000/api/user/login",
        { email, password },
        config
      );
      console.log("dsssssss");

      // postAPI();

      toast.show({
        description: "Login successful.",
      });
      // localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      // history.push("/chats");
    } catch (error) {
      console.log("--------------hggd---");
      console.log(typeof error);
      console.log(error);
      toast.show({
        description: "Error",
        // description: error.response.data.message,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Heading margin-top="0">Log in</Heading>
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
      </Container>
    </>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <LoginScreen />
      </Center>
    </NativeBaseProvider>
  );
};

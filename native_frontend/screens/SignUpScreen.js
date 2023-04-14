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

export const SignUpScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState();

  const handleClick = () => {
    setShow(!show);
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast.show({
        description: 'Please select an image.',
      });
      return;
    }

    if(pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Gigachat");
      data.append("cloud_name", "ddyw43b02");
      fetch("https://api.cloudinary.com/v1_1/ddyw43b02/image/upload", {
        method: 'post', body: data,
      }).then((res) => res.json())
      .then(data => {
        setPic(data.url.toString());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    } else {
      toast.show({
        description: 'Please select a .jpeg or .png file.',
      });
      setLoading(false)
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast.show({
        description: 'Please fill all the fields.',
      });
    setLoading(false);
    return;
    }

    if (password !== confirmpassword) {
      toast.show({
        description: 'Passwords do not match.',
      });
    return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user", {name, email, password, pic}, config);
      toast({
        description: "Registration successful.",
      });
      // localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      //history.push("/chats");
    } catch (error) {
      toast({
        description: "Error occurred.",
        //description: error.response.data.message,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Heading margin-top="0">Sign Up</Heading>
      <Container>
      <FormControl id="first-name" isRequired>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            placeholder="Enter name"
            onChangeText={(value) => setName(value)}
            w="100%"
            py="3"
          />
        </FormControl>
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
          <Button onPress={submitHandler}>Sign Up</Button>
        </Box>
      </Container>
    </>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <SignUpScreen />
      </Center>
    </NativeBaseProvider>
  );
};

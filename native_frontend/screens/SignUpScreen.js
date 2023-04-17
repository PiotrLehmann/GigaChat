import {
  Heading,
  Button,
  Center,
  Box,
  FormControl,
  Input,
  Text,
  NativeBaseProvider,
  Container,
  useToast,
} from "native-base";
import { Button as NativeButton } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default SignUpScreen = ({ navigation }) => {
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
        description: "Please select an image.",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Gigachat");
      data.append("cloud_name", "ddyw43b02");
      fetch("https://api.cloudinary.com/v1_1/ddyw43b02/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast.show({
        description: "Please select a .jpeg or .png file.",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast.show({
        description: "Please fill all the fields.",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast.show({
        description: "Passwords do not match.",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/user",
        { name, email, password, pic },
        config
      );
      toast.show({
        description: "Registration successful.",
      });
      await AsyncStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      //history.push("/chats");
    } catch (error) {
      toast.show({
        description: "Error during registration",
        //description: error.response.data.message,
      });
      console.log(error);
      setLoading(false);
    }
  };

  let options = {
    saveToPhotos: true,
    mediaType: "photo",
  };

  const openGallery = async () => {
    const image = await launchImageLibrary(options);
    console.log(image.assets[0].uri);
    console.log(image);
  };

  return (
    <Center flex={1}>
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

        <FormControl id="password" isRequired mt="3">
          <FormControl.Label>Confirm Password</FormControl.Label>
          <Input
            type={show ? "text" : "password"}
            w="100%"
            py="3"
            onChangeText={(value) => setConfirmpassword(value)}
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
            placeholder="Confirm your password"
          />
        </FormControl>

        {/* <FormControl id="pic" isRequired> */}
        {/* <FormControl.Label>Picture</FormControl.Label> */}
        {/* <Button onPress={openGallery}>Upload Pic</Button> */}
        {/* </FormControl> */}
        <Box>
          <Button onPress={submitHandler}>Sign Up</Button>
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
            Already have an account?{" "}
          </Text>
          <Button
            style={{ backgroundColor: "transparent" }}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={{ color: "black", fontWeight: "600", fontSize: 14 }}>
              {" "}
              Log In
            </Text>
          </Button>
        </Box>
      </Container>
    </Center>
  );
};

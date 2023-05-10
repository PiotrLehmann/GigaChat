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
  VStack,
  Spinner,
  Image,
} from "native-base";
import { Button as NativeButton } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

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
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

    if (! regexExp.test(email)) {
      toast.show({
          description: 'Please provide the valid email.',
        });
      setLoading(false);
      return;
    }

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
      navigation.navigate("LoginScreen");
    } catch (error) {
      toast.show({
        description: "Error during registration",
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
    <Center w="100%" flex={1} bg="white">
      <Image
        source={require("../assets/GIGACHAT.png")}
        alt="GigaChat LOGO"
        size="xl"
      />
      <Box safeArea p="2" w="90%" maxW="350" mt={10}>
        <VStack space={5}>
          <Heading pb="2" w="100%" fontSize={32} textAlign="center">
            Sign Up
          </Heading>
          <FormControl id="first-name">
            <Input
              borderRadius={8}
              borderColor="black"
              placeholderTextColor="black"
              placeholder="Name"
              onChangeText={(value) => setName(value)}
              w="100%"
              py="3"
            />
          </FormControl>
          <FormControl id="email">
            <Input
              borderRadius={8}
              placeholder="Email"
              borderColor="black"
              placeholderTextColor="black"
              onChangeText={(value) => setEmail(value)}
              w="100%"
              py="3"
            />
          </FormControl>

          <FormControl id="password">
            <Input
              borderRadius={8}
              type={show ? "text" : "password"}
              w="100%"
              py="3"
              borderColor="black"
              placeholderTextColor="black"
              onChangeText={(value) => setPassword(value)}
              InputRightElement={
                <Button
                  backgroundColor="black"
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

          <FormControl id="password">
            <Input
              type={show ? "text" : "password"}
              w="100%"
              py="3"
              borderRadius={8}
              borderColor="black"
              placeholderTextColor="black"
              onChangeText={(value) => setConfirmpassword(value)}
              InputRightElement={
                <Button
                  backgroundColor="black"
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
              placeholder="Confirm your password"
            />
          </FormControl>
          <Box>
            <Button
              backgroundColor="black"
              py="3"
              borderRadius={8}
              onPress={submitHandler}
            >
              {loading ? (
                <Spinner
                  size="sm"
                  color="white"
                  accessibilityLabel="Loading posts"
                ></Spinner>
              ) : (
                <Text color="white">Sign up</Text>
              )}
            </Button>
          </Box>
          <Box
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#59778A", fontWeight: "600", fontSize: 14 }}>
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
        </VStack>
      </Box>
    </Center>
  );
};

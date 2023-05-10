import {
    NativeBaseProvider,
    Box,
    Text,
    Heading,
    Button,
    Center,
    FormControl,
    Input,
    Container,
    useToast,
  } from 'native-base';
  import React, { useState } from 'react';
  
  export default function App() {
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
  
    const submitHandler = async () => {
      setLoading(true);

      const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

      if (! regexExp.test(email)) {
        console.log("to nie email");
        toast.show({
            description: 'Please provide the valid email.',
        });
        setLoading(false);
        return;
      }

      if (!name || !email || !password || !confirmpassword) {
        console.log("uzupełnij wszystkie pola");
        toast.show({
          description: 'Please fill all the fields.',
        });
        setLoading(false);
        return;
      }
  
      if (password !== confirmpassword) {
        console.log('hasła się różnią');
        toast.show({
          description: 'Passwords do not match.',
        });
        return;
      }
  
      try {
        await fetch(
          'https://nine82hwf9h9398fnfy329y2n92y239cf.onrender.com/api/user',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, pic }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });
      } catch (error) {
        toast.show({
          description: 'Error during registration',
        });
        console.log(error);
        setLoading(false);
      }
    };
  
    return (
      <NativeBaseProvider>
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
                type={show ? 'text' : 'password'}
                w="100%"
                py="3"
                onChangeText={(value) => setPassword(value)}
                InputRightElement={
                  <Button
                    onPress={handleClick}
                    size="xs"
                    rounded="none"
                    w="1/6"
                    h="full">
                    {show ? 'Hide' : 'Show'}
                  </Button>
                }
                placeholder="Password"
              />
            </FormControl>
  
            <FormControl id="password" isRequired mt="3">
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type={show ? 'text' : 'password'}
                w="100%"
                py="3"
                onChangeText={(value) => setConfirmpassword(value)}
                InputRightElement={
                  <Button
                    onPress={handleClick}
                    size="xs"
                    rounded="none"
                    w="1/6"
                    h="full">
                    {show ? 'Hide' : 'Show'}
                  </Button>
                }
                placeholder="Confirm your password"
              />
            </FormControl>
            <Box>
              <Button onPress={submitHandler}>Sign Up</Button>
            </Box>
            <Box
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{ color: 'grey', fontWeight: '600', fontSize: 14 }}>
                Already have an account?{' '}
              </Text>
              <Button
                style={{ backgroundColor: 'transparent' }}
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={{ color: 'black', fontWeight: '600', fontSize: 14 }}>
                  {' '}
                  Log In
                </Text>
              </Button>
            </Box>
          </Container>
        </Center>
      </NativeBaseProvider>
    );
  }
  
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
  } from 'native-base';
  import React, { useState } from 'react';
  
  export default function App() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);  // [ ZAD. 2 ]
  
    const submitHandler = async () => {
      //  [ ZAD. 2 ]
    };
  
    return (
      <NativeBaseProvider>
        <Center flex={1}>
          <Heading margin-top="0">Sign Up</Heading>
          <Container>
  
            <FormControl id="first-name" isRequired>
              <FormControl.Label> Name </FormControl.Label>
              <Input
                placeholder="Enter name"
                onChangeText={(value) => setName(value)}
                w="100%"
                py="3"
              />
            </FormControl>
  
            <Box>
              <Button onPress={submitHandler}>Sign Up</Button>
            </Box>
          </Container>
        </Center>
      </NativeBaseProvider>
    );
}  
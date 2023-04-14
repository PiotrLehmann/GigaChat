import {
  Heading,
  Button,
  Center,
  Box,
  FormControl,
  Input,
  NativeBaseProvider,
  Container,
} from "native-base";
import React, { useState } from "react";
export const LoginScreen = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <>
      <Heading margin-top="0">Log in</Heading>
      <Container>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input placeholder="Email" w="100%" py="3" />
        </FormControl>

        <FormControl mt="3">
          <FormControl.Label>Password</FormControl.Label>
          <Input
            type={show ? "text" : "password"}
            w="100%"
            py="3"
            InputRightElement={
              <Button
                size="xs"
                rounded="none"
                w="1/6"
                h="full"
                onPress={handleClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            }
            placeholder="Password"
          />
        </FormControl>
        <Box>
          <Button>Log in</Button>
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

import { IconButton, InfoIcon, Modal, Text, useDisclose } from "native-base";
import { Button, Pressable, View } from "react-native";

export default ProfileModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <>
      {children ? (
        <View onPress={onOpen}>{children}</View>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<InfoIcon />}
          onPress={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          {/* <Modal.CloseButton /> */}
          <Modal.Header>Modal header</Modal.Header>
          <Modal.Body>
            <Text>Modal body</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={onClose} title="Close">Close</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

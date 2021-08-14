import React, { useState }from "react"
import { Button, Modal, Center,Input, NativeBaseProvider } from "native-base"
import{StyleSheet} from 'react-native';
export const OtpPopup = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button onPress={() => setShowModal(true)}>Button</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Otp</Modal.Header>
          <Modal.Body>
          <Input
                w="100%"
                mx={3}
                placeholder="Enter otp here"
                _light={{
                    placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                    placeholderTextColor: "blueGray.50",
                }}
                />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button  colorScheme="danger">Resend Otp</Button>
              <Button  colorScheme="success" onPress={() =>   setShowModal(false) } >  Save </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

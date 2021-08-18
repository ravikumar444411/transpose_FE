import React, { useState } from "react"
import { Popover, Box, Input, Center, NativeBaseProvider,HStack, Checkbox,Button } from "native-base"
import { faCoffee,faSearch,faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableOpacity,Text } from "react-native"


export function Example() {
  const initialFocusRef = React.useRef(null)
  const [type,setType] = useState('delivery')
  return (
    <Popover
      initialFocusRef={initialFocusRef}
      trigger={(triggerProps) => {
        return   <TouchableOpacity {...triggerProps} style={{width:30,height:30,borderRadius:15,marginLeft:10,marginTop:10,backgroundColor:'skyblue'}}>
                        <FontAwesomeIcon icon={faFilter } color="white" size={15} style={{marginLeft:8,marginTop:8}} />
                </TouchableOpacity> 
      }}
    >
      <Popover.Content width={250}>
        <Popover.Arrow />
        <Popover.CloseButton />
        {/* @ts-ignore */}
        <Popover.Header fontSize={20} fontWeight={700}>
          Filter
        </Popover.Header>
        <Popover.Body>
        <HStack space={6}>
            <Checkbox value="test" accessibilityLabel="This is a dummy checkbox" />
            <Text>Delivery</Text>
        </HStack>
        <HStack space={6} style={{marginTop:10}}>
            <Checkbox value="test" accessibilityLabel="This is a dummy checkbox" />
            <Text>Pickup</Text>
        </HStack>
        </Popover.Body>
        <Popover.Footer justifyContent="flex-end">
          <Button.Group>
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
            <Button size="sm">Apply</Button>
          </Button.Group>
        </Popover.Footer>
      </Popover.Content>
    </Popover>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Example />
      </Center>
    </NativeBaseProvider>
  )
}
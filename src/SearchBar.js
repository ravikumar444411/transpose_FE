import React from "react";
import { VStack, Input, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box } from "native-base";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


//Search Bar Function

export default function SearchBar(){
  return (
    <VStack space={8} width="100%">
      <VStack width="100%" space={2}>
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          bg="gray.200"
          borderRadius={10}
          py={1}
          px={2}
          _web={{
            _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
            }}
        />
      </VStack>
      </VStack>
  )
}

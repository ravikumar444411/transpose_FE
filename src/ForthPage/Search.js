import React from "react"
import { Input, Icon, Box, Center, NativeBaseProvider } from "native-base"
// import { MaterialIcons } from "@expo/vector-icons"
import { faCoffee,faSearch,faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Filter from "./Filter"
export const Search = () => {
  return (
    <Box style={{width:280,flexDirection:'row'}}>
    <Box style={{width:230}}>
      <Input
        InputLeftElement={
            <FontAwesomeIcon icon={faSearch } color="#aaadab" size={20} style={{marginLeft:20}} />
          }
        placeholder="Search" // mx={4}
        _light={{
          placeholderTextColor: "blueGray.400",
        }}
        _dark={{
          placeholderTextColor: "blueGray.50",
        }}
      />
      </Box>
      <Filter/>
    </Box>
  )
}


import React from "react"
import {
  FormControl,
  Select,
  HStack,
  Text,
  Container,
  CheckIcon,
  Center,
  NativeBaseProvider,
} from "native-base"
export const Option = () => {
  const [value, setValue] = React.useState("js")
  return (
    <Container>
      <FormControl isRequired isInvalid>
        <Select
          selectedValue={value}
          minWidth={280}
          onValueChange={(itemValue) =>   setValue(itemValue)  }
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />,
          }}
          mt={1}
        >
          <Select.Item label="Reason of Failure" value="js" />
          <Select.Item label="TypeScript" value="ts" />
          <Select.Item label="C" value="c" />
          <Select.Item label="Python" value="py" />
          <Select.Item label="Java" value="java" />
        </Select>
      </FormControl>
    </Container>
  )
}

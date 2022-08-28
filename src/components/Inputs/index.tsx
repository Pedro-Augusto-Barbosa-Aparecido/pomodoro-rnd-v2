import { Input as NativeBaseInput, IInputProps as NativeBaseIInputProps } from "native-base"

interface IInputProps extends NativeBaseIInputProps {

}

export function Input ({ ...rest }: IInputProps) {
  return <NativeBaseInput 
    borderWidth={0}
    h="16"
    borderRadius={"md"}
    bg={"gray.800"}
    fontSize="lg"
    color={"gray.400"}
    selectionColor={"gray.600"}
    p="4"
    placeholderTextColor={"gray.600"}
    _focus={{
      backgroundColor: "gray.800"
    }}
    {...rest}
  /> 
}
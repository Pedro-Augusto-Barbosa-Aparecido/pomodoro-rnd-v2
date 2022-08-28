import React from "react";
import { Button as NativeBaseButton, IButtonProps as NativeBaseIButtonProps } from "native-base";

interface IButtonProps extends NativeBaseIButtonProps {
  children: React.ReactElement
}

export function Button ({ children, ...rest }: IButtonProps) {
  return <NativeBaseButton
    w="full"
    py={4}
    backgroundColor={"green.700"}
    _pressed={{
      backgroundColor: "green.600"
    }}
    {...rest}
  >{ children }</NativeBaseButton>
}
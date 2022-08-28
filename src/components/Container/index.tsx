import React from "react";
import { Box } from "native-base";

interface ContainerProps {
  children: React.ReactNode
}

export function Container ({ children }: ContainerProps) {
  return <Box
    flex={1}
    bg="gray.700"
    px={4}
    pt={10}
  >
    {children}
  </Box>

}
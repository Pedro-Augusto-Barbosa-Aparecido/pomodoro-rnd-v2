import { Box, HStack, Text } from "native-base";

interface ITimerProps {
  minute: string;
  seconds: string;
}

export function Counter ({ minute, seconds }: ITimerProps) {
  return (
    <Box>
      <HStack>
        <Text
          fontSize={"8xl"}
          fontFamily={"body"}
          color="gray.200"
          mt={12}
          alignItems="center"
          textAlign={"center"}
        >
          {minute}
          <Text
            p={4}
          >:</Text>
          {seconds}
        </Text>
      </HStack>
    </Box>
  );
}
import { Box, Text, VStack } from "native-base";
import { Container } from "../../components/Container";

export function Profile() {
  return <Container>
          <VStack
            flex={1}
          >
            <Text
              fontFamily={"heading.italic"}
              fontSize={32}
              color="gray.500"
              mb={10}
            >
              R&D Timer
            </Text>
          </VStack>
        </Container>
}
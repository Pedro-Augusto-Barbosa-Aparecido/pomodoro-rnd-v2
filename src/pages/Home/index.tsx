import { Center, FormControl, Heading, Icon, Text, useTheme, VStack } from "native-base";
import { Activity } from "phosphor-react-native";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Input } from "../../components/Inputs";

export function Home () {
  const { colors } = useTheme();

  return (
    <Container>
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
        <Center>
          <Heading
            color="gray.300"
            mb={8}
          >
            Controle seu tempo conosco 
          </Heading>
          <Input 
            placeholder="Insira o nome do projeto"
            mb={2}
            InputRightElement={
              <Icon as={<Activity size={28} color={colors.gray["600"]} />} mr={4} />
            }
          />
          <Input 
            placeholder="Insira o nome da tarefa"
            InputRightElement={
              <Icon as={<Activity size={28} color={colors.gray["600"]} />} mr={4} />
            }
          />
          <Button
            mt={4}
            shadow="4"
          >
            <Text
              fontFamily={"body"}
              fontSize="lg"
              color={"gray.100"}
              fontWeight="bold"
            >Start Timer</Text>
          </Button>
        </Center>
      </VStack>
    </Container>
  );

}

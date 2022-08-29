import { Center, FormControl, Heading, Icon, Text, useTheme, VStack } from "native-base";
import { Activity } from "phosphor-react-native";
import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Input } from "../../components/Inputs";
import { TimerContext } from "../../context/TimerContext";
import { Counter } from "../../components/Counter";

export function Home () {
  const { colors } = useTheme();

  const [projectName, setProjectName] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [timer, setTimer] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>();

  const { createTimer } = useContext(TimerContext);

  const clearTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };

  const clearAll = () => {
    setTimer(0);
    clearTimer();
  }

  const playTimer = () => {
    setTimerInterval(setInterval(() => {
      setTimer(prev => {
        return prev + 1;
      });
    }, 1000));
  };

  const handleCreateTimer = () => {
    createTimer({
      projectName, 
      task
    });
  };

  const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const seconds = String(timer % 60).padStart(2, '0');

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
            value={projectName}
            onChangeText={setProjectName}
          />
          <Input 
            placeholder="Insira o nome da tarefa"
            InputRightElement={
              <Icon as={<Activity size={28} color={colors.gray["600"]} />} mr={4} />
            }
            value={task}
            onChangeText={setTask}
          />
          <Button
            mt={4}
            shadow="4"
            onPress={handleCreateTimer}
          >
            <Text
              fontFamily={"body"}
              fontSize="lg"
              color={"gray.100"}
              fontWeight="bold"
            >Start Timer</Text>
          </Button>
          <Counter 
            minute={minutes}
            seconds={seconds}
          />
        </Center>
      </VStack>
    </Container>
  );

}

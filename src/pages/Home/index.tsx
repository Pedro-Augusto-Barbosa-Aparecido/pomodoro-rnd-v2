import { Box, Center, Heading, Icon, Text, useTheme, VStack } from "native-base";
import { Activity } from "phosphor-react-native";
import { useContext, useState } from "react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Input } from "../../components/Inputs";
import { TimerContext } from "../../context/TimerContext";
import { Counter } from "../../components/Counter";
import { Alert, Keyboard } from "react-native";

import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import { showToastMessage } from "../../utils/toastMessages";

export function Home () {
  const { colors } = useTheme();

  const [projectName, setProjectName] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [timer, setTimer] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>();
  const [isStartButton, setIsStartButton] = useState<boolean>(true);
  const [idCurrentTimer, setIdCurrentTimer] = useState<string | null>(null);
  const [isPause, setIsPause] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { createTimer, apiIdForUser } = useContext(TimerContext);

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
    if (timer == 0) {
      clearAll();
      setIsLoading(true);
      firestore()
      .collection("timer")
      .add({
        projectName,
        task,
        id: Date.now(),
        time: 0,
        userKey: apiIdForUser,
        status: "in-progress",
        createdAt: firestore.FieldValue.serverTimestamp(),
        closedAt: ""
      })
      .then((data) => {
        setIdCurrentTimer(data.id);
        Keyboard.dismiss();
        createTimer({
          projectName,
          task
        });
        showToastMessage({
          message: "Timer registrado com sucesso!",
          title: "Success",
          visibilityTime: 3000,
        });
        playTimer();
        setIsStartButton(false);
      })
      .catch(() => {
        showToastMessage({
          title: "Fail", 
          message: "Houve um erro na hora de registrar um timer",
          type: "error",
          visibilityTime: 3500
        });
      });
    } else {
      playTimer();
    }
    setIsLoading(false);
  };

  const handleStopTimer = () => {
    clearTimer();
    setIsLoading(true);
    firestore()
      .collection("timer")
      .doc(idCurrentTimer)
      .update({
        status: "finish",
        closedAt: firestore.FieldValue.serverTimestamp(),
        time: timer
      })
      .then(() => {
        showToastMessage({
          title: "Success", 
          message: "Timer encerrado com sucesso",
        });
        setTimer(0);
        setIsStartButton(true);
      })
      .catch(() => {
        showToastMessage({
          title: "Fail", 
          message: "Houve um erro ao tentar finalizar o timer",
          type: "error"
        
        });
        handlePauseTimer();
        setIsStartButton(false);
      });
    setIsLoading(false);
  };

  const handlePauseTimer = () => {
    setIsPause(state => {
      if (state) {
        clearTimer();
      } else {
        playTimer();
      }

      return !state;
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
          {
            isStartButton ? 
            <Button
              mt={4}
              shadow="4"
              onPress={handleCreateTimer}
              isLoading={isLoading}
            >
              <Text
                fontFamily={"body"}
                fontSize="lg"
                color={"gray.100"}
                fontWeight="bold"
              >Start Timer</Text>
            </Button> :
            (
              <Box
                w={"full"}
              >
                <Button
                  mt={4}
                  shadow="4"
                  onPress={handleStopTimer}
                  bg="red.600"
                  isLoading={isLoading}
                  _pressed={{
                    backgroundColor: "red.500"
                  }}
                >
                  <Text
                    fontFamily={"body"}
                    fontSize="lg"
                    color={"gray.100"}
                    fontWeight="bold"
                  >
                    Stop Timer
                  </Text>
                </Button>
                <Button
                  mt={4}
                  shadow="4"
                  onPress={handlePauseTimer}
                  bg="red.600"
                  _pressed={{
                    backgroundColor: "red.500"
                  }}
                >
                  <Text
                    fontFamily={"body"}
                    fontSize="lg"
                    color={"gray.100"}
                    fontWeight="bold"
                  >
                    {isPause ? "Pause" : "Continue"} Timer
                  </Text>
                </Button>
              </Box>
            )
          }
          <Counter 
            minute={minutes}
            seconds={seconds}
          />
        </Center>
        <Toast 
          position="top"
          bottomOffset={10}
        />
      </VStack>
    </Container>
  );

}

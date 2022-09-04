import { Modal, Heading, Text, VStack, Box, HStack, useTheme, FlatList } from "native-base";
import Toast from "react-native-toast-message";
import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Input } from "../../components/Inputs";
import { TimerContext } from "../../context/TimerContext";
import { showToastMessage } from "../../utils/toastMessages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PencilSimpleLine } from "phosphor-react-native";
import { ellipszeWord } from "../../utils/text";
import { Card } from "../../components/Card";
import { Spinner } from "../../components/Loader";

import firestore from "@react-native-firebase/firestore";

export function Profile() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const [timers, setTimers] = useState([]);

  const { userName, changeName, apiIdForUser } = useContext(TimerContext);
  const { colors } = useTheme();

  const msgSuccess = !userName ? "Insira um nome para poder alterar!" : "Nome alterado com sucesso!!";  

  useEffect(() => {
    firestore()
    .collection("timer")
    .where("userKey", "==", apiIdForUser).onSnapshot(snap => {
      const data = snap.docs.map(doc => {
        const { userKey, closedAt, createdAt, id, projectName, status, task, time } = doc.data();
        console.log(createdAt)
        return {
          userKey, 
          closedAt,
          createdAt,
          id,
          projectName, 
          status, 
          task,
          time
        }
      });
      setTimers(data);
    });
  }, []);

  const handleClick = () => {
    try {
      if (newUsername.length) {
        AsyncStorage.setItem("@pomodoro-username", newUsername).then(() => {
          showToastMessage({
            title: "Success",
            message: msgSuccess,
            type: "success"
          });
          setIsModalOpen(state => !state);
          changeName();
        }).catch(() => {
          showToastMessage({
            title: "Fail",
            message: "Houve um erro ao tentar salvar o nome neste dispositivo",
            type: "error"
          });
        });
      } else showToastMessage({
        title: "Warning",
        message: "Insira um nome para poder alterar!",
        type: "info"
      });
    } catch (err) {
      showToastMessage({
        title: "Fail",
        message: "Houve um erro ao tentar salvar o nome neste dispositivo",
        type: "error"
      });
    }
  }

  return <Container>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(state => !state)}
            animationPreset="slide"
          >
            <Box
              w="full"
              p="6"
            >
              <VStack
                bgColor={"gray.800"}
                p="4"
                borderRadius={10}
              >
                <HStack>
                  <Heading
                    textAlign={"center"}
                    color="gray.500"
                    mb="8"
                    flex={1}
                  >
                    {userName ? "Deseja trocar o seu nome?" : "Insira um nome para começar!!"}
                  </Heading>
                  {/* <CloseButton
                    p="0"
                    h="4"
                    w="4"
                    bgColor={"gray.800"}
                  >
                    <X 
                      color={colors.gray[400]}
                    />
                  </CloseButton> */}
                </HStack>
                <VStack>  
                  <Text
                    color={"gray.200"}
                    fontSize="lg"
                    mb={2}
                  >Old Name</Text>
                  <Input 
                    isDisabled={true}
                    value={!userName ? "Não há um nome no dispositivo" : userName}
                    bgColor={"gray.900"}
                  />
                </VStack>
                <VStack
                  mt="4"
                >  
                  <Text
                    color={"gray.200"}
                    fontSize="lg"
                    mb={2}
                  >New Name</Text>
                  <Input 
                    value={newUsername}
                    onChangeText={setNewUsername}
                    bgColor={"gray.900"}
                    placeholder="Insira seu nome..."
                  />
                </VStack>
                <Button
                  mt="4"
                  onPress={handleClick}
                >
                  <Text
                    fontFamily={"body"}
                    fontSize="md"
                    fontWeight={"bold"}
                    color="gray.300"
                  >Submit</Text>
                </Button>
              </VStack>
            </Box>
          </Modal>
          <VStack
            flex={1}
          >
            <HStack
              alignItems={"center"}
              justifyContent={"space-between"}
              mb={10}
              mt={4}
            >
              {/* <Text
                fontFamily={"heading.italic"}
                fontSize={32}
                color="gray.500"
              >
                R&D Timer
              </Text> */}
              <Text
                fontSize={20}
                color="white"
              >
                {
                  !userName ? 
                  "Nome não registrado" : 
                  ellipszeWord({
                    maxCharacter: 16,
                    str: userName
                  })
                }
              </Text>
              <HStack
                space={2}
                alignItems="center"
                borderColor={"green.600"}
                borderWidth={2}
                borderRadius={4}
                p={2}
              >
                <Text
                  fontFamily={"body"}
                  fontSize="md"
                  fontWeight={"bold"}
                  color="gray.300"
                  onPress={() => setIsModalOpen(state => !state)}
                  
                >
                  Editar Perfil
                </Text>
                <PencilSimpleLine 
                  size={20}
                  color={colors.gray[300]}
                />
              </HStack>
            </HStack>
            {
              timers.length > 0 ?
              <FlatList
                data={timers}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Card data={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListEmptyComponent={() => (
                  <PencilSimpleLine /> 
                )}
              /> :
              <Spinner />
            }
            <Toast />
          </VStack>
        </Container>
}
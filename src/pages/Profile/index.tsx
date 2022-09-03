import { Modal, Center, Heading, Text, VStack, Box, HStack, Button as CloseButton, useTheme } from "native-base";
import Toast from "react-native-toast-message";
import { useContext, useState } from "react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Input } from "../../components/Inputs";
import { TimerContext } from "../../context/TimerContext";
import { showToastMessage } from "../../utils/toastMessages";
import { ProfileInfo } from "./components/ProfileInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Profile() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");

  const { userName } = useContext(TimerContext);
  // const { colors } = useTheme();

  const msgSuccess = !userName ? "Insira um nome para poder alterar!" : "Nome alterado com sucesso!!";  

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
            <Text
              fontFamily={"heading.italic"}
              fontSize={32}
              color="gray.500"
              mb={10}
            >
              R&D Timer
            </Text>
            <Center>
              {
                !userName ? 
                <Heading>
                  Nenhum nome registrado no dispositivo
                </Heading> :
                <ProfileInfo 
                
                />
              }
              <Button
                mt="4"
                onPress={() => setIsModalOpen(state => !state)}
              >
                <Text
                  fontFamily={"body"}
                  fontSize="md"
                  fontWeight={"bold"}
                  color="gray.300"
                >Editar Perfil</Text>
              </Button>
            </Center>
            <Toast />
          </VStack>
        </Container>
}
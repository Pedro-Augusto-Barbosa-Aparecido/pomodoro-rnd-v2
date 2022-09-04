import { formatDistanceToNow } from "date-fns/esm";
import { ptBR } from "date-fns/esm/locale";
import { Box, HStack, Text, VStack, useTheme } from "native-base";
import { Circle } from "phosphor-react-native";
import { formatDate } from "../../utils/dates";

interface CardProps {
  data: any
}

export function Card ({ data }: CardProps) {
  const createdAt = data.createdAt.seconds * 1000;
  const closedAt = data.closedAt.seconds * 1000;

  const { colors } = useTheme();

  return (
    <Box
      borderRadius={8}
      bg={"gray.900"}
      h={32}
      mb={4}
      borderLeftWidth={8}
      borderLeftColor={data.status == "finish" ? "green.400" : "red.400"}
      p={2}
    >
      <VStack>
        <VStack>
          <Text
            color={"gray.300"}
            fontSize={"md"}
          >{data.projectName}</Text>
          <HStack>
            <Text
              color={"gray.400"}
              mt={2}
            >Task: {data.task}</Text>
          </HStack>
          <Text 
            color={"gray.400"}
            mb={2}
          >Tempo gasto: {formatDate({time: parseInt(data.time)})}</Text>
        </VStack>
        <HStack
          pr={1}
          justifyContent={"space-between"}
        >
          {
            closedAt ?
            <Text
              color={"gray.500"}
            >
              Encerrado {formatDistanceToNow(new Date(closedAt), {
                addSuffix: true,
                locale: ptBR
              })}
            </Text> :
            <Text
              color={"gray.500"}
            >
              Criado {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
                locale: ptBR
              })}
            </Text>
          }
          <Text
            color={"gray.500"}
          >
            {data.status === "finish" ? (
              <HStack
                alignItems={"center"}
                space={2}
              >
                <Circle 
                  weight="fill"
                  color={colors.green[500]}
                  size={16}
                />
                <Text
                  alignItems={"center"}
                  color={"gray.500"}
                >
                  Finish
                </Text>
              </HStack>
            ) : (
              <HStack
                alignItems={"center"}
                space={2}
              >
                <Circle 
                  weight="fill"
                  color={colors.red[500]}
                  size={16}
                />
                <Text
                  alignItems={"center"}
                  color={"gray.500"}
                >
                  In Progress
                </Text>
              </HStack>
            )}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

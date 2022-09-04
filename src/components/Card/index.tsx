import { formatDistanceToNow } from "date-fns/esm";
import { ptBR } from "date-fns/esm/locale";
import { Box, Text } from "native-base";

interface CardProps {
  data: any
}

export function Card ({ data }: CardProps) {
  return (
    <Box
      borderRadius={8}
      bg={"gray.900"}
      h={32}
      mb={4}
      borderLeftWidth={8}
      borderLeftColor={data.status == "finish" ? "green.400" : "red.400"}
    >
      {
        data.createdAt && <Text
          color="white"
        >
          {formatDistanceToNow(new Date(data.createdAt.seconds * 1000), {
            addSuffix: true,
            locale: ptBR,
          })}
        </Text>
      }
    </Box>
  );
}
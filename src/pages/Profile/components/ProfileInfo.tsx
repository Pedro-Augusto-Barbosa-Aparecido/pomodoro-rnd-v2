import { HStack, Text } from "native-base";
import { useContext, useEffect, useState } from "react";

interface IProfileInfo {
  username: string;
}

export function ProfileInfo ({ username }: IProfileInfo) {
  return (
    <HStack>
      <Text 
        fontSize={"lg"}
        fontWeight="bold"
      >
        Nome: {" "}
        <Text>
          {username}
        </Text>
      </Text>
    </HStack>
  );
}
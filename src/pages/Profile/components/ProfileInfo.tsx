import { HStack, Text } from "native-base";
import { useContext, useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";
import { TimerContext } from "../../../context/TimerContext";

interface IProfileInfo {
  username: string;
}

export function ProfileInfo ({ username }: IProfileInfo) {
  const [timers, setTimers] = useState([]);

  const { apiIdForUser } = useContext(TimerContext);

  useEffect(() => {
    const data = firestore()
    .collection("timer")
    .where("userKey", "==", apiIdForUser).onSnapshot(snap => {
      const data = snap.docs.map(doc => {
        const { userKey, closedAt, createdAt, id, projectName, status, task, time } = doc.data();
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
      console.log(data);
    });
  }, []);

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
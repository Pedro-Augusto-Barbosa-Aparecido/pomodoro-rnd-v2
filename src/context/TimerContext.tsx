import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { makeid } from "../utils/generateID";

type Timer = {
  project: string;
  task: string;
  created: Date;
  id: number;
}

interface TimerCreateParams {
  projectName: string;
  task: string;

}

interface TimerContextType {
  timers: Timer[];
  timer: Timer | null;
  apiIdForUser: string | null;
  userName: string | null;
  createTimer: (timer: TimerCreateParams) => number;
  changeName: () => void;
}

export const TimerContext = createContext({} as TimerContextType);

interface TimerContextProviderProps {
  children: React.ReactElement
}

export function TimerContextProvider ({ children }: TimerContextProviderProps) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [timer, setTimer] = useState<Timer | null>(null);
  const [apiIdForUser, setApiIdForUser] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("@pomodoro-api-key").then(data => {
      if (!data) {
        const id = makeid();
        AsyncStorage.setItem("@pomodoro-api-key", id).then(() => {
          setApiIdForUser(() => {
            return id;
          });
        });
        
      } else {
        setApiIdForUser(data)
      }
    });
    AsyncStorage.getItem("@pomodoro-username").then(data => {
      if (data)
        setUserName(data);
    });
  }, []);

  const changeName = () => {
    AsyncStorage.getItem("@pomodoro-username").then(data => {
      if (data)
        setUserName(data);
    });
  }

  function createTimer ({ projectName, task }: TimerCreateParams) {
    const id = Date.now();
    setTimer(() => {
      const timer: Timer = {
        created: new Date(),
        id,
        project: projectName,
        task
      }

      setTimers(state => [...state, timer]);

      return timer;
    });

    return id;

  };

  return (
    <TimerContext.Provider value={{
      timers,
      timer,
      createTimer,
      apiIdForUser,
      userName,
      changeName
    }}>
      { children }
    </TimerContext.Provider>
  );

}

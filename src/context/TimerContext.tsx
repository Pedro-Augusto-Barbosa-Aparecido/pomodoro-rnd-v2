import React, { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

type Timer = {
  project: string;
  task: string;
  created: Date;
  id: string;
}

interface TimerCreateParams {
  projectName: string;
  task: string;

}

interface TimerContextType {
  timers: Timer[];
  timer: Timer | null;
  createTimer: (timer: TimerCreateParams) => void;
}

export const TimerContext = createContext({} as TimerContextType);

interface TimerContextProviderProps {
  children: React.ReactElement
}

export function TimerContextProvider ({ children }: TimerContextProviderProps) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [timer, setTimer] = useState<Timer | null>(null);

  const createTimer = ({ projectName, task }: TimerCreateParams) => {
    setTimer(() => {
      const timer: Timer = {
        created: new Date(),
        id: uuid(),
        project: projectName,
        task
      }

      setTimers(state => [...state, timer]);

      return timer;
    });
  };

  return (
    <TimerContext.Provider value={{
      timers,
      timer,
      createTimer
    }}>
      { children }
    </TimerContext.Provider>
  );

}

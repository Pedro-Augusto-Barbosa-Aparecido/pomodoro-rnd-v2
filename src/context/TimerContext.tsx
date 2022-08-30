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
  createTimer: (timer: TimerCreateParams) => string;
}

export const TimerContext = createContext({} as TimerContextType);

interface TimerContextProviderProps {
  children: React.ReactElement
}

export function TimerContextProvider ({ children }: TimerContextProviderProps) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [timer, setTimer] = useState<Timer | null>(null);

  function createTimer ({ projectName, task }: TimerCreateParams) {
    const id = uuid();
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
      createTimer
    }}>
      { children }
    </TimerContext.Provider>
  );

}

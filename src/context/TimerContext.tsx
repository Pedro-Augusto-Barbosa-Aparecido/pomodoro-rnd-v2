import React, { createContext, useState } from "react";

type Timer = {
  project: string;
  task: string;
  created: Date;
  id: string;
}

interface TimerContextType {
  timers: Timer[];
  timer: Timer | null;
}

export const TimerContext = createContext({} as TimerContextType);

interface TimerContextProviderProps {
  children: React.ReactElement
}

export function TimerContextProvider ({ children }: TimerContextProviderProps) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [timer, setTimer] = useState<Timer | null>(null);
  return (
    <TimerContext.Provider value={{
      timers,
      timer
    }}>
      { children }
    </TimerContext.Provider>
  );

}

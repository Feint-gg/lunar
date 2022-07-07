import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { createContext, useContext, useEffect, useState } from "react";

export interface LcuContextData {
  token: string;
  port: number
}

export interface LcuContextProps {
  data: LcuContextData | null;
  setData: (data: LcuContextData | null) => void;
  inGame: boolean;
  setInGame: (inGame: boolean) => void;
}

export interface StatusUpdateEvent {
  state: "connected" | "disconnected";
  port: number;
  token: string;
}

const LcuContext = createContext<LcuContextProps | null>(null);

export const LcuProvider = LcuContext.Provider; 

/*
export function LcuProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<LcuContextData | null>(null);
  const [inGame, setInGame] = useState<boolean>(false);

  return (
    <LcuContext.Provider
      value={{
        data,
        setData,
        inGame,
        setInGame,
      }}
    >
      {children}
    </LcuContext.Provider>
  );
}*/

export function useLCU() {
  return useContext(LcuContext);
}

import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { createContext, useContext, useEffect, useState } from "react";

interface LcuContextData {
  token: string;
  port: number
}

export interface LcuContextProps {
  data: LcuContextData | null;
  setData: (data: LcuContextData | null) => void;
  inGame: boolean;
  setInGame: (inGame: boolean) => void;
}

interface StatusUpdateEvent {
  state: "connected" | "disconnected";
  port: number;
  token: string;
}

export function useWatchEvents() {
  const lcu = useLCU()

  useEffect(() => {
    let lcuStateUpdate = listen<StatusUpdateEvent>("lcu-state-update", (data) => {
      if (data.payload.state == "disconnected") {
        lcu?.setData(null)
        return
      }

      lcu?.setData({
        token: data.payload.token,
        port: data.payload.port
      })
    })

    invoke("watch_lcu").then(() => {
      console.log("Watching LCU for state updates")
    })

    return () => {
      //lcuStateUpdate()
    }
  }, [lcu?.data])
}

const LcuContext = createContext<LcuContextProps | null>(null);

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
}

export function useLCU() {
  return useContext(LcuContext);
}

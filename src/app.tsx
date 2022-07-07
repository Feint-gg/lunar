import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './styles/main.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { emit, listen } from '@tauri-apps/api/event'
import { LcuContextData, LcuProvider, StatusUpdateEvent, useLCU } from './lib/lcu'
import { invoke } from '@tauri-apps/api/tauri'

export default function App() {
  const [data, setData] = useState<LcuContextData | null>(null);
  const [inGame, setInGame] = useState<boolean>(false);

  useEffect(() => {
    let lcuStateUpdate = listen<StatusUpdateEvent>("lcu-state-update", (data) => {
      if (data.payload.state == "disconnected") {
        setData(null)
        return
      }

      setData({
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
  }, [data])
  
  return (
      <LcuProvider value={{
        data,
        setData,
        inGame,
        setInGame
      }}>
        <Layout>
          <Outlet />
        </Layout>
      </LcuProvider>
  )
}
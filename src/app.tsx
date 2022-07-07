import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './styles/main.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { emit, listen } from '@tauri-apps/api/event'
import { LcuProvider, useWatchEvents } from './lib/lcu'
import { invoke } from '@tauri-apps/api/tauri'

export default function App() {
  useWatchEvents()
  
  return (
      <LcuProvider>
        <Layout>
          <Outlet />
        </Layout>
      </LcuProvider>
  )
}
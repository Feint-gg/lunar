import { useState } from 'react'
import logo from './logo.svg'
import './styles/main.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'

export default function App() {
  return (
      <Layout>
        <Outlet />
      </Layout>
  )
}
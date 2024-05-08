import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import ContextContainer from "./contexts/ContextContainer.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextContainer>
      <App />
    </ContextContainer>
  </BrowserRouter>
)

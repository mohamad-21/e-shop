import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextContainer from "./contexts/ContextContainer"

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextContainer>
    <App />
  </ContextContainer>
)

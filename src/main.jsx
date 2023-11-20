import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/main.css'
import './styles/mobile.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode will call each component's function twice
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)

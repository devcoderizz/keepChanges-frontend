import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RecoilRoot } from 'recoil'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
    <Router>
    <App/>
    </Router>
    </RecoilRoot>
  </React.StrictMode>,
)

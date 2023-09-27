import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FirebaseAppProvider } from 'reactfire'
import 'firebase/auth'
// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// // Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";

import { Home, Auth } from './components'
import './index.css'
import { theme } from './Theme/themes'
import { firebaseConfig } from './firebaseConfig'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<Home title = {"We like to party"} />}></Route>
            <Route path='/auth' element={<Auth title = {"Let's get you signed up so you can sell cars!"}/>}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
)

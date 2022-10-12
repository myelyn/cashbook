import React, { useState } from 'react'
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import { ConfigProvider } from 'zarm'
import routes from '@/router'
import NavBar from '@/container/NavBar'
import { useEffect } from 'react'

function App() {
  const [showNav, setShowNav] = useState()
  const location = useLocation()
  const { pathname } = location 
  const needNav = ['/', '/data', '/user']

  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname])
  
  return <>
    <ConfigProvider primaryColor={'#0097e0'}>
      <Routes>
        {
          routes.map(route => <Route key={route.path} path={route.path} element={<route.component />}>
          </Route>)
        }
      </Routes>
    </ConfigProvider>
    <NavBar showNav={showNav}/>
    </>
}

export default App

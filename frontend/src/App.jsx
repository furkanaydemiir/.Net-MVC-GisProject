import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  const router = createBrowserRouter([{
    path:"/",
    element:<MainLayout/>,
     children:[
      {
      index:true,
      element:<Home/>
      },
    {
      path:"login",
      element:<LoginPage/>
    },
     {
      path:"register",
      element:<RegisterPage/>
     }
  ]
  }])
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
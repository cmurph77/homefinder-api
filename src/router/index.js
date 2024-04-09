// Router Configuration
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Signup from '@/pages/Signup'
import Listing from '@/pages/Listing'
import NotFound from '@/pages/NotFound'
import User from '@/pages/User'
import { AuthRoute } from '@/components/AuthRouter'


import { createBrowserRouter } from 'react-router-dom'

// Configure the instance of router

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><Home /></AuthRoute>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: '/listing/:id',
    element: <AuthRoute><Listing/></AuthRoute>
  },
  {
    path: '/user',
    element: <AuthRoute><User /></AuthRoute>
  },
  {
    path: '*',
    element: <AuthRoute><NotFound/></AuthRoute>
  }
])

export default router
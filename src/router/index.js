// Router Configuration
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Signup from '@/pages/Signup'
import Test from '@/pages/Test'
import Listing from '@/pages/Listing'
import NotFound from '@/pages/NotFound'
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
    path: '/test',
    element: <Test />
  },
  {
    path: '/listing/:id',
    element: <Listing/>
  },
  {
    path: '*',
    element: <NotFound/>
  }
])

export default router
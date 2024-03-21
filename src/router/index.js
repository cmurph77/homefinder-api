// Router Configuration
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Signup from '@/pages/Signup'
import Test from '@/pages/Test'
import Listing from '@/pages/Listing'
import NotFound from '@/pages/NotFound'
import User from '@/pages/User'
import { AuthRoute } from '@/components/AuthRouter'


import { createBrowserRouter } from 'react-router-dom'

import { Suspense, lazy } from 'react'


const UserProfile = lazy(() => import('@/pages/User/components/UserProfile'))
const LikedProperties = lazy(() => import('@/pages/User/components/LikedProperties'))

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
    element: <AuthRoute><Listing/></AuthRoute>
  },
  {
    path: '/user',
    element: <AuthRoute><User /></AuthRoute>,
    children: [
        {
            index: true,
            path: 'profile',
            element: <Suspense fallback={<div>Loading...</div>}><UserProfile /></Suspense>
        },
        {
            path: 'liked-properties',
            element: <Suspense fallback={<div>Loading...</div>}><LikedProperties /></Suspense>
        }
    ]
  },
  {
    path: '*',
    element: <AuthRoute><NotFound/></AuthRoute>
  }
])

export default router
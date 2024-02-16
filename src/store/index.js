// Combine sub-modules + export store instances

import {configureStore} from '@reduxjs/toolkit'
import userReducer from './modules/user'

const store = configureStore({
    reducer:{
        user: userReducer
    }
})

export default store


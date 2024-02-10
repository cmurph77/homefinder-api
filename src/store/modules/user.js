// State Management - user related
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '@/utils'
import { setToken, getToken } from '@/utils'

const userStore = createSlice({
    name: "user",
    initialState:{
        // get token from the local storage first.
        token: getToken('token_key') || ''
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.fulfilled,(state,action) =>{
            state.token = action.payload
            // save the token on the local storage, otherwise the token loses once refreshing
            setToken(action.payload)
        })
    }
})

export const fetchLogin = createAsyncThunk(
    'user/fetchLogin',
    async (loginForm) => {
        const res = await request.post('/authorization', loginForm)
        console.log("data returned from the server",res.data)
        return res.data.token
    }
)


export default userStore.reducer
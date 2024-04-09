import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

import { signInWithEmailAndPassword,setPersistence,browserLocalPersistence,browserSessionPersistence } from "firebase/auth";
import { auth } from '@/firebase'

const userStore = createSlice({
    name: "user",
    initialState:{
        remember: false,
        loading: 'idle',
        error: "",
        userId: "",
    },
    reducers: {
        setRemember (state, action)  {
            state.remember = action.payload
            console.log("remeber me is updated: ",state.remember)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchLogin.pending,(state,action) =>{
            console.log("pending")
            state.loading = 'pending'
        })
        .addCase(fetchLogin.fulfilled,(state,action) =>{
            console.log("fulfilled",action.payload)
            state.token = action.payload
            state.loading = 'succeeded'
            state.userId = action.payload
            console.log("User ID is: ",state.userId)
            if(state.remember) {
                setPersistence(auth, browserLocalPersistence)
            }
            else{
                setPersistence(auth, browserSessionPersistence)
            }
        })
        .addCase(fetchLogin.rejected, (state, action) => {
            console.log("rejected", action.payload)
            state.loading = 'failed'
            state.error = action.payload
        })
    }
})

export const fetchLogin = createAsyncThunk(
    'user/fetchLogin',
    async (loginForm, {rejectWithValue}) => {
        const email = loginForm.email
        const password = loginForm.password
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;
            console.log("User ID is: ",userId)
            return userId
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.code);
        }
    }
)

export const { setRemember } = userStore.actions
export default userStore.reducer
import { message } from 'antd'
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'

export function AuthRoute ({ children }) {
    const navigate = useNavigate()
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            console.log("trigger")
            if (user) {
                message.success('------------Login---------');
                return <>{children}</>
            } else {
                message.error('You haven\'t login')
                navigate('/login')
            }
        });
    },[])
}
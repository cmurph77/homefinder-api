import { message } from 'antd'
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'

export function AuthRoute ( { children } ) {
    const navigate = useNavigate()
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          console.log("trigger");
          if (user) {
            // message.success('------------Login---------');
          } else {
            message.error('You haven\'t logged in');
            navigate('/login');
          }
        });
    
        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
      }, [navigate]);
    
      // Conditionally render children based on authentication state
      return <>{children}</>;
}
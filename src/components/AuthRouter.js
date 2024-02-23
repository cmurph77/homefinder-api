import React, {useState} from 'react';
import { Button, Result, message } from 'antd'
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'


const NoAccess = () => {
  const navigate = useNavigate();
  return (
    <Result
    status="403"
    title="Sorry, you have not logged in"
    subTitle={
      <>
        Sorry, you are not authorized to access this page.
        <br />
        Back to login page in 5s
      </>
    }
    extra={<Button type="primary" onClick={()=>navigate('/login', { replace: true })}>Back Login</Button>}
  />
  )
}
  
;
// export default NoAccess;

export function AuthRoute({ children }) {
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("trigger");
      if (user) {
        setUserExists(true);
        // message.success('------------Login---------');
      } else {
        setUserExists(false);
        message.error('You haven\'t logged in');
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 5000);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  // Conditionally render children based on authentication state
  return <>{userExists ? children : <NoAccess />}</>;
}
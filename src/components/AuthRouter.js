import React, {useState} from 'react';
import { Button, Result, message } from 'antd'
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'


const NoAccess = () => {
  const navigate = useNavigate()
    const [countDown, setCountDown] = useState(3)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountDown(countDown-1)
          }, 1000);
        setTimeout(() => {
            navigate('/login', { replace: true });
            clearInterval(timer)
        }, 3000);
    });

    return (
      <Result
          status="403"
          title="Sorry, you have not logged in"
          subTitle={
              <>
                Sorry, you are not authorized to access this page.
                <br />
                Back to the home page in <span style={{fontWeight:600, color:'black'}}>{countDown}s</span>
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
      if (user) {
        setUserExists(true);
      } else {
        setUserExists(false);
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
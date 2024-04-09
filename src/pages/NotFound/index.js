import { useState, useEffect } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom'


const NotFound = () => {
    const navigate = useNavigate()
    const [countDown, setCountDown] = useState(3)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountDown(countDown-1)
          }, 1000);
        setTimeout(() => {
            navigate('/', { replace: true });
            clearInterval(timer)
        }, 3000);
    });

    return (
        <>
        <Result
            status="404"
            title="404"
            subTitle={
                <>
                Sorry, this page could not be found..
                <br />
                Back to the home page in <span style={{fontWeight:600, color:'black'}}>{countDown}s</span>
                </>
            }
            extra={<Button type="primary" onClick={()=>navigate('/', { replace: true })}>Back to Homepage</Button>}
        />
        </>
    )
}

export default NotFound
import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom'


const NotFound = () => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate('/')
    }

    return (

        // <div>Page Not Found</div>
        <>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={onClick}>Back Home</Button>}
        />
        </>
    )
}

export default NotFound
import { Button, message } from 'antd'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const signout = () => {
        signOut(auth).then(() => {
            navigate('/login')
            message.success("Logout successed")
        }).catch((error) => {
            message.success("Logout Failed, please try again later")
        });
    }
    return (
        <div>This is the homepage
        <Button type="primary" onClick={() => signout()}>
            Logout!
        </Button>

        </div>
        
        
    )
}

export default Home
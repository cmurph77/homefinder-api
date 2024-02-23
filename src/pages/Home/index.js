import { Button, message } from 'antd'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'
import listingData from "@/server/daftData.json";
import Header from "@/components/header.js";
import ListingGrid from "@/components/listingGrid.js";

const listings = listingData.properties;
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
            <Header />
            <ListingGrid properties={listings}/>
        </div>
        
        
    )
}

export default Home
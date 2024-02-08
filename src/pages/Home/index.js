import { request } from "@/utils"
import { useEffect } from "react"


const Home = () => {
    useEffect(() => {
        request.get('/authorization')
    },[])

    return (
        <div>This is the homepage</div>
    )
}

export default Home
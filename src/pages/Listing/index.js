import { useNavigate, useParams } from "react-router-dom"
import { Button } from 'antd'

const Listing = () => {
    const navigate = useNavigate()
    const params = useParams()
    let id = params.id

    return (
        <div>
            this is property {id}
            <Button type="primary" onClick={()=>{navigate('/')}}>
                Back to Homepage
            </Button>
        </div>
    )


}

export default Listing
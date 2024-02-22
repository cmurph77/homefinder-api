import { useParams } from "react-router-dom"

const Listing = () => {
    const params = useParams()
    let id = params.id

    return (
        <div>
            this is property {id}
        </div>
    )


}

export default Listing
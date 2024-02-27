import { Button, message } from 'antd'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'
// import listingData from "@/server/daftData.json";
import Header from "@/components/header.js";
import ListingGrid from "@/components/listingGrid.js";

// const old_listings = listingData.properties
// console.log("Frontend Property Data - oldlistings ")
// console.log(old_listings)

// Make the API call --------------------------------------

var listings
await fetch('http://127.0.0.1:8000/dummydata-properties')
  .then(response => {
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error('Failed to retrieve data');
    }
    // If successful, parse the JSON data
    return response.json();
  })
  .then(api_data => {
    // Now you can work with the JSON data
    listings = api_data.properties

  })
  .catch(error => {
    console.error('Error:', error);
  });


console.log("listings recieved from the backend")
console.log(listings)


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
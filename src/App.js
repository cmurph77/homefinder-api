import logo from './logo.svg';
import './App.css';
import listingData from "./server/data.json";
import Header from "./components/header.js";
import ListingGrid from "./components/listingGrid.js";

function App() {
  const listings = listingData.properties;

  return (
    <div classname="temp">
      <Header />
      <ListingGrid properties={listings}/>
    </div>
  );
}

export default App;

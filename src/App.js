import logo from './logo.svg';
import './App.css';
import listingData from "./server/data.json";
import Header from "./components/header.js";
import ListingCard from "./components/listingCard.js";

function App() {
  const listings = listingData.properties;

  return (
    <div classname="temp">
      <Header />
      <ListingCard rentPerMonth={listings[0]['rent per month']} img={listings[0].pic} address={listings[0].address} id={listings[0].id} bed={listings[0]['property-type'].bed} bath={listings[0]['property-type'].bath} />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to myhomefinder App!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </div>
  );
}

export default App;

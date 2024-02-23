import listingData from "@/server/daftData.json";
import Header from "@/components/header.js";
import ListingGrid from "@/components/listingGrid.js";

export default function MarketplaceListPage() {
  const listings = listingData.properties;

  return (
    <div classname="temp">
      <Header />
      <ListingGrid properties={listings}/>
    </div>
  );
}

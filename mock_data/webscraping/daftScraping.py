import json
from daftlistings import Daft, Location, SearchType, PropertyType

# Create a Daft object and set the search parameters
daft = Daft()
daft.set_location(Location.DUBLIN)
daft.set_search_type(SearchType.RESIDENTIAL_RENT) 
daft.set_property_type(PropertyType.APARTMENT)

# Perform the search and retrieve listings
listings = daft.search()

# Initialize an empty list to store properties
properties = []

# Iterate through listings and populate properties list
for listing in listings:
    
    if listing.total_images > 0:
        images = listing.images
    else:
        images = []
          
    bedrooms = "N/A"
    try:
        # Attempt to retrieve the number of bedrooms, sometimes there is issues with this field being blank
        bedrooms = listing.bedrooms
    except Exception as e:
        print(f"Info missing: {e}. Setting bedrooms to 'N/A'.")
        
    firstImage = "N/A"
    try:
        # Attempt to retrieve first image, sometimes there is issues with this field being blank
        firstImage = images[0]['size720x480']
    except Exception as e:
        print(f"Info missing: {e}. Setting first image to 'N/A'.")
        
    property_info = {
        "id": listing.shortcode,  # Using Daft.ie shortcode as ID
        "address": listing.title,
        "rent per month": listing.monthly_price,
        "daft.ie link":listing.daft_link,
        "latitude": listing.latitude,
        "longitude": listing.longitude,
        "property-type": {
            "category": listing.category,  # Assuming property_type is an Enum
            "type": listing.sections,
            "bed": bedrooms,
            "bath": listing.bathrooms,
            "m2": listing.size_meters_squared
        },
        "num_images" : listing.total_images,
        "img1_size720x480" : firstImage,
        "pic": images
    }
    properties.append(property_info)

# Create the JSON object
data = {"properties": properties}

# Define the file name
file_name = "daftData.json"

# Write JSON data to the file
with open(file_name, "w") as json_file:
    json.dump(data, json_file, indent=4)

print(f"JSON data has been saved to {file_name}")

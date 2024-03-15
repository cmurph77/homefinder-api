import json
import validators
import os
from daftlistings import Daft, Location, SearchType, PropertyType

# Get the current directory of the script
current_dir = os.path.dirname(__file__)

# Construct the file path to property_ids.json
file_path = os.path.join(current_dir, 'daftData.json')

# Construct the file path to property_ids.json
file_path2 = os.path.join(current_dir, 'property_ids.json')

# Create a Daft object and set the search parameters
daft = Daft()
daft.set_location(Location.DUBLIN)
daft.set_search_type(SearchType.RESIDENTIAL_RENT) 
daft.set_property_type(PropertyType.APARTMENT)

# Perform the search and retrieve listings
listings = daft.search()

# Initialize an empty list to store properties
properties = []

# Initialize an empty list to store property IDs
property_ids = []

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
    
    pureLinks = []

    # Bulk of images, some of them repeated but in different sizes
    # for image in images:
    #     for key, value in image.items():
    #         pureLinks.append(value)

    # just one image from each dictionary, issue with the caption field fixed by validating URLS (Steven issue) 
    for image in images:
        for value in image.values():
            if validators.url(value):  # Check if the value is a valid URL
                pureLinks.append(value)
                break  # Exit the loop after adding the first valid URL
            
    # Extract property ID
    property_id = listing.shortcode
    
    # Append property ID to the list
    property_ids.append(property_id)

    property_info = {
        "id": listing.shortcode,  # Using Daft.ie shortcode as ID
        "address": listing.title,
        "rent per month": listing.monthly_price,
        "daft.ie link":listing.daft_link,
        "latitude": listing.latitude,
        "longitude": listing.longitude,
        "publish date": listing.publish_date,
        "property-type": {
            "category": listing.category,  # Assuming property_type is an Enum
            "type": listing.sections,
            "bed": bedrooms,
            "bath": listing.bathrooms,
            "m2": listing.size_meters_squared
        },
        "pic": pureLinks
    }
    properties.append(property_info)

# Create the JSON object
data = {"property-listings": properties}

# Write JSON data to the file
with open(file_path, "w") as json_file:
    json.dump(data, json_file, indent=4)

print(f"JSON data has been saved to {file_path}")

# Create the JSON object for property IDs
ids_data = {"property_ids": property_ids}

# Write JSON data for property IDs to the file
with open(file_path2, "w") as json_file:
    json.dump(ids_data, json_file, indent=4)

print(f"Property IDs JSON data has been saved to {file_path2}")

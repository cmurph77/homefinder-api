import json
import os
import validators
from daftlistings import Daft, Location, SearchType, PropertyType
from concurrent.futures import ThreadPoolExecutor
import subprocess

# Get the current directory of the script
current_dir = os.path.dirname(__file__)

# Construct the file path to property_ids.json
file_path = os.path.join(current_dir, 'daftData.json')

# Construct the file path to property_ids.json
file_path2 = os.path.join(current_dir, 'property_ids.json')

# Function to execute seleniumGetLink.py and capture its output
def execute_selenium_get_link():
    result = subprocess.run(["python", "seleniumGetLink.py"], capture_output=True, text=True)
    chat_link = result.stdout.strip()
    return chat_link

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

# Define the number of threads
num_threads = 25 # Adjust as needed

# Function to process a single listing
def process_listing(listing):
    if listing.total_images > 0:
        images = listing.images
    else:
        images = []
          
    bedrooms = "N/A"
    try:
        # Attempt to retrieve the number of bedrooms, sometimes there are issues with this field being blank
        bedrooms = listing.bedrooms
    except Exception as e:
        print(f"Info missing: {e}. Setting bedrooms to 'N/A'.")

    pureLinks = []

    for image in images:
        for value in image.values():
            if validators.url(value):  # Check if the value is a valid URL
                pureLinks.append(value)
                break  # Exit the loop after adding the first valid URL
    
    # Extract property ID
    property_id = listing.shortcode
    
    # Append property ID to the list
    property_ids.append(property_id)

    # Execute seleniumGetLink.py to get the chat link
    chat_link = execute_selenium_get_link()

    # Create property info
    property_info = {
        "id": listing.shortcode,  # Using Daft.ie shortcode as ID
        "address": listing.title,
        "rent per month": listing.monthly_price,
        "daft.ie link": listing.daft_link,
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
        "pic": pureLinks,
        "chat_link": chat_link  # Add the chat link to the property info
    }

    # Append property info to properties list
    properties.append(property_info)

# Create thread pool executor
with ThreadPoolExecutor(max_workers=num_threads) as executor:
    # Submit tasks for each listing
    futures = [executor.submit(process_listing, listing) for listing in listings]
    
    # Wait for all tasks to complete
    for future in futures:
        future.result()

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

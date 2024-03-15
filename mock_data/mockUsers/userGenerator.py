import json
import random
import os
import string
from faker import Faker

# Get the current directory of the script
current_dir = os.path.dirname(__file__)

# Move one folder upwards
parent_dir = os.path.dirname(current_dir)

# Construct the file path to property_ids.json
file_path = os.path.join(parent_dir, 'webscraping\\property_ids.json')

# Construct the file path for the users JSON file
json_file_path = os.path.join(current_dir, 'mock_users.json')

# Open the file
with open(file_path, 'r') as f:
    property_ids = json.load(f)
    
# Extract property IDs from the loaded data
property_ids_list = property_ids["property_ids"]

# List of available tags
tags = {
    "language": ["English", "Spanish", "French", "Chinese", "Portuguese", "Russian", "Hindi"],
    "smoker": ["Smoker", "Non-smoker", "Social smoker"],
    "pets": ["Dog-friendly", "Cat-friendly", "No-pets"],
    "diet": ["Vegan", "Vegetarian"],
    "allergies": ["Peanuts", "Shellfish"],
    "habit": ["Night-owl", "Morning-bird"],
    "work": ["Work-from-home", "Night-worker"]
}

# Initialize Faker generator
fake = Faker()

# Function to generate random user data
def generate_user_data():
    firebase_id =  generate_firebase_id()
    name = fake.name()
    profile_pic = "https://i.pinimg.com/originals/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"
    selected_tags = generate_selected_tags()
    phone_number = fake.phone_number()
    bio = fake.text()
    liked_properties = random.sample(property_ids_list, random.randint(1, max(1, len(property_ids_list)//15)))
    liked_users = [str(random.randint(10000000, 99999999)) for _ in range(random.randint(0, 10))]
    return {
        "firebase_id": firebase_id,
        "name": name,
        "profile_pic": profile_pic,
        "selected_tags": selected_tags,
        "phone_number": phone_number,
        "bio": bio,
        "liked_properties": liked_properties,
        "liked_users": liked_users
    }

# Function to generate selected tags for the user
def generate_selected_tags():
    selected_tags = {}
    
      # Generate a random number of languages between 1 and the total number of available languages
    num_languages = random.randint(1, 3)
    
    # Randomly select languages
    selected_tags["language"] = random.sample(tags["language"], num_languages)  
    
    # Randomly select other tags
    for category, options in tags.items():
        if category != "language":
            selected_tags[category] = random.choice(options)
    
    return selected_tags

# Function to generate random Firebase ID with letters and digits
def generate_firebase_id():
    # Generate a random string of length 8 consisting of letters and digits
    firebase_id = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
    return firebase_id


# Generate mock user data
num_users = 30  # Change this to generate more or fewer users
mock_data = [generate_user_data() for _ in range(num_users)]

# Save mock data to JSON file
with open(json_file_path, 'w') as f:
    json.dump(mock_data, f, indent=4)

print("Mock user data generated and saved to mock_users.json")

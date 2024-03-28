fileName = 'searchPropertiesWithFilter.json'
    filePath = os.path.join('mock_data', 'ExampleJSONs', fileName)
    with open(filePath, "w") as jsonFile:
        jsonFile.write(propertyData)
import requests


def fetch_geocode(address, api_key):
    # Geocoding API URL
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    # API request params
    params = {"address": address, "key": api_key}

    try:
        # Send a GET request to the API
        response = requests.get(url, params=params)
        # Raise exception if status not successful
        response.raise_for_status()
        # Parse JSON data
        data = response.json()
        # Checking response status, extracting lat and long from response
        if data["status"] == "OK":
            location = data["results"][0]["geometry"]["location"]
            latitude = location["lat"]
            longitude = location["lng"]
            # Returning the lat and long
            return latitude, longitude
        # Print error if geocoding fails
        else:
            print(f"Geocoding failed with status: {data['status']}")
    # Print error if exception occurs during request
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
    # Return none if geocoding fails or there is an error
    return None

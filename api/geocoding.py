import requests


def fetch_geocode(address, api_key):
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {"address": address, "key": api_key}

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        if data["status"] == "OK":
            location = data["results"][0]["geometry"]["location"]
            latitude = location["lat"]
            longitude = location["lng"]
            return latitude, longitude
        else:
            print(f"Geocoding failed with status: {data['status']}")
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
    return None

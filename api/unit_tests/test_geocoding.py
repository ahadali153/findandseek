from dotenv import load_dotenv
from geocoding import fetch_geocode
import os

load_dotenv()

GOOGLE_MAPS_API_KEY = os.environ["GOOGLE_MAPS_API_KEY"]


def test_geocoding():
    # Arrange
    address = "178 North Primrose St. Richmond, VA 23223"

    # Act
    geocode_result = fetch_geocode(address, GOOGLE_MAPS_API_KEY)

    # Assert
    assert geocode_result == (37.5621276, -77.3668965)

    latitude, longitude = geocode_result
    assert isinstance(latitude, float)
    assert isinstance(longitude, float)

    print("Geocode result:", geocode_result)

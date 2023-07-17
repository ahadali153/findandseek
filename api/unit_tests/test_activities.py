from fastapi.testclient import TestClient
from queries.activities import ActivitiesRepository
from main import app


client = TestClient(app)


class TestActivitiesRepository():
    def get_all(self):
        return [

        ]

    def create(self, activity):
        return {
            "id": 10,
            "name": "swimming"
        }


def test_get_activities():
    # Arrange
    app.dependency_overrides[ActivitiesRepository] = TestActivitiesRepository
    # Act
    response = client.get("/activities")

    # Cleanup
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_activity():
    app.dependency_overrides[ActivitiesRepository] = TestActivitiesRepository
    json = {
        "name": "swimming"
    }

    expected = {
        "id": 10,
        "name": "swimming"
    }

    response = client.post("/activities", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected

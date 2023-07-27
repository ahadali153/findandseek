from fastapi.testclient import TestClient
from queries.activities import ActivitiesRepository
from main import app


client = TestClient(app)


<<<<<<< HEAD
class TestActivitiesRepository():
    def get_all(self):
        return [

        ]

    def create(self, activity):
        return {
            "id": 10,
            "name": "swimming"
        }
=======
class TestActivitiesRepository:
    def get_all(self):
        return []

    def create(self, activity):
        return {"id": 10, "name": "swimming"}

    def delete(self, activity_id):
        return True
>>>>>>> 5be0403f7aa70c0fe1a5fb5f016f760824bf1e99


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
<<<<<<< HEAD
    app.dependency_overrides[ActivitiesRepository] = TestActivitiesRepository
    json = {
        "name": "swimming"
    }

    expected = {
        "id": 10,
        "name": "swimming"
    }

    response = client.post("/activities", json=json)

=======
    # Arrange
    app.dependency_overrides[ActivitiesRepository] = TestActivitiesRepository
    json = {"name": "swimming"}

    expected = {"id": 10, "name": "swimming"}

    # Act
    response = client.post("/activities", json=json)

    # Cleanup
>>>>>>> 5be0403f7aa70c0fe1a5fb5f016f760824bf1e99
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
<<<<<<< HEAD
=======


def test_delete_activity():
    ## Arrange
    app.dependency_overrides[ActivitiesRepository] = TestActivitiesRepository
    json = {"name": "swimming"}
    expected = True
    activity_id = 10
    ## ACT
    client.post("/activities", json=json)

    delete_response = client.delete(f"/activities/{activity_id}")

    ## Cleanup
    app.dependency_overrides = {}

    assert delete_response.status_code == 200
    assert delete_response.json() == expected
>>>>>>> 5be0403f7aa70c0fe1a5fb5f016f760824bf1e99

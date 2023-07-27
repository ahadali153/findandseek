from fastapi.testclient import TestClient
from queries.adventures import AdventureRepository
from main import app


client = TestClient(app)


class TestAdventureRepository():
    def get_all(self):
        return [

        ]


def test_get_adventures():
    app.dependency_overrides[AdventureRepository] = TestAdventureRepository
    response = client.get("/adventures")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []

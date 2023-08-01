from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import adventures, accounts, activities, comments
import os

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(activities.router)
app.include_router(adventures.router)
app.include_router(comments.router)

origins = [
    os.environ.get("CORS_HOST", None),
    "https://team-safari.gitlab.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }

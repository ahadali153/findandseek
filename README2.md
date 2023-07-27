# Find & Seek

- Ahad Ali
- Jasmine Gilson
- Artemis Liu
- Eli Spicer

## Slogans:

Discover. Share. Adventure.

Embrace the Journey, Share the Thrill.

Embrace the Unknown, Inspire the World.

## Design

- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended market

We are targeting general consumers in the exploration and adventuring market who are looking for unique and hidden experiences.
Consumers of social media, travel, and darers who can find a wide variety of adventures and experiences to fill their soul.

## Functionality

- Visitors to the site can search and view posts that other users have made.
- Users can click interact with the google map and find posts in their area.
- Users can click on specific posts and view detailed information about the adventure.
- Users can comment on adventure posts and leave their feedback or opinion.
- Users can create adventure posts of their own, detailing their own adventures they have been on.
- Each user has their own account page where there can view all of their own posts, as well as
  uploading a profile picture and bio.

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create safari-db`
4. Run `docker compose build`
5. Run `docker compose up`
6. Run `docker exec -it [insert here ex: smelli-belli-inventory-api-1] bash`
7. Run `python manage.py loaddata products.json`
8. Exit the container's CLI, and enjoy Find & Seek to its fullest!

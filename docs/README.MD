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

- [Wireframe] (docs/find-and-seek-wireframe.png)
- [Web-Design] (docs/figma-web-design.png)
- [APIs] (docs/apis)
- [Data-Model] (docs/data-model)
- [GHI] (docs/ghi)

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

## Future

We hope for the future of this app to become as well renowned as social media apps such as Facebook in regards to gaining a large user database that is always looking for their next adventure, whether it is something extreme as skydiving, to wanting a fun spot to bring friends and family along. We have taken inspiration from AirBnb, Facebook, and TripAdvisor to help the user be involved in their community. We hope to develop a place for travelers to find new destinations to explore as well as share their discoveries with the world.

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

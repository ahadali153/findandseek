## Project Documentation

Please put any and all documentation for your project in this folder. Other than the documents that are required at the end of week 13, feel free to organize this however your group sees fit.

### «Human-readable of the endpoint»

GET request for all posts in the database

- Endpoint path: «/posts»
- Endpoint method: «GET»
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  {
      "posts": [
          {
              "username": "string",
              "title": "string",
              "image_url": "string",
              "description": "string",
              "location": "string",
              "activity": "string",
              "intensity":
              }
      ]
  }
  ```

- Response: «Human-readable description
  of response»
- Response shape (JSON):
  ```json
  «JSON-looking thing that has the
  keys and types in it»
  ```

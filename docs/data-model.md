### Log in

- Endpoint path: /token
- Endpoint method: POST

- Request shape (form):

- username: string
- password: string

- Response: Account information and a token
- Response shape (JSON):
  ```json
  {
  	"account": {
  		"«key»": "type»"
  	},
  	"token": "string"
  }
  ```

### Log out

- Endpoint path: /token
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
  ```

# GET request for all adventures in the database

- Endpoint path: /adventures
- Endpoint method: GET
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json

  ```

- Response: A list of all the adventures
- Response shape (JSON):
  ```json
  {
  	"posts": [
  		{
  			"username": "string",
  			"title": "string",
  			"description": "string",
  			"location": "string",
  			"activity": "string",
  			"intensity": "string",
  			"price": "number",
  			"date_posted": "string",
  			"comment": "string"
  		}
  	]
  }
  ```

## POST a new adventure in the database

- Endpoint path: /adventures
- Endpoint method: POST
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  {
  	"username": "username",
  	"title": "string",
  	"description": "string",
  	"location": "string",
  	"activity": "string",
  	"intensity": "string",
  	"price": "number",
  	"date_posted": "string",
  	"comment": "string"
  }
  ```

- Response: Newly created resource
- Response shape (JSON):
  ```json
  {
  	"username": "username",
  	"title": "string",
  	"description": "string",
  	"location": "string",
  	"activity": "string",
  	"intensity": "string",
  	"price": "number",
  	"date_posted": "string",
  	"comment": "string"
  }
  ```

## GET request for a adventure

- Endpoint path: /adventure/id
- Endpoint method: GET
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json

  ```

- Response: A list of all the adventures
- Response shape (JSON):
  ```json
  {
  	"username": "string",
  	"title": "string",
  	"description": "string",
  	"location": "string",
  	"activity": "string",
  	"intensity": "string",
  	"price": "number",
  	"date_posted": "string",
  	"comment": "string"
  }
  ```

# DELETE request for a adventures

- Endpoint path: /adventures/id
- Endpoint method: DELETE
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json

  ```

- Response: An indication of success or failure
- Response shape (JSON):
  ```json
  {
  	"success": "boolean",
  	"message": "string"
  }
  ```

# UPDATE request for a adventure

- Endpoint path: /adventures/id
- Endpoint method: UPDATE
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  {
  	"title": "string",
  	"description": "string",
  	"location": "string",
  	"activity": "string",
  	"intensity": "string",
  	"price": "number",
  	"comment": "string"
  }
  ```

- Response: An indication of success or failure
- Response shape (JSON):
  ```json
  {
  	"success": "boolean",
  	"message": "string"
  }
  ```

# GET request for all comments of an adventure

- Endpoint path: /adventure/id/comments
- Endpoint method: GET
- Query parameters:

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json

  ```

- Response: A list of all the adventures
- Response shape (JSON):
  ```json
  {
  	"comments": [
  		{
  			"content": "string",
  			"date_commented": "string",
  			"username": "string"
  		}
  	]
  }
  ```

## POST a new comment in the database

- Endpoint path: /adventure/id/comments
- Endpoint method: POST
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  {
  	"content": "string"
  }
  ```

- Response: An indication of success or failure
- Response shape (JSON):
  ```json
  {
  	"success": "boolean",
  	"message": "string"
  }
  ```

# DELETE request for a adventures

- Endpoint path: /adventures/id/comments/id
- Endpoint method: DELETE
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json

  ```

- Response: An indication of success or failure
- Response shape (JSON):
  ```json
  {
  	"success": "boolean",
  	"message": "string"
  }
  ```

# UPDATE request for a comment

- Endpoint path: /adventures/id/comments/id
- Endpoint method: UPDATE
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  {
  	"content": "string"
  }
  ```

- Response: An indication of success or failure
- Response shape (JSON):
  ```json
  {
  	"success": "boolean",
  	"message": "string"
  }
  ```

```

```

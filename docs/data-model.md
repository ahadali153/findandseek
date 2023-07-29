# Data Models

## Accounts

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

### Create an account

- Endpoint path: /accounts

- Endpoint method: POST

- Request shape (JSON):

```json
{
  "email": "string",
  "password": "string",
  "username": "string"
}
```

- Response: Account token and information

- Response shape (JSON):

```json
{
  "account": {
    "id": "int",
    "email": "string",
    "username": "string"
  },
  "access_token": "string",
  "type": "Bearer"
}
```

### Get account token

- Endpoint path: /token

- Endpoint method: GET

- Response: Account token and information

- Response shape (JSON):

```json
{
  "account": {
    "id": "int",
    "email": "string",
    "username": "string"
  },
  "access_token": "string",
  "type": "Bearer"
}
```

### Add account info (biography or profile picture)

- Endpoint path: /accountinfo

- Endpoint method: POST

- Request shape (JSON):

```json
{
  "biography": "string",
  "prof_pic": "string"
}
```

- Response: Account information with updated info

- Response shape (JSON):

```json
{
  "id": "int",
  "email": "string",
  "username": "string",
  "biography": "string",
  "prof_pic": "string"
}
```

## Activities

### Create an activity

- Endpoint path: /activities

- Endpoint method: POST

- Request shape (JSON):

```json
{
  "name": "string"
}
```

- Response: Created activity

- Response shape (JSON):

```json
{
  "id": "int",
  "name": "string"
}
```

### Get all activities

- Endpoint path: /activities

- Endpoint method: GET

- Response: List of activities

- Response shape (JSON):

```json
{
  "id": "int",
  "name": "string"
}
```

### Delete an activity

- Endpoint path: /activities/{activity_id}

- Endpoint method: DELETE

- Response: Boolean indicating success or failure

- Response shape (JSON):

```json
true
```

### Get one activity

- Endpoint path: /activities/{activity_id}

- Endpoint method: GET

- Response: One activity

- Response shape (JSON):

```json
{
  "id": "int",
  "name": "string"
}
```

## Adventures

### Create an adventure

- Endpoint path: /adventures

- Endpoint method: POST

- Request shape (JSON):

```json
{
  "title": "string",
  "description": "string",
  "activity_id": "int",
  "intensity": "int",
  "user_rating": "int",
  "likes": "int",
  "price": "int",
  "address": "string"
}
```

- Response: Created adventure

- Response shape (JSON):

```json
{
  "id": "int",
  "account_id": "int",
  "title": "string",
  "description": "string",
  "activity_id": "int",
  "intensity": "int",
  "user_rating": "int",
  "likes": "int",
  "price": "int",
  "posted_at": "string",
  "address": "string",
  "latitude": "float",
  "longitude": "float",
  "image_url": "string"
}
```

### Get all adventures

- Endpoint path: /adventures

- Endpoint method: GET

- Response: List of adventures

- Response shape (JSON):

```json
{
  "id": "int",
  "account_id": "int",
  "title": "string",
  "description": "string",
  "activity_id": "int",
  "intensity": "int",
  "user_rating": "int",
  "likes": "int",
  "price": "int",
  "posted_at": "string",
  "address": "string",
  "latitude": "float",
  "longitude": "float",
  "image_url": "string"
}
```

### Update an adventure

- Endpoint path: /adventures/{adventure_id}

- Endpoint method: PUT

- Request shape (JSON):

```json
{
  "title": "string",
  "description": "string",
  "activity_id": "int",
  "intensity": "int",
  "user_rating": "int",
  "likes": "int",
  "price": "int",
  "address": "string"
}
```

- Response: Updated adventure

- Response shape (JSON):

```json
{
  "id": "int",
  "account_id": "int",
  "title": "string",
  "description": "string",
  "activity_id": "int",
  "intensity": "int",
  "user_rating": "int",
  "likes": "int",
  "price": "int",
  "posted_at": "string",
  "address": "string",
  "latitude": "float",
  "longitude": "float",
  "image_url": "string"
}
```

### Delete an adventure

- Endpoint path: /adventures/{adventure_id}

- Endpoint method: DELETE

- Response: Boolean indicating success or failure

- Response shape (JSON):

```json
true
```

### Get one adventure

- Endpoint path: /adventures/{adventure_id}

- Endpoint method: GET

- Response: One adventure

- Response shape (JSON):

```json
{
  "id": "int",
  "account_id": "int",
  "title": "string",
  "description": "string",
  "activity_id": "int",
  "intensity": "int",
  "user_rating": "int",
  "likes": "int",
  "price": "int",
  "posted_at": "string",
  "address": "string",
  "latitude": "float",
  "longitude": "float",
  "image_url": "string"
}
```

### Get all adventures for an account

- Endpoint path: /adventures/accounts/{account_id}

- Endpoint method: GET

- Response: List of adventures

- Response shape (JSON):

```json
[
  {
    "id": "int",
    "account_id": "int",
    "title": "string",
    "description": "string",
    "activity_id": "int",
    "intensity": "int",
    "user_rating": "int",
    "likes": "int",
    "price": "int",
    "posted_at": "string",
    "address": "string",
    "latitude": "float",
    "longitude": "float",
    "image_url": "string"
  }
]
```

## Comments

### Create a comment

- Endpoint path: /adventures/{adventure_id}/comments

- Endpoint method: POST

- Request shape (JSON):

```json
{
  "content": "string"
}
```

- Response: Created comment

- Response shape (JSON):

```json
{
  "id": "int",
  "account_id": "int",
  "adventure_id": "int",
  "content": "string",
  "posted_at": "string"
}
```

### Get all comments for an adventure

- Endpoint path: /adventures/{adventure_id}/comments

- Endpoint method: GET

- Response: List of comments

- Response shape (JSON):

```json
[
  {
    "id": "int",
    "account_id": "int",
    "adventure_id": "int",
    "content": "string",
    "posted_at": "string"
  }
]
```

### Update a comment

- Endpoint path: /adventures/{adventure_id}/comments/{comment_id}

- Endpoint method: PUT

- Request shape (JSON):

```json
{
  "content": "string"
}
```

- Response: Updated comment

- Response shape (JSON):

```json
{
  "id": "int",
  "account_id": "int",
  "adventure_id": "int",
  "content": "string",
  "posted_at": "string"
}
```

### Delete a comment

- Endpoint path: /adventures/{adventure_id}/comments/{comment_id}

- Endpoint method: DELETE

- Response: Boolean indicating success or failure

- Response shape (JSON):

```json
true
```

### Get one comment

- Endpoint path: /adventures/{adventure_id}/comments/{comment_id}

- Endpoint method: GET

- Response: One comment

- Response shape (JSON):

```json
{
  "id": "int",
  "account_id": "int",
  "adventure_id": "int",
  "content": "string",
  "posted_at": "string"
}
```

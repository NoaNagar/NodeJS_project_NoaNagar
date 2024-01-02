# Business Card Site Server

Welcome to the Business Card Site server! This server provides functionality for creating and managing user accounts, as well as creating, editing, and deleting business cards.

When downloading the project, download the node module file using the command: pnpm i / npm i

## Usage

### User Operations

#### Create User:

Endpoint: http://localhost:8080/api/v1/users
Method: POST
Request body: JSON with user details (username, password, etc.)

#### Login:

Endpoint: http://localhost:8080/api/v1/users/login
Method: POST
Request body: JSON with login credentials (username, password)
Response: Token for authentication

#### Edit User:

Endpoint: http://localhost:8080/api/v1/users/:userId
Method: PUT
Request body: JSON with updated user details
Authentication required (with Token)

#### Delete User:

Endpoint: http://localhost:8080/api/v1/users/:userId
Method: DELETE
Authentication required

#### Get User Information:

Endpoint: http://localhost:8080/api/v1/users/:userId
Method: GET
Authentication required

#### Downgrading a business user:

Endpoint: http://localhost:8080/api/v1/users/:userId
Method: PATCH
Authentication required (Only the user himself)

### Business Card Operations

#### Create Business Card:

Endpoint: http://localhost:8080/api/v1/cards
Method: POST
Request body: JSON with card details
Authentication required (just Business user)

#### Edit Business Card:

Endpoint: http://localhost:8080/api/v1/cards/:userId
Method: PUT
Request body: JSON with updated card details
Authentication required (Only for the user who created the card)

#### Delete Business Card:

Endpoint: http://localhost:8080/api/v1/cards/:cardId
Method: DELETE
Authentication required (Only for the user who created the card)

#### Get Business Cards:

Endpoint: http://localhost:8080/api/v1/cards
Method: GET

#### Get Business Card By Id:

Endpoint: http://localhost:8080/api/v1/cards/:cardId
Method: GET

## Admin Operations

### Get All Users:

Endpoint: http://localhost:8080/api/v1/users
Method: GET
Authentication required (Administrator)

Get User by ID:

Endpoint: http://localhost:8080/api/v1/users/:userId
Method: GET
Authentication required (Administrator)

### Delete User as Administrator:

Endpoint: http://localhost:8080/api/v1/users/:userId
Method: DELETE
Authentication required (Administrator)

#### Downgrading a business user:

Endpoint: http://localhost:8080/api/v1/users/:userId
Method: PATCH
Authentication required (Administrator)

### Delete Business Card as Administrator:

Endpoint: http://localhost:8080/api/v1/cards/:cardId
Method: DELETE
Authentication required (Administrator)

## API Endpoints

There are 2 endpoints of the API

1. Through mongoDB's compass (dev)
2. Through the cloud, Atlas of mongoDB (test)

(I used the dev path)

You can change the API path by changing the path in the .ENV file

## Authentication

The TOKEN is created when an existing user logs in
It contains the email and encrypted password of the logged in user
When verifying a request, add the TOKEN at the top of the request

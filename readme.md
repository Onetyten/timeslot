# Timeslot
Timeslot is a birthday and event reminder web app that automates sending well wishes. It's designed to help businesses and individuals keep track of important dates and ensure no one is forgotten. Each entry is called a timeslot, representing a specific date tied to an event. When the scheduled day arrives, the timeslot is automatically “released,” triggering an email to be sent out to the celebrant.

## Features
- Store birthdays and events
- Email notifications to celebrants

## Tech
- ExpressJS
- MongoDb
- Typescript
- Node-cron
- Nodemailer

## Installation

1. ### Clone the repository:
   ```bash
   git clone https://github.com/Onetyten/timeslot.git
   cd timeslot
   ```

2. ### Install dependencies(make sure you have npm and node installed):
   ```bash
   npm install
   ```

3. ### Create a .env file following this format
   Create a .env file in the root of the project and add the following environment variables:
   ```env
        PORT=3210
        MONGO_STRING="Mongo db connection string"
        JWT_SECRET=""
        EMAIL_SERVICE=""
        EMAIL_USER=""
        EMAIL_PASSWORD=""
   ```
4. ### Start the server
   ```bash
   npm run dev
   ```
## Architecture
    - Server: Serves api, authentication and cron jobs.
    - Client: React app that provides an interactive UI
    - Database: MongoDB

# Endpoints

## 1. Create a new user account.
   
`POST /user/signup`
---

## Request Body

```json
{
  "name": "JohnDoe",
  "email": "john@example.com",
  "password": "strongpassword123"
}
```
**Response**
**200 OK** – Members successfully fetched
```json
{
  "message": "User johndoe created",
  "data": {
    "name": "johndoe",
    "email": "john@example.com"
  },
  "success": true
}
```
**400 Bad Request** – Validation error
```json
{
  "message": "invalid input \"name\" length must be at least 3 characters long",
  "error": {},
  "success": false
}
```
**500 Internal Server Error** – Server-side failure
```json
{
  "message": "Email already exists, please log in",
  "error": {},
  "success": false
}
```
**Example Usage (Client)**
```ts
const response = await fetch("/user/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "JohnDoe",
    email: "john@example.com",
    password: "strongpassword123"
  })
});
const data = await response.json();
console.log(data);
```

-----

## 2. Sign In User
   
`POST /user/signin`
---

## Request Body

```json
{
  "email": "john@example.com",
  "password": "strongpassword123"
}
```
**Response** 
**200 OK** – User successfully signed in
```json
{
  "message": "Signed in, welcome johndoe",
  "data": {
    "_id": "uuid",
    "name": "johndoe",
    "email": "john@example.com",
    "refreshToken": "randomlyGeneratedRefreshToken"
  },
  "token": "jwtAccessTokenHere",
  "success": true
}

```
**400 Bad Request** – Validation error or incorrect password
```json
{
  "message": "Incorrect password",
  "success": false
}
```
**404 Not Found** – User does not exist
```json
{
  "message": "This user does not exist, sign up to create a timeslot account",
  "success": false
}
```
**500 Internal Server Error** – Server-side failure
```json
{
  "message": "Internal server error",
  "error": "detailed error message",
  "success": false
}
```
**Example Usage (Client)**
```ts
    const response = await fetch("/user/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: "john@example.com",
        password: "strongpassword123"
    })
    });
    const data = await response.json();
    console.log(data.token);
    console.log(data.data.refreshToken);
```
-----

## 3. Refresh Access Token
   
`POST /user/token/session`
---

## Request Body

```json
{
  "refreshToken": "randomlyGeneratedRefreshToken"
}
```
**Response** 
**200 OK** – New access token issued
```json
{
  "message": "New token Assigned",
  "data": "newJwtAccessTokenHere",
  "success": true
}
```
**400 Bad Request** – Missing refresh token
```json
{
  "message": "No refresh token provided",
  "success": false
}
```
**401 Unauthorized** – Token not found or expired
```json
{
  "message": "Token either does not exist or has expired",
  "success": false
}
```
**500 Internal Server Error** – Server-side failure
```json
{
  "message": "An unexpected error occurred. Please try again later.",
  "error": "detailed error message",
  "success": false
}
```
**Example Usage (Client)**
```ts
const response = await fetch("/user/token/session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    refreshToken: "randomlyGeneratedRefreshToken"
  })
});

const data = await response.json();
console.log(data.data); // new access token
```


## 4. Create Slot
   
`POST /slot/create`
---

**Authorization Required**  


## Request Body

```json
{
  "name": "Adetayo",
  "email": "Adetayo@example.com",
  "type": "birthday",
  "eventDate": "2025-12-15T00:00:00.000Z",
  "relationship": "friend"
}
```
**Response** 
**201 Created** – Timeslot successfully created
```json
{
  "message": "New time slot created",
  "data": {
    "_id": "uuid",
    "userId": "uuid",
    "name": "Adetayo",
    "email": "Adetayo@example.com",
    "type": "birthday",
    "eventDate": "2025-12-15T00:00:00.000Z",
    "relationship": "friend"
  },
  "success": true
}

```
**400 Bad Request** – Validation error
```json
{
  "message": "Invalid input \"eventDate\" must be greater than now",
  "error": {},
  "success": false
}
```
**401 Unauthorized** – Missing/invalid/expired token
```json
{
  "message": "Access token expired, please refresh",
  "error": "TokenExpiredError",
  "code": "TOKEN_EXPIRED",
  "success": false
}
```
**409 Conflict** – Duplicate birthday slot not allowed
```json
{
  "message": "Duplicate slots not allowed",
  "success": false
}
```
**500 Internal Server Error** – Server-side failure
```json
{
  "message": "Internal server error",
  "error": "detailed error message",
  "success": false
}
```
**Example Usage (Client)**
```ts
const response = await fetch("/slot/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    name: "Adetayo",
    email: "Adetayo@example.com",
    type: "birthday",
    eventDate: "2025-12-15T00:00:00.000Z",
    relationship: "friend"
  })
});
const data = await response.json();
console.log(data);
```


## 5. Fetch Slots
   
`GET /slot/fetch`
---

**Authorization Required**  


## Request

This endpoint does not require a body.  
Only the **Authorization** header is required.

**Response** 
**200 OK** – Timeslots successfully fetched  
```json
{
  "message": "Timeslots fetched",
  "data": [
    {
      "_id": "uuid",
      "userId": "uuid",
      "name": "Adetayo",
      "email": "Adetayo@example.com",
      "type": "birthday",
      "eventDate": "2025-12-15T00:00:00.000Z",
      "relationship": "friend"
    },
    {
      "_id": "uuid",
      "userId": "uuid",
      "name": "Team Meeting",
      "email": "",
      "type": "event",
      "eventDate": "2025-10-05T10:00:00.000Z",
      "relationship": ""
    }
  ],
  "success": true
}
```
**200 OK** – No timeslots found  
```json
{
  "message": "No timeslots found",
  "success": true
}
```

**401 Unauthorized** – Missing/invalid/expired token
```json
{
  "message": "Access token expired, please refresh",
  "error": "TokenExpiredError",
  "code": "TOKEN_EXPIRED",
  "success": false
}
```
**500 Internal Server Error** – Server-side failure
```json
{
  "message": "Internal server error",
  "error": "detailed error message",
  "success": false
}
```
**Example Usage (Client)**
```ts
const response = await fetch("/slot/fetch", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${accessToken}`
  }
});

const data = await response.json();
console.log(data.data);

```




## 6. Delete Slot
   
`DELETE /slot/delete/:id`
---

**Authorization Required**  


## Request

This endpoint does not require a body.  
Only the **Authorization** header is required.

**Response** 
**200 OK** – Timeslot successfully deleted 
```json
{
  "message": "Timeslots deleted",
  "data": {
    "_id": "uuid",
    "userId": "uuid",
    "name": "Adetayo",
    "email": "Adetayo@example.com",
    "type": "birthday",
    "eventDate": "2025-12-15T00:00:00.000Z",
    "relationship": "friend"
  },
  "success": true
}
```
**401 Unauthorized** – User not authorized to delete slot
```json
{
  "message": "Not authorized",
  "success": false
}
```
**404 Not Found** – Slot does not exist
```json
{
  "message": "This slot does not exist",
  "success": false
}
```

**500 Internal Server Error** – Server-side failure
```json
{
  "message": "Internal server error",
  "error": "detailed error message",
  "success": false
}
```
**Example Usage (Client)**
```ts
const slotId = "uuid";

const response = await fetch(`/slot/delete/${slotId}`, {
  method: "DELETE",
  headers: {
    "Authorization": `Bearer ${accessToken}`
  }
});

const data = await response.json();
console.log(data);
```



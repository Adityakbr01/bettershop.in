# Authentication API Documentation
## Signup**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
  "email": "string",
  "password": "string"
```
**Response (201):**
- set accesToken on cookie



## Signin**Endpoint:** `POST /auth/signin`
**Request Body:** 
```json
{
  "email": "string", 
  "password": "string"
}
```
**Response (200):** 
- set accesToken on cookie




## Github Auth**Endpoint:** `POST /auth/github`
**Request Body:**- Github login credentials
**Response (200/201):**
- set accesToken on cookie

## Google Auth**Endpoint:** `POST /auth/google`
**Request Body:**- Google login credentials
**Response (200/201):**
- set accesToken on cookie


## Get Current User**Endpoint:** `GET /auth/me`
**Response (200):**- Returns current authenticated user details


## Logout**Endpoint:** `POST /auth/logout`
**Response (200):**- Clears authentication token








&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;



## Authentication Flow
1. User signs up with email/password or Github
2. User signs in to get JWT token
3. Token is included in Authorization header for protected routes
3. User can logout to invalidate token
4. /auth/me endpoint can be used to verify authentication status









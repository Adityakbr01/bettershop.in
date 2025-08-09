# Authentication API Documentation
## Signup**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
  "email": "string",
  "password": "string"
```
**Response (201):**- Returns created user object

## Signin**Endpoint:** `POST /auth/signin`
**Request Body:** 
```json
{
  "email": "string", 
  "password": "string"
}
```

**Response (200):**- Returns user object and JWT token
## Github Auth**Endpoint:** `POST /auth/github`
**Request Body:**- Github login credentials
**Response (200/201):**


- Returns user object on successful login/signup
## Logout**Endpoint:** `POST /auth/logout`
**Response (200):**- Clears authentication token

## Get Current User**Endpoint:** `GET /auth/me`
**Response (200):**- Returns current authenticated user details


## Authentication Flow
1. User signs up with email/password or Github
2. User signs in to get JWT token
3. Token is included in Authorization header for protected routes
3. User can logout to invalidate token
4. /auth/me endpoint can be used to verify authentication status


&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;



# *Pending Routes
### Google Auth**Endpoint:** `POST /auth/google`
**Request Body:**- Google login credentials
**Response (200/201):**













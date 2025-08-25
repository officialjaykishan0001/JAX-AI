



# Backend API Documentation

## Base URL
```

[http://localhost:8000/api](http://localhost:8000/api)

```
(or your deployed server URL)

---

## Authentication
All routes are protected using **Clerk Authentication**.  
Pass the JWT token in the request header:

```

Authorization: Bearer <token>

````

---

## Models

### Chat
```json
{
  "userId": "string",
  "history": [
    {
      "role": "user | model",
      "parts": [
        { "text": "string" }
      ],
      "img": "string (optional)"
    }
  ]
}
````

### UserChats

```json
{
  "userId": "string",
  "chats": [
    {
      "_id": "string",
      "title": "string",
      "createdAt": "Date"
    }
  ]
}
```

---

## Endpoints

### 1. Get User Chats

**GET** `/userchats`

**Headers**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Response**

```json
{
  "userId": "12345",
  "chats": [
    {
      "_id": "abc123",
      "title": "My first chat",
      "createdAt": "2025-08-24T10:00:00Z"
    }
  ]
}
```

---

### 2. Create New Chat

**POST** `/userchats`

**Body**

```json
{
  "title": "New Chat"
}
```

**Response**

```json
{
  "_id": "xyz789",
  "title": "New Chat",
  "createdAt": "2025-08-24T10:10:00Z"
}
```

---

### 3. Get Chat by ID

**GET** `/chats/:id`

**Response**

```json
{
  "_id": "xyz789",
  "userId": "12345",
  "history": [
    {
      "role": "user",
      "parts": [{ "text": "Hello" }]
    },
    {
      "role": "model",
      "parts": [{ "text": "Hi! How can I help?" }]
    }
  ]
}
```

---

### 4. Update Chat History

**PUT** `/chats/:id`

**Body**

```json
{
  "role": "user",
  "parts": [{ "text": "What's the weather today?" }],
  "img": "https://example.com/image.png"
}
```

**Response**

```json
{
  "message": "Chat updated successfully",
  "chat": {
    "_id": "xyz789",
    "history": [...]
  }
}
```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```bash
# Server
PORT=8000

# MongoDB
MONGO=mongodb+srv://<username>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# ImageKit
VITE_IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
VITE_IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
VITE_IMAGE_KIT_ENDPOINT=https://ik.imagekit.io/your_imagekit_id/

# Frontend URL for CORS
CLIENT_URL=http://localhost:3000



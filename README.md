# comm-api

This repository contains the backend API for the Community Collaboration Platform. It serves as the backend server responsible for handling data storage, authentication, and communication with the frontend client.

## Features

### Authentication
- Provides secure authentication mechanisms for users.
- Supports user registration, login, and logout functionality.
- Implements token-based authentication for secure communication between client and server.

### Data Storage
- Manages storage and retrieval of user data, messages, and user profiles.

### RESTful API
- Exposes a RESTful API for interaction with the frontend client.
- Supports CRUD operations for managing user accounts, messages, and user profiles.
- Implements endpoint authentication and authorization to control access to resources.

## Technologies

- TypeScript
- Express.js
- Websockets
- JWT

## Installation

To run the Community Collaboration Platform API locally, follow these steps:

1. Clone the repository:
```
git clone https://github.com/krzysiou/comm-api.git
```

2. Install dependencies:
```
npm install
```

3. Configure environment variables:
Copy the `.env.example` file to `.env` and fill in the necessary configuration details, including database connection information and secret keys.

5. Start the server:
```
npm start
```

6. The API server will be running locally and accessible at `http://localhost:3100`.

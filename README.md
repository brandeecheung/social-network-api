# Social Network API

## Description

This project is a RESTful API for a social network web application built using Node.js, Express.js, MongoDB, and Mongoose ODM. The API allows users to create and manage their social profiles, share their thoughts, react to friends' thoughts, and manage a friend list. This application is designed to handle large amounts of unstructured data efficiently, making it ideal for social media platforms.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [Screenshots](#screenshots)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

## Installation

To install and run this project locally, follow these steps:

1. Ensure MongoDB is installed on your machine. If not, follow the [MongoDB installation guide](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb).

2. Clone the repository:
    ```bash
    git clone git@github.com:brandeecheung/social-network-api.git
    cd social-network-api
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    ```

4. Start the server:
    ```bash
    npm start
    ```

The server should now be running on `http://localhost:3001`.

## Usage

This API allows users to:

- Create, read, update, and delete users and their thoughts.
- Add and remove friends from their friend list.
- React to thoughts and remove reactions.

Use Insomnia or Postman to interact with the API by testing the routes provided.

## API Routes

### Users

- `GET /api/users`: Get all users.
- `GET /api/users/:id`: Get a single user by ID, along with their thoughts and friend data.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update a user by ID.
- `DELETE /api/users/:id`: Delete a user by ID and their associated thoughts.

### Friends

- `POST /api/users/:userId/friends/:friendId`: Add a friend to a user's friend list.
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.

### Thoughts

- `GET /api/thoughts`: Get all thoughts.
- `GET /api/thoughts/:id`: Get a single thought by ID.
- `POST /api/thoughts`: Create a new thought.
- `PUT /api/thoughts/:id`: Update a thought by ID.
- `DELETE /api/thoughts/:id`: Delete a thought by ID.

### Reactions

- `POST /api/thoughts/:thoughtId/reactions`: Create a reaction to a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction by its ID.

## Models

### User

- `username`: String, required, unique, trimmed.
- `email`: String, required, unique, must match a valid email format.
- `thoughts`: Array of `_id` values referencing the `Thought` model.
- `friends`: Array of `_id` values referencing the `User` model (self-reference).
- `friendCount`: Virtual field that retrieves the length of the user's `friends` array.

### Thought

- `thoughtText`: String, required, between 1 and 280 characters.
- `createdAt`: Date, default is the current timestamp, formatted using a getter method.
- `username`: String, required.
- `reactions`: Array of nested documents created with the `reactionSchema`.
- `reactionCount`: Virtual field that retrieves the length of the thought's `reactions` array.

### Reaction (Schema Only)

- `reactionId`: ObjectId, default is a new ObjectId.
- `reactionBody`: String, required, 280 character maximum.
- `username`: String, required.
- `createdAt`: Date, default is the current timestamp, formatted using a getter method.

## Walkthrough Video

Watch the full walkthrough video demonstrating the functionality of the API [here](https://drive.google.com/file/d/1nfaQww8PFPNZIIlxHk3yVUQutq0K8qLg/view?usp=sharing).

## GitHub Repository

You can view the full source code for this project on GitHub [here](https://github.com/brandeecheung/social-network-api).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

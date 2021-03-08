# HTTP Notification System

A server (or set of servers) to keep track of `topics` -> `subscribers` where a topic is a string and a subscriber is an HTTP endpoint. When a message is published on a topic, it should be forwarded to all subscriber endpoints.

**Technology Stack**

- Nodejs/Express
- MongoDB

## Dependencies

- Node
- Express
- Mongoose
- DotEnv
- Axios

## Installation

- Clone the repository.
- Change into the project directory.
- Use `npm install` to install all project dependencies.
- Create a `.env` file in the root folder to provide all the needed environment variables as specified in `.env.example`
- Run `seeder:import` to populate database with test topics.
- Use `npm run pubserver` to start publisher server.
- Use `npm run subserver` to start subscribing server.

## Testing

- Use `npm run test` to run tests.

## Usage

**Create a Subscription**

```json
POST /subscribe/{topic}

// body
{
  "url": "http://mysubscriber.test"
}

```

**Publish Message To Topic**

```json

POST /publish/{topic}

// body
{
  "message": "Hello"
}

```

## Known Issues

- `http://localhost` won't pass the URL validation when creating a subscription. Use `http://127.0.0.1` instead.
- A logging tool be used instead of `console.log` or `console.error`.

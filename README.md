# Task-Manager

Task-Manager is a web application designed to facilitate the management of tasks and subtasks for users. This project enables users to create, read, update, and delete tasks and subtasks efficiently. Built using modern technologies, Task-Manager ensures a seamless experience for users to stay organized and manage their workflows effectively.

## Key Features
- **User Authentication:** Secure signup and login functionality to ensure user data privacy and protection.
- **Task Management:** Users can create, view, update, and delete tasks. Each task can have multiple subtasks associated with it.
- **Soft Deletion:** Tasks and subtasks can be marked as deleted without being removed from the database, allowing for data integrity and historical tracking.
- **Tech Stack:** Built using Node.js, Express.js, MongoDB, and JavaScript for server-side development.
- **RESTful APIs:** Standardized interface for efficient communication between different components.
- **Efficient Querying:** Only non-deleted tasks and subtasks are returned in query responses to ensure clean data presentation.

## Future Enhancements
- **Enhanced Security Features:** Implement encryption and protection against common security threats.
- **Joi Validation:** Utilize Joi for validating incoming requests to enhance security.
- **JWT Tokens:** Implement JWT tokens for secure authentication and authorization.
- **Auth Middleware:** Develop middleware for managing user authentication and authorization effectively.

## Getting Started

To get started with Task-Manager, follow these steps:
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure the environment variables in the `.env` file.
4. Start the application using `npm start`.

## Configuration

Before running Task-Manager, make sure to set up the following environment variables:

- `PORT`: The port number on which the server will run. (e.g., 3000)
- `MONGO_DB_URL`: The URL of your MongoDB server with the database name. (e.g., mongodb://127.0.0.1:27017/task-manager)
- `TOKEN_SIGNATURE`: A secret key used for JWT token generation and verification. (e.g., thisismytokensignature)

## Sample Postman Requests

### Create Task
```json
POST /tasks
{
  "subject": "Complete project report",
  "deadline": "2024-06-10T23:59:59.999Z",
  "status": "pending",
  "subtasks": [
    {
      "subject": "Gather data",
      "deadline": "2024-06-05T23:59:59.999Z",
      "status": "pending"
    },
    {
      "subject": "Analyze data",
      "deadline": "2024-06-07T23:59:59.999Z",
      "status": "pending"
    }
  ]
}

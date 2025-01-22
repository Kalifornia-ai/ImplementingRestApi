# Task Manager API

This is a simple **Task Manager API** built with `Node.js` and `Express`. 
It provides functionality for user authentication and managing tasks, such as creating, updating, marking as done, and deleting tasks.

---

## usePrerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-manager-api.git
   cd task-manager-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure your environment variables:

   ```plaintext
   PORT=3000
   JWT_SECRET=your_secret_key
   ```

   Replace `your_secret_key` with a secure string for token generation.

---

## Usage

### Start the Server

To start the server, run:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register a new user. |
| POST   | `/api/auth/login`    | Log in a user.       |

### Tasks

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/api/tasks`            | Add a new task.           |
| GET    | `/api/tasks`            | Get all tasks.            |
| POST   | `/api/tasks/done`       | Mark a task as completed. |
| GET    | `/api/tasks/done`       | Get completed tasks.      |
| DELETE | `/api/tasks/`           | Delete a task.            |
| PUT    | `/api/tasks/:taskTitle` | Update a task.            |

---

## Authentication Middleware

Protected routes require a valid **JWT token**. Pass the token in the `Authorization` header as follows:

```plaintext
Authorization: Bearer <your_token>
```

---

## Project Structure

```
├── services/
│   ├── AuthService.js     # Authentication logic
│   ├── TasksService.js    # Task management logic
│   └── UsersService.js    # User management logic
├── .env                   # Environment variables
├── server.js              # Entry point
├── package.json           # Dependencies and scripts
└── README.md              # Documentation
```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For questions or feedback, please reach out to:

- **Author**: [Your Name](mailto\:your-email@example.com)
- **GitHub**: [https://github.com/your-username](https://github.com/your-username)




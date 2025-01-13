const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const UsersService = require('./services/UsersService');
const TasksService = require('./services/TasksService');
const AuthService = require('./services/AuthService');

dotenv.config(); // Load environment variables

const app = express();
app.use(bodyParser.json()); // Parse JSON requests

// Instantiate services
const usersService = new UsersService();
const tasksService = new TasksService(usersService); // Pass UsersService to TasksService
const authService = new AuthService(usersService);

// Auth Routes
app.post('/api/auth/register', (req, res) => usersService.registerUser(req, res));
app.post('/api/auth/login', (req, res) => usersService.loginUser(req, res, authService));

// Task Routes
app.post('/api/tasks', authService.authenticateToken.bind(authService), (req, res) => tasksService.addTask(req, res)); // Add a task
app.get('/api/tasks', authService.authenticateToken.bind(authService), (req, res) => tasksService.getTasks(req, res)); // Get all tasks
app.post('/api/tasks/done', authService.authenticateToken.bind(authService), (req, res) => tasksService.markTaskAsDone(req, res)); // Mark a task as done
app.get('/api/tasks/done', authService.authenticateToken.bind(authService), (req, res) => tasksService.getCompletedTasks(req, res)); // Get completed tasks
app.delete('/api/tasks/', authService.authenticateToken.bind(authService), (req, res) => tasksService.deleteTask(req, res)); // Delete a task
app.put('/api/tasks/:taskTitle', authService.authenticateToken.bind(authService), (req, res) => tasksService.updateTask(req, res)); // Update a task

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

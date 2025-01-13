class TasksService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async addTask(req, res) {
        try {
            const { title, description } = req.body;
            console.log("User in addTask:", req.user);
            const user = req.user;

            if (!title || !description) {
                return res.status(400).json({ message: "Title and description are required" });
            }

            // Check for unique title within the user's tasks
            const taskExists = user.tasks.some(task => task.title === title);
            if (taskExists) {
                return res.status(400).json({ message: "Task title must be unique" });
            }

            // Add task to user's tasks array
            const newTask = { title, description, done: false };
            user.tasks.push(newTask);

            res.status(201).json({ message: "Task added successfully", task: newTask });
        } catch (error) {
            console.error("Error in addTask:", error);
            res.status(505).json({ message: "Something went wrong on the server" });
        }
    }

    async deleteTask(req, res) {
        try {
            const { title } = req.body;
            const user = req.user;

            const taskIndex = user.tasks.findIndex(task => task.title === title);
            if (taskIndex === -1) {
                return res.status(404).json({ message: "Task not found" });
            }

            user.tasks.splice(taskIndex, 1); // Remove task from array
            res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            console.error("Error in deleteTask:", error);
            res.status(505).json({ message: "Something went wrong on the server" });
        }
    }

    async markTaskAsDone(req, res) {
        try {
            const { title } = req.body;
            const user = req.user;

            const task = user.tasks.find(task => task.title === title);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            task.done = true; // Mark task as done
            res.status(200).json({ message: "Task marked as done" });
        } catch (error) {
            console.error("Error in markTaskAsDone:", error);
            res.status(505).json({ message: "Something went wrong on the server" });
        }
    };


    async updateTask(req, res) {
        try {
            const { taskTitle } = req.params;
            const { newTitle, newDescription } = req.body;
            const user = req.user;

            const task = user.tasks.find(task => task.title === taskTitle);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            // Check for unique title if title is being updated
            if (newTitle && newTitle !== taskTitle) {
                const titleExists = user.tasks.some(task => task.title === newTitle);
                if (titleExists) {
                    return res.status(400).json({ message: "New title must be unique" });
                }
                task.title = newTitle; // Update title
            }

            if (newDescription) {
                task.description = newDescription; // Update description
            }

            res.status(200).json({ message: "Task updated successfully", task });
        } catch (error) {
            console.error("Error in updateTask:", error);
            res.status(505).json({ message: "Something went wrong on the server" });
        }
    };

    async getTasks(req, res) {
        try {
            const user = req.user; // Authenticated user
            const activeTasks = user.tasks.filter((task) => !task.done); // Only unfinished tasks
            res.status(200).json(activeTasks);
        } catch (error) {
            console.error("Error in getTasks:", error);
            res.status(505).json({ message: "Something went wrong on the server" });
        }
    };


    async getCompletedTasks(req, res) {
        try {
            const user = req.user; // Authenticated user
            const completedTasks = user.tasks.filter((task) => task.done); // Only completed tasks
            res.status(200).json(completedTasks);
        } catch (error) {
            console.error("Error in getCompletedTasks:", error);
            res.status(505).json({ message: "Something went wrong on the server" });
        }
    };


}

module.exports = TasksService;


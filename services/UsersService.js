const bcrypt = require('bcrypt');


class UsersService {
    constructor() {
        this.users = [];
    }

    async registerUser(req, res) {
        try {
            const { email, password, firstName, lastName } = req.body;

            // Validate input
            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters' });
            }

            // Check if email is unique
            const userExists = this.users.find((user) => user.email === email);
            if (userExists) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save user to "database"
            const newUser = { email, password: hashedPassword, firstName, lastName, tasks: [] };
            this.users.push(newUser);

            res.status(200).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error(err);
            res.status(505).json({ message: 'Something went wrong on the server' });
        }
    }

    async loginUser(req, res, authService) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = this.users.find((user) => user.email === email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = authService.generateToken(user);
        res.status(200).json({ user: { email: user.email }, token });
    }

    findUserByEmail(email) {
        return this.users.find((user) => user.email === email);
    }

}


module.exports = UsersService;

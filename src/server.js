
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'mongodb://localhost:27017';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect();

const usersCollection = client.db('usersdb').collection('users');
console.log(usersCollection);

// Endpoint 1: User Creation
app.post('/users/create', async (req, res) => {
  const { fullName, email, password } = req.body;

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Validate full name
  if (!fullName || fullName.length < 3) {
    return res.status(400).json({ error: 'Full name must be at least 3 characters long' });
  }

  // Validate password
  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  // Check if email already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  // Hash the password with bcrypt
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Store user data in MongoDB
  const newUser = {
    fullName,
    email,
    password: hashedPassword,
  };

  await usersCollection.insertOne(newUser);

  res.status(201).json({ message: 'User created successfully' });
});

// Endpoint 2: Update User Details
app.put('/users/edit', async (req, res) => {
  const { email, fullName, password } = req.body;

  // Validate full name
  if (!fullName || fullName.length < 3) {
    return res.status(400).json({ error: 'Full name must be at least 3 characters long' });
  }

  // Validate password
  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  // Update user details in MongoDB
  const result = await usersCollection.updateOne(
    { email },
    {
      $set: {
        fullName,
        password: bcrypt.hashSync(password, 10),
      },
    }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ message: 'User details updated successfully' });
});

// Endpoint 3: Delete User
app.delete('/user/delete', async (req, res) => {
  const { email } = req.body;

  // Delete user from MongoDB
  const result = await usersCollection.deleteOne({ email });

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ message: 'User deleted successfully' });
});

// Endpoint 4: Get All Users
app.get('/user/getAll', async (req, res) => {
  // Retrieve all users from MongoDB
  const allUsers = await usersCollection.find().toArray();

  // Filter out sensitive information (passwords)
  const sanitizedUsers = allUsers.map(({ fullName, email }) => ({ fullName, email }));

  res.json(sanitizedUsers);
});

// app.options('/user/login', cors());

// Endpoint 5: User Login
app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Check if email exists in the database
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    // Validate the password
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
    // Password is correct, user is authenticated
    res.json({ message: 'Login successful' });
  });
  
  // Default route handler
app.get('/', (req, res) => {
  res.send('Welcome to my application'); // or res.sendFile() for serving static files
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
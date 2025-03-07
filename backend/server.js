const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bikescooterapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  // Root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received signup request:', { email, password }); // Add this line
  try {
    const user = new User({ email, password });
    await user.save();
    console.log('User created successfully:', user); // Add this line
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error); // Add this line
    res.status(400).json({ error: error.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Protected route example
app.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    const user = await User.findById(decoded.userId);
    res.json({ email: user.email });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Mock data endpoint
app.get('/bikes', (req, res) => {
    const bikes = [
      { id: 1, name: 'Bike 1', lat: 37.78825, lng: -122.4324 },
      { id: 2, name: 'Bike 2', lat: 37.78425, lng: -122.4304 },
      { id: 3, name: 'Bike 3', lat: 37.78625, lng: -122.4344 },
    ];
    res.json(bikes);
  });



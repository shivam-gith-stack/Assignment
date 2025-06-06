const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'default_secret';

app.use(cors());
app.use(bodyParser.json());

const dummyData = JSON.parse(fs.readFileSync('./dummy.json', 'utf-8'));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = dummyData.users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: '1h'
  });

  res.json({ token });
});

app.get('/api/products', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, SECRET_KEY);
    res.json({ products: dummyData.products });
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
});

app.get('/api/products/:id', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, SECRET_KEY);

    const productId = req.params.id;
    const product = dummyData.products.find(p => p.id.toString() === productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
});


app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

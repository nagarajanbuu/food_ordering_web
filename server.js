const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000; // Ensure it's the correct port you're using

app.use(cors());
app.use(express.json()); // Middleware to parse JSON data

// Save cart data to a text file
app.post('/save_cart', (req, res) => {
  const { cart } = req.body;  // Get the cart data from request body

  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  // Format the cart data to save
  const cartData = cart.map(item => `Item: ${item.name}, Price: ₹ ${item.price}`).join('\n');

  // Save cart data to save_cart.txt
  fs.writeFile('C:/Users/anbum/fulllll/save_cart.txt', cartData, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ error: 'Failed to save cart to file' });
    }
    res.status(200).json({ message: 'Cart saved successfully!' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/save_cart', methods=['POST'])
def save_cart():
    try:
        # Get the cart data from the request
        data = request.get_json()
        print("Received Cart Data:", data)  # Log the received cart data
        
        cart = data.get('cart', [])
        if not cart:
            return jsonify({'message': 'Cart is empty'}), 400

        # Calculate the total price
        total_price = sum(item['price'] for item in cart)

        # Save cart data and total price to a text file (appending)
        with open('carts_data.txt', 'a', encoding='utf-8') as file:
            file.write(f"Cart Saved At: {datetime.now()}\n")
            for item in cart:
                file.write(f"Item Name: {item['name']}, Price: ₹ {item['price']}\n")
            file.write(f"Total Price: ₹ {total_price}\n")
            file.write("\n")

        return jsonify({'message': 'Cart saved successfully!', 'total_price': total_price}), 200
    except Exception as e:
        print("Error saving cart:", e)  # Log any errors
        return jsonify({'message': 'Failed to save cart', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Ensure it's running on port 5000

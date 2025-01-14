from flask import Blueprint, request, jsonify

# Define a Flask blueprint for routes
cart_routes = Blueprint('cart_routes', __name__)

# In-memory data storage (for simplicity, replace with a database in production)
cart_data = []

@cart_routes.route('/save-cart', methods=['POST'])
def save_cart():
    """
    Route to save cart details.
    Expects JSON data in the format:
    {
        "cart": [
            {"item": "Burger", "price": 200},
            {"item": "Pizza", "price": 250},
            {"item": "French Fries", "price": 100}
        ]
    }
    """
    data = request.json  # Parse JSON data
    if not data or 'cart' not in data:
        return jsonify({"message": "Invalid cart data!"}), 400

    # Append the cart to the in-memory storage
    cart_data.append(data['cart'])
    return jsonify({"message": "Cart saved successfully!", "cart": data['cart']}), 200


@cart_routes.route('/get-cart', methods=['GET'])
def get_cart():
    """
    Route to fetch all saved cart details.
    """
    return jsonify({"cart_data": cart_data}), 200

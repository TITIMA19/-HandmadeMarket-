import React from 'react';

function CartTable({ cartItems, onRemove, onQuantityChange, onProceedToPayment }) {
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Quantity</th>
                <th>Subtotal ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        onQuantityChange(item._id, parseInt(e.target.value))
                      }
                      style={{ width: '60px' }}
                    />
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onRemove(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Total: ${totalPrice.toFixed(2)}</h4>

          <button className="btn btn-primary" onClick={onProceedToPayment}>
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}

export default CartTable;

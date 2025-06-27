import React from 'react'

export default function Cart() {
  return (
    <div><nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <a class="navbar-brand" href="/">Handmade Market</a>
    </div>
  </nav>

  <div class="container my-5">
    <h2 class="text-center mb-4">Your Shopping Cart</h2>
{/* 
    <!-- Cart Table --> */}
    <div class="table-responsive">
      <table class="table align-middle table-bordered bg-white">
        <thead class="table-primary">
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>

          {/* <!-- Item 1 --> */}
          <tr>
            <td><img src="https://via.placeholder.com/100x80" class="img-fluid rounded" alt="Product"/></td>
            <td>Handmade Bracelet</td>
            <td>$12.99</td>
            <td>
              <input type="number" class="form-control w-50" value="1" min="1"/>
            </td>
            <td>$12.99</td>
            <td><button class="btn btn-danger btn-sm">Remove</button></td>
          </tr>

          {/* <!-- Item 2 --> */}
          <tr>
            <td><img src="https://via.placeholder.com/100x80" class="img-fluid rounded" alt="Product"/></td>
            <td>Knitted Scarf</td>
            <td>$24.00</td>
            <td>
              <input type="number" class="form-control w-50" value="2" min="1"/>
            </td>
            <td>$48.00</td>
            <td><button class="btn btn-danger btn-sm">Remove</button></td>
          </tr>

        </tbody>
      </table>
    </div>

    {/* <!-- Summary --> */}
    <div class="row mt-4">
      <div class="col-md-6 offset-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Cart Summary</h5>
            <p class="card-text">Subtotal: <strong>$60.99</strong></p>
            <p class="card-text">Shipping: <strong>$5.00</strong></p>
            <p class="card-text">Total: <strong>$65.99</strong></p>
            <a href="#" class="btn btn-success w-100">Proceed to Checkout</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer class="bg-dark text-white text-center p-3 mt-5">
    &copy; 2025 Handmade Market
  </footer>


</div>
  )
}

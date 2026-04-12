let currentUser = localStorage.getItem("loggedInUser");

// Load user name
document.getElementById("user-name").innerText = currentUser;
const products = [
  {
    id: 1,
    name: "Stylish Jacket",
    price: 1999,
    image: "https://via.placeholder.com/300x250"
  },
  {
    id: 2,
    name: "Casual Shirt",
    price: 999,
    image: "https://via.placeholder.com/300x250"
  },
  {
    id: 3,
    name: "Jeans",
    price: 1499,
    image: "https://via.placeholder.com/300x250"
  },
  {
    id: 4,
    name: "Sneakers",
    price: 2499,
    image: "https://via.placeholder.com/300x250"
  }
];

let cart = JSON.parse(localStorage.getItem(currentUser + "_cart")) || [];

// Load Products
function loadProducts() {
  const productList = document.getElementById("product-list");

  products.forEach(product => {
    productList.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card">
          <img src="${product.image}" class="card-img-top">
          <div class="card-body text-center">
            <h5>${product.name}</h5>
            <p>₹${product.price}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);

  localStorage.setItem(currentUser + "_cart", JSON.stringify(cart));
  updateCartCount();
}

// Update Cart Count
function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}       

// View Cart
function viewCart() {
  let cartItems = document.getElementById("cart-items");
  let total = 0;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;

    cartItems.innerHTML += `
      <div class="d-flex justify-content-between">
        <p>${item.name} - ₹${item.price}</p>
        <button onclick="removeItem(${index})" class="btn btn-sm btn-danger">X</button>
      </div>
    `;
  });

  document.getElementById("total-price").innerText = total;

  let modal = new bootstrap.Modal(document.getElementById("cartModal"));
  modal.show();
}

//remove cart item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem(currentUser + "_cart", JSON.stringify(cart));
  viewCart();
  updateCartCount();
}

// Initialize
loadProducts();
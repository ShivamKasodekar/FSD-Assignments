let currentUser = localStorage.getItem("loggedInUser");

// Load user name
document.getElementById("user-name").innerText = currentUser;
const products = [
  {
    id: 1,
    name: "Stylish Jacket",
    price: 1999,
    image: "images/jacket.jpg"
  },
  {
    id: 2,
    name: "Casual Shirt",
    price: 999,
    image: "images/casual shirt.jpg"
  },
  {
    id: 3,
    name: "Jeans",
    price: 1499,
    image: "images/jeans.jpg"
  },
  {
    id: 4,
    name: "Sneakers",
    price: 2499,
    image: "images/snearker.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem(currentUser + "_cart")) || [];

// Load Products
function loadProducts() {
  const products = [
  { id: 1, name: "Men Jacket", price: 1999, category: "Men", image: "https://via.placeholder.com/300" },
  { id: 2, name: "Women Dress", price: 1499, category: "Women", image: "https://via.placeholder.com/300" },
  { id: 3, name: "Sneakers", price: 2499, category: "Shoes", image: "https://via.placeholder.com/300" },
  { id: 4, name: "Watch", price: 999, category: "Accessories", image: "https://via.placeholder.com/300" }
];
}
function displayProducts(productArray) {
  let productList = document.getElementById("product-list");
  productList.innerHTML = "";

  productArray.forEach(product => {
    productList.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card shadow">
          <img src="${product.image}">
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

// Load all
displayProducts(products);
//seacrch funchtion
function searchProduct() {
  let input = document.getElementById("searchBox").value.toLowerCase();

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(input)
  );

  displayProducts(filtered);
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
updateCartCount();
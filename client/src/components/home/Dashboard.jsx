import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const categories = [
    { name: "Mobiles", icon: "📱" },
    { name: "Fashion", icon: "👕" },
    { name: "Electronics", icon: "💻" },
    { name: "Home", icon: "🏠" },
    { name: "Appliances", icon: "📺" },
    { name: "Beauty", icon: "💄" },
    { name: "Grocery", icon: "🛒" },
  ];

  const products = [
    { id: 1, name: "iPhone 15 Pro", brand: "Apple", price: 119900, originalPrice: 129900, discount: 8, image: "https://via.placeholder.com/200?text=iPhone+15+Pro", rating: 4.5, reviews: 2340 },
    { id: 2, name: "Samsung Galaxy S24 Ultra", brand: "Samsung", price: 99999, originalPrice: 119999, discount: 17, image: "https://via.placeholder.com/200?text=Galaxy+S24", rating: 4.3, reviews: 1890 },
    { id: 3, name: "OnePlus 12", brand: "OnePlus", price: 64999, originalPrice: 69999, discount: 7, image: "https://via.placeholder.com/200?text=OnePlus+12", rating: 4.4, reviews: 3210 },
    { id: 4, name: "Xiaomi 14 Pro", brand: "Xiaomi", price: 74999, originalPrice: 89999, discount: 17, image: "https://via.placeholder.com/200?text=Xiaomi+14+Pro", rating: 4.2, reviews: 980 },
    { id: 5, name: "Vivo X100 Pro", brand: "Vivo", price: 79999, originalPrice: 89999, discount: 11, image: "https://via.placeholder.com/200?text=Vivo+X100+Pro", rating: 4.5, reviews: 1560 },
    { id: 6, name: "Oppo Find X7 Pro", brand: "Oppo", price: 69999, originalPrice: 79999, discount: 13, image: "https://via.placeholder.com/200?text=Oppo+Find+X7", rating: 4.4, reviews: 2100 },
    { id: 7, name: "Realme GT 5 Pro", brand: "Realme", price: 55999, originalPrice: 62999, discount: 11, image: "https://via.placeholder.com/200?text=Realme+GT+5", rating: 4.3, reviews: 890 },
    { id: 8, name: "iQOO 12", brand: "iQOO", price: 52999, originalPrice: 59999, discount: 12, image: "https://via.placeholder.com/200?text=iQOO+12", rating: 4.4, reviews: 1720 },
  ];

  return (
    <div className="min-vh-100 bg-white">
      {/* Header - Flipkart Blue */}
      <header className="navbar-custom fixed-top shadow">
        <div className="container py-2">
          <div className="d-flex align-items-center justify-content-between">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-decoration-none">
                <span className="logo-text d-block">MobileStore</span>
                <span className="logo-subtext">Explore <span className="text-warning">Plus</span></span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-grow-1 mx-4">
              <div className="d-flex search-box">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search for products, brands and more"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn text-primary fw-bold px-4">
                  🔍
                </button>
              </div>
            </div>

            {/* Right Menu */}
            <div className="d-flex align-items-center gap-4">
              <span className="text-white fw-medium" style={{ cursor: "pointer" }}>Become a Seller</span>

              {/* User Menu */}
              <div className="user-dropdown">
                <button
                  className="btn bg-white text-primary fw-medium px-4"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  {user?.name || "Account"} ▼
                </button>
                
                {showUserMenu && (
                  <div className="user-dropdown-menu mt-1 p-2">
                    <div className="d-flex align-items-center gap-2 p-2 border-bottom">
                      <span className="fs-5">👤</span>
                      <div>
                        <p className="fw-medium mb-0 small">{user?.name}</p>
                        <p className="text-muted mb-0 small">{user?.email}</p>
                      </div>
                    </div>
                    <Link to="/" className="d-block px-3 py-2 text-dark text-decoration-none" style={{ backgroundColor: "#f5f5f5" }}>📦 My Orders</Link>
                    <Link to="/" className="d-block px-3 py-2 text-dark text-decoration-none" style={{ backgroundColor: "#f5f5f5" }}>❤️ Wishlist</Link>
                    <Link to="/" className="d-block px-3 py-2 text-dark text-decoration-none" style={{ backgroundColor: "#f5f5f5" }}>⚙️ Account Settings</Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="d-block w-100 text-start px-3 py-2 text-danger fw-medium"
                      style={{ backgroundColor: "#f5f5f5", border: "none" }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link to="/" className="d-flex align-items-center gap-1 text-white fw-medium text-decoration-none">
                <span className="fs-5">🛒</span>
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div style={{ height: "70px" }}></div>

      {/* Categories Bar */}
      <div className="bg-white shadow-sm">
        <div className="container py-2">
          <div className="d-flex justify-content-between overflow-auto py-1">
            {categories.map((cat, index) => (
              <div key={index} className="category-item text-center px-4 py-2">
                <span className="fs-4 d-block">{cat.icon}</span>
                <span className="fw-medium small">{cat.name}</span>
                <span className="d-block text-primary" style={{ fontSize: "10px" }}>▼</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-light py-3">
        <div className="container">
          <div className="rounded overflow-hidden">
            <img src="https://via.placeholder.com/1200x280?text=Big+Sale+-+Up+to+80%+Off" alt="Sale Banner" className="w-100" style={{ height: "180px", objectFit: "cover" }} />
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="bg-light py-4">
        <div className="container">
          <div className="bg-white rounded shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="fw-medium mb-1">Best Sellers</h5>
                <p className="text-muted small mb-0">Grab the best deals on popular smartphones</p>
              </div>
              <button className="btn btn-warning btn-sm fw-medium">View All</button>
            </div>
            
            <div className="row g-3">
              {products.map((product) => (
                <div key={product.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
                  <div className="product-card border rounded p-2 h-100">
                    <div className="position-relative">
                      <img src={product.image} alt={product.name} className="w-100" style={{ height: "140px", objectFit: "contain" }} />
                      <span className="discount-badge position-absolute top-0 start-0">{product.discount}% OFF</span>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-muted small mb-0 text-truncate">{product.brand}</p>
                      <h6 className="fw-medium mb-1 text-truncate">{product.name}</h6>
                      
                      <div className="d-flex align-items-center gap-1 mb-1">
                        <span className="rating-badge">{product.rating} ★</span>
                        <span className="text-muted small">({product.reviews})</span>
                      </div>
                      
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-medium">₹{product.price.toLocaleString()}</span>
                        <span className="text-muted text-decoration-line-through small">₹{product.originalPrice.toLocaleString()}</span>
                      </div>
                      
                      <p className="text-success small fw-medium mb-2">Free delivery</p>
                      
                      <button className="btn btn-warning w-100 btn-sm fw-medium">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-light py-4">
        <div className="container">
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <div className="bg-white rounded shadow-sm p-3 d-flex align-items-center gap-3">
                <span className="fs-2">🚚</span>
                <div>
                  <h6 className="fw-medium mb-0 small">Free Delivery</h6>
                  <p className="text-muted mb-0 small">On orders above ₹500</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-white rounded shadow-sm p-3 d-flex align-items-center gap-3">
                <span className="fs-2">🔄</span>
                <div>
                  <h6 className="fw-medium mb-0 small">Easy Returns</h6>
                  <p className="text-muted mb-0 small">10 day replacement</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-white rounded shadow-sm p-3 d-flex align-items-center gap-3">
                <span className="fs-2">🛡️</span>
                <div>
                  <h6 className="fw-medium mb-0 small">Secure Payment</h6>
                  <p className="text-muted mb-0 small">100% secure payments</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-white rounded shadow-sm p-3 d-flex align-items-center gap-3">
                <span className="fs-2">📱</span>
                <div>
                  <h6 className="fw-medium mb-0 small">Best Deals</h6>
                  <p className="text-muted mb-0 small">On top brands</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Flipkart Dark */}
      <footer className="footer-custom text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-2 mb-3">
              <h6 className="text-secondary small fw-medium">ABOUT</h6>
              <ul className="list-unstyled small">
                <li className="text-white-50">About Us</li>
                <li className="text-white-50">Careers</li>
                <li className="text-white-50">Press</li>
                <li className="text-white-50">MobileStore Stories</li>
              </ul>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <h6 className="text-secondary small fw-medium">HELP</h6>
              <ul className="list-unstyled small">
                <li className="text-white-50">Payments</li>
                <li className="text-white-50">Shipping</li>
                <li className="text-white-50">Cancellation</li>
                <li className="text-white-50">Returns</li>
              </ul>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <h6 className="text-secondary small fw-medium">SOCIAL</h6>
              <ul className="list-unstyled small">
                <li className="text-white-50">Facebook</li>
                <li className="text-white-50">Twitter</li>
                <li className="text-white-50">Instagram</li>
                <li className="text-white-50">YouTube</li>
              </ul>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <h6 className="text-secondary small fw-medium">Mail Us</h6>
              <p className="small text-white-50">
                MobileStore Internet Private Limited,<br/>
                Buildings Alyssa, Begonia &<br/>
                Clove Embassy Tech Village,<br/>
                Bengaluru, 560103,<br/>
                Karnataka, India
              </p>
            </div>
            <div className="col-12 col-md-3 mb-3">
              <h6 className="text-secondary small fw-medium">Registered Office Address</h6>
              <p className="small text-white-50">
                MobileStore Internet Private Limited,<br/>
                Buildings Alyssa, Begonia &<br/>
                Clove Embassy Tech Village,<br/>
                Bengaluru, 560103,<br/>
                Karnataka, India<br/>
                CIN : U51109KA2012PTC066107<br/>
                Telephone: 044-45614700
              </p>
            </div>
          </div>
          
          <hr className="border-secondary" />
          <div className="d-flex flex-wrap justify-content-between small text-white-50">
            <div className="d-flex gap-3">
              <span style={{ cursor: "pointer" }}>Become a Seller</span>
              <span style={{ cursor: "pointer" }}>Advertise</span>
              <span style={{ cursor: "pointer" }}>Gift Cards</span>
              <span style={{ cursor: "pointer" }}>Help Center</span>
            </div>
            <div>
              <p className="mb-0">© 2007-2024 MobileStore.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

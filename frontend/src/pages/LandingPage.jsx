import React from 'react';
import { Link } from 'react-router-dom';
import headerimage from "../assets/Logo/headerimage.jpg";
import  workshop from "../assets/Logo/workshop.jpg";
import Logo from "../assets/Logo/tazrart.png";
import Refam from "../assets/Logo/Refam.jpg";
import nhass from "../assets/Logo/nhas.jpeg";
import idokan from "../assets/Logo/idokan.jpeg";
import Khiata from "../assets/Logo/Khiata.jpeg";
import jld from "../assets/Logo/jld.jpeg";
import rassm from "../assets/Logo/rassm.jpeg"
function Home() {
  return (
    <>
    <header className="text-white d-flex align-items-center"style={{ backgroundImage: `url(${headerimage})`, backgroundSize: "cover", backgroundPosition: "center", height: "500px", position: "relative",}}>
          <div  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, }}>
        
          </div>
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div className="col-md-8">
              <h1 className="display-4 fw-bold">Welcome to TAZRART Market</h1>
              <p className="lead">
                Discover unique creations from local artisans. Support small businesses and find something truly special.
              </p>
              <a href="/Shop" className="btn btn-primary"  style={{ backgroundColor: "#fd7e14", color: "white" , border: "2px solid #fd7e14",}}>
                Explore Now
              </a>
            </div>
          </div>
             </header>
        <main className="container py-5">
        
         
          
          <section className="mb-5">
            <h3 className="fw-bold mb-4 text-center">Explore Our Products</h3>
            <div className="row">
              {/* Card 1 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <img src={Refam}className="cart-image" alt="Leather Bag" />
                  <div className="card-body">
                    <h5 className="card-title">Classic Leather Bag</h5>
                    <p className="card-text">Made from genuine Moroccan leather. Durable and elegant.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">$89.99</span>
                     
    
                       <Link to="products" className="btn btn-primary">
                       <i className="bi bi-cart-plus"></i> More Details
                      </Link>
                     
                    </div>
                  </div>
                </div>
              </div>
        
              {/* Card 2 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <img src={nhass} className="cart-image" alt="Jewelry" />
                  <div className="card-body">
                    <h5 className="card-title">Berber Necklace</h5>
                    <p className="card-text">Handcrafted silver and coral jewelry inspired by Amazigh culture.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">$59.99</span>
                      <Link to="products" className="btn btn-primary">
                       <i className="bi bi-cart-plus"></i> More Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
        
              {/* Card 3 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <img src={idokan} className="cart-image" alt="Basket" />
                  <div className="card-body">
                    <h5 className="card-title">Woven Storage Basket</h5>
                    <p className="card-text">Eco-friendly and hand-woven using palm leaves in Marrakech.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">$39.99</span>
                      <Link to="products" className="btn btn-primary">
                       <i className="bi bi-cart-plus"></i> More Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        
          {/* 🔶 2. Material Cards */}
          <section className="mb-5">
            <h3 className="fw-bold mb-4 text-center"> Explore Our Materials</h3>
            <div className="row">
              {/* Card 1 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <img src={rassm} className="cart-image" alt="Leather" />
                  <div className="card-body">
                    <h5 className="card-title">Genuine Leather</h5>
                    <p className="card-text">Locally sourced and naturally tanned for premium quality.</p>
                    <button className="btn btn-outline-primary w-100">More Details</button>
                  </div>
                </div>
              </div>
        
              {/* Card 2 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <img src={Khiata} className="cart-image" alt="Wool" />
                  <div className="card-body">
                    <h5 className="card-title">Organic Wool</h5>
                    <p className="card-text">From Atlas Mountains sheep, used in carpets and wearables.</p>
                    <button className="btn btn-outline-primary w-100">More Details</button>
                  </div>
                </div>
              </div>
        
              {/* Card 3 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <img src={jld} className="cart-image" alt="Natural Dyes" />
                  <div className="card-body">
                    <h5 className="card-title">Natural Plant Dyes</h5>
                    <p className="card-text">Extracted from saffron, henna, indigo and pomegranate skins.</p>
                    <button className="btn btn-outline-primary w-100">More Details</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-5 bg-light rounded">
          <div className="container">
            <div className="row align-items-center">
              {/* Image on the left */}
              <div className="col-md-6">
                <div 
                  style={{ 
                    backgroundImage: `url(${workshop})`, 
                    backgroundSize: "cover", 
                    backgroundPosition: "center", 
                    width: "100%", 
                    height: "690px", 
                    borderRadius: "10px" 
                  }}
                ></div>
              </div>
        
              {/* Text on the right */}
              <div className="col-md-6">
                <h2 className="display-5">Learn with Our Courses</h2>
                <p className="lead">
                  Tazrart offers workshops and online courses to help you master traditional artisan skills. Join the community and learn something beautiful!
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="container py-5 text-center" style={{ backgroundColor: "#2b4353",color: "#9cd3d3" }}>
          <h2 className="mb-4">What is TAZRART?</h2>
          <p className="lead text-white" >
            <strong>TAZRART</strong> is a platform dedicated to showcasing and celebrating Moroccan craftsmanship. We connect talented artisans with people who value handmade, authentic, and meaningful products.
          </p>
        </section>
        <section className="py-5 bg-light rounded">
            <div className="container">
              <h3 className="fw-bold text-center mb-4">Contact Us</h3>
              <form className="mx-auto" style={{ maxWidth: "600px" }}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Fatima, Mohamed..." />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea className="form-control" id="message" rows="4" placeholder="Write your message here..."></textarea>
                </div>
                <button type="submit" className="btn btn-orange w-100" style={{ backgroundColor: "#fd7e14", color: "white" }}>
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </main>
             <footer className="text-white py-5 mt-5" style={{ backgroundColor: "#fd7e14" }}>
          <div className="container">
            <div className="row">
              {/* Left: Logo + Description + Social Links */}
              <div className="col-md-4 mb-4 mb-md-0">
                <div className="mb-2">
                  <img
                    src={Logo}
                    alt="Logo"
                    style={{
                      height: "80px",
                      width: "auto",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    className="d-inline-block align-text-top"
                  />
                </div>
                <p className="text-light">
                  Handmade Market — your destination for unique artisan products made
                  with love and tradition.
                </p>
                <div>
                  <a href="#" className="text-white me-3">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="text-white me-3">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="text-white me-3">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a href="#" className="text-white">
                    <i className="bi bi-youtube"></i>
                  </a>
                </div>
              </div>
        
              {/* Middle: Projects */}
              <div className="col-md-4">
                <h5 className="mb-3">Our Projects</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Leather Collection
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Traditional Pottery
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Rural Artisans Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Custom Orders
                    </a>
                  </li>
                </ul>
              </div>
        
              {/* Right: Categories and Materials */}
              <div className="col-md-4">
                <h5 className="mb-3">Categories</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Accessories
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Home Decor
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Fashion
                    </a>
                  </li>
                </ul>
                <h5 className="mt-4 mb-3">Materials</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Clay
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Leather
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Wood
                    </a>
                  </li>
                </ul>
              </div>
            </div>
        
            {/* Footer Bottom */}
            <div className="text-center mt-5 pt-3 border-top border-white">
              <p className="mb-0 text-white-50">
                &copy; {new Date().getFullYear()} Handmade Market. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

    </>
  );
}

export default Home;
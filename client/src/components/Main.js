import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import p1  from "./../images/p1.jpg";
import p2  from "./../images/p2.jpg";
import p3  from "./../images/p3.jpg";

import banner1  from "./../images/main-banner1.png";
import banner2  from "./../images/main-banner2.png";
import banner3  from "./../images/main-banner3.png";


export default function Main() {
  return (
        <div className="" id="Main">
          <section id="main-banner"></section>
          <section id="carousel-section">
          <Carousel className="bg-secondary text-center">
            <Carousel.Item>
              <img className="banner-img " src={banner1} alt="My Image" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="banner-img " src={banner2} alt="My Image" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="banner-img " src={banner3} alt="My Image" />
            </Carousel.Item>
          </Carousel>
          </section>
          <section className="p-3 m-3" id="latest-offers">
            <h2 className="">Exclusive Offers:-</h2>
            <div className="row mt-4 ">
              <div className="col-md-4">
                <div className="card m-auto shadow p-3 product-div w-75 rounded-5">
                  <div className="text-center">
                  <a className="btn btn-outline-danger end-0 me-2 position-absolute rounded-5 wishlist" href="#" title="Add to Wishlist">
                    <i style={{fontSize:"18px"}} className="fa fa-heart-o"></i>
                  </a>
                  <img className="product-img " src={p1} alt="My Image" />
                  </div>
                  <h4 className="m-1">Brand</h4>
                  <h5 className="m-1">Men's Linen Shirts Short Sleeve</h5>
                  <div><span className="m-1 fs-5">$41.99</span><span className="m-1 text-decoration-line-through">$69.99</span><span className="m-1 text-uppercase text-warning">(30% off)</span></div>
                  <div className="row mt-2" ><button className="btn btn-cart btn-outline-primary col-md-5 m-auto">Add to Cart</button>
                  <button className="btn btn-buy btn-outline-success col-md-5 m-auto ">Buy</button></div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card m-auto shadow p-3 product-div w-75 rounded-5">
                  <div className="text-center">
                  <a className="btn btn-outline-danger end-0 me-2 position-absolute rounded-5 wishlist" href="#" title="Add to Wishlist">
                    <i style={{fontSize:"18px"}} className="fa fa-heart-o"></i>
                  </a>
                  <img className="product-img" src={p2} alt="My Image" />
                  </div>
                  <h4 className="m-1">Brand</h4>
                  <h5 className="m-1">Men's Linen Shirts Short Sleeve</h5>
                  <div><span className="m-1 fs-5">$41.99</span><span className="m-1 text-decoration-line-through">$69.99</span><span className="m-1 text-uppercase text-warning">(30% off)</span></div>
                  <div className="row mt-2" ><button className="btn btn-cart btn-outline-primary col-md-5 m-auto">Add to Cart</button>
                  <button className="btn btn-buy btn-outline-success col-md-5 m-auto ">Buy</button></div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card m-auto shadow p-3 product-div w-75 rounded-5">
                  <div className="text-center">
                  <a className="btn btn-outline-danger end-0 me-2 position-absolute rounded-5 wishlist" href="#" title="Add to Wishlist">
                    <i style={{fontSize:"18px"}} className="fa fa-heart-o"></i>
                  </a>
                  <img className="product-img" src={p3} alt="My Image" />
                  </div>
                  <h4 className="m-1">Brand</h4>
                  <h5 className="m-1">Men's Linen Shirts Short Sleeve</h5>
                  <div><span className="m-1 fs-5">$41.99</span><span className="m-1 text-decoration-line-through">$69.99</span><span className="m-1 text-uppercase text-warning">(30% off)</span></div>
                  <div className="row mt-2" ><button className="btn btn-cart btn-outline-primary col-md-5 m-auto">Add to Cart</button>
                  <button className="btn btn-buy btn-outline-success col-md-5 m-auto ">Buy</button></div>
                </div>
              </div>
            </div>
          </section>
          
          <section id="sale-banner"></section>

          <section id="review" className="mt-4">
          <div className="container">
            <h2 className="text-center mb-4">Reviews</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="testimonial">
                  <div className="testimonial-content">
                    <h4>Hrithik Roshan</h4>
                    <p className="p-3 rounded-3 bg-body-secondary">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."</p>
                    <i className="fa fa-thumbs-o-up m-3" aria-hidden="true"></i>
                    <i className="fa fa-comments-o m-3" aria-hidden="true"></i>
                    <i className="fa fa-share m-3 " aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="testimonial">
                  <div className="testimonial-content">
                    <h4>Kartik Aryan</h4>
                    <p className="p-3 rounded-3 bg-body-secondary">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."</p>
                    <i className="fa fa-thumbs-o-up m-3" aria-hidden="true"></i>
                    <i className="fa fa-comments-o m-3" aria-hidden="true"></i>
                    <i className="fa fa-share m-3 " aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="testimonial">
                  <div className="testimonial-content">
                    <h4>Disha Patani</h4>
                    <p className="p-3 rounded-3 bg-body-secondary">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."</p>
                    <i className="fa fa-thumbs-o-up m-3" aria-hidden="true"></i>
                    <i className="fa fa-comments-o m-3" aria-hidden="true"></i>
                    <i className="fa fa-share m-3 " aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </section>
          
        </div>
  );
}
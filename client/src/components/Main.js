import React from "react";
import p1  from "./../images/p1.jpg";
import p2  from "./../images/p2.jpg";
import p3  from "./../images/p3.jpg";

export default function Main() {
  return (
        <div className="" id="Main">
          <section id="main-banner"></section>
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

        </div>
  );
}
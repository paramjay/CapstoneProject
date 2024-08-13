import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import p1  from "./../images/CatBanner1.jpg";
import p2  from "./../images/CatBanner2.jpg";
import p3  from "./../images/CatBanner3.jpg";
import p4  from "./../images/CatBanner4.jpg";

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
            <h2 className="">Categories:-</h2>
            <div className="row mt-4 ">
              <div className="col-md-3">
                  <div className="Home_cat shadow rounded-5">
                    <div style={{ backgroundImage: `linear-gradient(to right, #00000030, #00000073),url(${p1})`,
                    height:'420px',width:'auto',
                    backgroundSize: 'cover',backgroundPosition: 'center', alignItems: 'center',
                    display: 'flex',borderRadius: '15px',justifyContent: 'center' }}>
                      <a className="text-decoration-none" href="Products?gender=Women&category=1&subCategory=&price=0&">
                        <h3 className="text-white">Fashion Women</h3></a></div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="Home_cat shadow rounded-5">
                    <div style={{ backgroundImage: `linear-gradient(to right, #00000050, #00000073),url(${p2})`,
                    height:'420px',width:'auto',
                    backgroundSize: 'cover',backgroundPosition: 'center', alignItems: 'center',
                    display: 'flex',borderRadius: '15px',justifyContent: 'center' }}>
                      <a className="text-decoration-none" href="Products?gender=&category=3&subCategory=&price=0&">
                        <h3 className="text-white">Accessories</h3></a></div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="Home_cat shadow rounded-5">
                    <div style={{ backgroundImage: `linear-gradient(to right, #00000030, #00000073),url(${p3})`,
                    height:'420px',width:'auto',
                    backgroundSize: 'cover',backgroundPosition: 'center', alignItems: 'center',
                    display: 'flex',borderRadius: '15px',justifyContent: 'center' }}>
                      <a className="text-decoration-none" href="Products?gender=Men&category=1&subCategory=&price=0&">
                        <h3 className="text-white">Fashion Men</h3></a></div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="Home_cat shadow rounded-5">
                    <div style={{ backgroundImage: `linear-gradient(to right, #00000050, #00000093),url(${p4})`,
                    height:'420px',width:'auto',
                    backgroundSize: 'cover',backgroundPosition: 'center', alignItems: 'center',
                    display: 'flex',borderRadius: '15px',justifyContent: 'center' }}>
                      <a className="text-decoration-none" href="Products?gender=Women&category=3&subCategory=15&price=0&">
                        <h3 className="text-white">Bags</h3></a></div>
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
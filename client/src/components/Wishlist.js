import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import p1 from "./../images/p1.jpg";
import p2 from "./../images/p2.jpg";
import p3 from "./../images/p3.jpg";

export default function Wishlist() {
  const wishlistItems = [
    { id: 1, image: p1, name: "Men's Linen Shirt", price: "$41.99" },
    { id: 2, image: p2, name: "Women's Dress", price: "$29.99" },
    { id: 3, image: p3, name: "Men's Jacket", price: "$59.99" },
    { id: 4, image: p3, name: "Men's Jacket", price: "$59.99" },
    // Add more items as needed
  ];

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Your Wishlist</h2>
      <Row>
        {wishlistItems.map(item => (
          <Col md={3} className="mb-4" key={item.id}> {/* Adjust column size to fit 4 items */}
            <Card className="wishlist-card">
              <div className="wishlist-img-container">
                <img src={item.image} alt={item.name} className="wishlist-img" />
              </div>
              <Card.Body className="p-2">
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <span className="price">{item.price}</span>
                </Card.Text>
                <Row>
                  <Col md={12} lg={6} sm={12}><Button variant="primary" className="w-100 m-1" >Add to Cart</Button></Col>
                  
                  <Col md={12} lg={6} sm={12}><Button variant="danger" className="w-100 m-1" >Remove</Button></Col>
                </Row>
                
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

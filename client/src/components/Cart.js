import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import p1 from "./../images/p1.jpg";
import p2 from "./../images/p2.jpg";
import p3 from "./../images/p3.jpg";

// Update your cartItems array to include image URLs and correct IDs
const cartItems = [
  { id: 1, name: "Product 1", price: 10, quantity: 1, image: p1 },
  { id: 2, name: "Product 2", price: 20, quantity: 2, image: p2 },
  { id: 3, name: "Product 3", price: 30, quantity: 1, image: p3 },
];

const Cart = () => {
  // Calculate total price
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxRate = 0.08; // 8% tax rate
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      <Row>
        <Col md={8}>
          {cartItems.map((item) => (
            <Card className="mb-3" key={item.id}>
              <Row className="g-0">
                <Col md={4} className="cart-info">
                  <img className='cart-img m-2'
                    src={item.image}
                    alt={item.name}
                  />
                </Col>
                <Col md={8}>
                  <Card.Body className='cart-info'>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>${item.price.toFixed(2)}</Card.Text>
                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                    <Button variant="danger">Remove</Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Summary</Card.Title>
              <Card.Text>Subtotal: ${subtotal.toFixed(2)}</Card.Text>
              <Card.Text>Tax (8%): ${tax.toFixed(2)}</Card.Text>
              <Card.Text>Total: ${total.toFixed(2)}</Card.Text>
              <Button variant="primary" className="w-100">Checkout</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;

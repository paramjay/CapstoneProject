import React, { useState,useEffect } from "react";
import { Container, Row, Col, Card, Button,Form } from 'react-bootstrap';
import p1 from "./../images/p1.jpg";
import p2 from "./../images/p2.jpg";
import p3 from "./../images/p3.jpg";


const Cart = () => {
  let cartItems = JSON.parse(localStorage.getItem('cartProducts'))||[];
  console.log(cartItems);
 const taxRate = 0.08; // 8% tax rate

  const [subtotal, setSubtotal] = useState(cartItems.reduce((total, item) => total + item.price * item.quantity, 0));
  const [promoDiscount, setPromoDiscount] = useState(JSON.parse(localStorage.getItem('promo'))||'');
  
  const [tax, setTax] = useState(getTax());
  const [total, setTotal] = useState(getTotal());
  function getTax(){
    if(promoDiscount==''){
      return (subtotal*taxRate);
    }
    else{
      return ((subtotal*0.9)*taxRate);
    }
  }
  function getTotal(){
    if(promoDiscount==''){
      return (subtotal + tax);
    }
    else{
      return ((subtotal*0.9) + (subtotal*0.9)*taxRate);
    }
  }
  const removeFromCart = (item) => {
    // localStorage.removeItem('cartProducts');
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))||[];
    console.log(cartProducts);
    cartProducts=cartProducts.filter(data => data.id !== item.id);
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    console.log("modified-",localStorage.getItem('cartProducts'))
    window.location.reload();
      
  };

  const AddPromo = () => {
    // localStorage.removeItem('cartProducts');
    let promo = JSON.parse(localStorage.getItem('promo'))||null;
    let promoApplied=document.getElementById('promo').value;
    if(promoApplied=='' || promoApplied==null){
      alert('Enter a Promo Code!')
    }
    else if(promo==null && promoApplied=='DIS10'){
      localStorage.setItem('promo', JSON.stringify({promo:promoApplied,discount:'10%',value:0.1*subtotal,remaining:subtotal*0.9}));
      setPromoDiscount({promo:promoApplied,discount:'10%',value:0.1*subtotal,remaining:subtotal*0.9});
      setTax((subtotal*0.9)*taxRate)
      setTotal((subtotal*0.9) + (subtotal*0.9)*taxRate);
    } 
    
    else if(promo==null && promoApplied!='DIS10'){
      alert("Wrong Promo Code!");
    }
    else{
      alert("Promo code already applied!");
    }
      
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Shopping Cart <i class="fa fa-shopping-cart"></i></h2>
      <Row>
        <Col md={8}>
          {cartItems.map((item) => (
            <Card className="mb-3" key={item.id}>
              <Row className="g-0">
                <Col md={4} className="cart-info">
                  <img className='cart-img m-2'
                    src={"http://localhost:3002/file/"+item.image}
                    alt={item.name}
                  />
                </Col>
                <Col md={8}>
                  <Card.Body className='cart-info'>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>${item.price}</Card.Text>
                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                    <Button variant="danger" onClick={() => removeFromCart(item)}>Remove</Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Summary <i class="fa fa-file-text-o"></i></Card.Title>
              <Card.Text>Subtotal: ${subtotal.toFixed(2)}</Card.Text>
              {promoDiscount!="" ? (
                <>
                <Card.Text>Promo Code: {promoDiscount.promo}</Card.Text>
                <Card.Text>Discount (-{promoDiscount.discount}): -${promoDiscount.value}</Card.Text>
                <Card.Text>Total before tax : {promoDiscount.remaining}</Card.Text>
                </>):(<></>)
              }
              <Card.Text>Tax (8%): ${tax.toFixed(2)}</Card.Text>
              <Card.Text>Total: ${total.toFixed(2)}</Card.Text>
              

              <Button variant="primary" href="/Checkout" className="w-100">Checkout</Button>
            </Card.Body>
          </Card>
          <Card className='mt-2 mb-3'>
            <Card.Body >
              <Card.Title>Add Promo <i class="fa fa-tags"></i></Card.Title>
              <Card.Text>Get discounts by applying Promo Code</Card.Text>
              <Form.Control type="text" id="promo" placeholder="Promo Code.." />
              <Button variant="outline-danger" onClick={AddPromo} className="mt-3 w-100">Apply</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;

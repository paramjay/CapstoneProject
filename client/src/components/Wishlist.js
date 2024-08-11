import React, { useState,useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { getWishlistByUserId,removeWishlist } from "./../utils";
import { useNavigate } from "react-router-dom";


export default function Wishlist() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const addToCart = (item) => {
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))||[];
    console.log(cartProducts);
    if(!cartProducts.length>0){
        console.log("empty");
        item={...item,quantity:1}
        localStorage.setItem('cartProducts', JSON.stringify([item]));
        console.log("empty-modified-",localStorage.getItem('cartProducts'))
    }
    else{
        // cartProducts=[cartProducts];
        let existingItem=false;
        console.log("not-empty");
        cartProducts=cartProducts.map(data => {
            if (data.id == item.id) {
                console.log('Existing-Item');
                existingItem=true
                return { ...data, quantity: data.quantity + 1 };
            }
            return data;
         });
         if(!existingItem){
            console.log('Non-Existing-Item');
            // cartProducts=[cartProducts];
            item={...item,quantity:1}
            cartProducts.push(item);
         }
         localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
         console.log("modified-",localStorage.getItem('cartProducts'))
    }
    alert("Product added in cart");
  };

  const removeFromWishlist = async (id) => {
    let message =await removeWishlist(id.toString());
    alert(message);
    fetchData(user);
  };
  const fetchData = async (user) => {  
    console.log(user);
    const data = await getWishlistByUserId(user.id);
    console.log(data);
    setWishlistItems(data);
  }; 
  useEffect(() => {
    let getUser = JSON.parse(localStorage.getItem('token'))||null
    if(getUser==null){
      navigate("/login");
    }
    else{
      setUser(getUser);
      fetchData(getUser);
    }
  }, []);
  return (
    <Container className="mt-5">
      <h2 className="mb -4">Your Wishlist:-</h2>
      <Row>

        {wishlistItems.map(item => (
          <Col md={3} className="mb-4" key={item.product.id}> {/* Adjust column size to fit 4 items */}
            <Card className="wishlist-card">
              <div className="wishlist-img-container">
                <img src={"http://localhost:3002/file/"+item.product.image} alt={item.product.name} className="wishlist-img" />
              </div>
              <Card.Body className="p-2">
                <Card.Title>{item.product.name}</Card.Title>
                <Card.Text>
                  <span className="price">${item.product.price}</span>
                </Card.Text>
                <Row>
                  <Col md={12} lg={6} sm={12}><Button variant="primary" onClick={() => addToCart(item.product)} className="w-100 m-1" >Add to Cart</Button></Col>
                  <Col md={12} lg={6} sm={12}><Button variant="danger" onClick={() => removeFromWishlist(item.id)}  className="w-100 m-1" >Remove</Button></Col>
                </Row>
                
                
              </Card.Body>
            </Card>
          </Col>
        ))}
        {!wishlistItems.length>0 ? (
        <>
        <div className="p-5 text-center mt-5 mb-5"><h3 className="mb-5">No Product in wishlist.</h3></div>
        </>):(<></>)
        }
      </Row>
    </Container>
  );
}

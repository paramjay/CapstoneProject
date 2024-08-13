import React, { useState,useEffect } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addCheckout,getCatDiscount  } from "../utils";

export default function Checkout() {
    const [cartItems] = useState(JSON.parse(localStorage.getItem('cartProducts'))||[]);
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    const taxRate = 0.08; // 8% tax rate

    
    const [CategoryDiscounts, setCategoryDiscounts] = useState([]); 
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
      const [formData, setFormData] = useState({
        user:'',
        cart:[],
        address: '',
        country: '',
        state: '',
        zip: '',
        paymentMethod: 'Credit Card',
        ccName: '',
        ccNumber: '',
        ccExpiration: '',
        ccCvv: '',
        total:total.toString(),
        promoCode:promoDiscount.promo,
        promoDiscount:promoDiscount.discount,
        categoryDiscount:''
      });
      const [err, setErr] = useState({});

      const handleChange = (e) => {
        let { id, value } = e.target;
        if(id=="credit"||id=="debit")
        {
            id='paymentMethod';
        }
        setFormData({ ...formData, [id]: value });
        
      };
      
      const removeFields = (obj, fields) => {
        const newObj = { ...obj };
        fields.forEach(field => delete newObj[field]);
        return newObj;
      };
      
  const fetchData = async (graphQLParams) => {  
    setCategoryDiscounts(await getCatDiscount());
    };
      useEffect(() => {
        fetchData();
        let getUser = JSON.parse(localStorage.getItem('token'))||null;
        
        // console.log(promoDiscount);
        const fieldsToRemove = ['description', 'gender', 'brand','image','stock','category'];

        const newCartItems = cartItems.map(product => removeFields(product, fieldsToRemove));
        setFormData({ ...formData, ["cart"]: newCartItems,["user"]:getUser.id });
        if(getUser==null){
            navigate("/login");
        }
        else{
            setUser(getUser);
        }
      }, []);
      
      const validateCcCvv = (ccCvv) => {
        const regex = /^\d{3}$/;
        return regex.test(ccCvv);
      };
      
      // to validate CC Expiration (MM/YY)
      const validateCcExpiration = (ccExpiration) => {
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return regex.test(ccExpiration);
      };
      
      // to validate CC Number (16-digit number)
      const validateCcNumber = (ccNumber) => {
        const regex = /^\d{16}$/;
        return regex.test(ccNumber);
      };
      
      // to validate Canadian ZIP Code (Example:N3H 0E4)
      const validateZip = (zip) => {
        const regex = /^[A-Z]\d[A-Z] \d[A-Z]\d$/;
        return regex.test(zip);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.cart.length<1){
          alert("No Products in cart");
          return null;
        }
        setFormData({ ...formData, ["user"]: user.id });
        var errorMessage={};
        Object.entries(formData).forEach(([key, value]) => {
          if(value==='' && key!='categoryDiscount'){
            console.log(key,value);
            errorMessage[key]= 'This field is required.';
          }

          if(!validateCcCvv(value) && key==='ccCvv'){
            errorMessage[key]= 'Invalid CVV. Must be 3 digits number';
          }

          if(!validateCcExpiration(value) && key==='ccExpiration'){
            errorMessage[key]= 'Invalid CVV. Must be MM/DD format';
          }

          if(key==='ccNumber' && !validateCcNumber(value)){
            errorMessage[key]= 'Invalid Credit Card Number. Must be 16 digits number';
          }

          if(!validateZip(value) && key==='zip'){
            errorMessage[key]= "Invalid ZIP.Must like 'A1B 2C3'";
          }
        });
        setErr(errorMessage);
        console.log(err);
        if(JSON.stringify(errorMessage)=='{}'){
          let new_checkout= await addCheckout(formData);
          if(new_checkout.addCheckout){
            localStorage.removeItem('cartProducts');
            if(formData.promoCode){
              localStorage.removeItem('promo');
            }
            navigate("ThankYou");
          }
        }
      };



  return (
    <Container className="">
      <div className="row">
      <h3 className="mb-3 mt-3">Checkout <i className="fa fa-shopping-bag"></i></h3>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">User Information <i className="fa fa-user"></i></h4>
          <form className="needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" disabled value={user.firstName}  required />
                <div className="invalid-feedback">Valid first name is required.</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" disabled value={user.lastName}  required />
                <div className="invalid-feedback">Valid last name is required.</div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="username">Username</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">@</span>
                </div>
                <input type="text" className="form-control" id="username" disabled value={user.username}  required />
                <div className="invalid-feedback" style={{ width: '100%' }}>Your username is required.</div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" disabled value={user.email} />
              <div className="invalid-feedback">Please enter a valid email address for shipping updates.</div>
            </div>


            <hr className="mb-4 mt-4" />
            <h4 className="mb-3">Address Information <i className="fa fa-map-marker"></i></h4>
            <div className="mb-3">
              <label htmlFor="address">Delievery Address</label>
              <input type="text" className="form-control" id="address" defaultValue={user.address} value={formData.address} onChange={handleChange} />
              <div className="text-danger">{err.address}</div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select className="form-control custom-select d-block w-100" id="country" value={formData.country} onChange={handleChange} required>
                  <option value="">Choose...</option>
                  <option value="Canada">Canada</option>
                </select>
                <div className="text-danger">{err.country}</div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select className="form-control custom-select d-block w-100" id="state" value={formData.state} onChange={handleChange} required>
                  <option value="">Choose...</option>
                  <option value="Alberta">Alberta</option>
                    <option value="British Columbia">British Columbia</option>
                    <option value="Manitoba">Manitoba</option>
                    <option value="New Brunswick">New Brunswick</option>
                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                    <option value="Nova Scotia">Nova Scotia</option>
                    <option value="Ontario">Ontario</option>
                    <option value="Prince Edward Island">Prince Edward Island</option>
                    <option value="Quebec">Quebec</option>
                    <option value="Saskatchewan">Saskatchewan</option>
                </select>
                <div className="text-danger">{err.state}</div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" value={formData.zip} onChange={handleChange} required />
                <div className="text-danger">{err.zip}</div>
              </div>
            </div>

            <hr className="mb-4" />

            <h4 className="mb-3">Payment Information <i className="fa fa-credit-card"></i></h4>

            <div className="d-flex my-3">
              <div className="form-check">
                <input id="credit" name="paymentMethod" value="Credit Card" type="radio" className="form-check-input" checked={formData.paymentMethod === 'Credit Card'} onChange={handleChange} required />
                <label className="form-check-label" htmlFor="credit">Credit card</label>
              </div>
              <div className="form-check">
                <input id="debit" name="paymentMethod" value="Debit Card" type="radio" className="ms-2 me-2 form-check-input" checked={formData.paymentMethod === 'Debit Card'} onChange={handleChange} required />
                <label className="form-check-label" htmlFor="debit">Debit card</label>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="ccName">Name on card</label>
                <input type="text" className="form-control" id="ccName" value={formData.ccName} onChange={handleChange} required />
                <small className="text-muted">Full name as displayed on card</small>
                <div className="text-danger">{err.ccName}</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="ccNumber">Credit card number</label>
                <input type="text" className="form-control" id="ccNumber" value={formData.ccNumber} onChange={handleChange} required />
                <div className="text-danger">{err.ccNumber}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="ccExpiration">Expiration</label>
                <input type="text" className="form-control" id="ccExpiration" value={formData.ccExpiration} onChange={handleChange} required />
                <div className="text-danger">{err.ccExpiration}</div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="ccCvv">CVV</label>
                <input type="text" className="form-control" id="ccCvv" value={formData.ccCvv} onChange={handleChange} required />
                <div className="text-danger">{err.ccCvv}</div>
              </div>
            </div>

            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block mb-4" type="submit">Checkout</button>
          </form>
        </div>
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="">Your cart <i className="fa fa-shopping-cart"></i></span>
            <span className="badge badge-secondary badge-pill">{cartItems.length}</span>
          </h4>
          <ul className="list-group mb-3">
            {cartItems.map(item => 
            CategoryDiscounts.map((catDis) => (
              catDis.category.name==item.category.name ? (
                  <>
                  <li key={item.id} className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">{item.name}</h6>
                    </div>
                    <div>{catDis.discount}% Off</div>
                    <span className="text-muted">${item.price} x ({item.quantity})</span>
                  </li>
                  </>
                ) :
            (
              
              <li key={item.id} className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">{item.name}</h6>
                </div>
                <span className="text-muted">${item.price} x ({item.quantity})</span>
              </li>
             
            ))))}
            <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span className="my-0">Sub-Total:</span>
                </div>
                <strong className="text-muted">${subtotal}</strong>
            </li>
            {promoDiscount!="" ? (
                <>
                <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span className="my-0">Promo Code Applied:</span>
                </div>
                <strong className="text-muted"> {promoDiscount.promo}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span className="my-0">Discount (-{promoDiscount.discount}):</span>
                </div>
                <strong className="text-muted"> -${promoDiscount.value}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span className="my-0">Total before tax :</span>
                </div>
                <strong className="text-muted"> {promoDiscount.remaining}</strong>
                </li>
                </>):(<></>)
              }
            <li className="list-group-item d-flex justify-content-between">
              <span>Tax (8%):</span>
              <strong>${tax.toFixed(2)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total :</span>
              <strong>${total.toFixed(2)}</strong>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}

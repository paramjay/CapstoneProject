import React, { useState,useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { AddtoWishlist,getCatDiscount,getCategory,getSubCategoryByCategoryId,graphQLCommand } from "./../utils";
import { useNavigate,useSearchParams } from "react-router-dom";

export default function Products() {

  const [searchParams, _] = useSearchParams();
    
  const navigate = useNavigate();
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

    const convertSearchParamsToGraphQLParams = (searchParams) => {
      const list = [];
      for (let [key, value] of searchParams) {
        value = `"${value}"`;
        if (value !== "" ) list.push(`${key}: ${value}`);
      }
      return list.join(", ");
    };
    const graphQLParams = convertSearchParamsToGraphQLParams(searchParams);
  
    const [CategoryDiscounts, setCategoryDiscounts] = useState([]); 

  const [ProductsList, setProductsList] = useState([]); 
  const [filterQuery, setFilterQuery] = useState({
    gender:"",
    category:"",
    subCategory:"",
    price:0,
  }); 

  const fetchData = async (graphQLParams) => {  
    setCategoryDiscounts(await getCatDiscount());
      let query_type = "";
      if (graphQLParams === "") {
        query_type = `getProducts`;
      }
      else {
        query_type = `getFilteredProducts(${graphQLParams})`;
      }
      // console.log("query_type -- " + query_type);
  
      const query = `query {
        ${query_type} {
            id
            category{
                name
            }
            name
            brand
            stock
            size
            price
            description
            image
        }
      }`;
      
      const data = await graphQLCommand(query);
      console.log(data)
      setProductsList(data.getProducts || data.getFilteredProducts);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterQuery((prevData) => ({
            ...prevData,
            [name]: value
        }));
        if(name=='category'){
            fetchSubCategory(value);
        }
        if(name=="price"){
            document.getElementById('price_value').value=value;
        }
    };
    const fetchCategory = async () => {
        const data = await getCategory();
        setCategoryList(data);
    };
    const fetchSubCategory = async (id) => {
        const data = await getSubCategoryByCategoryId(id);
        setSubCategoryList(data);
      };

      const onFilterFormSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        let text = "";
        for (let x in filterQuery) {
            text += x+"="+filterQuery[x]+"&";
        };
        navigate(`/Products?${text}`);
      };

      
      const buy = async (item,price) => {
        await addToCart(item,price);
        navigate('/Checkout');
        
      };
      const addToCart = (item,price) => {
        
        let promo = JSON.parse(localStorage.getItem('promo'))||'';
        if(promo){
            alert("Add your Promo Code again.")
            localStorage.removeItem('promo');
        }
        let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))||[];
        console.log(cartProducts);
        item.price=price.toString();
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

      const addToWishlist = async (item) => {
        let user = JSON.parse(localStorage.getItem('token'));
        if(user) {
            const data = await AddtoWishlist(user.id.toString(),item.id.toString());
            alert(data);
        }else{
            alert("You need to login to add a product in wishlist.");
        }
      };

  useEffect(() => {
      fetchData(graphQLParams);
      fetchCategory();
    }, [graphQLParams]);
  
  return (
    <div className="mobile">
    <div className="m-3">
    <div className='row'>
        <div className=" col-md-2 mobile-right p-2 border-end">
        <div className="destop" ><h2>Filters <i className='fa fa-filter'></i></h2></div>
            <Form id="FilterForm">
                <Form.Group className="mb-3 d-grid" controlId="form_gender">
                    <Form.Label>Products for :</Form.Label>
                    <div className="d-flex ">
                        <Form.Check onChange={handleChange} name="gender" type="radio" value="Men" label="Men" id="men"/>
                        <Form.Check onChange={handleChange} className="ms-4" name="gender" value="Women" type="radio" label="Women" id="women" />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="form_Category">
                    <Form.Label>Category:</Form.Label>
                    <Form.Select id="Category" name="category" 
                        onChange={handleChange}>
                        <option value="">---Select---</option>
                        {categoryList.map((singleRow) => (
                            <option value={singleRow.id}> {singleRow.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="form_Sub-Category">
                    <Form.Label>Sub-Category:</Form.Label>
                    <Form.Select id="subCategory" name="subCategory" 
                        onChange={handleChange} >
                        <option value="">---Select---</option>
                        {subCategoryList.map((singleRow) => (
                            <option value={singleRow.id}> {singleRow.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="form_Price">
                    <Form.Label>Price : </Form.Label>
                    <Form.Control type="number" disabled defaultValue={0} id="price_value"/>
                    <Form.Range onChange={handleChange}
                    type='range'
                    id="price"
                    name="price"
                    min="0" max="2600" defaultValue={0}
                    />
                </Form.Group>
                
                <Button type="button" onClick={onFilterFormSubmit} className="btn btn-primary me-2">Submit</Button>
                <Button type="reset" href="/Products" className="btn btn-warning">Reset</Button>
            </Form>
            
        </div>
        <section className="p-2  col-md-9 mobile-left" id="latest-offers">
                <h2 className="">Exclusive Offers:-</h2>
                <div className="row mt-4   ">
                {ProductsList.map((item) => (
                    <div className="col-md-4 mt-2" key={item.id}>
                        <div className="card m-auto shadow p-3 product-div rounded-5 w-100">
                        <div className="text-center">
                            <a onClick={() => addToWishlist(item)} className="btn btn-outline-danger end-0 me-2 position-absolute rounded-5 wishlist" href="#" title="Add to Wishlist">
                                <i style={{fontSize:"18px"}} className="fa fa-heart-o"></i>
                            </a>
                            <img className="product-img " src={"http://localhost:3002/file/"+item.image} alt={item.name} />
                        </div>
                        <h4 className="m-1">{item.brand}</h4>
                        <h5 className="m-1">{item.name}</h5>
                        
                            {/* <span className="m-1 fs-5">${item.price}</span> */}
                            {CategoryDiscounts.map((catDis) => (
                                catDis.category.name==item.category.name ? (
                                    <>
                                    <div>
                                    <span className="m-1 text-decoration-line-through">${item.price}</span>
                                    <span className="m-1 price">${item.price*((100-catDis.discount)/100)}</span>
                                    <span className="fw-medium m-1 text-success">{catDis.discount}% Off</span>
                                    </div>
                                    <div className="row mt-2" ><button  onClick={() => addToCart(item,item.price*((100-catDis.discount)/100))} type="button" className="btn btn-cart btn-outline-primary col-md-5 m-auto">Add to Cart</button>
                                    <button className="btn btn-buy btn-outline-success col-md-5 m-auto " onClick={() => buy(item,item.price*((100-catDis.discount)/100))}>Buy</button></div>
                                    </>
                                  ) : (
                                    <>
                                    <div>
                                        <span className="m-1 price">${item.price}</span>
                                    </div>
                                    <div className="row mt-2" ><button  onClick={() => addToCart(item,item.price)} type="button" className="btn btn-cart btn-outline-primary col-md-5 m-auto">Add to Cart</button>
                                    <button className="btn btn-buy btn-outline-success col-md-5 m-auto " onClick={() => buy(item,item.price)}>Buy</button></div>
                                    </>
                                  )
                            ))}
                            {/* <span className="m-1 text-decoration-line-through">${item.salePrice}</span> */}
                        
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
    </div>
    </div>
  );
};


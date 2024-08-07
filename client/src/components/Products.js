import React, { useState,useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { getProducts,graphQLCommand } from "./../utils";
import { useSearchParams } from "react-router-dom";

export default function Products() {

    const [searchParams, _] = useSearchParams();
    const convertSearchParamsToGraphQLParams = (searchParams) => {
      const list = [];
      for (let [key, value] of searchParams) {
        value = `"${value}"`;
        if (value !== "" ) list.push(`${key}: ${value}`);
      }
      return list.join(", ");
    };
    const graphQLParams = convertSearchParamsToGraphQLParams(searchParams);
  
  const [ProductsList, setProductsList] = useState([]); 
  const fetchData = async (graphQLParams) => {  
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
            category
            subCategory
            name
            brand
            stock
            size
            price
            salePrice
            description
            image
        }
      }`;
      
      const data = await graphQLCommand(query);
      console.log(data)
      setProductsList(data.getProducts || data.getFilteredEmployees|| data.getUpcomingRetirees||data.getUpcomingRetireesWithEmployeeType);
    };
  useEffect(() => {
      //get date from server
    //   setProductsList([]);
      fetchData(graphQLParams);
    }, [graphQLParams]);
  
  return (
    <div className="m-3">
    <div className='row'>
        
        <div className="col-md-2 m-2 ms-3 p-2 border-end">
        <div><h2>Filters <i className='fa fa-filter'></i></h2></div>
            <Form>
                
                <Form.Group className="mb-3 d-grid" controlId="form_gender">
                    <Form.Label>Products for :</Form.Label>
                    <div className="d-flex ">
                        <Form.Check id="gender" name="gender" type="checkbox" label="Men" />
                        <Form.Check className="ms-4" id="gender" name="gender" type="checkbox" label="Women" />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="form_Category">
                    <Form.Label>Category:</Form.Label>
                    <Form.Select id="Category" name="Category">
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="form_Sub-Category">
                    <Form.Label>Sub-Category:</Form.Label>
                    <Form.Select id="Sub-Category" name="Sub-Category">
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="form_brand">
                    <Form.Label>Brand:</Form.Label>
                    <Form.Select id="Brand" name="Brand">
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="form_Price">
                    <Form.Label>Price:</Form.Label>
                    <Form.Range 
                    type='range'
                    id="price"
                    name="price"
                    min="0" max="1000"
                    />
                </Form.Group>
                
                <Button type="reset" className="btn btn-warning">Reset</Button>
            </Form>
            
        </div>
        <section className="p-2 m-2 col-md-9 " id="latest-offers">
                <h2 className="">Exclusive Offers:-</h2>
                <div className="row mt-4 ms-2 ">
                {ProductsList.map((item) => (
                    <div className="col-md-4 mt-2" key={item.id}>
                        <div className="card m-auto shadow p-3 product-div rounded-5 w-100">
                        <div className="text-center">
                            <a className="btn btn-outline-danger end-0 me-2 position-absolute rounded-5 wishlist" href="#" title="Add to Wishlist">
                                <i style={{fontSize:"18px"}} className="fa fa-heart-o"></i>
                            </a>
                            <img className="product-img " src={"http://localhost:3002/file/"+item.image} alt={item.name} />
                        </div>
                        <h4 className="m-1">{item.brand}</h4>
                        <h5 className="m-1">{item.name}</h5>
                        <div>
                            <span className="m-1 fs-5">${item.price}</span>
                            <span className="m-1 text-decoration-line-through">${item.salePrice}</span>
                        </div>
                        <div className="row mt-2" ><button className="btn btn-cart btn-outline-primary col-md-5 m-auto">Add to Cart</button>
                        <button className="btn btn-buy btn-outline-success col-md-5 m-auto ">Buy</button></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
    </div>
  );
};


import React from "react";

export async function graphQLCommand(query, variables) {
    try {
      const response = await fetch("http://localhost:3002/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: variables
          ? JSON.stringify({ query, variables })
          : JSON.stringify({ query }),
      });
  
      if (response.ok) {
        const result = await response.json();
        return result.data;
      } else {
        console.log(response);
        console.log("Error in sending data to Api-server:", response.statusText);
      }
    } catch (error) {
      console.log(Error);
      console.log("Error in sending data to Api-server:", error);
    }
}

export const DeactivateUser = async (id) => {
    const query = `mutation DeactivateUser($deactivateUserId: String!) {
                        deactivateUser(id: $deactivateUserId)
                    }`;
    console.log(id);
    let data = await graphQLCommand(query, { deactivateUserId: id });
    return data;
  };
export const DeleteUser = async (id) => {
    const query = `mutation RemoveUser($removeUserId: String!) {
                        removeUser(id: $removeUserId)
                    }`;
    console.log(id);
    let data = await graphQLCommand(query, { removeUserId: id });
    return data;
};
export const DeleteProduct = async (id) => {
    const query = `mutation RemoveProduct($removeProductId: String!) {
                        removeProduct(id: $removeProductId)
                    }`;
    console.log(id);
    let data = await graphQLCommand(query, { removeProductId: id });
    return data;
};
export const UserLogin = async (username,password) => {
  const query = `query LoginAuth($input: LoginInput!) {
                  loginAuth(input: $input) {
                    id
                    username
                    email
                    password
                    firstName
                    lastName
                    phone
                    gender
                    dob
                    role
                    address
                    isActive
                  }
                }`;
  let data = await graphQLCommand(query, { input: {username,password} });
  return data.loginAuth;
};
export const getOneProduct = async (id) => {
  // console.log(id);      
  const query = `query {
    getOneProduct(id: "${id}") {
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
  }
  }`;

  

    
  const data = await graphQLCommand(query);
  return data;
};

export const EditProductapi = async (id, product) => {
  const query = `mutation EditProductInput($id: String!, $product: EditProductInput!) {
    EditProductInput(id: $id, product: $product)
  }`;
  console.log(id);
  if(product.id){
    delete product.id;
}
  console.log(product);
    let data = await graphQLCommand(query, { id:id, product });
    return data;
  };
import React, { useState, useEffect,useCallback} from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import "./MyOrder.css";

function MyOrder() {
  const [userName, setuserName] = useState("");
  const [orders, setOrder] = useState([]);

 const STATUS_BATCH_MAP ={
    "pending" : "bg-success",
    "delivered" : "bg-success",
    "shipped" : "bg-warning"
  }

  const loadProductData = async () => {
    const localUserId = userName._id;
    if (!localUserId) {
      return;
    }
    // const response = await axios.get(/order/user/${userName._id});
    // OR
    const response = await axios.get(`/order/user/${localUserId}`);
    console.log(response);
    setOrder(response?.data?.data);
  };

  useEffect(() => {
    loadProductData();
  }, [userName, loadProductData]); // Include loadProductData as a dependency


  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storageUser?.email) {
      if (storageUser?.email) {
        setuserName(storageUser);
      }
    } else {
      alert("Please login first 👍");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <Navbar />
      <h2 className="text-center mt-3">My Order</h2>
      <div className="main-container">
        {orders?.map((order, i) => {
          const { product, quantity, status, deliveryCharges } = order;
          return (
            <div className="order-container d-flex">
              <div className="">
              <img src={product.image} alt={product.name} className="order-product-image" />
              </div>
              <div className="ms-5 mt-4 container">
                <p>{product.name}</p>
                <p>
                  {quantity} x {product.price} = ₹{quantity * product.price}
                </p>
                <p>Delivery Charges: Rs{deliveryCharges}</p>
                <p className={`show-status ${STATUS_BATCH_MAP[status]}`}>{status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrder;
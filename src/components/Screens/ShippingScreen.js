import React, { useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import Axios from 'axios'

function ShippingScreen(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");

  const [code, setCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/users/address',{address,city,mobile,code,country})
    .then(res=>{console.log(res.data)})
    props.history.push("/payment");
  };

  return (
    <div>
      {" "}
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul className="form-container">
            <li>
              <h4>Shipping</h4>
            </li>

            <li>
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </li>
            <li>
              <label htmlFor="Address">Mobile No.</label>
              <input
                type="text"
                name="mobile"
                id="number"
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </li>

            <li>
              <label htmlFor="postal code">Pin Code</label>
              <input
                type="text"
                name="code"
                id="pincode"
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </li>

            <li>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </li>
            <li>
              <button type="submit" className="btn btn-primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default ShippingScreen;

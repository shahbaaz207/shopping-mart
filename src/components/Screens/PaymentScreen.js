import React, { useState } from "react";
import CheckoutSteps from "./CheckoutSteps";

function PaymentScreen(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.history.push("/placeorder");
  };

  return (
    <div>
      {" "}
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul className="form-container">
            <li>
              <h3>Payment</h3>
            </li>
            
            <li>
              <input
                type="radio"
                name="payment"
                id="payment"
                required
              ></input>
              <label htmlFor="paytm">Paytm</label>
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

export default PaymentScreen;

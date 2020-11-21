import React, { useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { addToCard } from "../action/cardAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";

function PlaceorderScreen(props) {
  const [product, setData] = useState([]);

  const card = useSelector((state) => state.card);
  const { cardItems } = card;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCard(productId, qty));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Axios.get("/api/users/data");
      console.log(data);
      setData(data);
    };
    fetchData();
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    props.history.push("/success");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div style={{ marginLeft: 10, padding: ".5rem" }}>
              <li>Address:{product.adderss}</li>
              <li>City</li>
              <li>Mobile no</li>
              <li>Pin Code</li>
              <li>Country</li>
            </div>
          </div>

          <div className="payment">
            <h3>Payment</h3>
            <div>Payment Method: Paytm</div>
          </div>

          {/* order details */}
          <div className="card">
            <div className="card-list">
              <ul
                className="card-list-container"
                style={{ border: "1px solid black", borderRadius: 10 }}
              >
                <li>
                  <h3>Shopping Cart</h3>
                  <div>Price:</div>
                </li>
                {cardItems.length === 0 ? (
                  <div>card is empty</div>
                ) : (
                  cardItems.map((item) => (
                    <li key={item.id}>
                      <div className="card-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="card-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {" "}
                            {item.name}
                          </Link>
                        </div>
                        <div>Qty:{item.qty}</div>
                      </div>
                      <div className="price">{item.price}</div>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="card-action">
              <button
                type="submit"
                className="btn btn-block btn-success"
                onClick={handleClick}
              >
                Place Order
              </button>
              <h3>
                <div>
                  <h4>Order Summary</h4>
                </div>
                <p>
                  {" "}
                  Order Total: $
                  {cardItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </p>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceorderScreen;

import React, { useEffect } from "react";
import { addToCard, removeItem } from "../action/cardAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CardScreen(props) {
  const card = useSelector((state) => state.card);
  const { cardItems } = card;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  const removeFormCardHandler = (productId) => {
    dispatch(removeItem(productId));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCard(productId, qty));
    }
  }, []);

  const checkHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div className="card">
      <div className="card-list">
        <ul className="card-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price:</div>
          </li>
          {cardItems.length===0 ? (
            <div>card is empty</div>
          ) : (
            cardItems.map((item) => (
              <li key={item.id}>
                <div className="card-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="card-name">
                  <div>
                    <Link to={"/product/" + item.product}> {item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCard(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="button"
                      style={{ background: "red", marginLeft: ".5rem" }}
                      onClick={() => removeFormCardHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="price">{item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="card-action">
        <h3>
          SubTotal({cardItems.reduce((a, c) => a + c.qty, 0)} items) : $
          {cardItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          className="button primary"
          style={{ background: "yellow", marginLeft: 50 }}
          disabled={cardItems.length === 0}
          onClick={checkHandler}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}
export default CardScreen;

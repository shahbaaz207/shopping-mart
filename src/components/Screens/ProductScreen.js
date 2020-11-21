import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function ProductScreen(props) {
  const id = props.match.params.id;
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading] = useState("");
  const [error] = useState("");



  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await Axios.get("/api/products/" + id);
      setProduct(data);
    };
    fetchdata();
  }, [id]);

  const handelAddCard = () => {
    props.history.push("/card/" + id + "?qty=" + qty);
  };
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">back to reault</Link>
      </div>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details.image">
            <img src={product.image} style={{ height: 400 }} alt="product" />
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} Stars ({product.numReivew} Reivews)
              </li>
              <li>
                Price: <b>${product.price}</b>
              </li>
              <li>
                Description:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>
                Price:<b>${product.price}</b>
              </li>
              <li>
                Status:{product.countInStock > 0 ? "In Stock" : "unavailable"}
              </li>
              <li>
                Qyt:
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>

              <li>
                {product.countInStock > 0 && (
                  <button onClick={handelAddCard}>Add to Card</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;

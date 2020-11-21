import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./components/Screens/ProductScreen";
import HomeScreen from "./components/Screens/HomeScreen";
import CardScreen from "./components/Screens/CardScreen";
import SignInScreen from "./components/Screens/SignInScreen";
import RegisterScreen from "./components/Screens/RegisterScreen";
import Header from "./components/Screens/Header";
import ShippingScreen from "./components/Screens/ShippingScreen";
import PaymentScreen from "./components/Screens/PaymentScreen";
import PlaceorderScreen from "./components/Screens/PlaceorderScreen";
import SuccessScreen from "./components/Screens/SuccessScreen";

const App = () => {
  return (
    <Router>
      <div className="grid-container">
        <Header />
        {/* product page */}
        <main className="main">
          <div className="content">
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/product/:id" exact component={ProductScreen} />
            <Route path="/shipping" exact={true} component={ShippingScreen} />
            <Route path="/payment" exact={true} component={PaymentScreen} />
            <Route path="/success" exact={true} component={SuccessScreen} />

            <Route path="/placeorder" exact={true} component={PlaceorderScreen} />



            <Route path="/card/:id?" component={CardScreen} />
            <Route exact path="/signin" component={SignInScreen} />
            <Route exact path="/register" component={RegisterScreen} />
          </div>
        </main>

        {/* footer */}
        <footer className="footer">All right reserved.</footer>
      </div>
    </Router>
  );
};

export default App;

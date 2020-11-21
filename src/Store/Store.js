import {createStore,combineReducers, compose, applyMiddleware} from 'redux';
import { productListReducer, productDetailsReducer } from '../components/reducer/Reducer';
import thunk from 'redux-thunk';
import { cardReducer } from '../components/reducer/cardReducer';
import Cookie from 'js-cookie'
import { userSigninReducer } from '../components/reducer/userReducer';

const cardItems=Cookie.getJSON('cardItems')||[];
const initialState={card:{cardItems}}

const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    card:cardReducer,
    userSingIn:userSigninReducer,

})
const composeEnhancer=window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_||compose
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))

export default store 
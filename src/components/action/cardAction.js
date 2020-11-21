import Axios from "axios";
import Cookie from "js-cookie";
import { CARD_ADD_ITEM, CARD_REMOVE_ITEM } from "../constants/cardConstants"

const addToCard=(productId,qty)=>async (dispatch,getState)=>{
    try{
        const {data} = await Axios.get('/api/products/'+productId)
        dispatch({
            type:CARD_ADD_ITEM,payload:{
                product:data._id,
                name:data.name,
                image:data.image,
                price:data.price,
                countInStock:data.countInStock,
                qty

            }
        })
    }
    catch(error){}
    
    const {card:{cardItems}}=getState();
    Cookie.set("cardItems",JSON.stringify(cardItems))
   
}
const removeItem=(productId)=>(dispatch,getState)=>{
    dispatch({type:CARD_REMOVE_ITEM,payload:productId})

    const {card:{cardItems}}=getState();
    Cookie.set("cardItems",JSON.stringify(cardItems))
   
}

export{addToCard,removeItem}
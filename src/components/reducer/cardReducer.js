import {  CARD_ADD_ITEM, CARD_REMOVE_ITEM } from "../constants/cardConstants";

function cardReducer(state={cardItems:[] },action){
    switch(action.type){
        case CARD_ADD_ITEM:
            const item=action.payload;
            const product=state.cardItems.find(x=>x.product===item.product)
            if(product){
                return{ cardItems:state.cardItems.map(x=>x.product===product.product?item:x)}
            }
            return{cardItems:[...
                 state.cardItems,item]};
            case CARD_REMOVE_ITEM:
                return {cardItems:state.cardItems.filter(x=>x.product!==action.payload)}
            default:
                return state
    }
}

export {cardReducer}
import React from 'react';
import { Link } from 'react-router-dom';

function SuccessScreen() {
    return (
        <div className='success'>
        <Link to='/'>go to more shopping...</Link>

           <h3> SuccessFully Placed Your Order</h3>
           <p style={{float:'right',marginRight:20}}>Thank you...</p>
        </div>
    )
}

export default SuccessScreen;

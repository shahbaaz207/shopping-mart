import React, {useState} from "react";
import { Link } from "react-router-dom";

function SignInScreen(props) { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
 
  const redirect=props.location.search?props.location.search.split("=")[1]:'/';

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/users/signin',{
      method:'post',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        setError(data.error)
      } else{       
        setMessage(data.message)
        props.history.push(redirect)
      }      
    })
  };
   
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
          <li>
            <h3>Sign-In</h3>
            <span style={{color:'red'}}>{error}</span>
            <span>{message}</span>
            
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>

          <li>
            <label htmlFor="email">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>

          <li>
            <button type="submit" className="btn btn-primary">
              SignIn
            </button>
          </li>

          <li>New to Shopping Mart?</li>
          <li>
            <Link
              to={redirect==='/'?"register":"register?redirect"+redirect}
              className="btn btn-block btn-success text-center"
            >
              Create New Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SignInScreen;

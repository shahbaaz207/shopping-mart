import React, {  useState } from "react";
import { Link } from "react-router-dom";

function RegisterScreen(props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/users/register',{
      method:'post',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        setError(data.error)
      } else{
        setMessage(data.message)
        props.history.push('/signin')
      }      
    })
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
          <li>
            <h4>Register</h4>
            <span style={{color:'red'}}>{error}</span>
            <span>{message}</span>
          </li>
          
          <li>
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
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
            <label htmlFor="paasword">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>

          <li>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </li>

          <li>
            Already have an account ?
            <Link to="/signin" className="btn btn-success">
              Sign-In
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterScreen;

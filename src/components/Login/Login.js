import React from 'react'
import "./Login.css";
import {Link} from "react-router-dom";
const Login = () => {
  return (
    <div className="container">
    <div className="login-grid">
      <div className="login-text">
        <h2>Login</h2>
      </div>
      <div className="login-text">
        Are you a new member? <span><Link to="/sign_up" style={{color: "#2190FF"}}> Sign Up Here</Link></span>
      </div>
      <br />
      <div className="login-form">
        <form>
          <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                </div>
          <div className="form-group">
            <label for="password" >Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              aria-describedby="helpId"
            />
          </div>


          <div className="btn-group">
            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button> 
            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
          </div>
          <br />
          <div className="login-text">
            Forgot Password?
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login